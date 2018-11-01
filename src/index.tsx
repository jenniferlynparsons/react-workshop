// importing all those useful modules
import { Router } from '@reach/router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// importing the type interfaces we need to pass through as props
import { showAll, todoActive, todoCompleted } from './interfaces';

// importing regular ol' css
import '../node_modules/todomvc-app-css/index.css';
import '../node_modules/todomvc-common/base.css';

// importing Main, which imports the rest of our components.
import { Main } from './Main';

// sets the parent component that will be rendered to the DOM
// Main is in here 3 times because each one will display at a different route. the route and nowShowing are being passed as props to Main
const MyRouter = () => (
  <Router>
    <Main path="/active" nowShowing={todoActive} />
    <Main path="/completed" nowShowing={todoCompleted} />
    <Main path="/" nowShowing={showAll} />
  </Router>
);

// Magic! this is telling ReactDOM to render the MyRouter const and put it into the #root element
ReactDOM.render(<MyRouter />, document.getElementById('root') as HTMLElement);
