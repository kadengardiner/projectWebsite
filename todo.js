const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// Load saved todos
let todos = JSON.parse(localStorage.getItem('todos')) || [];
renderTodos();

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    todos.push({ text: text, done: false });
    input.value = '';
    saveAndRender();
  }
});

function renderTodos() {
  list.innerHTML = '';
  todos.forEach((todo, i) => {
    const li = document.createElement('li');

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.done;
    checkbox.addEventListener('change', () => {
      todos[i].done = checkbox.checked;
      saveAndRender();
    });

    // Text
    const span = document.createElement('span');
    span.textContent = todo.text;

    // Delete button
    const del = document.createElement('button');
    del.textContent = 'X';
    del.classList.add('delete-btn');
    del.addEventListener('click', () => {
      todos.splice(i, 1);
      saveAndRender();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  });
}

function saveAndRender() {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}
