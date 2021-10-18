export function initNewRecipeForm() {
  class NewRecipeForm extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      const form = document.createElement("form");
      const style = document.createElement("style");

      form.setAttribute("class", "form");

      form.innerHTML = `
        <c-form class="name" place-holder="Nombre" button="false"></c-form>
        <div class="ingredients-container">
            <c-form class="first-Input ingredient-input" place-holder="Ingrediente"></c-form>
        </div>
        <c-form class="preparation" text-area="true" area-place-holder="Modo de preparación" button="false"></c-form>
        <contained-button class="add-recipe-btn" size="18" full-size="true">Agregar receta</contained-button>
      `;
      style.innerHTML = `
        .form {
            min-height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 10px;
        }

        .ingredients-container {
            min-height: 55px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

        .add-recipe-btn {
            margin: 0 0 0 12px;
        }

        .ingredient-input {
            display: block;
        }
      `;

      this.shadow.appendChild(form);
      this.shadow.appendChild(style);

      const ingredientsContainer = form.querySelector(".ingredients-container");
      const addIngredientButton = form
        .querySelector(".first-Input")
        .shadowRoot.querySelector(".button");
      addIngredientButton.addEventListener("click", (e) => {
        e.preventDefault();

        let frag = document
          .createRange()
          .createContextualFragment(
            '<c-form class="added-ingredient-input ingredient-input" place-holder="Ingrediente" button="false"></c-form>'
          );

        ingredientsContainer.appendChild(frag);
      });
    }
  }
  customElements.define("recipe-form", NewRecipeForm);
}
