class View {
  constructor() {
    this.app = document.getElementById('root');
    this.todoList = document.getElementById('todoList');
    this.input = document.getElementById('add_todo_input');
    this.form = document.getElementById('form');

    this._draft = '';

    this.editListener();
  }

  get _todoText() {
    return this.input.value;
  }

  _clearInput() {
    this.input.value = '';
  }

  /**
   * 
   * @param { string } tagName 
   * @param { string } className 
   * 
   * @returns new html elem 
   */
  createElem(tagName, className) {
    const el = document.createElement(tagName);
    if (className) el.classList.add(className);

    return el;
  }

  /**
   * @param { string } selector 
   * 
   * @returns html elem
   */
  getElem(selector) {
    const el = document.querySelector(selector);

    return el;
  }

  /** @param { todoType } todos */
  showTodos(todos) {
    // clear list
    this.todoList.innerHTML = '';

    if (todos.length === 0) {
      const p = this.createElem('p');
      p.textContent = 'No tasks(';
      this.todoList.append(p);

      return;
    }

    for (let i = 0; i < todos.length; ++i) {
      const todo = todos[i];

      const li = this.createElem('li', 'todoList__item');
      li.id = todo.id;

      const checkbox = this.createElem('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.isComplete;

      const span = this.createElem('span', 'editable');
      span.contentEditable = true;

      if (todo.isComplete) {
        const s = this.createElem('s');
        s.textContent = todo.title;
        span.append(s);
      } else {
        span.textContent = todo.title;
      }

      const deleteBtn = this.createElem('button', 'delete');
      deleteBtn.textContent = 'Delete';
      li.append(checkbox, span, deleteBtn);

      this.todoList.append(li);
    }
  }

  /** @param { (string) => void } handler */
  addTodoEvent(handler) {
    this.form.addEventListener('submit', e => {
      e.preventDefault();

      if (this._todoText !== '') {
        handler(this._todoText);
        this._clearInput();
      }
    });
  }

  /** @param { (number) => void } handler */
  deleteTodoEvent(handler) {
    this.todoList.addEventListener('click', e => {
      if (e.target.className === 'delete') {
        const _id = parseInt(e.target.parentElement.id);

        handler(_id);
      }
    });
  }

  /** @param { (number, string) => void } handler */
  editTodoEvent(handler) {
    this.todoList.addEventListener('focusout', e => {
      if (this._draft) {
        const _id = parseInt(e.target.parentElement.id);

        handler(_id, this._draft);
        this._draft = '';
      }
    })
  }

  /** @param { (number) => void } handler */
  toggleTodoEvent(handler) {
    this.todoList.addEventListener('change', e => {
      if (e.target.type === 'checkbox') {
        const _id = parseInt(e.target.parentElement.id);

        handler(_id);
      }
    });
  }

  editListener() {
    this.todoList.addEventListener('input', e => {
      if (e.target.className === 'editable') {
        this._draft = e.target.innerText;
      }
    });
  }
}
