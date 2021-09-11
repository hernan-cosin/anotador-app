const buttonUrl = require("url:../../../src/media/addbtn.svg");

export function initForm() {
  class Form extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      const form = document.createElement("form");
      const style = document.createElement("style");
      const textAreaInput = this.getAttribute("text-area");
      const placeHolder = this.getAttribute("place-holder");

      form.innerHTML = `
            <div class="content">
                ${
                  textAreaInput
                    ? "<textarea class='text-area' placeholder='Nueva nota . . .'></textarea>"
                    : `<input class="input" type="text" placeholder='${placeHolder}'>`
                }
                <button class="button"><img src=${buttonUrl} alt="Add button"></button>
            </div>
            `;
      style.innerHTML = `
            .content {
                display: flex;
                padding: 0 10px;
                animation: fadeIn 2s;
                animation-fill-mode: forwards;
            }

            @keyframes fadeIn {
                0% {
                    opacity: 0;
                  }
                  100% {
                    opacity: 1;
                }
            }

            .text-area {
                height: 132px;
                border:red;
                border-radius: 20px;
                min-width: 275px;
                max-width: 470px;
                width: 100%;
                box-sizing: border-box;
                font-size: 18px;
                font-family: "Poppins", sans-serif;
                padding: 14px 0 0 22px;
            }

            .text-area:focus {
              outline: none;
            }

            .input {
                height: 55px;
                border: none;
                border-radius: 20px;
                min-width: 275px;
                max-width: 470px;
                width: 100%;
                box-sizing: border-box;
                font-size: 18px;
                font-family: "Poppins", sans-serif;
                padding: 0 0 0 22px;
            }

            .input:focus {
              outline: none;
              transform: scale(1.01);
            }

            .button {
                background: none;
                cursor: pointer;
                border: none; 
            }

            .button:hover {
              transform: scale(1.05);
            }
            `;

      this.shadow.appendChild(form);
      this.shadow.appendChild(style);
    }
  }
  customElements.define("c-form", Form);
}
