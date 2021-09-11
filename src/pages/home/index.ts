export function initHome(params) {
  const div = document.createElement("div");
  const style = document.createElement("style");
  div.innerHTML = `
    <c-header class="header"></c-header>
    <div class="container">
      <div class="content">
        <ul class="buttons">
          <li class="li todo"><c-button class="c-button tareas">Tareas pendientes</c-button></li>
          <li class="li notes"><c-button class="c-button notas">Notas</c-button></li>
          <li class="li list"><c-button class="c-button compras">Lista de compras</c-button></li>
        </ul>
      </div>
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
    }

    @media (min-width: 769px) {
      .container{
        height: calc(100vh - 120px);
      }
    }

    .content {
      overflow: auto;

    }

    .buttons {
      max-width: 960px;
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin: 130px auto 0 auto;
      padding: 0;
    }

    @media (min-width: 769px) {
      .buttons {
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
      }
    }

    .li {
      list-style: none;
      color: var(--white);
    }

    .c-button {
      display: block;
    }

    .todo:hover .c-button{
      color: var(--todo-dark);
    }

    .notes:hover .c-button{
      color: var(--note-dark);
    }

    .list:hover .c-button{
      color: var(--list-bg);
    }
  `;

  const btnTasks = div
    .querySelector(".c-button.tareas")
    .shadowRoot.querySelector(".btn") as any;
  const btnNotes = div
    .querySelector(".c-button.notas")
    .shadowRoot.querySelector(".btn") as any;
  const btnShopping = div
    .querySelector(".c-button.compras")
    .shadowRoot.querySelector(".btn") as any;

  btnTasks.addEventListener("click", (e) => {
    e.preventDefault();
    params.goTo("/todoList");
  });

  btnNotes.addEventListener("click", (e) => {
    e.preventDefault();
    params.goTo("/notes");
  });

  btnShopping.addEventListener("click", (e) => {
    e.preventDefault();
    params.goTo("/shoppingList");
  });

  div.appendChild(style);
  return div;
}
