// Initialize tasks array
const tasksMemory = [];

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

    showTasks();
  }
}

function showTasks() {
  taskList.innerHTML = '';

  tasksMemory.forEach((task, idx) => {
    task.index = idx;
    const html = `
      <li class='list-group-item d-flex'>
         <span class='badge rounded-pill bg-${task.color} me-2'>${idx}</span>${
      task.taskText
    }
        - <span class='date ms-2'>${viewDate(task.date)}</span>
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
}
