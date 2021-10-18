export function initButtonContained() {
  class ButtonContained extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      const button = document.createElement("button");
      const style = document.createElement("style");
      const size = this.getAttribute("size");
      const fullSize = this.getAttribute("full-size") || "";

      button.setAttribute("class", "button-contained");

      button.textContent = this.textContent;
      style.innerHTML = `
                .button-contained {
                    max-width: 275px;
                    width: 100%;
                    height: 50px;
                    margin: 0;
                    padding: 0;
                    background-color: var(--add-btn);
                    color: var(--black);
                    font-family: "Poppins", sans-serif;
                    font-size: ${size + "px"};
                    border: none; 
                    border-radius: 5px;
                    cursor: pointer;
                }

                .button-contained:focus {
                    outline: none;
                }

                .button-contained.fullwidth {
                    max-width: 470px;
                }
            `;
      this.shadow.appendChild(button);
      this.shadow.appendChild(style);

      if (fullSize == "true") {
        button.classList.add("fullwidth");
      }
    }
  }
  customElements.define("contained-button", ButtonContained);
}
