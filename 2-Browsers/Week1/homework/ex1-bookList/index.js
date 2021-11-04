//cspell: disable
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/2-Browsers/Week1#exercise-1-the-book-list

I'd like to display my three favorite books inside a nice webpage!

1. Iterate through the array of books.
2. For each book, create a `<p>`
element with the book title and author.
3. Use a `<ul>`  and `<li>` to display the books.
4. Add an `<img>` to each book that links to a URL of the book cover.
5. Change the style of the book depending on whether you have read it(green) or not(red).

The end result should look something like this:
https: //hyf-js2-week1-makeme-ex1-demo.herokuapp.com/

-----------------------------------------------------------------------------*/
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
    alreadyRead: true,
    isbn: '978-0201616224',
  },
];

function createBookList(books) {
  const imgs = [
    {
      title: 'The Design of Everyday Things',
      img: './assets/the_design_of_everyday_things.jpg',
    },
    {
      title: 'The Most Human Human',
      img: './assets/the_most_human_human.jpg',
    },
    {
      title: 'The Pragmatic Programmer',
      img: './assets/the_pragmatic_programmer.jpg',
    },
  ];
  // TODO your code goes in here, return the ul element
  const bookList = document.getElementById('bookList');
  const ul = document.createElement('ul');
  ul.classList.add('flex-ul');
  books.forEach((book) => {
    const li = document.createElement('li');
    const p = document.createElement('p');
    const img = document.createElement('img');

    bookList.appendChild(li);
    p.textContent = `${book.title}-${book.author}`;
    li.appendChild(p);
    const imgObject = imgs.filter((item) => item.title === book.title);
    img.src = imgObject[0].img;
    img.alt = book.title;
    li.appendChild(img);
    book.alreadyRead
      ? li.classList.add('green-book')
      : li.classList.add('red-book');
  });
  const allLi = document.querySelectorAll('li');
  const liArray = Array.from(allLi);
  liArray.forEach((liTag) => ul.appendChild(liTag));
  return ul;
}

const ulElement = createBookList(myBooks);

document.querySelector('#bookList').appendChild(ulElement);
