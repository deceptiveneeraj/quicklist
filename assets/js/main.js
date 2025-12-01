const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Here we are saving the tasks into the local storage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

// Get Tasks from Local Storage
function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("todoTasks")) || [];
  saved.forEach((task) => {
    addNewTask(task.text, task.completed);
  });
}

taskInput.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    addNewTask(this.value);
    this.value = "";
  }
});

const addNewTask = (taskText, isCompleted = false) => {
  const listItem = document.createElement("li");

  listItem.innerHTML = `
        <input type="checkbox" class="task-check">
        <span>${taskText}</span>
        <button class="delete-btn">Delete</button>
        `;

  //   listItem.addEventListener("click", function () {
  //     this.classList.toggle("completed");
  //   });

  const checkBox = listItem.querySelector(".task-check");

  // Restore saved completed status
  checkBox.checked = isCompleted;
  if (isCompleted) listItem.classList.add("completed");

  checkBox.addEventListener("click", function () {
    listItem.classList.toggle("completed", this.checked);
    saveTasks();
  });

  //   Delete
  listItem.querySelector(".delete-btn").addEventListener("click", function () {
    listItem.remove();
    saveTasks();
  });
  taskList.appendChild(listItem);
  saveTasks();
};

function Add() {
  addNewTask(taskInput.value);
  taskInput.value = "";
}

loadTasks();
