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
let incomplete = document.querySelector(".incomplete");
let incompTasks = document.querySelector(".incompTasks");
let compTasks = document.querySelector(".compTasks")
let allTasks = document.querySelector("#all-tasks")
let todoArr = [];
let todo_id;
let dateComp = new Date();
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

const randColor = () =>  {
  return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}

// displaying cards
function displayCards() {
  if (todoArr.length > 0) {
    notodos.style.display = "none";
    clearbut.style.display = "block";
    cards.style.display = "block";
    toggle.style.display = "block";
    toggle.style.display = "flex"
    cards.innerHTML = "";

    todoArr.forEach((todo) => {
      // Construct card content
      let contentCard = `         
                <div class="card-body" style=" margin: 20px; width:28%; height:300px; background-color:${randColor()};padding:20px;display:flex;flex-direction:column;gap:10px;flex-wrap:wrap">                
                  <h1 id="todoTitle">TItle: ${todo.title}</h1> <br>
                  <p id="todoDes"><b>Description:</b> ${todo.des}</p> <br>
                  <p id="todoDate"> <b>Due:</b> ${todo.date}</p> <br>
                  <div style="display:flex;justfy-content:center">
                  <button class="delete" onClick = "deleteTodo(${todo.id})" style="padding:5px">Delete</button>  
                  <button class="update" onclick ="update(${todo.id})" style="padding:5px">Update</button>                  
                  <button class="done" id ="done" onclick = "complete(${todo.id})" style="padding:5px">done</button> 
                  </div>              

                </div>       
            `;
      // Append newyly created card element to the container
      cards.innerHTML += contentCard;
      // let p = document.createElement('p'); p.innerText = "My Tasks"
      // cards.appendChild(p)
      cards.style.display="flex"
      
    });

    // if no todos
  } else {
    cards.style.display = "none";
    toggle.style.display = "none";
    notodos.style.display = "block";
  }
}
// 
const deleteTodo = (id) => {
  todoArr = todoArr.filter(todo => todo.id !== id);
  displayCards();
}

// clear all todo
function deleteAll() {
  //cards.firstElementChild can be used.
  let child = cards.lastElementChild;
  todoArr = []
 
  while (child) {
    
    cards.removeChild(child);
    child = cards.lastElementChild;
    incomplete.innerHTML=''
    cards.innerHTML = ""
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
  modal.style.display = "block";
  form.style.display = "none";
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
  modal.style.display = "none"
  form.style.display = "block";
});

//markcomplete(id){}
function complete(id) {
    todo_id = id;
      let todo = todoArr.find((todo) => todo.id === todo_id);
      todo.isComplete = true;
      console.log(todo);
}
completed_tasks.addEventListener("click", (e)=>{
  e.preventDefault()
  cards.innerHTML=''
  
  let comp = todoArr.filter((task) => (task.isComplete === true));
if(comp.length > 0 ){
  // compTasks.style.display = "block"
 
  comp.forEach((todo) => {
    let date_1 = new Date(todo.date);
    let date_2 = dateComp;
  
    const days = (date_1, date_2) =>{
      let difference = date_1.getTime() - date_2.getTime();
      let TotalDays =  Math.ceil(difference / (1000 * 3600 * 24));
      return TotalDays;
    }
    console.log(days(date_1, date_2) +" days due");
    let contentCard = `         
    <div class="card-body" style=" margin: 20px; width:28%; height:300px; background-color:${randColor()};padding:20px;display:flex;flex-direction:column;gap:10px;flex-wrap:wrap">                             
                <h1 id="todoTitle">TItle: ${todo.title}</h1>
                <hr>
                <p id="todoDes"><b>Description:</b> ${todo.des}</p>
                <p id="todoDate"> <b>Deadline:</b> ${todo.date}</p>
                <p id="done"> <b>completed on:</b> ${dateComp}</p>
                ${days(date_1, date_2) >= 0 ? `<p id="due" style ="display:block"> <b>Completed  ${Math.abs(days(date_1, date_2))} day(s) before deadline</b></p>` : `<p id="overdue" style ="display:block"> <b>Completed task ${Math.abs(days(date_1, date_2))} day(s) late</b> </p>`}

              </div>       
          `;
    cards.innerHTML += contentCard;
    if(comp.length > 0){
      incomplete.style.display = "block"
    }
  })
}
else{
  alert("You don't have any complete tasks")
  displayCards()
}
})
// all tasks
allTasks.addEventListener("click", (e)=>{
  incomplete.innerHTML = ""
  displayCards()
})

// incomplete tasks
incomplete_tasks.addEventListener("click", (e)=>{
  cards.innerHTML=''
  let comp = todoArr.filter((task) => (task.isComplete === false));
  if(comp.length > 0){
  comp.forEach((todo) => {
    let date_1 = new Date(todo.date);
    let date_2 = new Date();
  
    const days = (date_1, date_2) =>{
      let difference = date_1.getTime() - date_2.getTime();
      let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
      return TotalDays;
    }
    console.log(days(date_1, date_2) +" days due");
    
    let contentCard = `         
    <div class="card-body" style=" margin: 20px; width:28%; height:300px; background-color:${randColor()};padding:20px;display:flex;flex-direction:column;gap:10px;flex-wrap:wrap">                               
                <h1 id="todoTitle">TItle: ${todo.title}</h1>
                <p id="todoDes"><b>Description:</b> ${todo.des}</p>
                <p id="todoDate"> <b>Deadline:</b> ${todo.date}</p>
                ${days(date_1, date_2)-1 >= 0 ? `<p id="due" style ="display:block"> <b>Due</b> ${Math.abs(days(date_1, date_2))} day(s) due</p>` : `<p id="overdue" style ="display:block"> <b>Due</b> ${Math.abs(days(date_1, date_2))} day(s) overdue</p>`}
                
              </div>       
          `;
         
    cards.innerHTML += contentCard;
    if(comp.length > 0){
      incomplete.style.display = "block"
    }
   
  })
}
else{
  alert("You have no incomplete tasks")
  displayCards()
}

})