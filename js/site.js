// const button = document.getElementById("button");
// const list = document.getElementById("list");
//
// button.addEventListener("click", () =>{
//   while(list.firstChild){
//     list.removeChild(list.firstChild);
//   }
//   const string = document.getElementById("string").value;
//
//   const splitString = string.split(";");
// splitString.forEach(string => {
//
//   let element = document.createElement("li");
//   element.style.color = "blue";
//   element.textContent = string;
//   list.appendChild(element);
//
// });
// });


document.addEventListener("DOMContentLoaded", () =>{
  getCategoryList();
  categoryAdd();
});


//============================================================================
//GET Category List
//============================================================================
function categoryListUpdate(){
  const createButton = document.getElementById("create-category-button");
  createButton.addEventListener("click", getCategoryList(listContainer));
}

function getCategoryList(){
  const listContainer = document.getElementById("category-list");
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 200  ) {
        listContainer.innerHTML = this.responseText;
        //After category list is loaded, add listeners
        categoryDeleteListener();
        categoryUpdateListener();
    } //end if statement
  } //end ready state change function
  httpRequest.open('GET', 'includes/categoryList.php', true);
  httpRequest.send();
}

//============================================================================
//POST create Catgory
//============================================================================
function categoryAdd(){
  const createButton = document.getElementById("create-category-button");
  const categoryForm = document.getElementById("category-form");
    categoryForm.addEventListener("submit", (e)=>{
      e.preventDefault();
      createCategory();
    });
}

function createCategory(){
  const listContainer = document.getElementById("category-list");
  const catName = document.getElementById("category-name");
  const catColor = document.getElementById("category-color");
  httpRequest = new XMLHttpRequest();
  let data = "category_name=" + catName.value + "&category_color=" + catColor.value;
  httpRequest.open("POST", "ajaxPages/createCategory.php", true);
  httpRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      getCategoryList();
      catName.value = "";
      catColor.value = "";
    }
  };
  httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded", true);
  httpRequest.send(data);
}

//============================================================================
//UPDATE  Catgory
//============================================================================
function categoryUpdateListener(){
  const updateCategoryButton = document.getElementsByClassName("category-edit");
  let editButtonArray = makeArray(updateCategoryButton);
    editButtonArray.forEach((button) => {
      button.addEventListener("click", ()=>{
        let id = button.dataset.categoryid;
        getEditCategory(id);
      });
    });

}

function getEditCategory(id){
  const updateCategoryButton = document.getElementsByClassName("category-edit");
  let editButtonArray = makeArray(updateCategoryButton);
  //DOM traversal to locate and select parent element of category to be edited
  let parentElement;
  for(let i = 0; i < editButtonArray.length; i++){
    if(editButtonArray[i].dataset.categoryid === id){
      console.log(editButtonArray[i].parentElement.parentElement);
      parentElement = editButtonArray[i].parentElement.parentElement;
    }
  }
  console.log(parentElement);
  //AJAX Request
  let httpRequest = new XMLHttpRequest();
  let data = "category_id=" + id;
  console.log(data);
  httpRequest.open("GET", "ajaxPages/getEditCategory.php?" + data, true);
  httpRequest.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      console.log("hello");
      parentElement.innerHTML = this.responseText;
      parentElement.style.height = "auto";
      editCategoryFormListener();
    }
  }
  httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded", true);
  httpRequest.send();
}

function editCategoryFormListener(){
  const editCategoryForm = document.getElementById("updateCategoryForm");
  editCategoryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target);
    postUpdatedCategory();
  });
  editCategoryForm.addEventListener("reset", () => {
    getCategoryList();
  });
}

function postUpdatedCategory(){
  let catId = document.getElementById("editCatID");
  let editCatName = document.getElementById("editCatName");
  let editCatColor = document.getElementById("editCatColor");

  let httpRequest = new XMLHttpRequest();
  let data = "category_id=" + catId.value +
             "&category_name=" + editCatName.value +
             "&category_color=" + editCatColor.value;
  console.log(data);
  httpRequest.open("POST", "ajaxPages/postEditCategory.php", true);
  httpRequest.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      getCategoryList();
      console.log(this.responseText);
    }
  }
  httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded", true);
  httpRequest.send(data);
}

//============================================================================
//DELETE  Catgory
//============================================================================
function categoryDeleteListener(){
  const deleteCategoryButton = document.getElementsByClassName("category-delete") ;
    let deleteButtonArray = makeArray(deleteCategoryButton);
  //  let firstTime = false;
    deleteButtonArray.forEach((button) => {
      button.addEventListener("click", ()=>{
        let id = button.dataset.categoryid;
        deleteCategory(id);
    });
  }); //end adding listener
//  firstTime = true;
}

function deleteCategory(id){
  let httpRequest = new XMLHttpRequest();
  let data = "category_id=" + id;
  httpRequest.open("POST", "ajaxPages/deleteCategory.php", true);
  httpRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      getCategoryList();
    }
  }
  httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded", true);
  httpRequest.send(data);
}

//============================================================================
//Helper functions
//============================================================================

function makeArray(element){
  let array = [];
  for(let i = 0; i < element.length; i++){
    array.push(element[i]);
  }
  return array;
}
