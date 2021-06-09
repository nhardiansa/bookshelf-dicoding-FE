const STORAGE_KEY = "BOOK_LIST";

let bookTemp = [];

function isStorageExist(){
  if (typeof(Storage) === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false
  }
  return true
}

function saveBook(){
  const parsed = JSON.stringify(bookTemp);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}

function loadBookFromStorage(){
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) {
    bookTemp = data;
  }

  document.dispatchEvent(new Event('ondataloaded'));
}

function updateDataToStorage() {
  if (isStorageExist()){
    saveBook();
  }
}

function composeBookObject(title, author, year, isComplete) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isComplete
  }
}

function getBook(bookId) {
  for(book of bookTemp) {
    if(book.id === bookId) {
      return book;
    }
    return null;
  }
}

function getBookIndex(bookId) {
  let index = 0
  for (book of bookTemp) {
    if (book.id === bookId) {
      return index
    }
    index++
  }
  return -1;
}