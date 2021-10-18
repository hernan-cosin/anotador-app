import { initButton } from "./components/button";
import { initForm } from "./components/form";
import { initHeader } from "./components/header";
import { initNote } from "./components/note-item";
import { initText } from "./components/text";
import { initTaskItem } from "./components/todo-item";
import { initShoppingItem } from "./components/shopping-list";
import { initButtonContained } from "./components/button-contained";
import { initRouter } from "./router";
import { initNewRecipeForm } from "./components/new-recipe-form";
import { initRecipesInfoCard } from "./components/recipes-info-card";
import { state } from "./state";
import { initRecipeItem } from "./components/recipe-item";

(function () {
  initHeader();
  initButton();
  initText();
  initForm();
  initTaskItem();
  initNote();
  initShoppingItem();
  initButtonContained();
  initRecipeItem();
  initNewRecipeForm();
  initRecipesInfoCard();
  state.init();
  initRouter(document.querySelector(".root"));
})();
