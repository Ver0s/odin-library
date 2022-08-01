// GET ELEMENTS FROM HMTL
const bookAddForm = document.querySelector('#bookAddForm');
const bookCardContainer = document.querySelector('.book-card-container');

// GLOBAL VARIABLES
let myLibrary = [];

// ATTACH EVENT LISTENERS
bookAddForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
    createBookCard(myLibrary[0]);
    // displayBook();
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
function createBookCard(book) {
    const bookCard = document.createElement('div');
    bookCardContainer.appendChild(bookCard);
    bookCard.classList.add('book-card');

    const bookInfo = document.createElement('div');
    bookCard.appendChild(bookInfo);
    bookInfo.classList.add('book-info');
    const h2 = document.createElement('h2');
    h2.textContent = book.title;
    const p1 = document.createElement('p'); 
    p1.textContent = book.author;
    const p2 = document.createElement('p'); 
    p2.textContent = book.pages;
    bookInfo.appendChild(h2);
    bookInfo.appendChild(p1);
    bookInfo.appendChild(p2);

    const bookEdit = document.createElement('div');
    bookEdit.classList.add('book-edit');
    const readStatus = document.createElement('div');
    readStatus.classList.add('read-status');
    const p3 = document.createElement('p'); 
    p3.textContent = 'Read:';
    const label = document.createElement('label');
    label.classList.add('switch');
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    const span = document.createElement('span');
    span.classList.add('slider', 'round');
    label.appendChild(input);
    label.appendChild(span);
    readStatus.appendChild(p3);
    readStatus.appendChild(label);
    const img = document.createElement('img');
    img.setAttribute('src', 'images/delete.svg');
    bookEdit.appendChild(readStatus);
    bookEdit.appendChild(img);
    bookCard.appendChild(bookEdit);
}

function displayBook() {
    if (myLibrary.length === 0) return
}


