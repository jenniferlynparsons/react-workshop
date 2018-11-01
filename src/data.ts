// imports uuid to create unique keys for items
import uuidv4 from 'uuid/v4';

// import the Todo and todoActive from the interfaces to define those types
import { Todo, todoActive } from './interfaces';

// named const accepts a string for title and is typed as a Todo with attributes of id, status, and the title passed in
export const makeTodo = (title: string): Todo => ({
  id: uuidv4(),
  status: todoActive,
  title,
});

// named const takes the current array of todos and a title, typed as the Todo array
// the spread operator is used to take the existing todos array and add another todo element to it with makeTodo while still preserving the original array
export const addTodo = (todos: Todo[], title: string): Todo[] => [
  ...todos,
  makeTodo(title),
];

// named const takes the current array of todos and the todo that will be removed
// filters through the todos array, finds the match from the todo passed in, and returns the array, minus that todo item
export const deleteTodo = (todos: Todo[], todo: Todo): Todo[] =>
  todos.filter(t => t.id !== todo.id);

// named const takes the current array of todos and the todo that will be updated
// does a map function on the todo list and if the todo id matches the todo passed in, that todo object is updated with the new data
export const updateTodo = (todos: Todo[], todo: Todo): Todo[] =>
  todos.map(t => (t.id === todo.id ? todo : t));

// named const takes the current array of todos typed as Todo[]
// the activeCount is set once by filtering the todos array and returning a count of the items whose status matches the todoActive kind 'Active'
// it then runs the array through a map that destructures each todo and changes the value of completed. completed: activeCount > 0 is setting that value to true or false. if true, then all the items are marked complete, else they're all marked active (false)
export const toggleAll = (todos: Todo[]): Todo[] => {
  const activeCount = todos.filter(t => t.status.kind === todoActive.kind)
    .length;
  return todos.map(t => ({ ...t, completed: activeCount > 0 }));
};

// named const that takes the current array of todos typed as Todo[]
// returns a filtered array of all items that are Active so any Completed items are removed
export const deleteCompleted = (todos: Todo[]): Todo[] =>
  todos.filter(t => t.status.kind === todoActive.kind);
