const urlImg = require("url:../../../src/media/trash.svg");
const urlImgEdit = require("url:../../../src/media/edit.svg");
const urlImgSave = require("url:../../../src/media/save.svg");
const urlImgCancel = require("url:../../../src/media/cancel.svg");

export function initNote() {
  class Note extends HTMLElement {
    shadow: ShadowRoot;
    idNumber: number;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      this.render();
    }
    addListeners() {
      const editBtn = this.shadowRoot.querySelector(".edit-img");

      editBtn.addEventListener("click", (e: any) => {
        const event = new CustomEvent("edit", {
          detail: {
            edit: "clicked",
          },
        });
        this.dispatchEvent(event);
      });
    }
    render() {
      const div = document.createElement("div");
      div.setAttribute("class", "container");
      const style = document.createElement("style");
      const id = this.getAttribute("id");
      const fecha = this.getAttribute("date") || "";
      const textContent = this.getAttribute("content") || "";

      div.innerHTML = `
      <div class="date-container"><p class="create-date">${fecha}</p></div>
      <div class="text-content-container"><p class="text-content">${textContent}</p></div>
      <div class="btns-container">
        <div>
          <img class="trash-img" src=${urlImg}>
        </div>
        <div>
          <img class="edit-img" src=${urlImgEdit}>
          <img class="save-img" src=${urlImgSave}>
          <img class="cancel-img" src=${urlImgCancel}>
        </div>
      </div>
            `;
      style.innerHTML = `
      .container {
        min-width: 350px;
        max-width: 350px;
        width: 100%;
        min-height: 250px;
        height: auto;
        border-radius: 4px;
        background-color: var(--note-light);
        display: grid;
        grid-template-rows: 50px 1fr 30px;
        padding: 10px;
        box-sizing: border-box;
        cursor: pointer;
      }

      .date-container {

      }

      .create-date {
        margin: 0;
        font-family: "Poppins", sans-serif;
        font-size: 12px;
        text-align: right;
        color: var(--grey);
      }

      .text-content {
          margin: 0;
          font-family: "Poppins", sans-serif;
          overflow-wrap: break-word;
      }

      .btns-container {
        display: flex;
        justify-content: space-between;
      }

      .trash-img {
        visibility: hidden;
        cursor: pointer;
      }
      .trash-img:hover {
        transform: scale(1.05);
      }
      
      .trash-img.img-display{
        visibility: visible;
        margin: 0 0 0 15px;
      }

      .save-img {
        display: none;
      }

      .save-img.save-display{
        display: initial;
      }
      .save-img.save-display:hover{
        transform: scale(1.05);
      }


      .edit-img:hover{
        transform: scale(1.05);
      }

      .cancel-img {
        display: none;
      }
      .cancel-img.img-display {
        display: initial;
      }
      .cancel-img.img-display:hover{
        transform: scale(1.05);
      }

      .edit-area {
        font-family: "Poppins", sans-serif;
        width: 290px;
        height: 100px;
        border: none;
      }

      .edit-area::-webkit-scrollbar {
        width: 15px;
      }
      .edit-area::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 2px;
      }
      .edit-area::-webkit-scrollbar-track:hover {
        cursor: pointer;
      }
      .edit-area::-webkit-scrollbar-thumb {
        background: #425969;
        border-radius: 2px;
    }
      }
      .edit-area::-webkit-scrollbar-thumb:hover {
        background: var(--grey);

      }
      .edit-area:focus {
        outline: none;
      }

      .img-display-none {
        visibility: hidden;
        display: none;
      }
            `;

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
      const editBtn = this.shadowRoot.querySelector(".edit-img");

      editBtn.addEventListener("click", (e: any) => {
        const event = new CustomEvent("edit", {
          bubbles: true,
          detail: {
            edit: "clicked",
          },
        });
        this.dispatchEvent(event);
      });
    }
  }
  customElements.define("c-note", Note);
}
