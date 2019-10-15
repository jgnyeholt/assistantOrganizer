<?php include "../../includes/db.php"; ?>
<?php include "../../includes/functions.php" ?>

<?php
  $category_id = $_GET["category_id"];
  $query = "SELECT * FROM category ";
  $query .= "WHERE category_id = '{$category_id}'";
  $getEditCategory = mysqli_query($connection, $query);
  confirmQuery($getEditCategory);

  while($row = mysqli_fetch_assoc($getEditCategory)){
    $category_name = decode_data($row['category_name']);
    $category_color = decode_data($row['category_color']);
  ?>
  <form id="updateCategoryForm" action="" method="">
    <input id="editCatID" value="<?php echo $category_id; ?>" disabled hidden/>
    <input id="editCatName" value="<?php echo $category_name; ?>"/>
    <input id="editCatColor" value="<?php echo $category_color; ?>" />
    <div class="editCatBtns">
      <button type="submit">Save</button>
      <button type="reset">Cancel</button>
    </div>

  </form>

<?php
  }
?>
