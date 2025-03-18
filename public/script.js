document.getElementById('taskButton').addEventListener('click', addTask);

function addTask() {
  const taskInput = document.getElementById('taskInput').value;
  if (taskInput) {
    fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: taskInput }),
    })
      .then((res) => res.json())
      .then((task) => {
        alert(`Task added: ${task.title}`);
        fetchTasks();
        document.getElementById('taskInput').value = '';
      })
      .catch((err) => console.error(err));
  }
}

function displayTask(task, index) {
  const taskTable = document.getElementById('taskTable').querySelector('tbody');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${index + 1}</td>
    <td>${task.title}</td>
    <td>${task.completed ? 'Completed' : 'Pending'}</td>
    <td>
      <button onclick="editTask('${task._id}')">✏️</button></td>
      <td><button onclick="deleteTask('${task._id}')">🗑️</button></td>
     <td> <button onclick="toggleStatus('${task._id}', ${task.completed})">
        ${task.completed ? '❌ Mark as Pending' : '✔ Mark as Completed'}
      </button>
    </td>
  `;
  taskTable.appendChild(row);
}

function fetchTasks() {
  fetch('/tasks')
    .then((res) => res.json())
    .then((tasks) => {
      const taskTable = document.getElementById('taskTable').querySelector('tbody');
      taskTable.innerHTML = '';
      tasks.forEach((task, index) => displayTask(task, index));
    })
    .catch((err) => console.error(err));
}

function editTask(id) {
  const newTitle = prompt('Enter new task title:');
  if (newTitle) {
    fetch(`/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle }),
    })
      .then(() => fetchTasks())
      .catch((err) => console.error(err));
  }
}

function deleteTask(id) {
  fetch(`/tasks/${id}`, { method: 'DELETE' })
    .then(() => fetchTasks())
    .catch((err) => console.error(err));
}

function toggleStatus(id, currentStatus) {
  fetch(`/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !currentStatus }),
  })
    .then(() => fetchTasks())
    .catch((err) => console.error(err));
}

document.addEventListener('DOMContentLoaded', fetchTasks);
  
function deleteTask(id) {
    const isConfirmed = confirm('You want to delete this task?');
    
    if (isConfirmed) {
        fetch(`/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            fetchTasks(); // Refresh list after deletion
        })
        .catch(err => console.error(err));
    }
}
