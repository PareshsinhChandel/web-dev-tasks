const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

// Function to add task
function AddTask() {
    if (inputBox.value === '') {
        alert('You must add your task!!!');
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value; 
        listContainer.appendChild(li);

        let span = document.createElement('span');
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        let editSpan = document.createElement('span');
        editSpan.innerHTML = "\u270E"; // Pencil icon for editing
        li.appendChild(editSpan);

        saveData();
    }
    inputBox.value = '';

    // Event listener for toggling task completion and removing/editing task
    listContainer.addEventListener("click", function (e) {
        if (e.target.tagName === 'LI') {
            e.target.classList.toggle("checked");
        } else if (e.target.innerHTML === "\u00d7") {
            e.target.parentNode.classList.add('fade-out');
            e.target.parentNode.addEventListener('animationend', function() {
                e.target.parentNode.remove();
                saveData();
            });
        } else if (e.target.innerHTML === "\u270E") {
            editTask(e.target.parentNode);
        }
    }, false);
}

// Function to edit task
function editTask(taskItem) {
    let newTask = prompt("Edit your task", taskItem.firstChild.textContent);
    if (newTask !== null && newTask !== "") {
        taskItem.firstChild.textContent = newTask;
        saveData();
    }
}

// here we are storing data at localstorage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to retrieve and display tasks from localStorage
function showTasks() {
    if (localStorage.getItem("data")) {
        listContainer.innerHTML = localStorage.getItem("data");
    }
}

showTasks(); // this function is to show task even after we reload the page
