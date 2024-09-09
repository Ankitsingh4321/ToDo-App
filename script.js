const input = document.getElementById("input");
const todoList = document.getElementById("todo-list")
const add = document.getElementById("addBtn");
const completeAll = document.getElementById("complete")
const clear = document.getElementById("clear")
const todoCount = document.getElementById("todoCount")

add.addEventListener('click', addTodo);
input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

function addTodo(){
    if(input.value === ''){
        alert("You must write something!")
    }
    else{
        let li = document.createElement('li');
        li.innerHTML = input.value;
        todoList.appendChild(li);
        let span = document.createElement('span')
        span.innerHTML = "\u00d7"
        li.appendChild(span)
    }
    input.value = '';
    saveData();
    count()
}

todoList.addEventListener('click', function(e){
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle("checked")
        saveData();
        count()
    }
    else if(e.target.tagName === 'SPAN'){
        e.target.parentElement.remove()
        saveData();
        count()
    }
})

completeAll.addEventListener('click', completeTodos);

function completeTodos() {
    const todos = todoList.children;
    for (let i = 0; i < todos.length; i++) {
        todos[i].classList.add('checked');
    }
    saveData();
    count()
}

clear.addEventListener('click', clearTodos);

function clearTodos(){
    todoList.innerHTML = '';
    saveData()
    count()
}

function count() {
    const todos = todoList.children;
    let incompleteCount = 0;

    for (let i = 0; i < todos.length; i++) {
        if (!todos[i].classList.contains("checked")) {
            incompleteCount++;
        }
    }

    todoCount.textContent = `${incompleteCount} Todos Left`;
}


function saveData(){
    localStorage.setItem("data", todoList.innerHTML);
}

function showTodos(){
    todoList.innerHTML = localStorage.getItem("data")
    count()
}

showTodos();