// Initialize tasks array
const tasksMemory = checkLS().length === 0 ? [] : checkLS();

// dom ref
const addTaskBtn = document.querySelector('#addTaskBtn');
const inputFilter = document.querySelector('#filterTasksInput');
const clearTasksBtn = document.querySelector('#clearTasksBtn');

const taskList = document.querySelector('.task-list');
const form = document.querySelector('form');
const filterSection = document.querySelector('section.task-action');

// Events
form.addEventListener('submit', addTask);
clearTasksBtn.addEventListener('click', clearTasks);
taskList.addEventListener('click', deleteSingleTask);
document.addEventListener('DOMContentLoaded', loadLocalStorage);

////////////////
// Functions-
////////////

function addTask(e) {
  const inputTask = document.querySelector('#taskInput');
  const taskText = inputTask.value;
  e.preventDefault();
  if (!taskText) {
    console.log('enter a task');
    inputTask.focus();
  } else {
    // get color code
    const colorCode = Number(document.querySelector('select').value);
    // colors
    const color = ['secondary', 'danger', 'primary', 'success', 'warning'].find(
      (_, idx) => idx === colorCode
    );

    const date = new Date();

    // update state
    tasksMemory.push({
      taskText,
      date,
      color,
    });

    storeToLS();
    showTasks();
  }
}

function showTasks() {
  taskList.innerHTML = '';

  tasksMemory.forEach((task, idx) => {
    task.index = idx + 1;
    const html = `
      <li class='list-group-item d-flex item-${task.index}'>
         <span class='badge rounded-pill bg-${task.color} me-2'>${task.index}</span>${task.taskText}
        - <span class='date ms-2'></span>
            <a href='#' class='ms-auto'>
        <i class='far fa-trash-alt'></i>
            </a>
      </li>`;
    taskList.insertAdjacentHTML('beforeend', html);
  });
}

// date
function viewDate(date) {
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].find(
    (_, idx) => idx === date.getDay()
  );
  const dat = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear() - 2000;
  // console.log(day, dat, month, year);
  return `${day}: ${dat}/${month}/${year}`;
}

// clear all
function clearTasks() {
  console.log('pulizia');
  tasksMemory.length = 0;
  showTasks();
  localStorage.clear();
}

// clear single
function deleteSingleTask(e) {
  // prevent default on a
  e.preventDefault();

  // delego evento
  if (e.target.classList.contains('fa-trash-alt')) {
    console.log(e.target);
    // console.log(e.target.parentNode);
    // console.log(e.target.parentNode.parentNode);
    // console.log(e.target.parentNode.parentNode.classList);
    // console.log(Array.from(e.target.parentNode.parentNode.classList));

    const idxToRemove = Array.from(e.target.parentNode.parentNode.classList)
      .find((el) => el.includes('item-'))
      .split('-')[1];

    // splice -1 because the index got before starts from 1
    tasksMemory.splice(idxToRemove - 1, 1);
  }
  storeToLS();
  showTasks();
}

////////////////
// LOCAL STORAGE
////////////////
// check LS for key
function checkLS() {
  let storedTasks;
  const tasksInStorage = localStorage.getItem('storedTasks');
  storedTasks = tasksInStorage ? JSON.parse(tasksInStorage) : [];
  console.log(storedTasks);
  return storedTasks;
}

// load
function loadLocalStorage() {
  console.log('DOM LOADED 🔥');
  showTasks();
}

// add
function storeToLS() {
  const tasksToPush = [...tasksMemory];
  localStorage.setItem('storedTasks', JSON.stringify(tasksToPush));
}
