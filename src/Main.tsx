// we're importing RouteComponentProps so that we can extended it later and be able to pass more props to the route components via the footer in the render function
// https://medium.com/@kaw2k/a-letter-of-appreciation-253ecab3f7d2
import { RouteComponentProps } from '@reach/router';
import React from 'react';
// importing our functions from data.ts
import {
  addTodo,
  deleteCompleted,
  deleteTodo,
  makeTodo,
  toggleAll,
  updateTodo,
} from './data';
// importing the other components we need and the types from the interfaces
import { Footer } from './Footer';
import { Header } from './Header';
import { NowShowing, Todo } from './interfaces';
import { ListItem } from './ListItem';

// tslint:disable no-console
// this is a curried function which is being used to make this a fancy one-liner for tidiness. Currying is the process of taking a function with multiple arguments and turning it into a sequence of functions each with only a single argument.
// https://medium.com/front-end-hacking/javascript-es6-curry-functions-with-practical-examples-6ba2ced003b1
const debug = (msg: string) => () => console.log(msg);

// here's the state interface that sets the data to the Todo array type defined in interfaces
interface State {
  data: Todo[];
}

// here is where we're extending that route props we imported earlier, adding the nowShowing prop with a type of NowShowing
interface Props extends RouteComponentProps {
  nowShowing: NowShowing;
}

// another pure component as in the ListItem
// PureComponent is exactly the same as Component except that it handles the shouldComponentUpdate method for you. When props or state changes, PureComponent will do a shallow comparison on both props and state. Component on the other hand won’t compare current props and state to next out of the box. Thus, the component will re-render by default whenever shouldComponentUpdate is called.
// https://codeburst.io/when-to-use-component-or-purecomponent-a60cfad01a81
export class Main extends React.PureComponent<Props, State> {
  // setting the default state to data array with a single entry that triggers the makeTodo function and passes in a title of 'laundry'. the status and id will be assigned automatically in that function
  state = {
    data: [makeTodo('laundry')],
  };

  // this function simply calls set state and passes in the new title from the event on the target calling it in ListItem. this is a one-liner and has an implicit return.
  createTodo = (title: string) =>
    this.setState({ data: addTodo(this.state.data, title) });

  // this function tells React to set the data to the result of the toggleAll function in data.ts
  handleToggleAll = () => this.setState({ data: toggleAll(this.state.data) });

  // this function tells React to update the data with the todo that is passed as an argument
  handleUpdateTodo = (todo: Todo) =>
    this.setState({ data: updateTodo(this.state.data, todo) });

  // this function tells React to update the data by deleting the todo that is passed as an argument
  handleDeleteTodo = (todo: Todo) =>
    this.setState({ data: deleteTodo(this.state.data, todo) });

  // this function tells React to update the data by deleting all of the completed todos
  handleDeleteCompleted = () =>
    this.setState({ data: deleteCompleted(this.state.data) });

  // this decontructs the props to get the nowShowing value and deconstructs the state to get the data value. if nowShowing's kind is ShowAll, then the function returns the entire array. else it returns only the filtered array that matches the nowShowing.kind. the function is complex and we can't do an implicit return here so we need to use an explicit return value
  filterTodos = () => {
    const { nowShowing } = this.props;
    const { data } = this.state;
    if (nowShowing.kind === 'ShowAll') {
      return data;
    } else {
      return data.filter(t => t.status.kind === nowShowing.kind);
    }
  };

  // yay the render function that tells react what to output to the browser view. see Footer for a breakdown
  // return statement as a template literal
  // className because we're inside a literal and can't class with class above
  // anything inside the curly braces is a javascript expression and evaluated. here we're using them to control the input value and assign the functions we created above to the input events
  // this is pulling together all of the other components and passing props down as well as filtering the todo list based on their status and the route we're on
  // the debug function is defined above, here with double parens because it's curried
  render() {
    debug('rendering main component')();
    return (
      <div className="todomvc-wrapper">
        <section className="todoapp">
          <Header onSubmit={this.createTodo} />

          <section className="main">
            <input
              className="toggle-all"
              id="toggle-all"
              type="checkbox"
              checked={false}
              onChange={this.handleToggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            {/* TODO list */}
            <ul className="todo-list">
              {this.filterTodos().map(t => (
                <ListItem
                  key={t.id}
                  item={t}
                  handleEdit={this.handleUpdateTodo}
                  handleDestroy={this.handleDeleteTodo}
                />
              ))}
            </ul>
          </section>
        </section>

        <Footer
          todoCount={this.state.data.length}
          clearCompleted={this.handleDeleteCompleted}
          nowShowing={this.props.nowShowing}
        />
      </div>
    );
  }
}
