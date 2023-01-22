let table = document.querySelector(".table");
let submit = document.querySelector(".submit");
let form = document.querySelector(".form");
let cards = document.querySelector(".list");
let notodos = document.querySelector(".notodos");
let clearbut = document.querySelector(".clearbut");
let title = document.querySelector("#todo").value;
let des = document.querySelector("#des").value;
let date = document.querySelector("#date").value;
let todoArr = [];

function todoID() {
  return Math.floor(Math.random() * 2000000);
}

submit.addEventListener("click", (e) => {
    e.stopImmediatePropagation()
 e.preventDefault

  const todo = {
    id: todoID(),
    title,
    des,
    date
  };
  todoArr.push(todo);
  displayCards();
  form.reset()
});
    
// displaying cards
function displayCards() {
  if (todoArr.length > 0) {
    notodos.style.display = "none";
    clearbut.style.display = "block"
    cards.innerHTML = "";

    todoArr.forEach((todo) => {
      // Construct card content
      const contentCard = `         
                <div class="card-body" style="border: 2px solid purple; margin: 20px; width:25%">                
                  <h1>TItle: ${todo.title}</h1>
                  <p><b>Description:</b> ${todo.des}</p>
                  <p><b>Date:</b> ${todo.date}</p>
                  <button class="delete" onclick="handleDeleteClick(${todo.id})">Delete</button>                  
                </div>       
            `;

      // Append newyly created card element to the container
      cards.innerHTML += contentCard;

// delete a todo
      let current_todos = document.querySelectorAll(".delete");
      for(let i=0; i<current_todos.length; i++){
          current_todos[i].onclick = function(){
              this.parentNode.remove();
          }
      }
    });

    // if no todos
  } else {
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
    }
}
clearbut.onclick = function() {
    deleteAll();
}