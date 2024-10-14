const tasks = loadTasks();
let isRunning = true;
let taskId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
}

while (isRunning) {
    console.log(`Task Manager Menu:
    1. Add Task
    2. View Tasks
    3. Toggle Task Completion
    4. Edit Task
    5. Delete Task
    6. Search For Tasks By Name
    7. Exit`);
    let menuInput = Number(prompt("Enter Your Choice (1-7)"));

    switch (menuInput) {
        case 1:
            let newTitle = prompt("Enter The Task");
            tasks.push({ id: taskId++, title: newTitle, completed: false });
            console.log("Task Added");
            saveTasks();
            break;

        case 2:
            if (tasks.length == 0) {
                console.log("No Tasks Available");
            } else {
                tasks.forEach((task) => {
                    console.log(
                        `ID: ${task.id} | ${task.title} | ${task.completed ? "Completed" : "Incomplete"
                        }`
                    );
                });
            }
            break;

        case 3:
            let toggleId = Number(prompt("Enter the task ID to toggle completion"));
            let toggleTask = tasks.find((task) => task.id === toggleId);
            if (toggleTask) {
                toggleTask.completed = !toggleTask.completed;
                console.log("Task completion toggled!");
                saveTasks();
            } else {
                console.log("Invalid task ID");
            }
            break;

        case 4:
            let editId = Number(prompt("Enter the task ID to edit"));
            let editTask = tasks.find((task) => task.id === editId);
            if (editTask) {
                editTask.title = prompt("Enter the new task");
                console.log("Task edited");
                saveTasks();
            } else {
                console.log("Invalid task ID");
            }
            break;

        case 5:
            let deleteId = Number(prompt("Enter the task ID to delete"));
            let deleteIndex = tasks.findIndex((task) => task.id === deleteId);
            if (deleteIndex !== -1) {
                tasks.splice(deleteIndex, 1);
                console.log("Task deleted");
                saveTasks();
            } else {
                console.log("Invalid task ID");
            }
            break;

        case 6:
            let search = prompt("Enter the task name to search for:").toLowerCase();
            let foundTasks = tasks.filter((task) =>
                task.title.toLowerCase().includes(search)
            );

            if (foundTasks.length > 0) {
                foundTasks.forEach((task) => {
                    console.log(
                        `ID: ${task.id} | ${task.title} | ${task.completed ? "Completed" : "Incomplete"
                        }`
                    );
                });
            } else {
                console.log("No tasks found with that name.");
            }
            break;

        case 7:
            isRunning = false;
            console.log("Exiting Task Manager.");
            break;

        default:
            console.log("Invalid choice, please enter a number between 1 and 7.");
            break;
    }
}
