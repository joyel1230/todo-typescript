import { v4 as uuidV4 } from "uuid";
type Task = {
  id: string;
  title: string;
  completed: boolean;
  date: Date;
};

console.log(uuidV4());

const list = document.querySelector<HTMLUListElement>("#listId");
const form = document.querySelector<HTMLFormElement>("#formId");
const input = document.querySelector<HTMLInputElement>("#inputId");
const clear = document.querySelector<HTMLInputElement>("#clearId");
const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);
clear?.addEventListener("click", () => {
  localStorage.clear();
  if (list === null) return;
  list.innerHTML = "";
});
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    input?.value === "" ||
    input?.value === null ||
    input?.value === undefined
  )
    return;
  const newTask: Task = {
    id: uuidV4(),
    title: input?.value,
    completed: false,
    date: new Date(),
  };
  tasks.push(newTask);
  saveTask();
  addListItem(newTask);
});

function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const input = document.createElement("input");
  input.type = "checkbox";
  input.addEventListener("change", () => {
    task.completed = input.checked;
    console.log(tasks);
    saveTask();
  });
  input.checked = task.completed;
  label.append(input, task.title);
  item.append(label);
  list?.append(item);
}

function saveTask() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}
