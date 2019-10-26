<?php include "../../includes/db.php"; ?>
<?php include "../../includes/functions.php" ?>

<?php
  $recipeId = test_input($_POST['recipeId']);
  $recipeColumn = test_input($_POST['recipeColumn']);
  $recipeValue = test_input($_POST['recipeValue']);

  $query = "UPDATE recipe ";
  $query .= "SET {$recipeColumn} = '{$recipeValue}' ";
  $query .= "WHERE recipe_id = '{$recipeId}'";

  echo $query;

  $update_recipe_query = mysqli_query($connection, $query);
  confirmQuery($update_recipe_query);

?>
