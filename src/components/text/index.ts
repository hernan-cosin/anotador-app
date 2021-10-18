export function initText() {
  class Text extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }

    render() {
      const variant = this.getAttribute("variant") || "body";
      const text = document.createElement("p");
      const style = document.createElement("style");
      text.textContent = this.textContent;

      text.setAttribute("class", variant);
      style.innerHTML = `
        .body {
            font-size: 24px;
            font-family: "Poppins", sans-serif;
            color: var(--white);
            margin: 0;
        }

        .title{
            font-size: 36px;
            font-family: "Poppins", sans-serif;
            color: var(--white);
            margin: 0;
        }

        .item {
          font-size: 18px;
          font-family: "Poppins", sans-serif;
          color: var(--white);
          margin: 0;
        }

        .item-open {
          font-size: 18px;
          font-family: "Poppins", sans-serif;
          color: var(--black);
          margin: 0;
          cursor: pointer;
        }

        .item-info {
          font-size: 18px;
          font-family: "Poppins", sans-serif;
          color: var(--black);
          margin: 0;
        `;

      this.shadow.appendChild(text);
      this.shadow.appendChild(style);
    }
  }
  customElements.define("c-text", Text);
}
