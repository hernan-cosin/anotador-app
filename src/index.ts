import { initButton } from "./components/button";
import { initForm } from "./components/form";
import { initHeader } from "./components/header";
import { initNote } from "./components/note-item";
import { initText } from "./components/text";
import { initTaskItem } from "./components/todo-item";
import { initShoppingItem } from "./components/shopping-list";
import { initRouter } from "./router";
import { state } from "./state";

(function () {
  initHeader();
  initButton();
  initText();
  initForm();
  initTaskItem();
  initNote();
  initShoppingItem();
  state.init();
  initRouter(document.querySelector(".root"));
})();
