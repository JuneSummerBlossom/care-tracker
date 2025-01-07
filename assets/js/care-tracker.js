// TASK ID COUNTER
var taskIdCounter = 0;
// TASKS CONTAINER
var tasksContainerE1 = document.querySelector("#tasks-container");
// TASK FORM
var taskFormE1 = document.querySelector("#task-form");
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

// TASK FORM HANDLER FUNCTION
var taskFormHandler = function(event) {

  // PREVENT PAGE FROM AUTOMATICALLY RELOADING
  event.preventDefault();

  // GET TASK NAME DATA FROM FORM
  var taskNameInput = document.querySelector("input[name='task-name']").value;

  // CHECK IF INPUTS ARE EMPTY
  if (!taskNameInput) {
    return false;
  }

  // RESET TASK FORM
  taskFormE1.reset();

  // CHECK FOR TASK BEING EDITED
  var isEdit = taskFormE1.hasAttribute("task-id");

  // RUN COMPLETE TASK EDIT FUNCTION IF EDITING
  if (isEdit) {
    var taskId = taskFormE1.getAttribute("task-id");
    completeTaskEdit(taskNameInput, taskId);
  }

  // RUN CREATE TASK FUNCTION IF NOT EDITING
  else {

    // CREATE TASK DATA OBJECT
    var taskDataObj = {
      name: taskNameInput
    }

    // CREATE TASK USING TASK DATA OBJECT
    createTaskE1(taskDataObj);
  }
};

// CREATE TASK BUTTONS FUNCTION
var createTaskButtons = function(taskId) {

  // CREATE BUTTONS CONTAINER
  var buttonsContainerE1 = document.createElement("div");

  // CREATE COMPLETE BUTTON
  var completeButtonE1 = document.createElement("button");
  completeButtonE1.textContent = "Complete";
  completeButtonE1.className = "complete-btn";
  completeButtonE1.setAttribute("task-id", taskId);

  // CREATE EDIT BUTTON
  var editButtonE1 = document.createElement("button");
  editButtonE1.textContent = "Edit";
  editButtonE1.className = "edit-btn";
  editButtonE1.setAttribute("task-id", taskId);

  // ADD BUTTONS TO BUTTONS CONTAINER
  buttonsContainerE1.appendChild(completeButtonE1);
  buttonsContainerE1.appendChild(editButtonE1);

  // RETURN BUTTONS CONTAINER
  return buttonsContainerE1;
};

// TASK BUTTON HANDLER FUNCTION
var taskButtonHandler = function(event) {

  // GET EVENT TARGET FROM EVENT
  var targetE1 = event.target;

  // GET TASK ID FROM EVENT TARGET
  var taskId = targetE1.getAttribute("task-id");

  // FIND OUT WHAT EVENT TARGET WAS AND CALL FUNCTION ACCORDING TO BUTTON TYPE
  if (targetE1.matches(".complete-btn")) {
    completeTask(taskId);
  } else if (targetE1.matches(".edit-btn")) {
    editTask(taskId);
  }
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

// EDIT TASK FUNCTION
var editTask = function(taskId) {

  // FIND TASK WITH MATCHING TASK ID
  var selectedTask = document.querySelector(".task[task-id='" + taskId + "']");

  // GET TASK NAME FROM SELECTED TASK
  var taskName = selectedTask.querySelector("span").textContent;

  // IMPORT TASK DATA INTO TASK FORM
  document.querySelector("input[name='task-name']").value = taskName;
  taskFormE1.setAttribute("task-id", taskId);
}

// COMPLETE TASK EDIT FUNCTION
var completeTaskEdit = function(taskNameInput, taskId) {

  // FIND TASK BEING EDITED
  var selectedTask = document.querySelector(".task[task-id='" + taskId + "']");

  // UPDATE SELECTED TASK WITH EDITED VALUES
  selectedTask.querySelector("span").textContent = taskNameInput;

  // UPDATE TASK DATA ARRAY WITH EDITED VALUES
  for (var i = 0; i < taskDataArray.length; i++) {
    if (taskDataArray[i].id === parseInt(taskId)) {
      taskDataArray[i].name = taskNameInput;
    }
  }

  // REMOVE TASK ID SO ISEDIT WILL BE NULL
  taskFormE1.removeAttribute("task-id");

  // SAVE UPDATED TASK DATA ARRAY
  saveTaskDataArray();
}

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

// RUN TASK FORM HANDLER WHEN A TASK IS SUBMITTED
taskFormE1.addEventListener("submit", taskFormHandler);

// RUN TASK BUTTON HANDLER WHEN A BUTTON IS CLICKED
pageContentE1.addEventListener("click", taskButtonHandler);

// RUN LOAD TASK DATA ARRAY FUNCTION WHEN PROGRAM IS STARTED
loadTaskDataArray();