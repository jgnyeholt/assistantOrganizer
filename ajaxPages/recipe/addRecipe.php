<?php include "../../includes/db.php"; ?>
<?php include "../../includes/functions.php" ?>

<?php
  $recipeName = test_input($_POST['recipeName']);
  $recipeCategories = test_input($_POST['recipeCategory']);
  $recipePrepTime = test_input($_POST['recipePrepTime']);
  $recipeCookTime = test_input($_POST['recipeCookTime']);
  $recipeOvenTemp = test_input($_POST['recipeOvenTemp']);
  $recipeDescription = test_input($_POST['recipeDescription']);
  $recipeDescriptionDisplay = test_input($_POST['recipeDescriptionDisplay']);
  $recipeFavorite = test_input($_POST['recipeFavorite']);
  $recipeIngredients = test_input($_POST['recipeIngredients']);
  $recipeInstructions = test_input($_POST['recipeInstructions']);
  $recipeNotes = test_input($_POST['recipeNotes']);



  $query = "INSERT INTO recipe(recipe_name, recipe_categories, recipe_preptime, recipe_cooktime, recipe_oventemp, recipe_description, recipe_thumbnail, recipe_favorite, recipe_ingredients, recipe_instructions, recipe_notes) ";
  $query .= "VALUES('{$recipeName}', '{$recipeCategories}', '{$recipePrepTime}', '{$recipeCookTime}', '{$recipeOvenTemp}', '{$recipeDescription}', '{$recipeDescriptionDisplay}', '{$recipeFavorite}', '{$recipeIngredients}', '{$recipeInstructions}', '{$recipeNotes}')";

  $create_recipe_query = mysqli_query($connection, $query);

  confirmQuery($create_recipe_query);
?>
