const formEl = document.querySelector("#form");
const tableBodyEl = document.querySelector(".books-table__body");

const myLibrary = [
  {
    name: "Harry Potter y la piedra filosofal",
    author: "J.K Rowling",
    read: true,
  },
  {
    name: "Fantastic Beasts and Where to Find Them",
    author: "J.K Rowling",
    read: false,
  },
  {
    name: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    read: true,
  },
];

function Book(name, author, read) {
  this.name = name;
  this.author = author;
  this.read = read;
}

// Adds new book to library
function addBookToLibrary(book) {
  myLibrary.push(book);
}

// Delete book from library
function deleteBook() {}

// Display books
const displayBooks = (books) => {
  // Clear dom
  tableBodyEl.innerHTML = "";

  books.forEach((book) => {
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${book.name}</td>
    <td>${book.author}</td>
    <td>${book.read ? "Read" : "Not Read"}</td>
    <td><button>Delete</button></td>
    `;

    tableBodyEl.append(row);
  });
};

formEl.addEventListener("submit", (e) => {
  console.log("Form submitted");
  e.preventDefault();

  // Get values from form
  const name = e.target[0].value;
  const author = e.target[1].value;
  const read = e.target[2].value;

  // Create new Book
  const newBook = new Book(name, author, read);

  // Add new book to my library
  myLibrary.push(newBook);

  // Re render the list of books
  displayBooks(myLibrary);

  // Clear inputs
  e.target[0].value = "";
  e.target[1].value = "";
});

// Call display books
displayBooks(myLibrary);
