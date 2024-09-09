// Get references to DOM elements
const input = document.getElementById("input");          // Input field for adding todos
const todoList = document.getElementById("todo-list");   // Ul where todos will be added
const add = document.getElementById("addBtn");           // Add button to add todo to the list
const completeAll = document.getElementById("complete"); // Button to mark all todos as complete
const clear = document.getElementById("clear");          // Button to clear all todos
const todoCount = document.getElementById("todoCount");  // Element to display the number of remaining tasks

// Event listeners
add.addEventListener('click', addTodo);  // Adds a new todo when the 'Add' button is clicked
input.addEventListener('keypress', function (e) {        // Adds a new todo when the 'Enter' key is pressed
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Function to add a todo to the list
function addTodo() {
    if (input.value === '') {                              // Check if the input is empty
        alert("You must write something!")               // Alert user to input something if field is empty
    }
    else {
        let li = document.createElement('li');           // Create a new <li> element for the todo
        li.innerHTML = input.value;                      // Set the todo text to the input value
        todoList.appendChild(li);                        // Append the new todo <li> to the todo list

        let span = document.createElement('span')        // Create a <span> for the delete button
        span.innerHTML = "\u00d7";                       // Set the <span> content to the '×' symbol (delete button)
        li.appendChild(span);                            // Append the delete <span> to the todo <li>
    }

    input.value = '';                                    // Clear the input field after adding the todo
    saveData();                                          // Save the current state of todos to localStorage
    count();                                             // Update the remaining tasks count
}

// Event listener to mark todos as complete or delete them
todoList.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {                       // If the user clicks on a todo item
        e.target.classList.toggle("checked");            // Toggle the 'checked' class to mark/unmark as completed
        saveData();                                      // Save the updated state to localStorage
        count();                                         // Update the remaining tasks count
    }
    else if (e.target.tagName === 'SPAN') {                // If the user clicks the delete (×) button
        e.target.parentElement.remove();                 // Remove the corresponding todo item
        saveData();                                      // Save the updated state to localStorage
        count();                                         // Update the remaining tasks count
    }
})

// Event listener for the "Complete All" button
completeAll.addEventListener('click', completeTodos);

// Function to mark all todos as completed
function completeTodos() {
    const todos = todoList.children;                     // Get all todo list items
    for (let i = 0; i < todos.length; i++) {
        todos[i].classList.add('checked');               // Add the 'checked' class to all list items
    }
    saveData();                                          // Save the updated state to localStorage
    count();                                             // Update the remaining tasks count
}

// Event listener for the "Clear All" button
clear.addEventListener('click', clearTodos);

// Function to clear all todos from the list
function clearTodos() {
    todoList.innerHTML = '';                             // Clear the inner HTML of the todo list (removing all items)
    saveData();                                          // Save the empty state to localStorage
    count();                                             // Update the remaining tasks count
}

// Function to count and display the number of remaining (incomplete) tasks
function count() {
    const todos = todoList.children;                     // Get all todo list items
    let incompleteCount = 0;                             // Initialize a counter for incomplete tasks

    for (let i = 0; i < todos.length; i++) {
        if (!todos[i].classList.contains("checked")) {   // Count todos that are not marked as completed
            incompleteCount++;
        }
    }

    todoCount.textContent = `${incompleteCount} Tasks Left`;  // Update the task count display
}

// Function to save the current todo list to localStorage
function saveData() {
    localStorage.setItem("data", todoList.innerHTML);     // Store the HTML of the todo list in localStorage
}

// Function to load and display the saved todos from localStorage
function showTodos() {
    todoList.innerHTML = localStorage.getItem("data");    // Get and set the saved todo list from localStorage
    count();                                             // Update the remaining tasks count
}

// Load the todos when the page is loaded
showTodos();
