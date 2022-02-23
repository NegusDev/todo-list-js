// selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


// Event Listeners

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

filterOption.addEventListener('click', (e) => {
    const todos = todoList.childNodes;
    todos.forEach((element) => {
        // console.log(element);
        switch(e.target.value){
            case "all":
                element.style.display = "flex";
                break;
            case "completed":
                if (element.classList.includes("completed")) {
                    element.style.display = "flex";
                }else {
                    element.style.display = "none";
                }
        }
    });
})