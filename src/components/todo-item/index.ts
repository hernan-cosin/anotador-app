const urlImg = require("url:../../../src/media/trash.svg");

export function initTaskItem() {
  class TaskItem extends HTMLElement {
    shadow: ShadowRoot;
    checked: boolean = false;
    idNumber: number;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      this.checked = this.hasAttribute("checked");
      this.render();
    }
    addListeners() {
      const input = this.shadow.querySelector(".input-checkbox");
      this.idNumber = parseFloat(this.getAttribute("id"));
      input.addEventListener("click", (e: any) => {
        const event = new CustomEvent("checked", {
          bubbles: true,
          detail: {
            id: this.idNumber,
            value: e.target.checked,
          },
        });
        this.dispatchEvent(event);
      });
    }
    render() {
      const div = document.createElement("div");
      const style = document.createElement("style");
      div.setAttribute("class", "container");
      const fecha = this.getAttribute("date") || "";
      const textCont = this.getAttribute("content") || "";

      div.innerHTML = ` 
        <div class="date-container"><p class="create-date">${fecha}</p></div>
        <div class="text-content-container"><p class="text-content ${
          this.checked ? "checked" : " "
        }">${textCont}</p></div>
        <div class="btns-container">
            <img class="trash-img" src=${urlImg}>
            <input class="input-checkbox" type="checkbox" ${
              this.checked ? "checked" : " "
            }>
        </div>
      `;
      style.innerHTML = `
      .container {
        min-width: 300px;
        max-width: 500px;
        min-height: 140px;
        max-height: 300px;
        height: 100%;
        margin: 0 auto;
        border-radius: 4px;
        background-color: var(--todo-light);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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

      .text-content.checked {
        text-decoration: line-through;
        color: var(--grey);
      }

      .btns-container {
        width: 60px;
        align-self: self-end;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .trash-img {
        visibility: hidden;
        cursor: pointer;
      }

      .trash-img.img-display{
        visibility: visible;
      }

      .input-checkbox {
        transform: scale(2);
        accent-color: var(--todo-check);
      }
     `;

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
      this.addListeners();
    }
  }
  customElements.define("c-task", TaskItem);
}
