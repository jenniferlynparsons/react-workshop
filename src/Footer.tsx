// wooo Reach router to make those routes happen
import { Link } from '@reach/router';
import React from 'react';
// importing the interface that will help sort the classNames
import { NowShowing } from './interfaces';

// the interface for the footer props we don't need to worry about state here, but props gets the clearComplete event handler setup, the nowShowing type (from interfaces), and a todoCount type of number
interface Props {
  clearCompleted: React.EventHandler<React.FormEvent<HTMLButtonElement>>;
  nowShowing: NowShowing;
  todoCount: number;
}

// this class just needs props so state is "any" or none as an empty object
export class Footer extends React.Component<Props, {}> {
  render() {
    // tslint:disable no-console
    console.log('rendering footer');
    // this deconstructs the props object into three variables with the same name as the keys within props
    // todoCount is passed down from Main and contains the length of the state.data array, Todo[]
    // clearCompleted is a function passed from props which fires the handleCompleted function which in turn updates state using the deleteCompleted function from data.ts
    // nowShowing.kind is a ternary statement used to determine which className to render. it's based off the route displayed which is determined by filterTodos
    const { todoCount, clearCompleted, nowShowing } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{todoCount} Todo left</span>
        <ul className="filters">
          <li>
            <Link
              to="/"
              className={nowShowing.kind === 'ShowAll' ? 'selected' : ''}
            >
              All
            </Link>
          </li>
          <li>
            <Link
              to="/active"
              className={nowShowing.kind === 'Active' ? 'selected' : ''}
            >
              Active
            </Link>
          </li>
          <li>
            <Link
              to="/completed"
              className={nowShowing.kind === 'Completed' ? 'selected' : ''}
            >
              Completed
            </Link>
          </li>
        </ul>
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
