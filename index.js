import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://kitten-cart-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize the firebase configurations
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingList = document.getElementById("shopping-list");

const renderShoppingList = (itemValue) => {
  const html = `<li>${itemValue}</li>`;
  shoppingList.insertAdjacentHTML("beforeend", html);
};

const clearInputFieldEl = (el) => {
  inputFieldEl.value = "";
};

// Add-to-cart event handler
addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  // 1. push `inputValue` into data base
  // push(shoppingListInDB, inputValue);

  // 2. Insert the value as a `<li>` into `<ul>`
  renderShoppingList(inputValue);

  // 3. Empty the input field after submitting
  clearInputFieldEl();

  console.log(inputValue);
});
