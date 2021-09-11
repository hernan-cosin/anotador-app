import { state } from "../../state";
export function initShoppingList(params) {
  const div = document.createElement("div");
  const style = document.createElement("style");

  div.innerHTML = ` 
          <c-header class="header" back-button="true"></c-header>
          <div class="container">
              <c-text class="title" variant="title">Mi lista</c-text>
              <c-form class="form" place-holder="Nuevo item . . ."></c-form>
              <ul class="items-container">
              <span class="line"></span>
              </ul>
          </div>
      `;
  style.innerHTML = ` 
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap');

    .header {
      display: block;
      font-family: "Poppins", sans-serif;
    }
  
    .container {
      width: 100%;
      height: calc(100vh - 120px);
      background-color: var(--bg);
      overflow: auto;
      padding: 0 10px;
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

    .line {
      display: block;
      position: absolute;
      width: 2px;
      height: calc(100% - 20px);
      right: 115px;
      background-color: var(--black);
    }
  
    .title {
        display: block;
        text-align: center;
        margin: 40px 0 0 0;
    }
  
    @media (min-width: 769px) {
        .title {
          margin: 50px 0 0 0;
        }
    }
  
    .form {
        display: block;
        max-width: 470px;
        margin: 20px auto 40px auto;
    }

    .items-container{
      min-width: 345px;
      max-width: 470px;
      width: 100%;
      min-height: 255px;
      height: auto;
      margin: 0 auto 30px auto;
      background-color: lightblue;
      padding: 10px 15px; 
      animation: fadeInFRight 2s;
      animation-fill-mode: forwards;
      position: relative;
    }
  
    @keyframes fadeInFRight {
      0% {
        opacity: 0;
      }
      35% {
        opacity: 0;
      } 
      100% {
        opacity: 1;
      }
    }

    .c-item {
      display: block;
    }

    .li {
      list-style: none;
      margin: 0 0 20px 0;
    }

    .li.total-li {
      position: relative;
    }

    .calculate-btn {
      background-color: transparent;
      border-radius: 53% 40% 55% 40%;
      border: 1px solid black;
      padding: 5px 20px;
      font-family: 'Gloria Hallelujah', cursive;
      position: relative;
      left: 100%;
      margin: 0 0 0 -185px;
      cursor: pointer;
    }
 
    .calculate-btn:hover {
      transform: scale(1.05);
      border-radius: 45% 55% 40% 55%;
    }

    .total-price {
      position: relative;
      left: 100%;
      margin: 0 0 0 45px;
      display: inline-block;
      font-family: 'Gloria Hallelujah', cursive;
    }
      `;

  function addListeners() {
    const lis = div.querySelectorAll(".li");
    const lisArr = Array.from(lis);

    const backBtn = div
      .querySelector(".header")
      .shadowRoot.querySelector(".back-button")
      .shadowRoot.querySelector(".btn");

    backBtn.addEventListener("click", (e) => {
      e.preventDefault();
      params.goTo("/home");
    });

    const addBtn = div
      .querySelector(".form")
      .shadowRoot.querySelector(".button");

    const input = div
      .querySelector(".form")
      .shadowRoot.querySelector(".input") as any;

    addBtn.addEventListener("click", (e) => {
      e.preventDefault();

      if (input.value.length == 0) {
        return;
      } else {
        state.addItem(Math.random(), input.value);
      }
      input.value = "";
    });

    div.addEventListener("price", (e: any) => {
      const selected = lisArr.find((l) => {
        return l.id == e.detail.id;
      });

      const priceInput = selected.children[0].shadowRoot
        .querySelector(".container")
        .querySelector(".price-input");
      priceInput.classList.toggle("display");
    });

    div.addEventListener("check", (e: any) => {
      state.changeItemsState(e.target.id, e.detail.value);
    });

    div.addEventListener("trash", (e: any) => {
      const selected = lisArr.find((i) => {
        return i.id == e.detail.id;
      });
      const imgTrash =
        selected.children[0].shadowRoot.querySelector(".img-trash");
      imgTrash.classList.toggle("display");

      imgTrash.addEventListener("click", (e: any) => {
        state.deleteItem(selected.id, true);
      });

      const notSelected = lisArr.filter((i) => {
        return i.id !== e.detail.id && i.id;
      });
      for (const ns of notSelected) {
        ns.children[0].shadowRoot
          .querySelector(".img-trash")
          .classList.remove("display");
      }
    });

    const totalSumButton = div.querySelector(".calculate-btn");
    totalSumButton.addEventListener("click", () => {
      const arrayOfPrices = [];

      const lis = div.querySelectorAll(".li");
      const lisArr = Array.from(lis);

      const onlyLisWithPrice = lisArr.filter((l) => {
        return l.id;
      });

      for (const li of onlyLisWithPrice) {
        const priceShadowEl = li.children[0].shadowRoot.querySelector(
          ".price-input"
        ) as any;
        const price = parseInt(priceShadowEl.value);

        arrayOfPrices.push(price || 0);

        state.addPrice(li.id, price);
      }
      const total = state.calculateTotalPrice(arrayOfPrices);
      const priceContainer = div.querySelector(".total-price");
      priceContainer.textContent = total.toString();
    });
  }

  function createList() {
    const itemsContainer = div.querySelector(".items-container");
    const items = state.getEnabledItems();
    itemsContainer.innerHTML = `
      <span class="line"></span>
    `;
    for (const i of items) {
      const li = document.createElement("li");
      li.setAttribute("class", "li");
      li.setAttribute("id", i.id);

      li.innerHTML = `
        <c-item class="c-item" id='${i.id}' text-content='${
        i.textContent
      }' price='${i.price}' ${i.completed ? "checked" : ""}></c-item>
      `;

      itemsContainer.appendChild(li);
    }

    const liCalculateBtn = document.createElement("li");
    liCalculateBtn.setAttribute("class", "li total-li");
    liCalculateBtn.innerHTML = `
      <button class="calculate-btn">Total</button>
      <p class="total-price"></p>
    `;

    itemsContainer.appendChild(liCalculateBtn);

    addListeners();
  }
  createList();

  state.subscribe(() => {
    createList();
  });
  div.appendChild(style);
  return div;
}
