import { state } from "../../state";

export function initNotes(params) {
  const div = document.createElement("div");
  const style = document.createElement("style");

  div.innerHTML = ` 
          <c-header class="header" back-button="true"></c-header>
          <div class="container">
              <c-text class="title" variant="title">Mis notas</c-text>
              <c-form class="form" text-area="true" area-place-holder="Nueva nota . . ."></c-form>
              <ul class="notes-container">
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

    .notes-container{
      min-width: 350px;
      max-width: 960px;
      margin: 0 auto 30px auto;
      padding: 0;
      display: flex;
      flex-direction: column;
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
    @media(min-width: 769px) {
      .notes-container {
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
        row-gap: 20px;
        column-gap: 30px;
      }
    }

    .li {
      list-style: none;
    }
  
    .li.selected {
      box-shadow: 0px 0px 10px 4px var(--note-border);
    }
      `;

  function addListeners() {
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
      .shadowRoot.querySelector(".text-area") as any;

    const addBtn = div
      .querySelector(".form")
      .shadowRoot.querySelector(".button");
    addBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (input.value.length == 0) {
        return;
      } else {
        state.addNote(Math.random(), input.value);
      }
      input.value = "";
    });

    const lis = div.querySelectorAll(".li");
    const lisArr = Array.from(lis);

    lis.forEach((li) => {
      li.addEventListener("click", () => {
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

        img.addEventListener("click", () => {
          const id = li.getAttribute("id");
          state.deleteNotes(id, true);
        });
      });
    });

    div.addEventListener("edit", (e: any) => {
      const pEl = e.target.shadowRoot.querySelector(".text-content") as any;
      const pElContent = pEl.textContent.trim();
      pEl.innerHTML = `
        <textarea class="edit-area">${pElContent}</textarea>
      `;

      const editImg = e.target.shadowRoot.querySelector(".edit-img");
      editImg.classList.add("img-display-none");

      const imgCancel = e.target.shadowRoot.querySelector(".cancel-img");
      imgCancel.classList.add("img-display");

      const imgSave = e.target.shadowRoot.querySelector(".save-img");
      imgSave.classList.add("save-display");

      imgSave.addEventListener("click", () => {
        const newText = pEl.querySelector(".edit-area").value;
        const currentState = state.getState();
        const idTarget = e.target.getAttribute("id");
        const targetNote = currentState.notes.find((n) => {
          return n.id == idTarget;
        });
        targetNote.textContent = newText;

        state.setState(currentState);
      });

      imgCancel.addEventListener("click", () => {
        const originalTest = pElContent;
        const currentState = state.getState();
        const idTarget = e.target.getAttribute("id");
        const targetNote = currentState.notes.find((n) => {
          return n.id == idTarget;
        });
        targetNote.textContent = originalTest;

        state.setState(currentState);
      });
    });
  }

  function createNotes() {
    const notesContainer = div.querySelector(".notes-container");
    const notes = state.getEnabledNotes() as any;

    notesContainer.innerHTML = "";
    for (const n of notes) {
      const li = document.createElement("li");
      li.setAttribute("class", "li");
      li.setAttribute("id", n.id);
      li.innerHTML = `
         <c-note date='Creada ${n.date}' content='${n.textContent}' id='${n.id}'></c-note>
        `;

      notesContainer.appendChild(li);
    }
  }

  createNotes();
  state.subscribe(() => {
    createNotes();
    addListeners();
  });

  div.appendChild(style);
  addListeners();

  return div;
}
