import * as React from "react";

// tslint:disable-next-line
const debug = (msg: string) => () => console.log(msg);

class Main extends React.Component<{}, {}> {
  render() {
    return (
      <div className="todomvc-wrapper">
        <section className="todoapp">

          {/* New TODO input */}
          <header className="header">
            <h1>todos</h1>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus={true}
              value={"Go Shopping"}
              onChange={debug("new todo on change")}
              onKeyDown={debug("new todo submit")}
            />
          </header>

          <section className="main">
            <input
              className="toggle-all"
              id="toggle-all"
              type="checkbox"
              checked={false}
              onChange={debug("toggle all")}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            {/* TODO list */}
            <ul className="todo-list">

              { /* single TODO */}
              <li>
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={false}
                    onChange={debug("item 1 change")}
                  />
                  <label onDoubleClick={debug("item 1 doubleclick")}>
                    Pay Visa
                  </label>
                  <button
                    className="destroy"
                    onClick={debug("item 1 destroy")}
                  />
                </div>
                <input
                  className="edit"
                  value="Pay Visa"
                  name="title"
                  onChange={debug("item 1 change")}
                  onBlur={debug("item 1 edit commit")}
                  onKeyDown={debug("item 1 keyDown")}
                />
              </li>
            </ul>
          </section>
        </section>

        {/* footer */}
        <footer className='footer'>
          <span className='todo-count'>1 Todo left</span>
          <ul className='filters'>
            <li>
              <a href='#' className='selected'>All</a>
            </li>
            <li>
              <a href='#' className='selected'>Active</a>
            </li>
            <li>
              <a href='#' className='selected'>Completed</a>
            </li>                        
          </ul>
          <button
            className="clear-completed"
            onClick={debug('clear completed')}>
            Clear completed
          </button>          
        </footer>
      </div>
    );
  }
}

export default Main;
