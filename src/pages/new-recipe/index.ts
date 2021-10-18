import { state } from "../../state";

export function initNewRecipes(params) {
  const div = document.createElement("div");
  const style = document.createElement("style");

  div.innerHTML = ` 
          <c-header class="header" back-button="true"></c-header>
          <div class="container">
            <c-text class="title" variant="title">Nueva Receta</c-text>
            <recipe-form class="form"></recipe-form>
            </div>
      `;

  style.innerHTML = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

      .header {
        display: block;
        font-family: "Poppins", sans-serif;
      }
    
      .container {
        width: 100%;
        height: calc(100vh - 120px);
        background-color: var(--bg);
        overflow: auto;
        padding: 0 10px 50px 10px;
      }
    
      @media (min-width: 769px) {
        .container{
          height: calc(100vh - 120px);
        }
      }
  
      @media (min-width: 550px) {
        ::-webkit-scrollbar {
            width: 20px;
          }
      
        ::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px grey;
          border-radius: 2px;
        }
          
        ::-webkit-scrollbar-thumb {
          background: #202020;
          border-radius: 2px;
        }
      
          ::-webkit-scrollbar-thumb:hover {
          background: var(--header-color);
        }
      }

      .title {
          display: block;
          text-align: center;
          margin: 40px 0 0 0;
    
        @media (min-width: 769px) {
            .title {
            margin: 50px 0 0 0;
            }
        }  
      }

      .form {
        display: block;
        max-width: 550px;
        margin: 25px auto 0 auto;
        padding: 0 5px;
      }
      }
      `;
  div.appendChild(style);
  function addListeners() {
    const backBtn = div
      .querySelector(".header")
      .shadowRoot.querySelector(".back-button")
      .shadowRoot.querySelector(".btn");

    backBtn.addEventListener("click", (e) => {
      e.preventDefault();
      params.goTo("/home");
    });
  }

  const addNewRecipe = div
    .querySelector(".form")
    .shadowRoot.querySelector(".add-recipe-btn")
    .shadowRoot.querySelector(".button-contained");

  addNewRecipe.addEventListener("click", handleSubmitRecipe);

  function handleSubmitRecipe(e) {
    e.preventDefault();
    const name = div
      .querySelector(".form")
      .shadowRoot.querySelector(".name")
      .shadowRoot.querySelector(".input") as any;
    const nameValue = name.value;

    let ingredientes = [];

    const ingredientsContainer = div
      .querySelector(".form")
      .shadowRoot.querySelector(".ingredients-container")
      .querySelectorAll(".ingredient-input");

    for (const i of ingredientsContainer) {
      const ingredientEl = i.shadowRoot.querySelector(".input") as any;

      ingredientes.push(ingredientEl.value);
    }

    ingredientes = ingredientes.filter((i) => {
      return i.length > 0;
    });

    const preparation = div
      .querySelector(".form")
      .shadowRoot.querySelector(".preparation")
      .shadowRoot.querySelector(".text-area") as any;

    if (nameValue.length <= 0) {
      confirm("Le falta ingresar el nombre de la receta");
      return;
    }
    if (preparation.value.length <= 0) {
      confirm("Le falta ingresar la preparación de la receta");
      return;
    } else {
      const recipe = {
        id: Math.random(),
        name: nameValue,
        ingredients: ingredientes,
        preparation: preparation.value,
        deleted: false,
      };

      state.addNewRecipe(recipe);
    }

    params.goTo("/recipes");
  }
  addListeners();
  return div;
}
