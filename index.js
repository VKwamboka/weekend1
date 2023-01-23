let table = document.querySelector(".table");
let submit = document.querySelector(".submit");
let form = document.querySelector(".form");
let cards = document.querySelector(".list");
let notodos = document.querySelector(".notodos");
let clearbut = document.querySelector(".clearbut");
let modal = document.querySelector(".modal");
let toggle = document.querySelector(".toggle");
let completed_tasks = document.querySelector("#completed_tasks");
let incomplete_tasks = document.querySelector("#incomplete_tasks");
let completed = document.querySelector(".completed");
let todoArr = [];
let todo_id;
let date_2 = new Date();
function todoID() {
  return Math.floor(Math.random() * 2000000);
}

form.addEventListener("submit", (e) => {
  // e.stopImmediatePropagation()
  e.preventDefault();
  let title = document.querySelector("#todo").value;
  let des = document.querySelector("#des").value;
  let date = document.querySelector("#date").value;

  const todo = {
    id: todoID(),
    title,
    des,
    date,
    isComplete: false,
  };
  todoArr.push(todo);
  displayCards();
  form.reset();
});

// displaying cards
function displayCards() {
  if (todoArr.length > 0) {
    notodos.style.display = "none";
    clearbut.style.display = "block";
    cards.style.display = "block";
    toggle.style.display = "block";
    cards.innerHTML = "";

    todoArr.forEach((todo) => {
      // Construct card content
      let contentCard = `         
                <div class="card-body" style="border: 2px solid purple; margin: 20px; width:25%">                
                  <h1 id="todoTitle">TItle: ${todo.title}</h1>
                  <p id="todoDes"><b>Description:</b> ${todo.des}</p>
                  <p id="todoDate"> <b>Date:</b> ${todo.date}</p>
                  <button class="delete" id =${todo.id}>Delete</button> 
                  <button class="update" onclick ="update(${todo.id})">Update</button>                  
                  <button class="done" onclick = "complete(${todo.id})">done</button>                  

                </div>       
            `;

      // Append newyly created card element to the container
      cards.innerHTML += contentCard;

      // delete a todo
      let current_todos = document.querySelectorAll(".delete");
      for (let i = 0; i < current_todos.length; i++) {
        current_todos[i].onclick = function () {
          this.parentNode.remove();
        };
      }
    });

    // if no todos
  } else {
    cards.style.display = "none";
    toggle.style.display = "none";
    notodos.style.display = "block";
  }
}

// clear all todo
function deleteAll() {
  //cards.firstElementChild can be used.
  let child = cards.lastElementChild;
  while (child) {
    cards.removeChild(child);
    child = cards.lastElementChild;
    notodos.style.display = "block";
    clearbut.style.display = "none";
    cards.style.display = "none";
    toggle.style.display = "none";
  }
}
clearbut.onclick = function () {
  deleteAll();
};
// update
const update = (id) => {
  modal.style.visibility = "visible";
  todo_id = id;
  let todo = todoArr.find((todo) => todo.id === id);
  //modal.children[0].children[2].value=todo.title
  let todoTitleEl = document.querySelector("#todoTitle");
  todoTitleEl.value = todo.title;
  let todoDescriptionEl = document.querySelector("#todoDes");
  todoDescriptionEl.value = todo.des;
  let todoDateEl = document.querySelector("#todoDate");
  todoDateEl.value = todo.date;
};

modal.addEventListener("submit", (e) => {
  e.preventDefault();
  let todoTitleEl = document.querySelector("#todoTitle");

  let todoDescriptionEl = document.querySelector("#todoDes");

  let todoDateEl = document.querySelector("#todoDate");

  // let updatedTodo = todoArr.find((todo) => todo.id === todo_id);

  todoArr.forEach((todo) => {
    if (todo.id === todo_id) {
      todo.title = todoTitleEl.value;
      todo.des = todoDescriptionEl.value;
      todo.date = todoDateEl.value;
    }
    console.log(todo);
  });
  displayCards();
});

//markcomplete(id){}
function complete(id) {
  // completed_tasks.addEventListener("click",(e) => {
    todo_id = id;
      let todo = todoArr.find((todo) => todo.id === todo_id);
      todo.isComplete = true;
      console.log(todo);
}
completed_tasks.addEventListener("click", (e)=>{
  // alert("hey")
  let comp = todoArr.filter((task) => (task.isComplete === true));

  console.log(comp);
  comp.forEach((todo) => {
    let contentCard = `         
              <div class="card-body" style="border: 2px solid purple; margin: 20px; width:25%; background-color:green">                
                <h1 id="todoTitle">TItle: ${todo.title}</h1>
                <p id="todoDes"><b>Description:</b> ${todo.des}</p>
                <p id="todoDate"> <b>Deadline:</b> ${todo.date}</p>
                <p id="done"> <b>completed on:</b> ${date_2}</p>
              </div>       
          `;
    completed.innerHTML += contentCard;
    if(comp.length > 0){
      completed.style.display = "block"
    }
  })

})

incomplete_tasks.addEventListener("click", (e)=>{
  // alert("hey")
  let comp = todoArr.filter((task) => (task.isComplete === false));

  console.log(comp);
  comp.forEach((todo) => {
    let contentCard = `         
              <div class="card-body" style="border: 2px solid purple; margin: 20px; width:25%; background-color:yellow">                
                <h1 id="todoTitle">TItle: ${todo.title}</h1>
                <p id="todoDes"><b>Description:</b> ${todo.des}</p>
                <p id="todoDate"> <b>Deadline:</b> ${todo.date}</p>
                
              </div>       
          `;
    completed.innerHTML += contentCard;
    if(comp.length > 0){
      completed.style.display = "block"
    }
  })

})