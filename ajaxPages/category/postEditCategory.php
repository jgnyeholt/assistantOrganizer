<?php include "../../includes/db.php"; ?>
<?php include "../../includes/functions.php" ?>

<?php
  echo $_POST['category_id'];
  $category_id = test_input($_POST['category_id']);

  $category_name = test_input($_POST['category_name']);
  echo $category_name;
  $category_color = test_input($_POST['category_color']);
  echo $category_color;

  $query = "UPDATE category SET ";
  $query .= "category_name = '{$category_name}', category_color = '{$category_color}' ";
  $query .= "WHERE category_id = {$category_id}";

  $update_category_query = mysqli_query($connection, $query);
  confirmQuery($update_category_query);
?>
