// Before we start:
// Go firebase and adding some data

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://kitten-cart-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const booksInDB = ref(database, "books");

const booksEl = document.getElementById("books");

// Fetch data from firebase
// 1. reference
// 2. a function that we want to do
// The onValue method is commonly used to keep a web page updated
// with real-time data from the Firebase database.
// Whenever the data at the specified location in the database changes,
// the callback function is invoked,
// allowing the web page to update its content accordingly.
onValue(booksInDB, function (snapshot) {
  let booksArray = Object.values(snapshot.val());

  clearBooksListEl();

  // Challenge: Write a for loop where you console log each book.
  booksArray.forEach((book) => {
    let currentBook = book;

    appendBookToBooksListEl(currentBook);
  });
});

function clearBooksListEl() {
  booksEl.innerHTML = "";
}

function appendBookToBooksListEl(bookValue) {
  booksEl.innerHTML += `<li>${bookValue}</li>`;
}
