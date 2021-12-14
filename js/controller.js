class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.onTodoListChanges(this.model.todos);
    this.view.addTodoEvent(this.handleAddTodo);
    this.view.deleteTodoEvent(this.handleDeleteTodo);
    this.view.editTodoEvent(this.handleEditTodo);
    this.view.toggleTodoEvent(this.handleToggleTodo);
    this.model.todoListChangedHandler(this.onTodoListChanges);
  }

  /** @param { todoType } todos */
  onTodoListChanges = (todos) => {
    this.view.showTodos(todos);
  }

  /** @param { string } title */
  handleAddTodo = (title) => {
    this.model.addTodo(title);
  }

  /**
   * @param { number } _id 
   * @param { string } newTitle 
   */
  handleEditTodo = (_id, newTitle) => {
    this.model.editTodo(_id, newTitle);
  }

  /** @param { number } _id */
  handleDeleteTodo = (_id) => {
    this.model.deleteTodo(_id);
  }

  /** @param { number } _id */
  handleToggleTodo = (_id) => {
    this.model.toggleTodo(_id);
  }
}
