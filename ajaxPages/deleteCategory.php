<?php include "../includes/db.php"; ?>
<?php include "../includes/functions.php" ?>

<?php


  echo "hello";
  $category_id = $_POST["category_id"];
  echo $category_id;
  $query = "DELETE FROM category ";
  $query .= "WHERE category_id = {$category_id}";
  $delete_category_query = mysqli_query($connection, $query);
  confirmQuery($delete_category_query);
?>
