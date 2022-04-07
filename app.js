// select items
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editID = "";

// *******event listeners*******
// submit form
form.addEventListener("submit", addItem);
// clear items
clearBtn.addEventListener('click', clearItems);



// functions
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    const element = document.createElement('article');
    //    add class
    element.classList.add('grocery-item');
    // add id
    let attr = document.createAttribute("data-id")
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item")
    element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;

    const deleteBtn = element.querySelector(".delete-btn");
    const editBtn = element.querySelector(".edit-btn");

    deleteBtn.addEventListener('click', deleteItem);
    editBtn.addEventListener('click', editItem);

    //   append child
    list.appendChild(element);
    // display alert
    displayAlert("item added to the list", "success");
    // add to local storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault();
    // show container
    container.classList.add("show-container");
  }
  else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert('value changed', 'success');
    // edit local storage
    editLocalStorage(editID, value);
    setBackToDefault();
  }
  else {
    displayAlert('please enter value', 'danger');
  }
}

// display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  // remove alert
  setInterval(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000)
}
// clear items
function clearItems() {
  const items = document.querySelectorAll('.grocery-item')

  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item)
    })
  }
  container.classList.remove("show-container");
  displayAlert('list is empty', 'danger');
  setBackToDefault();
  // localStorage.removeItem('list'); 
}
// delete function
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container")
  }
  displayAlert('item removed', 'danger');
  setBackToDefault();
  // remove from local storage
  // removeFromLocalStorage(id)
}
// Edit function
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  // set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "edit";

}

// set back to default
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}
// local storage
function addToLocalStorage(id, value) {
  const grocery = { id, value }
  let items = localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
  console.log(items);
  // console.log('added to local storage');
}
function removeFromLocalStorage(id) { };
function editLocalStorage(id, value) {

}
// local storage API
// set Item
// get Item
// remove Item
//  save as strings

// localStorage.setItem("mango", JSON.stringify(["fozli", "nangra"]));

// const mangos = JSON.parse(localStorage.getItem("mango"));
// console.log(mangos)
// localStorage.removeItem("mango")
// *****setup items****

