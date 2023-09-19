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
https://hackyourfuture.github.io/example-pages/Browsers/Week1/1-booklist/

-----------------------------------------------------------------------------*/
//cspell: enable

function createBookList(books) {
  // for book1
  const listcontainer = document.createElement("ul")
  const firstList = document.createElement('li')
  firstList.classList.add("list")
  const fImg = document.createElement("img")
  fImg.src = books[0].profile
  firstList.appendChild(fImg)
  
  const title = document.createElement('p')
  title.innerText = books[0].title
  firstList.appendChild(title)
  const Author = document.createElement('p')
  Author.innerText = books[0].author
  firstList.appendChild(Author)
  const status1 = document.createElement("p")

  books[0].alreadyRead?    status1.classList.add("greenstatusteller"):  status1.classList.add("statusteller")

  firstList.appendChild(status1)
  listcontainer.appendChild(firstList)
  // for book2
  const secondList = document.createElement('li')
  secondList.classList.add("list")
  const sImg = document.createElement("img")
  sImg.src = books[1].profile
  secondList.appendChild(sImg)
  
  const title2 = document.createElement('p')
  title2.innerText = books[1].title
  secondList.appendChild(title2)
  const Author2 = document.createElement('p')
  Author2.innerText = books[1].author
  secondList.appendChild(Author2)
  const status2 = document.createElement("p")

  
  books[1].alreadyRead?    status2.classList.add("greenstatusteller"):  status2.classList.add("statusteller")
  secondList.appendChild(status2)
  listcontainer.appendChild(secondList)
  // for book2
  const thirdList = document.createElement('li')
  thirdList.classList.add("list")
  const thirdImg = document.createElement("img")
  thirdImg.src = books[2].profile
  thirdList.appendChild(thirdImg)
  
  const title3 = document.createElement('p')
  title3.innerText = books[2].title
  thirdList.appendChild(title3)
  const Author3 = document.createElement('p')
  Author3.innerText = books[2].author
  thirdList.appendChild(Author3)
  const status3 = document.createElement("p")
 
  books[2].alreadyRead?    status3.classList.add("greenstatusteller"):  status3.classList.add("statusteller")
  thirdList.appendChild(status3)
  listcontainer.appendChild(thirdList)



  return listcontainer

}

function main() {
  const myBooks = [
    {
      title: 'The Design of Everyday Things',
      author: 'Don Norman',
      isbn: '978-0465050659',
      profile:"./assets/the_design_of_everyday_things.jpg",
      alreadyRead: false,
    },
    {
      title: 'The Most Human Human',
      author: 'Brian Christian',
      isbn: '978-1617933431',
      profile:"./assets/the_most_human_human.jpg" ,
      alreadyRead: true,
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt',
      isbn: '978-0201616224',
      profile:"./assets/the_pragmatic_programmer.jpg",
      alreadyRead: true,
    },
  ];

  const ulElement = createBookList(myBooks);
  document.querySelector('#bookList').appendChild(ulElement);
}

window.addEventListener('load', main);
