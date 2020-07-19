// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCvtYhixYipaeUgtU2fsoBNcBqC4RaneXU",
  authDomain: "my-password-app-29ad2.firebaseapp.com",
  databaseURL: "https://my-password-app-29ad2.firebaseio.com",
  projectId: "my-password-app-29ad2",
  storageBucket: "my-password-app-29ad2.appspot.com",
  messagingSenderId: "763011458550",
  appId: "1:763011458550:web:80d978d946672342c913d7",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference password collection
var passwordRef = firebase.database().ref("passwords");

//Listen for submit
document.getElementById("passwordForm").addEventListener("submit", submitForm);

//submit form
function submitForm(e) {
  e.preventDefault();

  //get values
  var name = getInputVal("name");
  var loginId = getInputVal("loginId");
  var password = getInputVal("password");

  //save password
  savePassword(name, loginId, password);

  //Show Alert
  document.querySelector(".alert").style.display = "block";
  //Hide alert after 3 seconds
  setTimeout(function () {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  //clear form
  document.getElementById("passwordForm").reset();
}

//Function to get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

//Save passwords to firebase
function savePassword(name, loginId, password) {
  var newPasswordRef = passwordRef.push();

  newPasswordRef.set({
    name: name,
    loginId: loginId,
    password: password,
  });
}
