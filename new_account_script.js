var firstNameArray = [];
var lastNameArray = [];
var usernameArray = [];
var passwordArray = [];
const theButton = document.getElementById("submit-button");
theButton.addEventListener("click", saveInfo);

function myFunction() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function saveInfo() {
  var firstName = document.getElementById("firstname").value;
  var lastName = document.getElementById("lastname").value;
  var userName = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  console.log(firstName);
  console.log(lastName);
  console.log(userName);
  console.log(password);
  firstNameArray.push(firstName);
  lastNameArray.push(lastName);
  usernameArray.push(userName);
  passwordArray.push(password);
  console.log(firstNameArray[0]);
  console.log(lastNameArray[0]);
  console.log(usernameArray[0]);
  console.log(passwordArray[0]);
}



