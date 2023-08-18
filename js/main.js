const myLibrary = [];
const booksSection = document.querySelector('#books-section');
const newBookForm = document.querySelector('#add-book');

function Book(title, author, pagesCount, readStatus) {
    this.title = title;
    this.author = author;
    this.pagesCount = pagesCount;
    this.readStatus = readStatus;
}

Book.prototype.readInfo = function() {
    return this.readStatus ? 'Read' : 'Not read'
};

function addBookToLibrary(title, author, pagesCount, readStatus) {
    const newBook = new Book(title, author, pagesCount, readStatus);
    myLibrary.push(newBook);
}

function displayBooks() {
    booksSection.innerHTML = "";
    for (const [index, book] of myLibrary.entries()) {
        const newBook = 
            `<section class="book-card">
                <h2>Title: ${book.title}</h2>
                <p>Author: ${book.author}</p>
                <p>Pages: ${book.pagesCount}</p>
                <p>Read status: ${book.readInfo()}</p>
                <div class="buttons">
                    <button class="change-read-button" data-book-id=${index}>Change read status</button>
                    <button class="delete-button" data-book-id=${index}>Delete</button>
                </div>
            </section>`;
        booksSection.insertAdjacentHTML("beforeend", newBook);
        initializeBookButtons(index);
    }
};

function initializeBookButtons(bookIndex) {
    const deleteButton = document.querySelector(`.delete-button[data-book-id="${bookIndex}"]`);
    const changeReadStatusButton = document.querySelector(`.change-read-button[data-book-id="${bookIndex}"]`);
    initializeDeleteButton(deleteButton, bookIndex);
    initializeChangeReadStatusButton(changeReadStatusButton, bookIndex);
};

function initializeDeleteButton(button, bookIndex) {
    button.addEventListener('click', function() {
        myLibrary.splice(bookIndex, 1);
        displayBooks();
    });
};

function initializeChangeReadStatusButton(button, bookIndex) {
    const book = myLibrary[bookIndex];
    button.addEventListener('click', function() {
        book.readStatus = book.readStatus ? false : true;
        console.log(book);
        displayBooks();
    });
};

newBookForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = this.elements.title.value;
    const author = this.elements.author.value;
    const pagesCount = this.elements['pages-count'].value;
    const readStatus = this.elements['read-status'].checked;
    addBookToLibrary(title, author, pagesCount, readStatus);
    displayBooks();
    this.reset();
});
