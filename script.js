const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');


function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}


function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function displayTask(task) {
    const li = document.createElement('li');
    li.textContent = task.text;


    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Удалить';
    deleteBtn.onclick = () => removeTask(task.id);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}


function loadTasks() {
    taskList.innerHTML = ''; 
    const tasks = getTasks();
    tasks.forEach(displayTask);
}


function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const tasks = getTasks();
        const newTask = {
            id: Date.now(), 
            text: taskText
        };
        tasks.push(newTask);
        saveTasks(tasks);
        displayTask(newTask); 
        taskInput.value = ''; 
    }
}


function removeTask(taskId) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== taskId); 
    saveTasks(tasks);
    loadTasks(); 
}


addTaskBtn.onclick = addTask;

taskInput.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        addTask()
    }
})
loadTasks(); 