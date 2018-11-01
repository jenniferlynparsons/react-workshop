// grabbing the classnames type definitions
import classNames from 'classnames';
import React from 'react';
// importing a couple types from interfaces
import { flipStatus, Todo } from './interfaces';

// here's the interface for the state, and boolean edit key value and a string value key value
interface State {
  edit: boolean;
  value: string;
}

// and the props interface of a Todo type item key value and two functions that take an argument of t with a Todo type and return nothing
interface Props {
  item: Todo;
  handleDestroy: (t: Todo) => void;
  handleEdit: (t: Todo) => void;
}

// this class is a pure component, which ensures we only rerender the todo item if it has been changed
// PureComponent is exactly the same as Component except that it handles the shouldComponentUpdate method for you. When props or state changes, PureComponent will do a shallow comparison on both props and state. Component on the other hand won’t compare current props and state to next out of the box. Thus, the component will re-render by default whenever shouldComponentUpdate is called.
// https://codeburst.io/when-to-use-component-or-purecomponent-a60cfad01a81
export class ListItem extends React.PureComponent<Props, State> {
  readonly state = { edit: false, value: this.props.item.title };

  // this function simply calls set state and passes in the value from the event on the target calling it. this is a one-liner and has an implicit return. it's only setting the ListItem state here. the data.state that updates the todo in storage is handled by the handleSubmit function
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ value: event.target.value });

  // this function works similarly, this time calling the handleDestroy function passed into props from Main (which triggers the deleteTodo chain of functions and updates the data)
  handleDestroy = () => this.props.handleDestroy(this.props.item);

  // can't do a one liner here so curly brakets are needed. this updates props.status using the spread operator to assign a new value to status. we have to do this otherwise props will not update
  handleToggle = () => {
    this.props.handleEdit({
      ...this.props.item,
      status: flipStatus(this.props.item.status),
    });
  };

  // this function fires the handleEdit function from props, again using the spread operator to force props to update with the new title. handleEdit fires handleUpdateTodo on Main and up the chain to updateTodo, etc.
  handleSubmit = () =>
    this.props.handleEdit({ ...this.props.item, title: this.state.value });

  // this function sets the local state.edit to true which determines if the todo item is in an editing mode
  handleDoubleClick = () => this.setState({ edit: true });

  // this takes keyboard events, determines if the enter key is clicked, in which case handleSubmit is triggered, or if the escape key is clicked, which resets the editing state of the todo and also resets the value of the todo back to it's original setting from props
  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.which === 13) {
      this.handleSubmit();
    } else if (event.which === 27) {
      this.setState({ edit: false, value: this.props.item.title });
    }
  };

  render() {
    // tslint:disable no-console
    // this deconstructs the props, grabbing this.props.item so it can be used in the template literal expressions in the return below
    const { item } = this.props;
    console.log(`rendering item ${this.props.item.id}`);

    // this sets up the classNames object as classes so that different styling classes can be applied based on the state. completed and editing are the class names, whether they render or not is based on their boolean values
    const classes = classNames({
      completed: item.status.kind === 'Completed',
      editing: this.state.edit,
    });
    // yay the render function that tells react what to output to the browser view. see Footer for a breakdown
    // return statement as a template literal
    // className because we're inside a literal and can't class with class above
    // anything inside the curly braces is a javascript expression and evaluated. here we're using them to control the input value and assign the functions we created above to the input events
    return (
      <li className={classes}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={item.status.kind === 'Completed'}
            onChange={this.handleToggle}
          />
          <label onDoubleClick={this.handleDoubleClick}>{item.title}</label>
          <button className="destroy" onClick={this.handleDestroy} />
        </div>
        <input
          className="edit"
          value={this.state.value}
          name="title"
          onChange={this.handleChange}
          onBlur={this.handleSubmit}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }
}
