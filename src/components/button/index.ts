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
      const size = this.getAttribute("size") || 24;
      btn.textContent = this.textContent;

      style.innerHTML = `
            .btn {
                border: none;
                background: none;
                font-size: ${size + "px"};
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
