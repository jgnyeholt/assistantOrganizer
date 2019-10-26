<?php include "../../includes/db.php"; ?>
<?php include "../../includes/functions.php" ?>

<?php
  $category = $_GET['category'];
  $query;
?>
  <h2 class="recipe-category-title">Showing <?php echo $category; ?> Recipes</h2>
  <div>
<?php

  if($category === "all"){
    $query = "SELECT * FROM recipe ";
  } else {
    $query = "SELECT * FROM recipe ";
    $query .= "WHERE recipe_categories LIKE '%{$category}%'";
  }

  $get_recipies = mysqli_query($connection, $query);
  confirmQuery($get_recipies);

  while($row = mysqli_fetch_assoc($get_recipies)){
    $recipeId = $row['recipe_id'];
    $recipeName = decode_data($row['recipe_name']);
    $recipeCategories = decode_data($row['recipe_categories']);
    $recipeDescriptionDisplay = decode_data($row['recipe_thumbnail']);
    $recipeDescription = decode_data($row['recipe_description']);
    $recipeFavorite = decode_data($row['recipe_favorite']);


?>

  <div class="recipeThumbnail" <?php if(strtolower($recipeFavorite) == "true"){ echo "style='background-color:rgba(0,0,0,.05);'";} ?> >
    <div class="recipeThumbnailName"><?php echo $recipeName; ?></div>
    <div class="recipeThumbnailText"><?php if(strtolower($recipeDescriptionDisplay) == "true"){
            echo substr($recipeDescription, 0 , 250);
            if(strlen($recipeDescription) > 250){
              echo "...";
            }
          } ?>
    </div>
    <div class="thumbnailUniformContainer">
      <?php
        $categoryArray = explode("|~|", $recipeCategories, -1);
        foreach ($categoryArray as $cat) {
          $colorQuery = "SELECT category_color FROM category ";
          $colorQuery .= "WHERE category_name = '{$cat}'";
          $colorQueryConnect = mysqli_query($connection, $colorQuery);
          confirmQuery($colorQuery);
          while($row = mysqli_fetch_assoc($colorQueryConnect)){
            $color = decode_data($row['category_color']);
          ?>
            <span class="catColor" style="background-color:<?php echo $color;?>"></span>

          <?php
          }
        }
      ?>

    <button class="recipeDetailsButton" value="<?php echo $recipeId; ?>">View Details</button>
    </div>
  </div>
<?php
} //end while loop
?>
</div>
