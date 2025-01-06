// TASK ID COUNTER
var taskIdCounter = 0;
// TASKS CONTAINER
var tasksContainerE1 = document.querySelector("#tasks-container");
// NEW TASK FORM
var newTaskFormE1 = document.querySelector("#new-task-form");
// PAGE CONTENT
var pageContentE1 = document.querySelector("#page-content");

// CREATE TASK FUNCTION
var createTaskE1 = function(taskDataObj) {

  // CREATE TASK OBJECT
  var taskE1 = document.createElement("div");
  taskE1.classList = "task";

  // ASSIGN CUSTOM ATTRIBUTE TASK ID TO TASK OBJECT
  taskE1.setAttribute("task-id", taskIdCounter);

  // ASSIGN NAME FOR TASK OBJECT
  var taskNameE1 = document.createElement("span");
  taskNameE1.textContent = taskDataObj.name;

  // ADD NAME TO TASK OBJECT
  taskE1.appendChild(taskNameE1);

  // CREATE BUTTONS CONTAINER WITH BUTTONS FOR TASK OBJECT
  var taskButtonsE1 = createTaskButtons(taskIdCounter);

  // ADD BUTTONS CONTAINER TO TASK OBJECT
  taskE1.appendChild(taskButtonsE1);

  // ADD TASK OBJECT TO TASKS CONTAINER
  tasksContainerE1.appendChild(taskE1);

  // INCREASE TASK ID COUNTER
  taskIdCounter++;
}

// NEW TASK FORM HANDLER FUNCTION
var newTaskFormHandler = function(event) {

  // PREVENT PAGE FROM AUTOMATICALLY RELOADING
  event.preventDefault();

  // GET TASK NAME DATA FROM FORM
  var taskNameInput = document.querySelector("input[name='task-name']").value;

  // CREATE TASK DATA OBJECT
  var taskDataObj = {
    name: taskNameInput
  }

  // CREATE TASK USING TASK DATA OBJECT
  createTaskE1(taskDataObj);
}

// CREATE TASK BUTTONS FUNCTION
var createTaskButtons = function(taskId) {

  // CREATE BUTTONS CONTAINER
  var buttonsContainerE1 = document.createElement("div");

  // CREATE COMPLETE BUTTON
  var completeButtonE1 = document.createElement("button");
  completeButtonE1.textContent = "Complete";
  completeButtonE1.setAttribute("task-id", taskId);

  // ADD COMPLETE BUTTON TO BUTTONS CONTAINER
  buttonsContainerE1.appendChild(completeButtonE1);

  // RETURN BUTTONS CONTAINER
  return buttonsContainerE1;
}

// TASK BUTTON HANDLER FUNCTION
var taskButtonHandler = function(event) {

  // GET EVENT TARGET FROM EVENT
  var targetE1 = event.target;

  // CHECK IF EVENT TARGET WAS A COMPLETE BUTTON
  var taskId = targetE1.getAttribute("task-id");

  // RUN COMPLETE TASK USING TASK ID
  completeTask(taskId);
}

// COMPLETE TASK FUNCTION
var completeTask = function(taskId) {

  // FIND TASK WITH MATCHING TASK ID
  var taskSelected = document.querySelector(".task[task-id='" + taskId + "']");

  // REMOVE TASK FROM PAGE
  taskSelected.remove();
}

// RUN NEW TASK FORM HANDLER WHEN A TASK IS SUBMITTED
newTaskFormE1.addEventListener("submit", newTaskFormHandler);

// RUN TASK BUTTON HANDLER WHEN A BUTTON IS CLICKED
pageContentE1.addEventListener("click", taskButtonHandler);