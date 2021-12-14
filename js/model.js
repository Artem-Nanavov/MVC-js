/**
 * To-Do type
 * 
 * id: @number
 * title: @string
 * isComplete: @boolean
 */

class Model {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
  }

  /** @param { todoType } todos */
  updateState(todos) {
    this.onTodoListChanged(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  /** @param { string } title */
  addTodo(title) {
    const newTodo = {
      id: this.todos.length + 1,
      title,
      isComplete: false,
    };

    this.todos.push(newTodo);
    this.updateState(this.todos);
  }

  /** 
   * @param { number } id
   * @param { string } newTitle
   */
  editTodo(_id, newTitle) {
    this.todos = this.todos.map(t => t.id === _id ? { ...t, title: newTitle } : t);

    this.updateState(this.todos);
  }

  /** @param { number } _id */
  deleteTodo(_id) {
    this.todos = this.todos.filter(({ id }) => id !== _id);

    this.onTodoListChanged(this.todos);
    this.updateState(this.todos);
  }

  /** @param { number } _id */
  toggleTodo(_id) {
    this.todos = this.todos.map(t => t.id === _id ? { ...t, isComplete: !t.isComplete } : t);

    this.updateState(this.todos);
  }

  /** @param { function } cb */
  todoListChangedHandler(cb) {
    this.onTodoListChanged = cb;
  }
}
