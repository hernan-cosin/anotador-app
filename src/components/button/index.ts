export function initButton() {
  class Button extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      const btn = document.createElement("button");
      const style = document.createElement("style");
      btn.setAttribute("class", "btn");

      btn.textContent = this.textContent;
      //   btn.innerHTML = `
      //   `;
      style.innerHTML = `
            .btn {
                border: none;
                background: none;
                font-size: 24px;
                color: inherit;
                padding: 0;
                font-family: "Poppins", sans-serif;
                cursor: pointer;
            }
            `;
      this.shadow.appendChild(btn);
      this.shadow.appendChild(style);
    }
  }
  customElements.define("c-button", Button);
}
