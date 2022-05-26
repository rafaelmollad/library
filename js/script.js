// Get elements
const formEl = document.querySelector("#form");
const bookNameEl = document.querySelector("#book");
const bookAuthorEl = document.querySelector("#author");
const bookStatusEl = document.querySelector("#status");
const tableBodyEl = document.querySelector(".books-table__body");

// Array to store each Book
const myLibrary = [
  {
    name: "Harry Potter y la piedra filosofal",
    author: "J.K Rowling",
    status: "Read",
  },
  {
    name: "Fantastic Beasts and Where to Find Them",
    author: "J.K Rowling",
    status: "Not Read",
  },
  {
    name: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    status: "Read",
  },
];

// Book constructor
function Book(name, author, status) {
  this.name = name;
  this.author = author;
  this.status = status;
}

// Add new book to library
function addBookToLibrary(book) {
  myLibrary.push(book);
}

// Delete book from library
function deleteBook(bookId) {
  myLibrary.splice(bookId, 1);
}

// Toggle Book status
Book.prototype.toggleStatus = function () {
  this.status = this.status === "Read" ? "Not Read" : "Read";
  console.log(this);
};

// Display books
const displayBooks = () => {
  // Clear dom
  tableBodyEl.innerHTML = "";

  // Loop through each book in myLibrary and update the DOM
  myLibrary.forEach((book, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${book.name}</td>
    <td>${book.author}</td>
    <td><button class="status-btn" data-book-id=${index}>${book.status}</button></td>
    <td><button class="delete-btn" data-book-id=${index}>Delete</button></td>
    `;

    tableBodyEl.append(row);
  });

  // Add event listener to every delete button
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      deleteBook(btn.dataset.bookId);
      displayBooks();
    });
  });

  // Add event listener to every status button
  document.querySelectorAll(".status-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      myLibrary[btn.dataset.bookId].toggleStatus();
      displayBooks();
    });
  });
};

formEl.addEventListener("submit", (e) => {
  console.log("Form submitted");
  e.preventDefault();

  // Get form values
  const name = bookNameEl.value;
  const author = bookAuthorEl.value;
  const status = bookStatusEl.value === "read" ? "Read" : "Not Read";

  // Create new Book
  const newBook = new Book(name, author, status);

  // Add new book to my library
  addBookToLibrary(newBook);

  // Re render the list of books
  displayBooks(myLibrary);

  // Clear inputs
  bookNameEl.value = "";
  bookAuthorEl.value = "";
});

// First render
displayBooks(myLibrary);
