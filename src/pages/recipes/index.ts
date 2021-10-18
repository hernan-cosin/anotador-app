import { state } from "../../state";

export function initRecipes(params) {
  const div = document.createElement("div");
  const style = document.createElement("style");

  div.innerHTML = ` 
          <c-header class="header" back-button="true"></c-header>
          <div class="container">
            <c-text class="title" variant="title">Recetario</c-text>
            <div class="recipe-info-container"></div>
            <contained-button class="contained-button" size="18">Nueva receta</contained-button>
            <div class="info-container">
            </div>
            <ul class="recipes-list">
            </ul>
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
        min-height: 100vh;
        background-color: var(--bg);
        overflow: auto;
      }
      
      @media (min-width: 769px) {
        .container{
          height: calc(100vh - 120px);
          min-height: 100vh;
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

      .recipe-info-container {

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

      .contained-button {
        display: block;
        text-align: center;
        margin: 15px 0 0 0;
      }
      
      .recipes-list {
          max-width: 600px;
          height: auto;
          margin: 45px auto 0 auto;
          padding: 0;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 15px;
          justify-content: space-around;
          padding: 0 0 30px 0;
        }
        
        .li {
          list-style: none;
          max-width: 275px;
          width: 100%;
          display: inline-block;
      }

      .r-item {
        display: block;
      }
      }
      `;

  const backBtn = div
    .querySelector(".header")
    .shadowRoot.querySelector(".back-button")
    .shadowRoot.querySelector(".btn");
  const newRecipeButton = div.querySelector(".contained-button");
  const recipeInfoContainer = div.querySelector(".recipe-info-container");

  function loadList() {
    const recipeListContainer = div.querySelector(".recipes-list");
    recipeListContainer.innerHTML = ``;
    const recetas = state.getEnabledRecipes();

    for (const r of recetas) {
      const li = document.createElement("li");
      li.setAttribute("class", "li");
      li.setAttribute("id", r.id);
      li.innerHTML = `
      <recipe-item class="r-item" id="${r.id}">${r.name}</recipe-item>
      `;
      recipeListContainer.appendChild(li);
    }
  }

  function addListeners() {
    backBtn.addEventListener("click", (e) => {
      e.preventDefault();
      params.goTo("/home");
    });

    newRecipeButton.addEventListener("click", (e) => {
      e.preventDefault();
      params.goTo("/new-recipe");
    });

    div.addEventListener("selected", (e: any) => {
      const item = e.detail.shadowRoot.querySelector(".item-container");
      item.classList.add("active");

      const restItems = div
        .querySelector(".recipes-list")
        .querySelectorAll(".li");

      const restItemsArr = Array.from(restItems);
      const unselectedRecipes = restItemsArr.filter((li) => {
        return li.id !== e.detail.id;
      });

      for (const i of unselectedRecipes) {
        i.querySelector(".r-item")
          .shadowRoot.querySelector(".item-container")
          .classList.remove("active");
      }
      const deleteBtn = e.detail.shadowRoot.querySelector(".trash");
      deleteBtn.addEventListener("click", () => {
        const confirmDelete = confirm(
          "Se eliminara permanentemente una receta del recetario. ¿Está seguro/a?"
        );
        confirmDelete ? state.deleteRecipe(e.detail.id) : "";
      });

      const openBtn = e.detail.shadowRoot.querySelector(".open-btn");
      openBtn.addEventListener("click", () => {
        recipeInfoContainer.innerHTML = ``;
        const receta = state.getRecipeData(e.detail.id);
        const template = `<recipe-card ingredients="${receta.ingredients}" preparation="${receta.preparation}">${receta.name}</recipe-card>`;
        const card = document.createRange().createContextualFragment(template);
        recipeInfoContainer.appendChild(card);
      });
    });

    div.addEventListener("close-recipe", () => {
      recipeInfoContainer.innerHTML = ``;
    });
  }

  loadList();

  state.subscribe(() => {
    loadList();
  });
  addListeners();

  div.appendChild(style);
  return div;
}
