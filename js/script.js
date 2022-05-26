const tableBodyEl = document.querySelector(".books-table__body");

const myLibrary = [
  {
    name: "Harry Potter y la piedra filosofal",
    author: "J.K Rowling",
    pages: 309,
    read: true,
  },
  {
    name: "Fantastic Beasts and Where to Find Them",
    author: "J.K Rowling",
    pages: 750,
    read: false,
  },
  {
    name: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    pages: 336,
    read: true,
  },
];

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  // do stuff here
  myLibrary.push(book);
}

// Display books
const displayBooks = (books) => {
  books.forEach((book) => {
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${book.name}</td>
    <td>${book.author}</td>
    <td>${book.read ? "Read" : "Not Read"}</td>
    `;

    tableBodyEl.append(row);
  });
};

const winter = new Book("This Winter", "Alice Oseman", 144, false);
addBookToLibrary(winter);

const wonder = new Book("Wonder", "R. J. Palacio", 320, false);
addBookToLibrary(wonder);

// Call display books
displayBooks(myLibrary);
