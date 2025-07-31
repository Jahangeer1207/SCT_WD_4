const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskDateTime = document.getElementById("taskDateTime");
const categorySelect = document.getElementById("categorySelect");
const themeToggle = document.getElementById("themeToggle");

const taskLists = {
  Work: document.getElementById("workTasks"),
  Personal: document.getElementById("personalTasks"),
  Study: document.getElementById("studyTasks"),
};

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  const dateTime = taskDateTime.value;
  const category = categorySelect.value;

  if (!taskText) return alert("Enter a task!");

  const li = document.createElement("li");
  li.draggable = true;
  li.innerHTML = `
    <span>${taskText} ${dateTime ? `<small>(${dateTime})</small>` : ""}</span>
    <div>
      <button class="edit">✏️</button>
      <button class="done">✅</button>
      <button class="delete">🗑️</button>
    </div>
  `;

  // Events
  li.querySelector(".done").addEventListener("click", () =>
    li.classList.toggle("completed")
  );
  li.querySelector(".delete").addEventListener("click", () => li.remove());
  li.querySelector(".edit").addEventListener("click", () => {
    taskInput.value = taskText;
    li.remove();
  });

  enableDrag(li);
  taskLists[category].appendChild(li);
  taskInput.value = "";
  taskDateTime.value = "";
}

// Drag & Drop
function enableDrag(item) {
  item.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", item.outerHTML);
    item.remove();
  });
}

document.querySelectorAll(".category").forEach((cat) => {
  cat.addEventListener("dragover", (e) => e.preventDefault());
  cat.addEventListener("drop", (e) => {
    e.preventDefault();
    const html = e.dataTransfer.getData("text/plain");
    cat.querySelector(".task-list").insertAdjacentHTML("beforeend", html);
    const newTask = cat.querySelector(".task-list li:last-child");
    enableDrag(newTask);
  });
});

// Dark/Light Mode
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});
