document.getElementById('task-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const taskInput = document.getElementById('task-input');
    const task = { title: taskInput.value };

    try {
        const response = await fetch('http://localhost:5000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        const newTask = await response.json();
        addTaskToDOM(newTask);
        taskInput.value = '';
    } catch (error) {
        console.error('Error adding task:', error);
    }
});

async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:5000/api/tasks');
        const tasks = await response.json();
        tasks.forEach(addTaskToDOM);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

function addTaskToDOM(task) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    li.innerHTML = `${task.title} <button onclick="deleteTask(${task.id})">Delete</button>`;
    taskList.appendChild(li);
}

async function deleteTask(id) {
    try {
        await fetch(`http://localhost:5000/api/tasks/${id}`, {
            method: 'DELETE'
        });
        document.getElementById('task-list').innerHTML = '';
        fetchTasks();
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

fetchTasks();

