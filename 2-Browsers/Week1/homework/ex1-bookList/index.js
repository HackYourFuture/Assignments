//cspell: disable
/*
  
 ** Exercise 1: The book list **

  I'd like to display my three favorite books inside a nice webpage!

  1. Iterate through the array of books.
  2. For each book, create a `<p>`
  element with the book title and author.
  3. Use a `<ul>`  and `<li>` to display the books.
  4. Add an `<img>` to each book that links to a URL of the book cover.
  5. Change the style of the book depending on whether you have read it(green) or not(red).

  The end result should look something like this:
  https: //hyf-js2-week1-makeme-ex1-demo.herokuapp.com/

*/
//cspell: enable

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

// function createBookList(books) {
//   books.forEach((book) => {
//     document.querySelector('#booklist');
//     const bookDiv = document.createElement('div');
//     div.innerText = `book is here`;
//     (bookDiv.style.background = 'orange'),
//       (width = '200px'),
//       (height = '300px'),
//       (margin = '10px 20px');
//     bookDiv.appendChild(bookDiv);
//   });
// }

// function createBookList(books) {
//   books.forEach(function (book) {
//     //create a DOM element
//     let target = document.querySelector('#bookList');
//     let div = document.createElement('div');
//     //add class row every 2 loops
//     div.className = 'row';
//     //names
//     div.innerHTML = 'books';
//     div.append(target);
//   });
// }

// const ulElement = createBookList(myBooks);

// document.querySelector('#bookList').appendChild(ulElement);
