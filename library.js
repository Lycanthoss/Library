//#region VARIABLES

initStorage();

let library = [];

const menu_button = document.getElementById("menu");
const search_box = document.getElementById("search-input");
const search_button = document.getElementById("search-button");
const book_grid = document.getElementById("book-grid");
const add_button = document.getElementById("add-button");
const fill_form_button = document.getElementById("fill-form-button");
const close_button = document.getElementById("close-overlay");
const overlay = document.getElementById("fill-form-overlay");
overlay.style.display = "none";

//#endregion VARIABLES

//#region CONSTRUCTORS

/** @param {string} title 
 *  @param {string} author
 *  @param {string} pages
*/
function Book(title, author, pages, isRead) {
    this.id = generateNextId();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

//#endregion CONSTRUCTORS

//#region LIBRARY FUNCTIONS

/** @param {string} title 
 *  @param {string} author
 *  @param {string} pages
*/
function addBookToLibrary(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    library.push(book);
    const bookElement = generateBookElement(book);
    book_grid.append(bookElement);

    let readButtons = document.getElementsByClassName("read-button");
    let readButton = readButtons[readButtons.length - 1];
    let deleteButtons = document.getElementsByClassName("delete-button");
    let deleteButton = deleteButtons[deleteButtons.length - 1];
    assignEventHandlers(readButton, deleteButton);
}

function shiftIds(startIndex) {
    for (let i = startIndex; i < library.length; i++) {
        library[i].id--;
    }

    let bookItems = document.getElementsByClassName("book-item");

    let iterator = 1;
    for (const book of bookItems) {
        book.setAttribute("data-id", iterator);
        book.style.order = `${iterator}`;
        iterator++;
    }
}

function generateNextId() {
    if (library.length == 0) return 1;
    return library[library.length - 1].id + 1;
}

//#endregion LIBRARY FUNCTIONS

//#region UI FUNCTIONS

function toggleFillForm() {
    if (overlay.style.display == "none") {
        overlay.style.opacity = "1";
        overlay.style.width = "100%";
        overlay.style.height = "100vh";
        overlay.style.display = "flex";
    }
    else {
        overlay.style.opacity = "0";
        overlay.style.width = "0%";
        overlay.style.height = "0vh";
        overlay.style.display = "none";
    }
    let title = document.getElementById("input-title");
    let author = document.getElementById("input-author");
    let pages = document.getElementById("input-pages");

    title.value = "";
    author.value = "";
    pages.value = "";
}

function toggleCheckMark(img, state) {
    if (!state) {
        img.classList.replace("fa-check", "fa-times");
    }
    else {
        img.classList.replace("fa-times", "fa-check");
    }
}

/** @param {HTMLButtonElement} buttonRef */
function markRead(buttonRef) {
    let bookNode = buttonRef.parentNode;
    let idValue = parseInt(bookNode.getAttribute("data-id"));
    let statusNode = bookNode.getElementsByTagName("p")[2];

    /** @type {Book} */
    let book = library[idValue - 1];

    if (book.isRead) {
        book.isRead = false;
        statusNode.textContent = "Status: Reading";
    }
    else {
        book.isRead = true;
        statusNode.textContent = "Status: Finished";
    }

    toggleCheckMark(buttonRef.children[0], book.isRead);
}

/** @param {HTMLButtonElement} buttonRef */
function removeBookFromLibrary(buttonRef) {
    let bookNode = buttonRef.parentNode;
    let idValue = parseInt(bookNode.getAttribute("data-id"));

    library.splice(idValue - 1, 1);
    bookNode.remove();
    shiftIds(idValue - 1);
}

/** @param {Book} book 
 *  @returns {HTMLDivElement}
*/
function generateBookElement(book) {

    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-item");
    bookDiv.style.order = book.id;
    const idAttribute = document.createAttribute("data-id");
    idAttribute.value = book.id;
    bookDiv.setAttributeNode(idAttribute);



    const title = document.createElement("h2");
    title.textContent = `${book.title}`;
    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;
    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;
    const status = document.createElement("p");
    status.textContent = `Status: ${book.isRead == false ? "Reading" : "Finished"}`;



    const readButton = document.createElement("button");
    readButton.classList.add("read-button");
    const readButtonImage = document.createElement("i");
    readButtonImage.classList.add("fas", "fa-times");
    readButton.append(readButtonImage);



    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    const deleteButtonImage = document.createElement("i");
    deleteButtonImage.classList.add("fas", "fa-trash");
    deleteButton.append(deleteButtonImage);



    bookDiv.append(title, author, pages, status, readButton, deleteButton);

    return bookDiv;
}

function render() {
    const books = getLibraryArray();

    for (const book of books) {
        addBookToLibrary(book.title, book.author, book.pages, book.isRead);
    }
}

//#endregion UI FUNCTIONS

//#region EVENTS

function assignEventHandlers(readBut, delBut) {
    readBut.addEventListener("click", () => {
        markRead(readBut);
        updateLibraryArray(library);
    });
    
    delBut.addEventListener("click", () => {
        removeBookFromLibrary(delBut);
        updateLibraryArray(library);
    });
}

add_button.addEventListener("click", () => {
    toggleFillForm();
});

fill_form_button.addEventListener("click", () => {
    const title = document.getElementById("input-title").value;
    const author = document.getElementById("input-author").value;
    const pages = document.getElementById("input-pages").value;

    if (title == "" || author == "" || pages == "") return;
    
    addBookToLibrary(title, author, pages, false);
    toggleFillForm();
    updateLibraryArray(library);
});

close_button.addEventListener("click", () => {
    toggleFillForm();
});

//#endregion EVENTS

render();