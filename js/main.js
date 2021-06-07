document.addEventListener('DOMContentLoaded', function () {
  const formInput = document.querySelector("#inputBook");
  const formSearch = document.querySelector("#searchBook");

  formInput.addEventListener('submit', function (event) {
    event.preventDefault();
    addNewBook();
  })
  
  formSearch.addEventListener('submit', function (event) {
    event.preventDefault();
  })
  
});