<?php include "../../includes/db.php"; ?>
<?php include "../../includes/functions.php" ?>

<?php
  $recipe_id = $_POST['recipe_id'];

  $query = "DELETE FROM recipe WHERE recipe_id = '{$recipe_id}'";

  $delete_query = mysqli_query($connection, $query);

  confirmQuery($delete_query);

?>
