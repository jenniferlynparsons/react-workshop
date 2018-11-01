import React from 'react';

// sets the type interface for the header state to a value with the type of string
interface State {
  value: string;
}

// sets the type interface for the header props to a function called onSubmit that takes an argument called todoTitle with a type of string returns nothing
interface Props {
  onSubmit: (todoTitle: string) => void;
}

// exports a class of Header that extends the React.Component class and passes the interfaces for Props and State through to the class
export class Header extends React.Component<Props, State> {
  // here's the state set with a default value so the todo input is empty on load
  readonly state = { value: '' };

  // this takes an argument called event as a change event on an html input
  // it then takes the value of that input element and tells React that this should be the new value of the state object
  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  // this takes an argument called event as a keyboard event on an html input
  // it then checks to see if that keyboard input is from the enter key and if so, fires the onSubmit function passed down from props which sets the state of the main data, adding a todo to the Todo[] array
  // finally, it resets the header state to an empty string, clearing the input
  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      this.props.onSubmit(this.state.value);
      this.setState({ value: '' });
    }
  };

  // yay the render function that tells react what to output to the browser view
  render() {
    // tslint:disable no-console
    console.log('rendering header');
    // return statement as a template literal
    // className because we're inside a literal and can't class with class above
    // anything inside the curly braces is a javascript expression and evaluated. here we're using them to control the input value and assign the functions we created above to the input events
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus={true}
          value={this.state.value}
          onChange={this.handleInput}
          onKeyDown={this.handleKeyDown}
        />
      </header>
    );
  }
}
