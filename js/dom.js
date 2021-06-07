const HAS_NOT_READ = 'incompleteBookshelfList'
const HAS_READ = 'completeBookshelfList'

// Menambah buku baru
function addNewBook() {
  const bookTitle = document.getElementById('inputBookTitle').value;
  const bookAuthor = document.getElementById('inputBookAuthor').value;
  const bookYear = document.getElementById('inputBookYear').value;
  const bookHaveRead = document.getElementById('inputBookIsComplete').checked;
  
  let container;

  if(bookHaveRead){
    container = document.getElementById(HAS_READ);
  }else{
    container = document.getElementById(HAS_NOT_READ);
  }

  const newBook = makeBookElement(bookTitle, bookAuthor, bookYear, bookHaveRead);
  
  container.append(newBook);
}

// Pembuatan item Buku
function makeBookElement(title, author, year, haveRead) {
  const titleElement = document.createElement('h3');
  titleElement.innerText = title;

  const authorELement = document.createElement('p');
  authorELement.innerText = 'Penulis: '+author;

  const yearELement = document.createElement('p');
  // yearELement.classList.add('year')
  yearELement.innerText ='Tahun: ' +year;

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add("action")

  // membuat button
  if (haveRead) {
    buttonContainer.append(UndoReadBook(), DeleteBook())
  }else{
    buttonContainer.append(HasReadBook(), DeleteBook())
  }

  console.log(haveRead)
  
  const articleElement = document.createElement('article');
  articleElement.classList.add("book_item");

  articleElement.append(titleElement, authorELement, yearELement, buttonContainer);

  return articleElement;
}

// Pembuatan Button
function createButton(buttonColor, buttonText, eventListener) {
  const button = document.createElement('button');
  button.classList.add(buttonColor);

  button.innerText = buttonText

  button.addEventListener("click", function(event) {
    eventListener(event);
  })

  return button;
}

function HasReadBook() {
  return createButton("green", "Telah dibaca", function(event){
    const btnContainer = event.target.parentElement;
    moveBook(btnContainer.parentElement, "do");
  })
}

function UndoReadBook() {
  return createButton("green", "Baca kembali", function(event){
    const btnContainer = event.target.parentElement;
    moveBook(btnContainer.parentElement);
  })
}

function DeleteBook() {
  return createButton("red", "Hapus buku", function(event){
    const wrapper = event.target.parentElement
    const itemList = wrapper.parentElement
    itemList.remove();
  })
}

// Memindahkan buku
function moveBook(itemElement, condition = "undo"){
  const title = itemElement.querySelector("h3").innerText;
  const author = itemElement.querySelectorAll("p")[0].innerText;
  const year = itemElement.querySelectorAll("p")[1].innerText;

  console.log(author)
  console.log(year)

  let container, newBook

  if(condition === "undo"){
    container = document.getElementById(HAS_NOT_READ)
    newBook = makeBookElement(title, author, year, false)
    container.append(newBook)
  }else{
    container = document.getElementById(HAS_READ)
    newBook = makeBookElement(title, author, year, true)
    container.append(newBook)
  }

  itemElement.remove()
}