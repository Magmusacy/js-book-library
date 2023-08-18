const myLibrary = [];
const booksSection = document.querySelector('#books-section');
const newBookForm = document.querySelector('#add-book');

function Book(title, author, pagesCount, readStatus) {
    this.title = title;
    this.author = author;
    this.pagesCount = pagesCount;
    this.readStatus = readStatus;
    this.readInfo = () => this.readStatus ? 'Read' : 'Not read';
}

function addBookToLibrary(title, author, pagesCount, readStatus) {
    const newBook = new Book(title, author, pagesCount, readStatus);
    myLibrary.push(newBook);
}

function displayBooks() {
    booksSection.innerHTML = "";
    for (let book of myLibrary) {
        const newBook = 
            `<section class="book-card">
                <h2>Title: ${book.title}</h2>
                <p>Author: ${book.author}</p>
                <p>Pages: ${book.pagesCount}</p>
                <p>Read status: ${book.readInfo()}</p>
            </section>`;
        booksSection.innerHTML += newBook;
    }
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
