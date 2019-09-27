const button = document.getElementById("button");
const list = document.getElementById("list");

button.addEventListener("click", () =>{
  while(list.firstChild){
    list.removeChild(list.firstChild);
  }
  const string = document.getElementById("string").value;

  const splitString = string.split(";");
splitString.forEach(string => {

  let element = document.createElement("li");
  element.style.color = "blue";
  element.textContent = string;
  list.appendChild(element);

});
});
