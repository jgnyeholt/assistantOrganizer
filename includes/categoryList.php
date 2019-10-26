<?php include "db.php"; ?>
<?php include "functions.php" ?>
  <li class="category-listing">
    <div>
      <span class="category-color" style=""></span>
      <span class="CategoryName" data-categoryname="all">All Recipes</span>
    </div>
  </li>
<?php
  $query = "SELECT * FROM category ";
  $query .= "ORDER BY category_name";
  $display_category_list = mysqli_query($connection, $query);
  while($row = mysqli_fetch_assoc($display_category_list)){
    $category_id = $row['category_id'];
    $category_name = decode_data($row['category_name']);
    $category_color = decode_data($row['category_color']);
?>
  <li class="category-listing">
    <div>
      <span class="category-color" style="background-color:<?php echo $category_color; ?>"></span>
      <span class="CategoryName" data-categoryname="<?php echo $category_name; ?>"><?php echo $category_name; ?></span>
    </div>
    <div>
      <a class="category-edit" data-categoryid="<?php echo $category_id;?>"><img class="" src="css/assets/edit.png" alt="Edit" ></a>
      <a class="category-delete" data-categoryid="<?php echo $category_id;?>"><img class="" src="css/assets/delete.png" alt="Delete"></a>
    </div>
  </li>
<?php } ?> <!-- $display_category_list close while loop -->
