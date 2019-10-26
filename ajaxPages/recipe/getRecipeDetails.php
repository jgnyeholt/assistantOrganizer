<?php include "../../includes/db.php"; ?>
<?php include "../../includes/functions.php" ?>

<?php
  $recipeId = $_GET['recipeId'];

  $query = "SELECT * FROM recipe ";
  $query .= "WHERE recipe_id = '{$recipeId}'";

  $getRecipeDetails = mysqli_query($connection, $query);
  confirmQuery($getRecipeDetails);

  while($row = mysqli_fetch_assoc($getRecipeDetails)){
    $recipeName = decode_data($row['recipe_name']);
    $recipeCategories = decode_data($row['recipe_categories']);
    $recipePrepTime = decode_data($row['recipe_preptime']);
    $recipeCookTime = decode_data($row['recipe_cooktime']);
    $recipeOvenTemp = decode_data($row['recipe_oventemp']);
    $recipeDescription = decode_data($row['recipe_description']);
    $recipeDescriptionDisplay = $row['recipe_thumbnail'];
    $recipeFavorite = $row['recipe_favorite'];
    $recipeIngredients = decode_data($row['recipe_ingredients']);
    $recipeInstructions = decode_data($row['recipe_instructions']);
    $recipeNotes = decode_data($row['recipe_notes']);
?>
  <div class="recipeDetailsDisplay" data-recipeid="<?php echo $recipeId; ?>">
    <!-- RECIPE NAME -->
      <h2 data-recipecolumn="recipe_name" class="editRecipeDetail recipe-category-title" value="<?php echo $recipeName; ?>" contenteditable="true" spellcheck="false"><?php echo $recipeName; ?></h2>

    <!-- RECIPE CATEGORIES -->
    <div class="catContainer">
      <div id="recipeCategoriesContainer">
        <h5>Categories:</h5>
        <?php
          $categories = explode("|~|" , $recipeCategories, -1);
          foreach($categories as $category){ ?>
            <select class="editRecipeDetail recipeCategory" data-recipecolumn="recipe_categories">
              <option value="<?php echo $category; ?>"><?php echo $category; ?></option>
              <!-- find other options to add to list -->
              <?php
                $catQuery = "SELECT category_name FROM category ";
                $catQuery .= "WHERE NOT category_name = '{$category}'";
                $catQueryConnection = mysqli_query($connection, $catQuery);
                while($catRow = mysqli_fetch_assoc($catQueryConnection)){
                  $cat = $catRow['category_name'];
                ?>
                  <option value="<?php echo $cat; ?>"><?php echo $cat; ?></option>
                <?php
                }
                ?>
            <!-- end finding other option -->
            </select>
        <?php
          }
        ?>
      </div>
      <div class="categoryControls">
        <button id="addCategorySelect" type="button">
          <img src="css/assets/cross.png" alt="Add Category">
        </button>
        <button id="deleteCategorySelect" type="button" class="deleteCategory" data-recipecolumn="recipe_categories">
          <img src="css/assets/delete.png" alt="Delete Category" data-recipecolumn="recipe_categories">
        </button>
      </div>
    </div>

    <!-- RECIPE DATA -->
    <div class="recipeData">
      <div><h5 class="inline-heading">Prep Time: </h5><span class="editRecipeDetail" contenteditable="true" data-recipecolumn="recipe_preptime" spellcheck="false"><?php echo $recipePrepTime; ?></span></div>
      <div><h5 class="inline-heading">Cook Time: </h5><span class="editRecipeDetail" contenteditable="true" data-recipecolumn="recipe_cooktime" spellcheck="false"> <?php echo $recipeCookTime; ?></span></div>
      <div><h5 class="inline-heading">Oven Temp: </h5><span class="editRecipeDetail" contenteditable="true" data-recipecolumn="recipe_oventemp" spellcheck="false"> <?php echo $recipeOvenTemp; ?></span></div>
    </div>

    <!-- RECIPE Description -->
    <div class="recipeDescriptionData">
        <div>
          <h5 class="inline-heading">Description: </h5>
          <span spellcheck="false" class="editRecipeDetail" contenteditable="true" data-recipecolumn="recipe_description"><?php echo $recipeDescription; ?></span>
        </div>
        <div>
          <div>
            <input <?php if(strtolower($recipeFavorite) == "true"){ echo"checked"; } ?> class="editRecipeDetail" type="checkbox" id="favoritesDisplay" data-recipecolumn="recipe_favorite"/>
            <label for="favoritesDisplay">This is a Favorite</label>
          </div>
          <div>
            <input <?php if(strtolower($recipeDescriptionDisplay) == "true"){ echo"checked"; }?> class="editRecipeDetail" type="checkbox" id="descriptionDisplay" data-recipecolumn="recipe_thumbnail"/>
            <label for="descriptionDisplay">Show on Thumbnail</label>
          </div>
        </div>
    </div>
    <!-- RECIPE INGREDIENTS-->
    <div class="recipeInfo">
      <div class="list">
        <h5>Ingredients:</h5>
        <div id="recipeIngredientList">
          <?php
            $ingredients = explode("|~|", $recipeIngredients, -1);
            foreach ($ingredients as $ingredient) { ?>
              <div draggable="true" class="ingredDrag" >
                <span class="editRecipeDetail ingredient" contenteditable="true" data-recipecolumn="recipe_ingredients" spellcheck="false"><?php echo $ingredient; ?></span>
                <button type="button" class="deleteDetail" data-recipecolumn="recipe_ingredients">
                  <img src="css/assets/delete.png" alt="Delete Ingredient" >
                </button>
              </div>
          <?php
            }
          ?>
        </div>
        <button id="addIngredientInput" class="addField" type="button"><img src="css/assets/cross.png" alt="Add Ingredient Input"></button>
      </div>
        <!-- RECIPE Instructions-->
      <div class="list">
        <h5>Instructions:</h5>
        <div id="recipeInstuctionList">
          <?php
            $instructions = explode("|~|", $recipeInstructions, -1);
            foreach ($instructions as $instruction) { ?>
              <div draggable="true" class="instructDrag">
                <span class="editRecipeDetail instruction" contenteditable="true" data-recipecolumn="recipe_instructions" spellcheck="false"><?php echo $instruction; ?></span>
                <button type="button" class="deleteDetail">
                  <img src="css/assets/delete.png" alt="Delete Instruction" data-recipecolumn="recipe_instructions">
                </button>
              </div>
          <?php
            }
          ?>
        </div>
        <button id="addInstructionInput" class="addField" type="button"><img src="css/assets/cross.png" alt="Add Instruction Input"></button>
      </div>
    </div> <!-- end recipe ingredients/instructions -->
    <hr>
    <!-- RECIPE NOTES -->
    <div class="recipeNotes">
      <h5>Notes: </h5>
      <span data-recipecolumn="recipe_notes" class="editRecipeDetail" contenteditable="true" spellcheck="false"><?php echo $recipeNotes; ?></span>
    </div>
    <div class="deletebuttoncontainer">
      <button id="deleteRecipe" data-recipeid="<?php echo $recipeId; ?>">Delete <?php echo $recipeName; ?> Recipe</button>
    </div>

  </div>
<?php
  }
 ?>
