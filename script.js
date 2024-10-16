// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        renderTask(task);
    });
}

// Function to render a task on the list
function renderTask(task) {
    const taskList = document.getElementById('taskList');

    const li = document.createElement('li');
    li.textContent = task.text;
    li.className = task.completed ? 'completed' : '';

    const completeButton = document.createElement('button');
    completeButton.textContent = task.completed ? 'Undo' : 'Complete';
    completeButton.onclick = () => toggleComplete(task, li);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit';
    editButton.onclick = () => editTask(task, li);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    deleteButton.onclick = () => deleteTask(task, li);

    li.appendChild(completeButton);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
}

// Function to add a task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text === '') {
        alert('Please enter a task');
        return;
    }

    const task = { text, completed: false };
    renderTask(task);
    saveTask(task);

    taskInput.value = '';
}

// Function to save a task to local storage
function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to toggle task completion
function toggleComplete(task, li) {
    task.completed = !task.completed;
    li.classList.toggle('completed');
    updateTasks();
}

// Function to edit a task
function editTask(task, li) {
    const newText = prompt('Edit Task', task.text);
    if (newText) {
        task.text = newText;
        li.firstChild.textContent = newText;
        updateTasks();
    }
}

// Function to delete a task
function deleteTask(task, li) {
    li.remove();
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(t => t.text !== task.text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to update tasks in local storage
function updateTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);
