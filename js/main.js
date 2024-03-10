window.addEventListener("load", () => {
    const form = document.querySelector(".form");
    const input = document.querySelector(".input-task");
    const taskList = document.querySelector(".task-list");
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((task) => {
        addTaskToDOM(task);
    });
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const task = input.value;

        if (!task) {
            alert("Please add a task");
            return;
        }
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        addTaskToDOM(task);
        input.value = "";
    });
    function addTaskToDOM(task) {
        const taskEl = document.createElement("div");
        taskEl.classList.add("tasks");
        const text = document.createElement("input");
        text.type = "text";
        text.setAttribute("readonly", "readonly");
        text.value = task;
        taskEl.appendChild(text);
        const btns = document.createElement("div");
        btns.classList.add("btns");
        const edit = document.createElement("button");
        edit.classList.add("edit");
        edit.textContent = "edit";
        const delate = document.createElement("button");
        delate.classList.add("delete");
        delate.textContent = "delete";
        btns.appendChild(edit);
        btns.appendChild(delate);
        taskEl.appendChild(btns);
        taskList.appendChild(taskEl);
        edit.addEventListener("click", () => {
            if (edit.textContent == "edit") {
                text.removeAttribute("readonly");
                text.focus();
                edit.textContent = "save";
            } else {
                edit.textContent = "edit";
                text.setAttribute("readonly", "readonly");
                const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
                const index = savedTasks.indexOf(task);
                if (index !== -1) {
                    savedTasks[index] = text.value;
                    localStorage.setItem("tasks", JSON.stringify(savedTasks));
                }
            }
        });
        delate.addEventListener("click", () => {
            taskList.removeChild(taskEl);
            const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const index = savedTasks.indexOf(task);
            if (index !== -1) {
                savedTasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(savedTasks));
            }
        });
    }
});