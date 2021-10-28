let input = document.getElementById("main-input");
let button = document.getElementById("btn-add");
let task = document.getElementById("task-name-id");
let fullListTasks = document.getElementById("tasks");

let arrayTasks = [];
reloadTasks();

function showTasks() {
  let newLi = "";
  arrayTasks.forEach((task, index) => {
    newLi =
      newLi +
      `<li class="task-item ${task.done == true ? "done" : ""}">
        <button class="btn-rocket" onclick="completeTask(${index})">
          <i class="fas fa-rocket"></i>
        </button>
        <p class="task-name ${
          task.done == true ? "done" : ""
        }" id="task-name-id">${task.task}</p>

        <button class="btn-delete" onclick="deleteTask(${index})">
          <i class="fas fa-trash"></i>
        </button>
      </li>`;
  });

  fullListTasks.innerHTML = newLi;

  localStorage.setItem("lista", JSON.stringify(arrayTasks));
}

function addTask() {
  if (input.value) {
    arrayTasks.push({
      task: input.value,
      done: false,
    });
  } else {
    alert("Digite uma tarefa");
  }

  input.value = "";

  showTasks();
}

function deleteTask(index) {
  arrayTasks.splice(index, 1);

  showTasks();
}

function completeTask(index) {
  arrayTasks[index].done = !arrayTasks[index].done;

  showTasks();
}

function reloadTasks() {
  let myTasks = localStorage.getItem("lista");

  if (myTasks) {
    arrayTasks = JSON.parse(myTasks);

    showTasks();
  }
}

function addByEnter(keys) {
  if (keys.key === "Enter") {
    addTask();
  }
}

button.addEventListener("click", addTask);

document.addEventListener("keypress", addByEnter);
