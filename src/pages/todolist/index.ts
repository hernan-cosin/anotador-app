import { state } from "../../state";

export function initTodoList(params) {
  const div = document.createElement("div");
  const style = document.createElement("style");

  div.innerHTML = ` 
        <c-header class='header' back-button='true'></c-header>
        <div class='container'>
            <c-text class='title' variant='title'>Mis tareas</c-text>
            <c-form class='form' place-holder='Nueva tarea . . .'></c-form>
            <ul class="tasks-container">

            </ul>
        </div>
    `;

  style.innerHTML = `  
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
  
  .header {
    display: block;
    font-family: "Poppins", sans-serif;
  }

  .container {
    width: 100%;
    height: calc(100vh - 120px);
    background-color: var(--bg);
    overflow: auto;
  }

  @media (min-width: 769px) {
    .container{
      height: calc(100vh - 120px);
    }
  }

  @media (min-width: 550px) {
    ::-webkit-scrollbar {
        width: 20px;
      }
  
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 2px;
    }
      
    ::-webkit-scrollbar-thumb {
      background: #202020;
      border-radius: 2px;
    }
  
      ::-webkit-scrollbar-thumb:hover {
      background: var(--header-color);
    }
  }
  
  .title {
      display: block;
      text-align: center;
      margin: 40px 0 0 0;
  }

  @media (min-width: 769px) {
      .title {
        margin: 50px 0 0 0;
      }
  }

  .form {
      display: block;
      max-width: 470px;
      margin: 20px auto 40px auto;
  }

  .tasks-container {
    min-width: 300px;
    max-width: 500px;
    margin: 0 auto 30px auto;
    padding: 0 15px;
    display: flex;
    flex-direction: column-reverse;
    flex-wrap: wrap;
    align-items: center;
    row-gap: 30px;
    animation: fadeInFRight 2s;
    animation-fill-mode: forwards;
  }

  @keyframes fadeInFRight {
    0% {
      opacity: 0;
    }
    35% {
      opacity: 0;
    } 
    100% {
      opacity: 1;
    }
  }

  .li {
    list-style: none;
    width: 100%;
  }

  .li.selected {
    box-shadow: 0px 0px 10px 4px var(--todo-border);
  }

    `;

  const backBtn = div
    .querySelector(".header")
    .shadowRoot.querySelector(".back-button")
    .shadowRoot.querySelector(".btn");

  backBtn.addEventListener("click", (e) => {
    e.preventDefault();
    params.goTo("/home");
  });

  const input = div
    .querySelector(".form")
    .shadowRoot.querySelector(".input") as any;
  input.setAttribute("maxlength", "200");

  const addBtn = div.querySelector(".form").shadowRoot.querySelector(".button");

  addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (input.value.length == 0) {
      return;
    } else {
      state.addTask(Math.random(), input.value);
      input.value = "";
    }
  });

  function createTasks() {
    const taskContainer = div.querySelector(".tasks-container");
    const tareas = state.getEnabledtasks() as any;

    taskContainer.innerHTML = "";
    for (const t of tareas) {
      const li = document.createElement("li");
      li.setAttribute("class", "li");
      li.setAttribute("id", t.id);
      li.innerHTML = `
         <c-task date='Creada ${t.date}' content='${t.textContent}' id='${
        t.id
      }' ${t.completed ? "checked" : " "}></c-task>
        `;

      taskContainer.appendChild(li);
    }

    addListeners();
  }

  function addListeners() {
    const lis = div.querySelectorAll(".li");
    const lisArr = Array.from(lis);

    lis.forEach((li) => {
      li.addEventListener("click", (e: any) => {
        const idSelected = li.getAttribute("id");

        const notSelected = lisArr.filter((li) => {
          return li.id !== idSelected;
        });

        li.classList.toggle("selected");

        const img = li.children[0].shadowRoot.querySelector(
          ".trash-img"
        ) as any;
        img.classList.toggle("img-display");

        notSelected.forEach((l) => {
          if (l.classList.value.includes("selected")) {
            l.classList.remove("selected");

            l.children[0].shadowRoot
              .querySelector(".trash-img")
              .classList.remove("img-display");
          }
        });

        img.addEventListener("click", (e: any) => {
          const id = li.getAttribute("id");
          state.deleteTask(id, true);
        });
      });
    });
  }

  div.addEventListener("checked", (e: any) => {
    state.changeTaskState(e.detail.id, e.detail.value);
  });

  createTasks();
  state.subscribe(() => {
    createTasks();
  });

  div.appendChild(style);
  return div;
}
