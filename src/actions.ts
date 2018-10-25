import { Data } from './data';
import { Todo } from './interfaces';

interface LoadTodos {
  type: 'LoadTodos'
  payload: Data
};

interface CreateTodo {
  type: 'CreateTodo',
  payload: Todo
};

interface EditTodo {
  type: 'EditTodo',
  payload: Todo
};

interface DeleteTodo {
  type: 'DeleteTodo',
  payload: Todo
};

interface ToggleAll {
  type: 'ToggleAll',
};

interface ClearCompleted {
  type: 'ClearCompleted';
};

interface EnterNewTodo {
  type: 'EnterNewTodo',
  payload: string;
};

export const loadTodosAction = (payload: Data): LoadTodos => (
  { type: 'LoadTodos', payload}
);

export const createTodoAction = (payload: Todo): CreateTodo => (
  { type: 'CreateTodo', payload}
);

export const editTodoAction = (payload: Todo): EditTodo => (
  { type: 'EditTodo', payload}
);

export const deleteTodoAction = (payload: Todo): DeleteTodo => (
  { type: 'DeleteTodo', payload}
);

export const toggleAllAction: ToggleAll = { type: 'ToggleAll' };

export const clearCompletedAction: ClearCompleted = { type: 'ClearCompleted' };

export const enterNewTodoAction = (payload: string): EnterNewTodo => (
  { type: 'EnterNewTodo', payload }
);

export type Action = 
    LoadTodos
  | CreateTodo
  | EditTodo
  | DeleteTodo
  | ToggleAll
  | ClearCompleted
  | EnterNewTodo;

