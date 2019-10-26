<?php include "../../includes/db.php"; ?>
<?php include "../../includes/functions.php" ?>

<option>Select a Category</option>

<?php
$query = "SELECT * FROM category ";
$query .= "ORDER BY category_name";
$display_category_list = mysqli_query($connection, $query);
while($row = mysqli_fetch_assoc($display_category_list)){
  $category_id = $row['category_id'];
  $category_name = decode_data($row['category_name']);
  $category_color = decode_data($row['category_color']);
?>
 <option value="<?php echo $category_name; ?>"><?php echo $category_name; ?></option>

<?php }?>
