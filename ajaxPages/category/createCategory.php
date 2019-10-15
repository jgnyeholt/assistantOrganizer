<?php include "../../includes/db.php"; ?>
<?php include "../../includes/functions.php" ?>

<?php
// if(isset($_POST)){
//echo "hello";
//print_r($_SERVER);
$category_name = test_input($_POST['category_name']);
$category_color = test_input($_POST['category_color']);
// echo $category_name;
// echo $category_color;
$query = "INSERT INTO category(category_name, category_color)";
$query .= "VALUES('{$category_name}', '{$category_color}')";
$create_category_query = mysqli_query($connection, $query);
confirmQuery($create_category_query);
//header("location:index.php");
//}
?>
