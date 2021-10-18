export function initHeader() {
  class Header extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      const header = document.createElement("header");
      const style = document.createElement("style");
      const backButton = this.getAttribute("back-button");

      header.setAttribute("class", "header");

      header.innerHTML = `
            <div class="title-container">
                <h1 class="title">Anotador</h1>
                ${
                  backButton
                    ? "<c-button class='back-button'>Inicio</c-button>"
                    : ""
                }
                </div>
                `;
      style.innerHTML = `
                .header {
                    min-height: 120px;
                    background-color: var(--header-color);
                    overflow: auto;
                    text-align: center;
                    padding: 0 15px;
                }

                @media (min-width: 769px) {
                    .header{
                        height: 100px;
                        padding: 0 0 0 15px;
                        text-align: left;
                    }
                }

                .title-container {
                    max-width: 960px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    padding: 0 20px;
                }

                @media (min-width:769px) {
                    .title-container {
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                    }
                }

                .title {
                    font-size: 36px;
                    line-height: 120px;
                    color: var(--white);
                    margin: 0;
                    font-family: "Poppins", sans-serif;
                }

                @media (min-width: 769px) {
                    .title{
                        line-height: 100px;
                    }
                }

                .back-button {
                    color: var(--grey);
                    align-self: flex-end;
                }

                @media (min-width: 769px) {
                    .back-button{
                        align-self: center;
                    }
                }
            `;
      this.shadow.appendChild(header);
      this.shadow.appendChild(style);
    }
  }
  customElements.define("c-header", Header);
}
