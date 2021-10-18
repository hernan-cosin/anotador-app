export function initRecipesInfoCard() {
  class RecipeInfoCard extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      const div = document.createElement("div");
      const style = document.createElement("style");

      div.setAttribute("class", "container");
      const name = this.textContent;

      const preparation = this.getAttribute("preparation");

      div.innerHTML = `
        <div class="content">
            <c-text class="title" variant="title">${name}</c-text>
            <div class="info-container">
                <c-button class="close-btn" size="18px">Cerrar</c-button>
                <c-text class="ingredients-title" variant="item-info">Ingredientes</c-text>
                <ul class="ingredients-container">
                </ul>
                <c-text class="preparation-title" variant="item-info">Preparación</c-text>
                <c-text class="preparation" variant="item-info">${preparation}</c-text>
                <!-- <c-button class="edit-btn" size="18px">Editar</c-button> -->
            </div>
        </div>
      `;
      style.innerHTML = `
        .container {
            max-width: 600px;
            width: 100%;
            height: max-content;
            background-color: rgba(196, 196, 196, .6);
            backdrop-filter: blur(17px);
            margin: 0 auto;
            transform: translateY(-50px);
            border-radius: 5px;
            padding: 0 0 15px 0;
        }

        @media (min-width: 769px) {
            .container {
                top: 65%;
                padding: 0 15px 15px 15px;
            }
        }

        .title {
            text-align: center;
            display: block;
            margin: 0 0 15px 0;
        }
        
        .info-container {
            max-width: 430px;
            background-color: var(--grey-info);
            display: grid;
            // grid-template-rows: repeat(8, 1fr);
            grid-template-columns: 1fr 80px;
            margin: 0 auto;
            padding: 15px;
        }

        .close-btn {
            grid-row: 1/2;
            grid-column: 2/3;
            text-align: right;
        }

        .ingredients-title {
            grid-row: 1/2;
            grid-column: 1/2;
        }
        
        .ingredients-container {
            grid-row: 2/3;
            grid-column: 1/2; 
        }

        .preparation-title {
            grid-row: 3/4;
            grid-column: 1/2; 
        }

        .preparation {
            grid-row: 4/5;
            grid-column: 1/2;
            margin: 0 0 0 25px;
        }
        
        .edit-btn {
            grid-row: 5/6;
            grid-column: 2/3;
            text-align: right;
        }
      `;
      const ingredientsContainer = div.querySelector(".ingredients-container");
      const ingredients = this.getAttribute("ingredients");
      const ingredientsArray = ingredients.split(",");
      const closebtn = div.querySelector(".close-btn");

      function createListIngredients() {
        for (const i of ingredientsArray) {
          const li = document.createElement("li");
          li.innerHTML = `<c-text variant="item-info">${i}</c-text>`;
          ingredientsContainer.appendChild(li);
        }
      }

      closebtn.addEventListener("click", () => {
        const evento = new CustomEvent("close-recipe", { bubbles: true });
        this.dispatchEvent(evento);
      });

      createListIngredients();

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
    }
  }
  customElements.define("recipe-card", RecipeInfoCard);
}
