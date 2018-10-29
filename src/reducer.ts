import { List } from 'immutable';
import { combineReducers } from 'redux';
import { Action, NewTodoAction, TodosAction, UpdateTodoAction } from './actions';
import { Data, save } from './data';
import { todoActive, todoComplete } from './interfaces';
import { Todo } from './todo'; 


const todosReducer = (todos: List<Todo> = List<Todo>(), action: TodosAction): List<Todo> => {
  switch(action.type) {
    case 'LoadTodos': 
      return action.payload;

    case 'CreateTodo': 
      return save(todos.push(action.payload));

    case 'EditTodo': 
    case 'FinishEditing':
      return save(todos.map(t => {
        return t.id === action.payload.id ? action.payload : t
      }));

    case 'DeleteTodo': 
      return save(todos.filter(t => t.id !== action.payload.id));

    case 'ToggleAll': 
      const activeCount = todos.filter(t => t.status === todoActive).count();
      const status = activeCount > 0 ? todoComplete : todoActive;  
      return save(todos.map(t => {        
        return t.merge({ status })
      }));

    case 'ClearCompleted': 
      return save(todos.filter(t => t.status.type === todoActive.type));  

    default: return todos;      
  }
}

const newTodoReducer = (title: string = '', action: NewTodoAction): string => {
  switch(action.type) {
    case 'EnterNewTodo': 
      return action.payload;
    case 'ClearNewTodo': 
      return '';
    default: return title;
  }
}

const editingReducer = (editing: Todo | null = null, action: UpdateTodoAction): Todo | null => {
  switch(action.type) {
    case 'StartEditing': return action.payload;
    case 'UpdateEditing': return editing ? editing.merge({ title: action.payload }) : null;
    case 'FinishEditing': return null;
    case 'CancelEditing': return null;
    default: return editing;
  } 
}
 
export const reducer = combineReducers<Data, Action>({
  newTodo: newTodoReducer,
  nowEditing: editingReducer,
  todos: todosReducer
});
