/* eslint-disable hyf/no-commented-out-code */
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

  // for (let i = 0; i < books.length; i++) {
  //   let bookP = document.createElement('p');
  //   eslint-disable-next-line hyf/no-commented-out-code
  //   let bookDescription = document.createTextNode(books[i].title + ' - ' + books[i].author);
  //   bookP.appendChild(bookDescription);
  //   document.body.appendChild(bookP);
  // }

  const bookList = document.createElement('ul');

  bookList.style.cssText = `
              display:flex;
              flex-wrap:wrap;
              padding:40px;
              width:calc( 100% - 30px);
              list-style:none`;


  for (const v of books) {

      //creating li and img element
      let bookItem = document.createElement('li');
      let bookImg = document.createElement('img');

      //adding style to img
      bookImg.style.height = '270px';
      
      // Adding images
      if (v.author === 'Don Norman') {
      bookImg.src = './assets/the_design_of_everyday_things.jpg';
      }
      else if (v.author === 'Brian Christian'){
      bookImg.src = './assets/the_most_human_human.jpg';
      }
      else {
      bookImg.src = './assets/the_pragmatic_programmer.jpg';
      }
      let bookP = document.createElement('p');
      // creating title for each book
      let bookDescription = document.createTextNode(v.title + ' - ' + v.author);
      bookP.appendChild(bookDescription);
      document.body.appendChild(bookP);

      bookItem.style.cssText = `
                        width:calc(25% - 51px);
                        margin:15px;
                        padding:10px;
                        padding-top:25px`;

      if (v.alreadyRead) {

                        bookItem.style.backgroundColor = "green";
      }
      else {  
                        
                        bookItem.style.backgroundColor = "red";
      }
      
      // bookItem.appendChild(bookDescription); // Append bookDescription to bookItem
      bookItem.appendChild(bookP);
      bookItem.appendChild(bookImg);         // Append bookImg to bookItem
      bookList.appendChild(bookItem);        // Append bookItem to bookList
    
      
  }
   //  document.body.appendChild(bookList);     // Append bookList to document
    
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

document.querySelector('#bookList').appendChild(ulElement);
