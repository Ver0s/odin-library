// GET ELEMENTS FROM HMTL
const bookAddForm = document.querySelector('#bookAddForm');
const bookCardContainer = document.querySelector('.book-card-container');

// GLOBAL VARIABLES
let myLibrary = [];

// ATTACH EVENT LISTENERS
bookAddForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
    displayBook();
})

// BOOK OBJECT AND METHOD CONSTRUCTOR
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary() {
    // check if same book already exists
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('input[type="checkbox"]').checked;
    // https://stackoverflow.com/questions/44565816/javascript-toggle-switch-using-data
    // https://www.w3schools.com/howto/howto_css_switch.asp

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

// maybe make this function accept props when called
function createBookCard() {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
}

function displayBook() {
    if (myLibrary.length === 0) return
}


