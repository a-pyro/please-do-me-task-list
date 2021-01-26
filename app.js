console.log('hi there 👊🏻');

// seleziono tutto
const inputTask = document.querySelector('#taskInput');
const addTaskBtn = document.querySelector('#addTaskBtn');
const inputFilter = document.querySelector('#filterTasksInput');
const clearTasksBtn = document.querySelector('#clearTasksBtn');

const taskList = document.querySelector('.task-list');
const form = document.querySelector('form');
const filterSection = document.querySelector('section.task-action');

// carico i listener
loadListeners();

function loadListeners() {
  // dom load per caricare da local storage
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  clearTasksBtn.addEventListener('click', clearTasks);
  inputFilter.addEventListener('keyup', filterTasks);
}

function createAndShowLi(text) {
  // mostro il pezzo sotto
  filterSection.classList.remove('d-none');
  filterSection.classList.add('animate__fadeInRight', 'animate__faster');

  // creo html li
  const task = document.createElement('li');
  task.className = 'list-group-item d-flex justify-content-between';
  task.appendChild(document.createTextNode(text));
  // creo link
  const link = document.createElement('a');
  link.setAttribute('href', '#');

  // setto icona per cancellare
  link.innerHTML = `<i class='far fa-trash-alt'></i>`;
  task.appendChild(link);

  taskList.appendChild(task);

  // attivo tasto cancella
  link.addEventListener('click', removeTask);
}

function addTask(e) {
  const text = inputTask.value;
  if (!text) {
    document.querySelector('#fireModal').click();
  } else {
    // create and show li
    createAndShowLi(text);
    // store in local storage
    storeLocally(text);
  }
  e.preventDefault();
}

// controllo se ho tasks in storage
function checkStorage() {
  let tasks;
  let tasksInStorage = localStorage.getItem('tasks');
  if (tasksInStorage) {
    tasks = JSON.parse(tasksInStorage);
  } else {
    tasks = [];
  }
  return tasks;
}

// carico da LS quando dom carica
function getTasks() {
  // controllo che c'è dentro
  const tasks = checkStorage();

  tasks.forEach((taskInStorage) => {
    createAndShowLi(taskInStorage);
  });
}

// store tasks
function storeLocally(task) {
  // controllo che c'è dentro
  const tasks = checkStorage();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeFromLocalStorage(taskItem) {
  console.log(taskItem);
  // controllo che c'è dentro
  const tasks = checkStorage();

  // giro nell'array e controllo il testo per trovare l'elemento che voglio rimuovere
  tasks.forEach((task, idx) => {
    if (taskItem.textContent === task) {
      tasks.splice(idx, 1);
    }
  });
  // ricarico l'array modificato nel LS
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  // rimuovo l'li
  e.target.parentElement.parentElement.remove();
  // impedisco ad <a> di andare a inizio pagina
  e.preventDefault();
  // remove task from Local storage
  removeFromLocalStorage(e.target.parentElement.parentElement);
}

function clearTasks() {
  /*  const tasks = document.querySelectorAll('li');
  tasks.forEach((task) => task.remove()); */
  // alternativa veloce
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // puslicoa LS
  clearTasksFromLS();
}

function clearTasksFromLS() {
  localStorage.clear();
}

function filterTasks() {
  // prendo tutti i task
  const tasks = document.querySelectorAll('li');

  // testo da filtrare
  const filterText = inputFilter.value.toLowerCase();
  console.log(filterText);

  // uso classe custom per via del d-flex di bootstrap
  tasks.forEach((task) => {
    const taskText = task.textContent.toLowerCase();
    if (taskText.includes(filterText)) {
      task.classList.remove('hide');
    } else {
      task.classList.add('hide');
    }
  });
}
