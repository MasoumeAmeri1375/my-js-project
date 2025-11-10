const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const statuses = ['todo', 'in-progress', 'done'];
  statuses.forEach(status => {
    const list = document.getElementById(status);
    list.innerHTML = '';
    tasks.filter(t => t.status === status).forEach((t, index) => {
      const taskDiv = document.createElement('div');
      taskDiv.classList.add('task');
      taskDiv.setAttribute('draggable', true);
      taskDiv.setAttribute('data-index', index);
      taskDiv.innerHTML = `
        <span>${t.text}</span>
        <button onclick="deleteTask(${index})"><i class="fas fa-trash"></i></button>
      `;
      list.appendChild(taskDiv);

      taskDiv.addEventListener('dragstart', dragStart);
      taskDiv.addEventListener('dragend', dragEnd);
    });
  });
}

// اضافه کردن تسک جدید
taskForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const text = taskInput.value.trim();
  if(text !== '') {
    tasks.push({ text, status: 'todo' });
    saveTasks();
    renderTasks();
    taskInput.value = '';
  }
});

// حذف تسک
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Drag & Drop
let draggedTask = null;

function dragStart(e) {
  draggedTask = e.target;
}

function dragEnd(e) {
  draggedTask = null;
}

const columns = document.querySelectorAll('.task-list');
columns.forEach(col => {
  col.addEventListener('dragover', e => e.preventDefault());
  col.addEventListener('drop', e => {
    const status = col.parentElement.getAttribute('data-status');
    const index = draggedTask.getAttribute('data-index');
    tasks[index].status = status;
    saveTasks();
    renderTasks();
  });
});

// بارگذاری اولیه
renderTasks();
