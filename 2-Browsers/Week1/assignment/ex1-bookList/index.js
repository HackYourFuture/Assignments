function createBookList(books) {
  const bookListEl = document.createElement('ul');

  books.forEach((book) => {
    const bookItemEl = document.createElement('li');
    bookItemEl.classList.add('book-item');

    const bookInfoEl = document.createElement('div');
    bookInfoEl.classList.add('book-info');

    const bookTitleEl = document.createElement('p');
    bookTitleEl.textContent = book.title;
    bookTitleEl.classList.add('book-title');

    const bookAuthorEl = document.createElement('p');
    bookAuthorEl.textContent = book.author;
    bookAuthorEl.classList.add('book-author');

    bookInfoEl.appendChild(bookTitleEl);
    bookInfoEl.appendChild(bookAuthorEl);

    const bookCoverEl = document.createElement('img');
    bookCoverEl.src = getCoverImagePath(book.title);
    bookCoverEl.alt = `Book cover for ${book.title}`;
    bookCoverEl.classList.add('book-cover');

    bookItemEl.style.backgroundColor = book.alreadyRead
      ? 'var(--finished-book-color)'
      : 'var(--unfinished-book-color)';

    bookItemEl.appendChild(bookInfoEl);
    bookItemEl.appendChild(bookCoverEl);

    bookListEl.appendChild(bookItemEl);
  });

  return bookListEl;
}

function getCoverImagePath(bookTitle) {
  const words = bookTitle.toLowerCase().split(' ');
  return `./assets/${words.join('_')}.jpg`;
}

function main() {
  const myBooks = [
    {
      title: 'The Design of Everyday Things',
      author: 'Don Norman',
      isbn: '978-0465050659',
      alreadyRead: false,
    },
    {
      title: 'The Most Human Human',
      author: 'Brian Christian',
      isbn: '978-1617933431',
      alreadyRead: true,
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt',
      isbn: '978-0201616224',
      alreadyRead: true,
    },
  ];

  const ulElement = createBookList(myBooks);
  document.querySelector('#bookList').appendChild(ulElement);
}

window.addEventListener('load', main);
