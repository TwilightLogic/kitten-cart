import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://kitten-cart-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
let deleteTimeout;
let startTime;
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

inputFieldEl.focus();

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  inputValue.trim() === "" ? "" : push(shoppingListInDB, inputValue);

  clearInputFieldEl();
});

onValue(shoppingListInDB, function (snapshot) {
  // snapshot.exists(): to show items when there are items in the database
  if (snapshot.exists()) {
    // Fetching data(key, value) from database
    let itemsArray = Object.entries(snapshot.val());

    clearShoppingListEl();

    itemsArray.forEach((item) => {
      let currentItem = item;
      // let currentItemID = currentItem[0];
      // let currentItemValue = currentItem[1];

      appendItemToShoppingListEl(currentItem);
    });
  } else {
    shoppingListEl.innerHTML = "No items here... yet";
  }
});

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

const removeItem = function (db, id) {
  startTime = Date.now();
  let exactLocationOfItemInDB = ref(db, `shoppingList/${id}`);

  deleteTimeout = setTimeout(() => {
    remove(exactLocationOfItemInDB);
  }, 1000);
};

function appendItemToShoppingListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let newEl = document.createElement("li");

  newEl.textContent = itemValue;

  // Long press the button to delete the item
  // Laptop
  newEl.addEventListener("mousedown", removeItem.bind(null, database, itemID));

  newEl.addEventListener("mouseup", () => {
    Date.now() - startTime < 1000 ? clearTimeout(deleteTimeout) : "";
  });

  // Mobile devices
  newEl.addEventListener("touchstart", removeItem.bind(null, database, itemID));
  newEl.addEventListener("touchend", () => {
    Date.now() - startTime < 1000 ? clearTimeout(deleteTimeout) : "";
  });

  shoppingListEl.append(newEl);
}
