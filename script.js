// GET ELEMENTS FROM HMTL
const bookAddForm = document.querySelector('#bookAddForm');
const bookCardContainer = document.querySelector('.book-card-container');
const bookAddFormModal = document.querySelector('#bookAddFormModal');
const showModalBtn = document.querySelector('#showModal');
const closeModalBtn = document.querySelector('#closeModal');

// GLOBAL VARIABLES
let myLibrary = [];

// ATTACH EVENT LISTENERS
window.addEventListener('load', () => {
    updateBookCount();
    emptyStateMessage();
});

window.addEventListener('click', outsideClick);

showModalBtn.addEventListener('click', showModal);

closeModalBtn.addEventListener('click', closeModal);

bookAddForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
    createBookCard(myLibrary[getLatestBookIndex()]);
    updateBookCount();
    closeModal();
    emptyStateMessage();
    bookAddForm.reset();
})

bookCardContainer.addEventListener('click', e => {
    if (e.target.tagName === 'IMG') {
        const index = e.target.closest('.book-card').getAttribute('data-book-index');
        deleteBook(index);
        updateIndexes();
        updateBookCount();
    }
    if (e.target.tagName === 'INPUT') {
        const index = e.target.closest('.book-card').getAttribute('data-book-index');
        updateIndexes();
        myLibrary[index].toggleReadStatus();
        updateBookCount();
    }
})

// BOOK OBJECT AND METHOD CONSTRUCTOR
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.toggleReadStatus = function () {
    this.read = (this.read === true) ? false : true;
}

function addBookToLibrary() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#setReadStatus').checked;

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function createBookCard(book) {
    const bookCard = document.createElement('div');
    bookCardContainer.appendChild(bookCard);
    bookCard.classList.add('book-card');
    bookCard.setAttribute('data-book-index', getLatestBookIndex());

    const bookInfo = document.createElement('div');
    const h2 = document.createElement('h2');
    const p1 = document.createElement('p'); 
    const p2 = document.createElement('p'); 
    bookInfo.classList.add('book-info');
    h2.textContent = book.title;
    p1.textContent = `by ${book.author}`;
    p2.textContent = `${book.pages} pages`;
    bookCard.appendChild(bookInfo);
    bookInfo.appendChild(h2);
    bookInfo.appendChild(p1);
    bookInfo.appendChild(p2);

    const bookEdit = document.createElement('div');
    const readStatus = document.createElement('div');
    const p3 = document.createElement('p'); 
    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    const img = document.createElement('img');
    bookEdit.classList.add('book-edit');
    readStatus.classList.add('read-status');
    label.classList.add('switch');
    span.classList.add('slider', 'round');
    p3.textContent = 'Read:';
    input.setAttribute('type', 'checkbox');
    img.setAttribute('src', 'images/delete.svg');
    input.checked = (document.querySelector('#setReadStatus').checked === true) ? true : false;
    label.appendChild(input);
    label.appendChild(span);
    readStatus.appendChild(p3);
    readStatus.appendChild(label);
    bookEdit.appendChild(readStatus);
    bookEdit.appendChild(img);
    bookCard.appendChild(bookEdit);
}

function deleteBook(index) {
    const cardToRemove = document.querySelector(`[data-book-index="${myLibrary.indexOf(myLibrary[index])}"]`);
    bookCardContainer.removeChild(cardToRemove);
    myLibrary.splice(index, 1);
}

function getLatestBookIndex() {
    return (myLibrary.length-1 >= 0) ? myLibrary.length-1 : 0;
}

function updateIndexes() {
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach((bookCard, i) => {
        bookCard.setAttribute('data-book-index', i);
    })
}

function updateBookCount() {
    const totalBoooks = document.querySelector('#totalBooks');
    const readBooks = document.querySelector('#readBooks');
    const unreadBooks = document.querySelector('#unreadBooks');
    let totalBooksCount = myLibrary.length;
    let readBooksCount = myLibrary.filter(book => book.read === true).length;

    totalBoooks.textContent = `Total books: ${totalBooksCount}`;
    readBooks.textContent = `Read books: ${readBooksCount}`;
    unreadBooks.textContent = `Unread books: ${totalBooksCount - readBooksCount}`;
}

function closeModal() {
    bookAddFormModal.style.display = 'none';
}

function showModal() {
    bookAddFormModal.style.display = 'block';
}

function outsideClick(e) {
    if (e.target === bookAddFormModal) {
        bookAddFormModal.style.display = 'none';
    }
}

function emptyStateMessage() {
    if (myLibrary.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'It seems that you don\'t have any books yet.';
        bookCardContainer.appendChild(message);
    } else {
        bookCardContainer.removeChild(bookCardContainer.firstChild);
    }
}