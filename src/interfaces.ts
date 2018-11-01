// the interface for Todo that sets the expected types on the data it can contain
export interface Todo {
  id: string;
  status: Status;
  title: string;
}

// https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases

// sets the const and its value
export const todoActive = { kind: 'Active' };
// sets the type alias for todoActive to Active
export type Active = typeof todoActive;

// sets the const and its value
export const todoCompleted = { kind: 'Completed' };
// sets the type alias for todoCompleted to Completed
export type Completed = typeof todoCompleted;

// sets the type alias of Completed or Active to Status so when we set the type to Status, we're actually getting either Completed or Active which in turns means we're getting either kind: 'Completed' or kind:'Active'
export type Status = Completed | Active;

// the const flipStatus takes an argument of status of type Status (which is Completed | Active), checks the kind of status it is and sets it to its opposite and returns the new status
export const flipStatus = (status: Status): Status => {
  switch (status.kind) {
    case 'Completed':
      return todoActive;
    case 'Active':
      return todoCompleted;
  }
  return status;
};

// sets the const and its value
export const showAll = { kind: 'ShowAll' };
// sets the type alias for showAll to ShowAll
export type ShowAll = typeof showAll;

// sets the type alias for Status | ShowAll to NowShowing
export type NowShowing = Status | ShowAll;
