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
    imgSrc: 'url(assets/the_design_of_everyday_things.jpg)',
  },
  {
    title: 'The Most Human Human',
    author: 'Brian Christian',
    isbn: '978-1617933431',
    alreadyRead: true,
    imgSrc: 'url(assets/the_most_human_human.jpg)',
  },
  {
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    isbn: '978-0201616224',
    alreadyRead: true,
    imgSrc: 'url(assets/the_pragmatic_programmer.jpg)',
  },
];

function createBookList(books) {
  const ulElement = document.createElement('ul');
  ulElement.style.display = 'flex';
  document.querySelector('#bookList').appendChild(ulElement);

  for (let i = 0; i < books.length; i++) {
    const liElement = document.createElement('li');
    liElement.setAttribute(
      'style',
      'width:calc(30% - 20px); display:block; margin: 10px 20px; padding: 10px;min-width:300px;background-color:red;listStyle :none'
    );

    if (books[i].alreadyRead === true) {
      liElement.style.backgroundColor = 'green';
    }

    ulElement.appendChild(liElement);
    const liElementText = document.createElement('p');
    liElementText.textContent = `${books[i].title} - ${books[i].author}`;
    const liImg = document.createElement('img');
    liImg.src = `${books[i].imgSrc}`;
    liImg.alt = `${books[i].imgSrc}`;
    // the picture doesn't show up the page, but when i called as a background, it is ok. of course it is not the way we are inquired.
    // liImg.style.backgroundImage = books[i].imgSrc;
    liImg.setAttribute('style', ' height:400px;float:left; margin: 20px;');

    liElement.appendChild(liElementText);
    liElement.appendChild(liImg);
  }
}
const ulElement = createBookList(myBooks);

document.querySelector('#bookList').appendChild(ulElement);
