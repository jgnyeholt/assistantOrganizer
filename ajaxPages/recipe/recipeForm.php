<form id="NewRecipeForm">
  <div class="flex-column">
    <div class="recipeFormName">
      <input id="recipeName" type="text" placeholder="Recipe Name"/>
    </div>
    <div class="recipeFormCategories">
      <div id="recipeCategoriesContainer">
        <select class="recipeCategory"></select>
      </div>
      <button id="addCategorySelect" class="addField" type="button"><img src="css/assets/cross.png" alt="Add Category Select"></button>
    </div>
    <div class="recipeFormData">
      <input id="prepTime" type="text" placeholder="Prep Time" />
      <input id="cookTime" type="text" placeholder="Cook Time" />
      <input id="ovenTemp" type="text" placeholder="Oven Temp"/>
    </div>
    <div class="recipeFormDescription">
      <textarea id="description" placeholder="Description"></textarea>
      <div class="recipeSettings">
        <div>
          <input type="checkbox" id="favoritesDisplay"/>
          <label for="favoritesDisplay">This is a Favorite</label>
        </div>
        <div>
          <input type="checkbox" id="descriptionDisplay"/>
          <label for="descriptionDisplay">Show on Thumbnail</label>
        </div>
      </div>
    </div>
  </div>
  <div class="flex-row">
    <div class="recipeFormIngredient">
      <div id="recipeIngredientList">
        <input class="ingredient" type="text" placeholder="...add ingredient" />
      </div>
      <button id="addIngredientInput" class="addField" type="button"><img src="css/assets/cross.png" alt="Add Ingredient Input"></button>
    </div>
    <div class="recipeFormInstructions">
      <div id="recipeInstuctionList">
        <input class="instruction" type="text" placeholder="...add instructions"/>
      </div>
      <button id="addInstructionInput" class="addField" type="button"><img src="css/assets/cross.png" alt="Add Instruction Input"></button>
    </div>
  </div>
  <div class="recipeFormNotes">
    <textarea id="notes" placeholder="Notes"></textarea>
  </div>
  <button type="submit">Save New Recipe</button>
</form>
