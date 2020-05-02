class Book {
  constructor(title, author, isbn) {
    (this.title = title), (this.author = author), (this.isbn = isbn);
  }
}

class UI {
  static displayBooks() {
    const books = stores.getBook();

    books.forEach((book) => UI.addBookToList(book));
  }
  static addBookToList(book) {
    const list = document.getElementById("book-list");
    const row = document.createElement("tr");

    row.innerHTML = `
     <td>${book.title}</td>
     <td>${book.author}</td>
     <td>${book.isbn}</td>
     <td><a href='#' class= 'btn btn-danger btn-sm delete'>X</a> </td>
     `;

    list.appendChild(row);
  }
  static deleteBook(et) {
    if (et.classList.contains("delete")) {
      et.parentElement.parentElement.remove();
    }
  }
  static showAlert(message, className) {
    // console.log("sachin");
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.getElementById("book-form");
    container.insertBefore(div, form);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }
  static clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}
class stores {
  static getBook() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static addBook(book) {
    const books = stores.getBook();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = stores.getBook();
    // const isbn1 = isbn;
    // console.log(isbn1);
    const filtered = books.filter((book) => {
      book.isbn !== isbn;
    });

    localStorage.setItem("books", JSON.stringify(filtered));
  }
}

//displaying boos
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// adding boos

document.getElementById("book-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("add details idot", "danger");
  } else {
    const book = new Book(title, author, isbn);
    UI.addBookToList(book);
    stores.addBook(book);
    UI.showAlert("Book added successfully", "success");
    UI.clearFields();
  }
});

document.getElementById("book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);
  stores.removeBook(e.target.parentElement.previousElementSibling.textContent);

  UI.showAlert("Book Removed successfully", "success");
});
