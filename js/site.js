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

function recipeInit(){
  // createRecipeForm();
  // addNewRecipeFormData();
  // saveRecipe();
  // addIngredients();
  addNewRecipeListener();
}

function addNewRecipeListener(){
  const button = document.getElementById("addRecipeButton");

  button.addEventListener("click", ()=>{
    createRecipeForm();
    addNewRecipeFormData();
    saveRecipe();
    addIngredients();
  });
}

function createRecipeForm(){
  const recipeContainer = document.getElementById("recipeContainer");
  recipeContainer.innerHTML = `
    <form id="NewRecipeForm">
      <div class="flex-column">
        <input id="recipeName" type="text" placeholder="Recipe Name"/>
        <div class="recipeFormCategories">
          <select id="recipeCategory">
          </select>
        </div>
        <div class="recipeFormData">
          <input id="prepTime" type="text" placeholder="Prep Time" />
          <input id="cookTime" type="text" placeholder="Cook Time" />
          <input id="ovenTemp" type="text" placeholder="Oven Temp"/>
        </div>
        <div class="recipeFormDescription">
          <textarea id="description" placeholder="Description"></textarea>
          <input type="checkbox" id="descriptionDisplay"/>
          <label for="descriptionDisplay">Show on Thumbnail</label>
          <input type="checkbox" id="favoritesDisplay"/>
          <label for="favoritesDisplay">This is a Favorite</label>
        </div>
      </div>
      <div class="flex-row">
        <div class="recipeFormIngredient">
          <div id="recipeIngredientList">
           <input class="ingredient" type="text" placeholder="...add ingredient" />
          </div>
          <div id="addIngredientInput">+</div>
        </div>
        <div class="recipeFormInstructions">
          <input id="instructions" type="text" placeholder="...add step to instructions"/>
        </div>
      </div>
      <div class="recipeFormNotes">
        <textarea id="notes" placeholder="Notes"></textarea>
      </div>
      <button type="submit">Save New Recipe</button>
    </form>
  `;

}

function addNewRecipeFormData(){
  const recipeCategories = document.getElementById("recipeCategory");
  httpRequest = new XMLHttpRequest();
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
  let recipeCategory = document.getElementById("recipeCategory");
  let recipePrepTime = document.getElementById("prepTime");
  let recipeCookTime = document.getElementById("cookTime");
  let recipeOvenTemp = document.getElementById("ovenTemp");
  let recipeDescription = document.getElementById("description");
  let recipeDescriptionDisplay = document.getElementById("descriptionDisplay");
  let recipeFavorite = document.getElementById("favoritesDisplay");
  let recipeIngredients = "";
  let recipeInstructions = document.getElementById("instructions");
  let recipeNotes = document.getElementById("notes");


  recipeForm.addEventListener("submit", (e) => {
    recipeIngredients = compileIngredients();
    e.preventDefault();
    console.log(recipeDescriptionDisplay.checked, recipeFavorite.checked);
    httpRequest = new XMLHttpRequest();
    let data = "recipeName=" + recipeName.value +
               "&recipeCategory=" + recipeCategory.value +
               "&recipePrepTime=" + recipePrepTime.value +
               "&recipeCookTime=" + recipeCookTime.value +
               "&recipeOvenTemp=" + recipeOvenTemp.value +
               "&recipeDescription=" + recipeDescription.value +
               "&recipeDescriptionDisplay=" + recipeDescriptionDisplay.checked +
               "&recipeFavorite=" + recipeFavorite.checked +
               "&recipeIngredients=" + recipeIngredients +
               "&recipeInstructions=" + recipeInstructions.value +
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

function compileIngredients(){
  let ingredients = document.getElementsByClassName("ingredient");
  let ingredientString = "";
  for(let i = 0; i < ingredients.length; i++){
    ingredientString += (ingredients[i].value + ';');
    console.log(ingredientString);
  }
  return ingredientString;
}
