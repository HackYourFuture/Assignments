/* eslint-disable no-autofix/prefer-const */
//cspell: disable
/*
  
 ** Exercise 1: The book list **

  I'd like to display my three favorite books inside a nice webpage!

  1. Iterate through the array of books.
  2. For each book, create a `<p>`
  element with the book title and author and append it to the page.
  3. Use a `<ul>`  and `<li>` to display the books.
  4. Add an `<img>` to each book that links to a URL of the book cover.
  5. Change the style of the book depending on whether you have read it(green) or not(red).

  The end result should look something like this:
  https: //hyf-js2-week1-makeme-ex1-demo.herokuapp.com/

*/
//cspell: enable

function createBookList(books) {
  // your code goes in here, return the ul element

  for (let i = 0; i < books.length; i++) {
    let bookP = document.createElement('p');
    let bookDescription = document.createTextNode(books[i].title + ' - ' + books[i].author);
    bookP.appendChild(bookDescription);
    document.body.appendChild(bookP);
  }

  let bookList = document.createElement('ul');

    for (let i = 0; i < books.length; i++) {
      let bookItem = document.createElement('li');
      let bookDescription = document.createTextNode(books[i].title + ' - ' + books[i].author);
      bookItem.appendChild(bookDescription);
      let bookImg = document.createElement('img');
      bookImg.src = books[i].img;
      bookItem.appendChild(bookImg);


      if (books[i].alreadyRead) {
        bookItem.style.color = 'green';
      }
      else {
        bookItem.style.color = 'red';
      }
      bookList.appendChild(bookItem);
    }
    document.body.appendChild(bookList);

  return bookList;
}

const myBooks = [
  {
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    alreadyRead: false,
  },
  {
    title: 'The Most Human Human',
    author: 'Brian Christian',
    alreadyRead: true,
  },
  {
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    alreadyRead: true,
  },
];

const ulElement = createBookList(myBooks);

// document.querySelector('#bookList').appendChild(ulElement);
