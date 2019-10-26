var darkGreen = "#245848";

document.addEventListener("DOMContentLoaded", ()=>{
// ===================================================
// Category Page Handler
// ===================================================
//Hover States
$(".category-page-handler").hover(function(){
  $(this).css("border", "2px solid " + darkGreen);
  $(this).css("opacity", "1");
  $(this).css("transition", ".4s");
}, function(){
  $(this).css("border", "");
  $(this).css("opacity", "");
  $(this).css("background-color", "");
});
//Remove Page
$(".category-page-handler").click(function(){
  $("#category-maintenance").fadeToggle("slow");
  $(this).toggleClass("category-page-handler-rotate");
});
//on load
$(".category-page-handler").addClass("category-page-handler-rotate");
$("#category-maintenance").css("display", "none");

});
