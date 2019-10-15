<?php include "../../includes/db.php"; ?>
<?php include "../../includes/functions.php" ?>

<?php
  $category_id = $_POST["category_id"];
  $query = "DELETE FROM category ";
  $query .= "WHERE category_id = {$category_id}";

  $delete_category_query = mysqli_query($connection, $query);
  confirmQuery($delete_category_query);
?>
