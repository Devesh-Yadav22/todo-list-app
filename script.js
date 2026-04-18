let tasks = JSON.parse(sessionStorage.getItem("tasks")) || [];

window.onload = function () {
    renderTasks();
};

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let prioritySelect = document.getElementById("priority");
    let dueDateInput = document.getElementById("dueDate");

    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let task = {
        text: taskText,
        priority: prioritySelect.value,
        date: dueDateInput.value
    };

    tasks.push(task);
    saveTasks();
    renderTasks();

    taskInput.value = "";
    dueDateInput.value = "";
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function editTask(index) {
    let task = tasks[index];

    let newText = prompt("Edit Task Name:", task.text);
    let newPriority = prompt("Edit Priority (low/medium/high):", task.priority);
    let newDate = prompt("Edit Due Date (YYYY-MM-DD):", task.date);

    if (newText !== null && newText.trim() !== "") task.text = newText;
    if (newPriority !== null) task.priority = newPriority.toLowerCase();
    if (newDate !== null) task.date = newDate;

    saveTasks();
    renderTasks();
}

function saveTasks() {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    let taskList = document.getElementById("taskList");
    if (!taskList) return;
    
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.classList.add(task.priority);

        li.innerHTML = `
            <div class="task-info">
                <div class="task-title"><strong>${task.text}</strong></div>
                <div class="meta">
                    🚨 Priority: ${task.priority.toUpperCase()} <br>
                    📅 Due: ${task.date || "No date set"}
                </div>
            </div>
            <div class="actions">
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}