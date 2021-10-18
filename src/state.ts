class Tarea {
  id: number;
  textContent: string;
  completed: boolean = false;
  deleted: boolean = false;
  date: any;
}

class Note {
  id: number;
  textContent: string;
  deleted: boolean = false;
  date: string;
}

class ListItem {
  id: number;
  textContent: string;
  completed: boolean = false;
  deleted: boolean = false;
  price: number = 0;
}

class Recipe {
  id: number;
  name: string;
  ingredients: string[];
  preparation: string;
  deleted: boolean = false;
}

const state = {
  data: {
    tasks: [
      {
        id: 10,
        textContent: "test",
        completed: false,
        deleted: true,
        date: "",
      },
    ],
    notes: [
      {
        id: 10,
        textContent: "test",
        completed: false,
        deleted: true,
        date: "",
      },
    ],
    listItem: [
      {
        id: 10,
        textContent: "test",
        completed: false,
        deleted: true,
        price: 0,
      },
    ],
    recipes: [
      {
        id: 10,
        name: "test",
        ingredients: ["string"],
        preparation: "string",
        deleted: true,
      },
    ],
  },
  listeners: [],
  init() {
    const firstState = localStorage.getItem("saved-state-anotador");
    if (!firstState) {
      return;
    } else {
      this.setState(JSON.parse(firstState));
    }
  },
  getState() {
    return this.data;
  },
  setState(newState: object) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem(
      "saved-state-anotador",
      JSON.stringify(this.getState())
    );
  },
  addTask(id, textContent) {
    const tarea = new Tarea();
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth();
    const anio = fecha.getFullYear();
    const [hour, minutes] = [fecha.getHours(), fecha.getMinutes()];

    tarea.id = id;
    tarea.textContent = textContent;
    tarea.date = dia + "/" + mes + "/" + anio + " " + [hour + ":" + minutes];

    const currentState = this.getState();
    currentState?.tasks.push(tarea);
    this.setState(currentState);
  },
  deleteTask(id, value) {
    const currentState = this.getState();
    const found = currentState.tasks.find((t) => {
      return t.id == id;
    });
    found.deleted = value;
    this.setState(currentState);
  },
  getEnabledTasks() {
    const currentState = this.getState();
    const filtered = currentState.tasks?.filter((t) => {
      return t.deleted == false;
    });
    return filtered;
  },
  changeTaskState(id, value) {
    const currentState = this.getState();

    const found = currentState.tasks.find((t) => {
      return t.id == id;
    });
    found.completed = value;
    this.setState(currentState);
  },
  subscribe(callBack) {
    this.listeners.push(callBack);
  },
  addNote(id, textContent) {
    const nota = new Note();
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth();
    const anio = fecha.getFullYear();
    const [hour, minutes] = [fecha.getHours(), fecha.getMinutes()];

    nota.id = id;
    nota.textContent = textContent;
    nota.date = dia + "/" + mes + "/" + anio + " " + [hour + ":" + minutes];

    const currentState = this.getState();
    currentState?.notes.push(nota);
    this.setState(currentState);
  },
  deleteNotes(id, value) {
    const currentState = this.getState();
    const found = currentState.notes.find((n) => {
      return n.id == id;
    });
    found.deleted = value;
    this.setState(currentState);
  },
  getEnabledNotes() {
    const currentState = this.getState();
    const notes = currentState.notes;
    const filtered = notes.filter((n) => {
      return n.deleted == false;
    });
    return filtered;
  },
  changeNotesState(id, value) {
    const currentState = this.getState();

    const found = currentState.notes.find((n) => {
      return n.id == id;
    });
    found.completed = value;
    this.setState(currentState);
  },
  addItem(id, textContent) {
    const item = new ListItem();
    item.id = id;
    item.textContent = textContent;

    const currentState = this.getState();
    currentState?.listItem.push(item);
    this.setState(currentState);
  },
  addPrice(id, price) {
    const currentState = this.getState();
    const found = currentState.listItem.find((i) => {
      return i.id == id;
    });
    found.price = price;
    this.setState(currentState);
  },
  deleteItem(id, value) {
    const currentState = this.getState();
    const found = currentState.listItem.find((i) => {
      return i.id == id;
    });

    found.deleted = value;
    this.setState(currentState);
  },
  getEnabledItems() {
    const currentState = this.getState();
    const items = currentState.listItem;
    const filtered = items.filter((i) => {
      return i.deleted == false;
    });
    return filtered;
  },
  changeItemsState(id, value) {
    const currentState = this.getState();

    const found = currentState.listItem.find((i) => {
      return i.id == id;
    });

    found.completed = !value;

    this.setState(currentState);
  },
  // calculateTotalPrice(array: number[]) {
  //   const reducer = (previousValue, currenValue) => {
  //     return previousValue + currenValue;
  //   };
  //   return array.reduce(reducer);
  // },
  addNewRecipe(recipe: Recipe) {
    const lastState = this.getState();
    const recipes = lastState.recipes;
    recipes.push(recipe);
    this.setState(lastState);
  },
  getEnabledRecipes() {
    const lastState = this.getState();
    const recipes = lastState.recipes;
    const filtered = recipes.filter((r) => {
      return r.deleted == false;
    });
    return filtered;
  },
  deleteRecipe(id: number) {
    const lastState = this.getState();
    const found = lastState.recipes.find((r) => {
      return r.id == id;
    });
    found.deleted = true;
    state.setState(lastState);
  },
  getRecipeData(id) {
    const lastState = this.getState();
    const found = lastState.recipes.find((r) => {
      return r.id == id;
    });
    return found;
  },
};

export { state };
