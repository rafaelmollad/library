const formEl = document.querySelector("#form");
const bookNameEl = document.querySelector("#book");
const bookAuthorEl = document.querySelector("#author");
const bookStatusEl = document.querySelector("#status");

const tableBodyEl = document.querySelector(".books-table__body");

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

function Book(name, author, status) {
  this.name = name;
  this.author = author;
  this.status = status;
}

// Adds new book to library
function addBookToLibrary(book) {
  myLibrary.push(book);
}

// Delete book from library
function deleteBook(bookId) {
  myLibrary.splice(bookId, 1);
}

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
    <td>${book.status}</td>
    <td><button class="delete" data-book-id=${index}>Delete</button></td>
    `;

    tableBodyEl.append(row);
  });

  // Add event listener to every delete button
  document.querySelectorAll(".delete").forEach((btn) => {
    btn.addEventListener("click", () => {
      deleteBook(btn.dataset.bookId);
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

displayBooks(myLibrary);
