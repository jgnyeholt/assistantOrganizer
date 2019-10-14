var boxShadow = "0 5px 10px rgba(0,0,0,.2)";
var darkorange = "rgb(177,67,32)";
// ===================================================
// Category Page Handler
// ===================================================
//Hover States
$(".category-page-handler").hover(function(){
  $(this).css("border", "2px solid white");
  $(this).css("transition", ".4s");
}, function(){
  $(this).css("border", "");
  $(this).css("background-color", "");
});
//Remove Page
$(".category-page-handler").click(function(){
  $("#category-maintenance").fadeToggle("slow");
  $(this).toggleClass("category-page-handler-red");
});
// ===================================================
// Category Create Button
// ===================================================
$("#create-category-button").hover(function(){
  $(this).css("opacity", "1");
  $(this).css("transition", ".4s");
  $(this).css("box-shadow", boxShadow);
}, function(){
  $(this).css("opacity", ".7");
  $(this).css("box-shadow", "");
});


// ===================================================
// Category Inputs
// ===================================================
$("input[id*='category']").focusin(function(){
  $(this).css("opacity", "1");
  $(this).css("outline", "darkred");
    $(this).css("box-shadow", boxShadow);
  $(this).css("transition", ".4s");
});

$("input[id*='category']").focusout(function(){
  $(this).css("opacity", "");
    $(this).css("box-shadow", "");
  $(this).css("outline", "");
});

// ===================================================
// Category Listing
// ===================================================
