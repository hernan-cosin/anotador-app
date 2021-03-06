import { initHome } from "../src/pages/home";
import { initTodoList } from "./pages/todolist";
import { initNotes } from "./pages/notes";
import { initShoppingList } from "./pages/shopping-list";
import { initNewRecipes } from "./pages/new-recipe";
import { initRecipes } from "./pages/recipes";

const routes = [
  {
    path: /\/home/,
    page: initHome,
  },
  {
    path: /\/todoList/,
    page: initTodoList,
  },
  {
    path: /\/notes/,
    page: initNotes,
  },
  {
    path: /\/shoppingList/,
    page: initShoppingList,
  },
  {
    path: /\/recipes/,
    page: initRecipes,
  },
  {
    path: /\/new-recipe/,
    page: initNewRecipes,
  },
  {
    path: /\/anotador-app/,
    page: initHome,
  },
];

export function initRouter(container: Element) {
  function goTo(path) {
    history.pushState({}, "", path);
    handleRoute(path);
  }

  function handleRoute(route) {
    for (const r of routes) {
      if (r.path.test(route)) {
        const el = r.page({ goTo: goTo });
        container.firstChild?.remove();
        container.appendChild(el);
      }
    }
  }
  if (location.host.includes("github.io")) {
    goTo("/anotador-app");
  }
  if (location.pathname == "/") {
    goTo("/home");
  } else {
    handleRoute(location.pathname);
  }
  window.onpopstate = function () {
    handleRoute(location.pathname);
  };
}
