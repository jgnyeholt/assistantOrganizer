document.addEventListener("DOMContentLoaded", () =>{
  getCategoryList();
  categoryAdd();
  recipeInit();
});

//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================
//RECIPES
//CATEGORIES


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
        recipesByCategoryListener();
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
  httpRequest.open("POST", "ajaxPages/category/createCategory.php", true);
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
  httpRequest.open("GET", "ajaxPages/category/getEditCategory.php?" + data, true);
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
  httpRequest.open("POST", "ajaxPages/category/postEditCategory.php", true);
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
  httpRequest.open("POST", "ajaxPages/category/deleteCategory.php", true);
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

//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================
//RECIPES


//===========================================================================================
//Recipe Form
//===========================================================================================
function recipeInit(){
  addNewRecipeListener();
  showAllRecipeListOnLoad();
  backButtonListener();
}

function addNewRecipeListener(){
  const button = document.getElementById("addRecipeButton");
  button.addEventListener("click", ()=>{
    createRecipeForm();
    let backButton = document.getElementById("backButton");
    backButton.style.display = "block";
  });
}

function createRecipeForm(){
  const recipeListing = document.getElementById("recipeListing");
  let httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", "ajaxPages/recipe/recipeForm.php", true);
  httpRequest.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      recipeListing.innerHTML = this.responseText;
      addNewRecipeFormData();
      addIngredients();
      addInstructions();
      addCategories();
      saveRecipe();
    }
  }
  httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded", true);
  httpRequest.send();
}

function addNewRecipeFormData(){
  let recipeCategories = document.querySelector(".recipeCategory");
  console.log(recipeCategories);
  let httpRequest = new XMLHttpRequest();
  let data = "";
  httpRequest.open("GET", "ajaxPages/recipe/getCategories.php", true);
  httpRequest.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      recipeCategories.innerHTML = this.responseText;
    }
  }
  httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded", true);
  httpRequest.send();
}

function saveRecipe(){
  const recipeForm = document.getElementById("NewRecipeForm");
  let recipeName = document.getElementById("recipeName");
  let recipeCategory = "";
  let recipePrepTime = document.getElementById("prepTime");
  let recipeCookTime = document.getElementById("cookTime");
  let recipeOvenTemp = document.getElementById("ovenTemp");
  let recipeDescription = document.getElementById("description");
  let recipeDescriptionDisplay = document.getElementById("descriptionDisplay");
  let recipeFavorite = document.getElementById("favoritesDisplay");
  let recipeIngredients = "";
  let recipeInstructions = "";
  let recipeNotes = document.getElementById("notes");
  recipeForm.addEventListener("submit", (e) => {
    recipeIngredients = compileIngredients();
    recipeInstructions = compileInstructions();
    console.log(recipeIngredients);
    recipeCategory = compileCategories();
    e.preventDefault();
    console.log(recipeDescriptionDisplay.checked, recipeFavorite.checked);
    let httpRequest = new XMLHttpRequest();
    let data = "recipeName=" + recipeName.value +
               "&recipeCategory=" + recipeCategory +
               "&recipePrepTime=" + recipePrepTime.value +
               "&recipeCookTime=" + recipeCookTime.value +
               "&recipeOvenTemp=" + recipeOvenTemp.value +
               "&recipeDescription=" + recipeDescription.value +
               "&recipeDescriptionDisplay=" + recipeDescriptionDisplay.checked +
               "&recipeFavorite=" + recipeFavorite.checked +
               "&recipeIngredients=" + recipeIngredients +
               "&recipeInstructions=" + recipeInstructions +
               "&recipeNotes=" + recipeNotes.value;
    httpRequest.open("POST", "ajaxPages/recipe/addRecipe.php", true);
    httpRequest.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        console.log("it worked");
        recipeName.value = "";
        recipeCategory.value = "";
        recipePrepTime.value = "";
        recipeCookTime.value = "";
        recipeOvenTemp.value = "";
        recipeDescription.value = "";
        recipeDescriptionDisplay.value = "";
        recipeFavorite.value = "";
        recipeIngredients.value = "";
        recipeInstructions.value = "";
        recipeNotes.value = "";
        showAllRecipeListOnLoad();
        let backButton = document.getElementById("backButton");
        backButton.style.display = "none";
      }
    }
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded", true);
    httpRequest.send(data);
  });
}

function addIngredients(){
  const ingredientAddInput = document.getElementById("addIngredientInput");
  ingredientAddInput.addEventListener("click", ()=>{
    const ingredientList = document.getElementById("recipeIngredientList");
    console.log("click");
    let newInput = document.createElement("input");
    newInput.className = "ingredient";
    newInput.placeholder = "...add another ingredient";
    newInput.type = "text";
    ingredientList.appendChild(newInput);
  });
}

function addInstructions(){
  const instructionAddInput = document.getElementById("addInstructionInput");
  instructionAddInput.addEventListener("click", ()=>{
    const instructionList = document.getElementById("recipeInstuctionList");
    let newInput = document.createElement("input");
    newInput.className = "instruction";
    newInput.placeholder = "...add another instruction";
    newInput.type = "text";
    instructionList.appendChild(newInput);
  });
}

function addCategories(){
  const addCategorySelect = document.getElementById("addCategorySelect");
  addCategorySelect.addEventListener("click", ()=>{
    const recipeFormCategories = document.querySelector("#recipeCategoriesContainer");
    let newSelect = document.createElement("select");
    newSelect.className = "recipeCategory";
    let httpRequest = new XMLHttpRequest();
    let data = "";
    httpRequest.open("GET", "ajaxPages/recipe/getCategories.php", true);
    httpRequest.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        newSelect.innerHTML = this.responseText;
      }
    }
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded", true);
    httpRequest.send();
    recipeFormCategories.appendChild(newSelect);
  });
}

function compileIngredients(){
  let ingredients = document.getElementsByClassName("ingredient");
  let ingredientString = "";
  if(ingredients.length > 0){
    for(let i = 0; i < ingredients.length; i++){
      if(ingredients[i].tagName == "SPAN"){
        ingredientString += (ingredients[i].textContent.trim() + '|~|');
      } else if(ingredients[i].tagName == "INPUT"){
        ingredientString += (ingredients[i].value + '|~|');
      }
    }
  }
  return ingredientString;
}

function compileInstructions(){
  let instructions = document.getElementsByClassName("instruction");
  let instructionString = "";
  if(instructions.length > 0){
    for(let i = 0; i < instructions.length; i++){
      if(instructions[i].tagName == "SPAN"){
        instructionString += (instructions[i].textContent + '|~|');
      } else if (instructions[i].tagName == "INPUT"){
        instructionString += (instructions[i].value + '|~|');
      }
    }
  }
  return instructionString;
}

function compileCategories(){
  let categories = document.getElementsByClassName("recipeCategory");
  let categoryString = "";
  if(categories.length > 0){
    for(let i = 0; i < categories.length; i++){
      categoryString += (categories[i].value + "|~|");
      console.log(categoryString);
    }
  }
  return categoryString;
}



//===========================================================================================
//Recipe Display
//===========================================================================================


function showAllRecipeListOnLoad(){
  const recipeListing = document.getElementById("recipeListing");

  let httpRequest = new XMLHttpRequest();
  let data = "category=all";
  httpRequest.open("GET", "ajaxPages/recipe/getRecipes.php?" + data, true);
  httpRequest.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      recipeListing.innerHTML = this.responseText;
      showRecipeDetailsListener();
    }
  }
  httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded", true);
  httpRequest.send();
}

function recipesByCategoryListener(){
  const recipeListing = document.getElementById("recipeListing");
  let categoryListing = document.getElementsByClassName("CategoryName");
  categoryListing = Array.prototype.slice.call(categoryListing);
  console.log("hello");
  console.log(categoryListing.length);

  categoryListing.forEach((listing) => {
    listing.addEventListener("click", (e)=> {
      let httpRequest = new XMLHttpRequest();
      let data = "category=" + e.target.dataset.categoryname;
      console.log(data);
      httpRequest.open("GET", "ajaxPages/recipe/getRecipes.php?" + data, true);
      httpRequest.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
          recipeListing.innerHTML = this.responseText;
          showRecipeDetailsListener();
          document.getElementById("category-maintenance").style.display = "none";
          document.querySelector(".category-page-handler").classList.toggle("category-page-handler-rotate");

          //Set Back button info
          let backButton = document.getElementById("backButton")
          backButton.dataset.categoryname = e.target.dataset.categoryname;
          backButton.textContent = "Back to " + e.target.dataset.categoryname + " recipes";
          backButton.style.display = "none";
        }
      }
      httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded", true);
      httpRequest.send();
    }); //end listing event listener
  });
}


function showRecipeDetailsListener(){
  const recipeDetailsButton = document.getElementsByClassName("recipeDetailsButton");

  for(let i = 0; i < recipeDetailsButton.length; i++){
    recipeDetailsButton[i].addEventListener("click", (e)=>{
      let recipeId = e.target.value;
      console.log(recipeId);
      showRecipeDetails(recipeId);
    });
  }
}

function showRecipeDetails(recipeId){
  const recipeListing = document.getElementById("recipeListing");

  let httpRequest = new XMLHttpRequest();
  let data = "recipeId=" + recipeId;
  httpRequest.open("GET", "ajaxPages/recipe/getRecipeDetails.php?" + data, true);
  httpRequest.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      console.log("yes");
      recipeListing.innerHTML = this.responseText;
      addRecipeDetailsListener();
      addEditCategories();
      addEditIngredients();
      addEditInstructions();
      addDraggableListeners(".ingredDrag");
      addDraggableListeners(".instructDrag");
      deleteRecipeListener();
      //show back Button
      let backButton = document.getElementById("backButton");
      backButton.style.display = "block";
    }
  }
  httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded", true);
  httpRequest.send();
}

function backButtonListener(){
  const backButton = document.getElementById("backButton");

  backButton.addEventListener("click", (e) =>{
    let httpRequest = new XMLHttpRequest();
    let data = "category=" + e.target.dataset.categoryname;
    console.log(data);
    httpRequest.open("GET", "ajaxPages/recipe/getRecipes.php?" + data, true);
    httpRequest.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        recipeListing.innerHTML = this.responseText;
        showRecipeDetailsListener();

        //Set Back button info
        backButton.style.display = "none";
      }
    }
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded", true);
    httpRequest.send();
  });
}

//===========================================================================================
//Recipe Edit/Delete
//===========================================================================================
function addRecipeDetailsListener(){
  const elements = document.getElementsByClassName("editRecipeDetail");
  let elementArray = [];

  for(let i = 0; i < elements.length; i++){
    elementArray.push(elements[i]);
  }

  elementArray.forEach(element =>{
    element.addEventListener("input", (e)=>{
      let newValue;
      let recipeId;
      let recipeColumn;
      if(e.target.tagName === "SELECT"){
        recipeId = e.target.closest(".recipeDetailsDisplay").dataset.recipeid;
        recipeColumn = e.target.dataset.recipecolumn;
        newValue = e.target.value;
        console.log(recipeColumn);
        console.log(newValue);
        console.log(recipeId);
        saveRecipeEdit(recipeId, recipeColumn, newValue);
      }
      else if(e.target.tagName === "INPUT"){
        recipeId = e.target.closest(".recipeDetailsDisplay").dataset.recipeid;
        recipeColumn = e.target.dataset.recipecolumn;
        newValue = e.target.checked;
        console.log(recipeColumn);
        console.log(newValue);
        console.log(recipeId);
        saveRecipeEdit(recipeId, recipeColumn, newValue);
      }
      else {
        recipeId = e.target.closest(".recipeDetailsDisplay").dataset.recipeid;
        recipeColumn = e.target.dataset.recipecolumn;
        newValue = e.target.textContent.trim();
        console.log(recipeColumn);
        console.log(newValue);
        console.log(recipeId);
        saveRecipeEdit(recipeId, recipeColumn, newValue);
      }
    });
  });

  deleteEditField();
  deleteRecipeCategoryField();
}

function saveRecipeEdit(recipeId, recipeColumn, newValue){
  console.log(recipeId, recipeColumn, newValue);

  if(recipeColumn == "recipe_categories"){
    newValue = compileCategories();
  }
  if(recipeColumn == "recipe_ingredients"){
    newValue = compileIngredients();
  }
  if(recipeColumn == "recipe_instructions"){
    newValue = compileInstructions();
  }

  let httpRequest = new XMLHttpRequest();
  let data = "recipeId=" + recipeId + "&recipeColumn=" + recipeColumn + "&recipeValue=" + newValue;
  console.log(data);
  httpRequest.open("POST", "ajaxPages/recipe/updateRecipe.php", true);
  httpRequest.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      //console.log("updated recipe Id " + recipeId);
      //console.log(this.responseText);
    }
  }
  httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded", true);
  httpRequest.send(data);
}

function addEditCategories(){
  const addCategorySelect = document.getElementById("addCategorySelect");
  addCategorySelect.addEventListener("click", ()=>{
    const recipeFormCategories = document.querySelector("#recipeCategoriesContainer");
    let newSelect = document.createElement("select");
    newSelect.className = "editRecipeDetail recipeCategory";
    newSelect.dataset.recipecolumn= "recipe_categories";
    let httpRequest = new XMLHttpRequest();
    let data = "";
    httpRequest.open("GET", "ajaxPages/recipe/getCategories.php", true);
    httpRequest.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        newSelect.innerHTML = this.responseText;
      }
    }
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded", true);
    httpRequest.send();
    recipeFormCategories.appendChild(newSelect);
    addRecipeDetailsListener();
  });
}

function addEditIngredients(){
  const ingredientAddInput = document.getElementById("addIngredientInput");
  ingredientAddInput.addEventListener("click", ()=>{
    const ingredientList = document.getElementById("recipeIngredientList");
    //console.log("click");
    let ingredientContainer = document.createElement("div");
    ingredientContainer.draggable = "true";
    ingredientContainer.className = "ingredDrag";
    //create span with info
    let newInput = document.createElement("span");
    newInput.contentEditable = "true";
    newInput.className = "editRecipeDetail ingredient";
    newInput.dataset.recipecolumn = "recipe_ingredients";
    newInput.textContent = "...add another ingredient";
    //add delete Button with img
    let button = document.createElement("button");
    button.type = "button";
    button.className = "deleteDetail";
    button.dataset.recipecolumn = "recipe_ingredients";
    let img = document.createElement("img");
    img.src = "css/assets/delete.png";
    img.alt = "Delete Ingredient"
    button.appendChild(img);
    //append div to end of list
    ingredientContainer.appendChild(newInput);
    ingredientContainer.appendChild(button);
    ingredientList.appendChild(ingredientContainer);
    addRecipeDetailsListener();
    addDraggableListeners(".ingredDrag");
  });
}

function addEditInstructions(){
  const instructionAddInput = document.getElementById("addInstructionInput");
  instructionAddInput.addEventListener("click", ()=>{
    const instructionList = document.getElementById("recipeInstuctionList");
    let instructionContainer = document.createElement("div");
    instructionContainer.draggable = "true";
    instructionContainer.className = "instructDrag";
    //create editable instruction field
    let newInput = document.createElement("span");
    newInput.contentEditable = "true";
    newInput.className = "editRecipeDetail instruction";
    newInput.dataset.recipecolumn = "recipe_instructions";
    newInput.textContent = "...add another instruction";
    //add delete button and image
    let button = document.createElement("button");
    button.type = "button";
    button.className = "deleteDetail";
    button.dataset.recipecolumn = "recipe_instructions";
    let img = document.createElement("img");
    img.src = "css/assets/delete.png";
    img.alt = "Delete Instruction"
    button.appendChild(img);
    //append container to list
    instructionContainer.appendChild(newInput);
    instructionContainer.appendChild(button);
    instructionList.appendChild(instructionContainer);
    addRecipeDetailsListener();
    addDraggableListeners(".instructDrag");
  });
}

function deleteEditField(){
  let deleteButton = document.querySelectorAll(".deleteDetail");
  //console.log(deleteButton);
  deleteButton = Array.prototype.slice.call(deleteButton, 0);

  deleteButton.forEach(button => {
    button.removeEventListener("click", sendDeleteInfo, true);
    button.addEventListener("click", sendDeleteInfo);
  });
}

function sendDeleteInfo(){
  console.log(this);
  recipeId = document.querySelector(".recipeDetailsDisplay").dataset.recipeid;
  recipeColumn = this.dataset.recipecolumn;
  parentContainer = this.parentElement.parentElement;
  console.log(recipeColumn);
  elementDelete = this.parentElement;
  parentContainer.removeChild(elementDelete);
  saveRecipeEdit(recipeId, recipeColumn, null);
}

function deleteRecipeCategoryField(){
  let deleteButton = document.querySelector(".deleteCategory");

  deleteButton.removeEventListener("click", sendDeleteCategoryInfo, true);
  deleteButton.addEventListener("click", sendDeleteCategoryInfo);
}

function sendDeleteCategoryInfo(){
  console.log(this);
  let categoryContainer = document.getElementById("recipeCategoriesContainer");
  if(categoryContainer.children.length > 1){
    let deleteLastChild = categoryContainer.lastChild;
    categoryContainer.removeChild(deleteLastChild);
    let recipeId = document.querySelector(".recipeDetailsDisplay").dataset.recipeid;
    let recipeColumn = this.dataset.recipecolumn;
    saveRecipeEdit(recipeId, recipeColumn, null);
  }
}

function deleteRecipeListener(){
  const deleteButton = document.getElementById("deleteRecipe");
  console.log(deleteButton);
  const id = deleteButton.dataset.recipeid;
  console.log(id);

  deleteButton.addEventListener("click", (e)=>{
    let httpRequest = new XMLHttpRequest();
    let data = "recipe_id=" + id;
    httpRequest.open("POST", "ajaxPages/recipe/deleteRecipe.php", true);
    httpRequest.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        showAllRecipeListOnLoad();
        let backButton = document.getElementById("backButton");
        backButton.style.display = "none";
      }
    }
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded", true);
    httpRequest.send(data);
  });
}

//===========================================================================================
//Draggable
//===========================================================================================
let sourceElement = null;

function addDraggableListeners(className){
  let items = document.querySelectorAll(className);

  for(let i = 0; i < items.length; i++){
    //console.log(items[i]);
    items[i].setAttribute("order", i);
    items[i].addEventListener('dragstart', dragStart, false);
    //items[i].addEventListener('dragend', dragEnd, false);
    items[i].addEventListener('dragover', dragOver, false);
    //items[i].addEventListener('dragenter', dragEnter, false);
    //items[i].addEventListener('dragleave', dragLeave, false);
    items[i].addEventListener('drop', dragDrop, false);
  }
}

function dragStart(e){
  sourceElement = e.target;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", "this.innerHTML");
}

function dragOver(e){
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
}

function dragDrop(e){
  e.stopPropagation();
  let target = e.target;
  console.log(target);
  let items;
  let value;
  let column;
  let type;
  //for ingredients
  if(target.className == "ingredDrag"){
    items = document.querySelectorAll(".ingredDrag");
    value = compileIngredients();
    column = "recipe_ingredients";
    type = "ingredient";
  }
  //for instructions
  if (target.className == "instructDrag"){
    items = document.querySelectorAll(".instructDrag");
    value = compileInstructions();
    column = "recipe_instructions";
    type = "instruction";
  }
  let sourceOrderId = parseInt(sourceElement.getAttribute("order"));
  let targetOrderId = parseInt(target.getAttribute("order"));

  if(sourceElement != target){
    console.log(type);
    makeNewOrderIds(sourceOrderId, targetOrderId, type);
    reOrder(items, type);
    let recipeId = target.closest(".recipeDetailsDisplay").dataset.recipeid;
    saveRecipeEdit(recipeId, column, value);
  } else {
    return false;
  }
}

function makeNewOrderIds(sourceOrderId, targetOrderId, type){
  let items;
  if(type === "ingredient"){
    items = document.querySelectorAll(".ingredDrag");
  } else if(type === "instruction"){
    items = document.querySelectorAll(".instructDrag");
  }

  if(sourceOrderId < targetOrderId){
    for(let i = sourceOrderId; i <= targetOrderId; i++){
      items[i].setAttribute("order", i - 1);
    }
  } else {
    for(let i = targetOrderId; i <= sourceOrderId; i++){
      items[i].setAttribute("order", i+1);
    }
  }
  sourceElement.setAttribute("order", targetOrderId);
} //end makeNewOrderIds


function reOrder(items, type){
  let parent;
  console.log(type);
  if(type === "ingredient"){
    parent = items[1].closest("#recipeIngredientList");
    console.log("ingre");
  } else if(type === "instruction"){
    parent = items[1].closest("#recipeInstuctionList");
    console.log("instru")
  }
    console.log(parent);
  parent.innerHTML = "";

  items = Array.prototype.slice.call(items, 0);
  items.sort((a,b) => a.getAttribute("order") - b.getAttribute("order"));
  items.forEach(item => parent.appendChild(item));
}
