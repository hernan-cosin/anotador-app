const urlImgTrash = require("url:../../../src/media/trash.svg");
const urlImgCheck = require("url:../../../src/media/check.svg");
const urlImgPrice = require("url:../../../src/media/price.svg");

import { state } from "../../state";

export function initShoppingItem() {
  class ShoppingItem extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
    connectedCallback() {
      // this.render();
    }
    render() {
      const div = document.createElement("div");
      const style = document.createElement("style");
      const textContent = this.getAttribute("text-content");
      const idN = this.getAttribute("id");
      const price = this.getAttribute("price");
      const checked = this.hasAttribute("checked");
      div.setAttribute("class", "container");
      div.setAttribute("idN", idN);

      div.innerHTML = `
                <img class="img-trash" src="${urlImgTrash}">
                <p class="item-text ${
                  checked ? "checked" : " "
                }">${textContent}</p>
                <input class="check-input" type="checkbox" id="checked-item" ${
                  checked ? "checked" : " "
                }>
                <label class="check-label" for="checked-item">
                  <img class="img-check  ${
                    checked ? "checked" : " "
                  }" src="${urlImgCheck}">
                </label>
                <div class="price-container">
                    <img class="img-price" src="${urlImgPrice}">
                    <input class="price-input" type="number" value="${
                      price || 0
                    }">
                </div>
            `;

      style.innerHTML = `
        .container {
            display: grid;
            align-items: center;
            grid-template-columns: 25px 1fr 40px 40px 50px;
        }

        .img-trash {
          visibility: hidden;
        }

        .img-trash:hover {
            cursor: pointer;
            transform: scale(1.05);
        }

        .img-trash.display {
          visibility: initial;
        }

        .item-text {
            margin: 0 0 0 15px;
            font-family: 'Gloria Hallelujah', cursive;
            cursor: pointer;
        }

        .img-check {
          transition: transform .5s ease;
        }

        .img-check.checked {
          transform: rotate(90deg);
        }

        .img-check:hover {
            cursor: pointer;
            transform: scale(1.05) rotate(90deg);
        }

        .check-input {
          display: none;
        }

        .item-text.checked {
          color: var(--grey);
          text-decoration: line-through;
          text-decoration-thickness: 2px;
          text-decoration-color: black;
        }

        .price-container {
            display: flex;
        }

        .img-price:hover{
            cursor: pointer;
            transform: scale(1.05);
        }
        
        .price-input {
            font-family: 'Gloria Hallelujah', cursive;
            border: none;
            border-bottom: 1px solid black;
            background-color: transparent;
            width: 45px;
            text-align: right;
            visibility: hidden;
        }

        .price-input:focus {
            outline: none;
        }

        .price-input.display {
          visibility: initial;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
            `;
      this.shadow.appendChild(div);
      this.shadow.appendChild(style);

      const imgPrice = div.querySelector(".img-price");
      imgPrice.addEventListener("click", () => {
        const event = new CustomEvent("price", {
          bubbles: true,
          detail: {
            id: idN,
          },
        });
        this.dispatchEvent(event);
      });

      const checkLabel = div.querySelector(".check-label") as any;
      checkLabel.addEventListener("click", () => {
        const inputCheck = div.querySelector(".check-input") as any;

        const event = new CustomEvent("check", {
          bubbles: true,
          detail: {
            id: idN,
            value: inputCheck.checked,
          },
        });
        this.dispatchEvent(event);
      });

      const itemText = div.querySelector(".item-text");
      itemText.addEventListener("click", () => {
        const event = new CustomEvent("trash", {
          bubbles: true,
          detail: {
            id: idN,
          },
        });
        this.dispatchEvent(event);
      });
    }
  }
  customElements.define("c-item", ShoppingItem);
}
