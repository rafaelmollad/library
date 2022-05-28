// Get elements
const formEl = document.querySelector("#form");
const bookNameEl = document.querySelector("#book");
const bookAuthorEl = document.querySelector("#author");
const bookStatusEl = document.querySelector("#status");
const tableBodyEl = document.querySelector(".books-table__body");

// Get books from localStorage and convert each into a Book instance
const myLibrary = JSON.parse(localStorage.getItem("books") || "[]").map(
  (book) => new Book(book.name, book.author, book.status)
);

// Book constructor
function Book(name, author, status) {
  this.name = name;
  this.author = author;
  this.status = status;
}

// Toggle Book status
Book.prototype.toggleStatus = function () {
  this.status = !this.status;
};

// Add new book to library
function addBookToLibrary(book) {
  myLibrary.push(book);
  updateLocalStorage();
}

// Delete book from library
function deleteBook(bookId) {
  myLibrary.splice(bookId, 1);
  updateLocalStorage();
}

// Update localStorage
function updateLocalStorage() {
  localStorage.setItem("books", JSON.stringify(myLibrary));
}

// Display books
const displayBooks = () => {
  // Clear dom
  tableBodyEl.innerHTML = "";

  // Loop through each book in myLibrary and update the DOM
  myLibrary.forEach((book, index) => {
    const row = document.createElement("tr");
    const statusBtnClass = book.status ? "btn-success" : "btn-secondary";
    const statusBtnText = book.status ? "Read" : "Not Read";

    row.innerHTML = `
    <td class="align-middle">${book.name}</td>
    <td class="align-middle">${book.author}</td>
    <td><button class="btn ${statusBtnClass} text-nowrap status-btn" data-book-id=${index}>${statusBtnText}</button></td>
    <td><button class="btn btn-danger delete-btn" data-book-id=${index}>Delete</button></td>
    `;

    tableBodyEl.append(row);
  });

  // Add event listener to every delete button
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const bookName = myLibrary[btn.dataset.bookId].name;

      if (confirm(`Are you sure you want to delete "${bookName}"?`)) {
        deleteBook(btn.dataset.bookId);
        displayBooks();
      }
    });
  });

  // Add event listener to every status button
  document.querySelectorAll(".status-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      myLibrary[btn.dataset.bookId].toggleStatus();
      updateLocalStorage();
      displayBooks();
    });
  });
};

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = bookNameEl.value;
  const author = bookAuthorEl.value;
  const status = bookStatusEl.value === "read" ? true : false;

  // Create new Book
  const newBook = new Book(name, author, status);

  // Add new book to my library
  addBookToLibrary(newBook);

  // Re render the list of books
  displayBooks(myLibrary);

  // Clear inputs
  bookNameEl.value = "";
  bookAuthorEl.value = "";
  bookStatusEl.value = "not-read";
});

// First render
displayBooks(myLibrary);
