// selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);

todoBtn.addEventListener('click', (event) => {
    // prevent from submitting
    event.preventDefault();
    // create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //  SAVE TO LOCAL STORAGE
    saveLocaTodos(todoInput.value);
    // CHECK MARK BUTTON 
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    // CHECK TRASH BUTTON 
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // APPEND TO LIST
    todoList.appendChild(todoDiv);
    // CLEAR TODO INPUT VALUE
    todoInput.value = "";
});


todoList.addEventListener('click', (e) => {
    // console.log(e.target);
    const item = e.target;
    // DELETE TODO
    if (item.classList[0] === 'trash-btn') {
        const par = item.parentElement;
        par.classList.add('fall');
        removeLocalTodos(par);
        par.addEventListener('transitionend', () => {
            par.remove();
        });
    }
    // CHECK MARK
    if (item.classList[0] === 'complete-btn') {
        const par = item.parentElement;
        par.classList.toggle('completed');
    }
});

filterOption.addEventListener('click', (e) =>{
    const todos = todoList.childNodes;
    todos.forEach(async function(todo){
        try {
            // console.log(todo);
            // console.log(e.target.value);
            switch(e.target.value){
                case "all":
                    todo.style.display = 'flex';
                    break;
                case "completed":
                    if (todo.classList.contains('completed')) {
                        todo.style.display = 'flex';
                    }else {
                        todo.style.display = 'none';
                    }
                    break;
                case "uncompleted":
                    if (!todo.classList.contains('completed')) {
                        todo.style.display = 'flex';
                    }else {
                        todo.style.display = 'none';
                    }
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    });
})

function saveLocaTodos(todo){
    let todos;
    // CHECK IF ANYYTHING EXISTS.
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentedLoaded', () =>{

});
function getTodos() {
    let todos;
    // CHECK IF ANYYTHING EXISTS.
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
    
        // CHECK MARK BUTTON 
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        // CHECK TRASH BUTTON 
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        // APPEND TO LIST
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos (todo) {
    let todos;
    // CHECK IF ANYYTHING EXISTS.
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // console.log(todo.children[0].innerText);
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));    
}
