const urlImg = require("url:../../../src/media/trash.svg");

export function initRecipeItem() {
  class RecipeItem extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      const div = document.createElement("div");
      const style = document.createElement("style");

      div.setAttribute("class", "item-container");

      div.innerHTML = `
            <c-text variant="item" id="${this.id}">${this.textContent}</c-text>
            <div class="btns-container">
                <c-text class="open-btn" variant="item-open">Abrir</c-text>
                <img class="trash" src="${urlImg}">
            </div>
        `;
      style.innerHTML = `
            .item-container {
                max-width: 275px;
                width: 100%;
                min-height: 55px;
                background-color: var(--recetario);
                border-radius: 5px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 10px;
                box-sizing: border-box;
                cursor: pointer;
            }

            .item-container.active {
              box-shadow: 2px 2px 2px var(--white);
            }

            .btns-container {
                display: flex;
                flex-direction: row;
                align-items: center;
                column-gap: 25px;
            }

            .open-btn {
                visibility: hidden;
                pointer-events: none;
            }

            .trash {
                 visibility: hidden;
                 pointer-events: none;   
            }
            .item-container.active .open-btn {
                visibility: visible;
                pointer-events: all;
            }

            .item-container.active .trash {
                 visibility: visible;
                 pointer-events: all;   
            }
              `;
      this.shadow.appendChild(div);
      this.shadow.appendChild(style);

      div.addEventListener("click", () => {
        const evento = new CustomEvent("selected", {
          bubbles: true,
          detail: this,
        });
        this.dispatchEvent(evento);
      });
    }
  }
  customElements.define("recipe-item", RecipeItem);
}
