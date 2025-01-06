// TASK ID COUNTER
var taskIdCounter = 0;
// TASKS CONTAINER
var tasksContainerE1 = document.querySelector("#tasks-container");
// CREATE TASK FORM
var createTaskFormE1 = document.querySelector("#create-task-form");
// PAGE CONTENT
var pageContentE1 = document.querySelector("#page-content");
// TASK DATA ARRAY FOR PERSISTENCE
var taskDataArray = [];

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

  // ADD ID TO TASK DATA OBJECT
  taskDataObj.id = taskIdCounter;

  // ADD TASK DATA OBJ TO TASK DATA ARRAY
  taskDataArray.push(taskDataObj);
  saveTaskDataArray();

  // INCREASE TASK ID COUNTER
  taskIdCounter++;
};

// CREATE TASK FORM HANDLER FUNCTION
var createTaskFormHandler = function(event) {

  // PREVENT PAGE FROM AUTOMATICALLY RELOADING
  event.preventDefault();

  // GET TASK NAME DATA FROM FORM
  var taskNameInput = document.querySelector("input[name='task-name']").value;

  // CHECK IF INPUTS ARE EMPTY
  if (!taskNameInput) {
    return false;
  }

  // RESET CREATE TASK FORM
  createTaskFormE1.reset();

  // CREATE TASK DATA OBJECT
  var taskDataObj = {
    name: taskNameInput
  }

  // CREATE TASK USING TASK DATA OBJECT
  createTaskE1(taskDataObj);
};

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
};

// TASK BUTTON HANDLER FUNCTION
var taskButtonHandler = function(event) {

  // GET EVENT TARGET FROM EVENT
  var targetE1 = event.target;

  // CHECK IF EVENT TARGET WAS A COMPLETE BUTTON
  var taskId = targetE1.getAttribute("task-id");

  // RUN COMPLETE TASK USING TASK ID
  completeTask(taskId);
};

// COMPLETE TASK FUNCTION
var completeTask = function(taskId) {

  // FIND TASK WITH MATCHING TASK ID
  var selectedTask = document.querySelector(".task[task-id='" + taskId + "']");

  // REMOVE TASK FROM PAGE
  selectedTask.remove();

  // CREATE ARRAY TO HOLD UPDATED TASK DATA ARRAY
  var updatedTaskDataArray = [];

  // ITERATE THROUGH TASK DATA ARRAY
  for (var i = 0; i < taskDataArray.length; i++) {

    // ADD TASK DATA TO UPDATED TASK ARRAY UNLESS THE TASK WAS COMPLETED
    if (taskDataArray[i].id !== parseInt(taskId)) {
      updatedTaskDataArray.push(taskDataArray[i]);
    }
  }

  // ASSIGN UPDATED DATA TO TASK DATA ARRAY AND SAVE
  taskDataArray = updatedTaskDataArray;
  saveTaskDataArray();
};

// SAVE TASK DATA ARRAY FUNCTION
var saveTaskDataArray = function() {
  localStorage.setItem("taskDataArray", JSON.stringify(taskDataArray));
};

// LOAD TASK DATA ARRAY FUNCTION
var loadTaskDataArray = function() {

  // GET TASK DATA ARRAY FORM LOCAL STORAGE
  var savedTaskDataArray = localStorage.getItem("taskDataArray");

  // VERIFY IF ANY DATA IS STORED
  if (!savedTaskDataArray) {

    // NO DATA IS STORED
    return false;
  }

  // CONVERT TASK FROM STRING FORMAT BACK INTO AN ARRAY OF OBJECTS
  savedTaskDataArray = JSON.parse(savedTaskDataArray);

  // ITERATE THROUGH TASK DATA ARRAY AND CREATE EACH TASK
  for (var i = 0; i < savedTaskDataArray.length; i++) {
    createTaskE1(savedTaskDataArray[i]);
  }
};

// RUN CREATE TASK FORM HANDLER WHEN A TASK IS SUBMITTED
createTaskFormE1.addEventListener("submit", createTaskFormHandler);

// RUN TASK BUTTON HANDLER WHEN A BUTTON IS CLICKED
pageContentE1.addEventListener("click", taskButtonHandler);

// RUN LOAD TASK DATA ARRAY FUNCTION WHEN PROGRAM IS STARTED
loadTaskDataArray();