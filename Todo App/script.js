const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const clearBtn = document.getElementById("clear-all");
const themeToggle = document.getElementById("theme-toggle");
const pendingCount = document.getElementById("pending-count");
const completedCount = document.getElementById("completed-count");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let darkMode = localStorage.getItem("darkMode") === "true";

function saveData() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = "";
  let pending = 0, completed = 0;

  todos.forEach((todo, i) => {
    const li = document.createElement("li");
    if (todo.completed) li.classList.add("completed");

    li.innerHTML = `
      <span onclick="toggleComplete(${i})">${todo.text}</span>
      <div>
        <button class="edit-btn" onclick="editTodo(${i})">✏️</button>
        <button class="delete-btn" onclick="deleteTodo(${i})">🗑️</button>
      </div>
    `;

    list.appendChild(li);
    todo.completed ? completed++ : pending++;
  });

  pendingCount.textContent = `Pending: ${pending}`;
  completedCount.textContent = `Completed: ${completed}`;
  saveData();
}

function addTodo(text) {
  todos.push({ text, completed: false });
  renderTodos();
}

function toggleComplete(i) {
  todos[i].completed = !todos[i].completed;
  renderTodos();
}

function editTodo(i) {
  const newText = prompt("Edit your task:", todos[i].text);
  if (newText && newText.trim() !== "") {
    todos[i].text = newText.trim();
    renderTodos();
  }
}

function deleteTodo(i) {
  todos.splice(i, 1);
  renderTodos();
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTodo(text);
  input.value = "";
});

clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all tasks?")) {
    todos = [];
    renderTodos();
  }
});

themeToggle.addEventListener("click", () => {
  darkMode = !darkMode;
  document.body.classList.toggle("dark", darkMode);
  localStorage.setItem("darkMode", darkMode);
  themeToggle.textContent = darkMode ? "☀️" : "🌙";
});

// Initial render
document.body.classList.toggle("dark", darkMode);
themeToggle.textContent = darkMode ? "☀️" : "🌙";
renderTodos();
