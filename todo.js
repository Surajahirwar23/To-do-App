let todos = [];
let input = document.getElementById("inputTag");
let todoObj = { text: "", isCompleted: false };

const addTodo = (event) => {
  event.preventDefault();
  let indexInp = input.value;
  if (indexInp.length >= 3) {
    todoObj.text = indexInp;
    todos.push({ ...todoObj, id: Date.now() , isCompleted: false });
    input.value = "";
    localStorage.setItem('todos', JSON.stringify(todos));
  } else {
    alert("Please write something")
    input.value = "";
  }
  displayTodoList();
};

function displayTodoList() {
  let todoContainer = document.querySelector(".todoContainer");
  let numOfTodo = document.querySelector(".numOfTodo");
  let inicialHtml = "";
  todos.map((todo) => {
    inicialHtml += `
    <li class="link-body">
    <div class="inp_text">
    <input type="checkbox" onchange="handleChecked(${todo.id})" ${todo.isCompleted ? 'checked' : ''}> 
    <h1 style="${todo.isCompleted ? 'text-decoration: line-through; opacity: 0.5;'  : ''}" data-id="${todo.id}" >${todo.text}</h1>  </div>
    <div class="buttons">
        <button onclick="editTodo(${todo.id})"><i class="fa-solid fa-pen"></i></button>
        <button onclick="deleteTodo(${todo.id})"><i class="fa-solid fa-trash"></i></button>
    </div>
</li>
    `;
  });
  todoContainer.innerHTML = inicialHtml;
  if(todos.length>0){

    numOfTodo.innerHTML = "Your total todos: "+ todos.length;
}else{numOfTodo.innerHTML = ""}
}

function deleteTodo(id) {
  todos = todos.filter((tood) => tood.id !== id);
  localStorage.setItem("todos", JSON.stringify(todos));
  displayTodoList();
}

function editTodo(id) {
  todos.forEach((todo) => {
    if (todo.id == id) {
      input.value = todo.text;
      deleteTodo(id);
    }
  });
}

function handleChecked(id) {
  todos.forEach((todo) => {
    if (todo.id == id) {
      todo.isCompleted = !todo.isCompleted
      let h1Element = document.querySelector(`[data-id="${id}"]`);
      if (todo.isCompleted) {
        h1Element.style.textDecoration = 'line-through';
        h1Element.style.opacity = '0.5';
      } else {
        h1Element.style.textDecoration = '';
        h1Element.style.opacity = '1';
      }
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

window.onload = function() {
 let savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
    displayTodoList();
  }
};