
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const pending = document.getElementById("pending-list");
const completed = document.getElementById("completed-list");
const pendingCount = document.getElementById("pending-count");
const completedCount = document.getElementById("completed-count");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks
function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task
form.addEventListener("submit", e => {
    e.preventDefault();

    if (!input.value.trim()) return;

    tasks.push({
        id: Date.now(),
        text: input.value.trim(),
        done: false,
        date: new Date().toLocaleString()
    });

    input.value = "";
    save();
    display();
});

// Display tasks
function display() {
    pending.innerHTML = "";
    completed.innerHTML = "";

    let p = tasks.filter(t => !t.done);
    let c = tasks.filter(t => t.done);

    pendingCount.textContent = p.length + " pending";
    completedCount.textContent = c.length + " completed";

    p.forEach(t => showTask(t, pending));
    c.forEach(t => showTask(t, completed));

    if (!p.length) pending.innerHTML =
        "<li class='empty-message'>No pending tasks!</li>";

    if (!c.length) completed.innerHTML =
        "<li class='empty-message'>No completed tasks yet!</li>";
}

// Create task
function showTask(task, list) {
    let li = document.createElement("li");
    li.className = "task-item";

    let span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;

    let date = document.createElement("small");
    date.className = "task-date";
    date.textContent = "Added: " + task.date;

    span.appendChild(date);

    if (task.done) span.classList.add("completed");

    // Complete button
    let toggle = document.createElement("button");
    toggle.textContent = task.done ? "Undo" : "Complete";
    toggle.className = "complete-btn";

    toggle.onclick = () => {
        task.done = !task.done;
        save();
        display();
    };

    // Edit button
    let edit = document.createElement("button");
    edit.textContent = "Edit";
    edit.className = "edit-btn";

    edit.onclick = () => {
        let text = prompt("Edit task:", task.text);

        if (text && text.trim()) {
            task.text = text.trim();
            save();
            display();
        }
    };

    // Delete button
    let del = document.createElement("button");
    del.textContent = "Delete";
    del.className = "delete-btn";

    del.onclick = () => {
        if (confirm("Delete this task?")) {
            tasks = tasks.filter(t => t.id !== task.id);
            save();
            display();
        }
    };

    li.append(span, toggle, edit, del);
    list.appendChild(li);
}

// Show saved tasks
display();
