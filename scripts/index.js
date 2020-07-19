const passwordList = document.querySelector(".passwords");
const generateBtn = document.querySelector(".btn-small");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountDetails = document.querySelector(".account-details");

const setupUI = (user) => {
  if (user) {
    //account info
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const html = `
        <div><strong>Logged in as:</strong> ${user.email}.</div>
        <div>${doc.data().bio}</div>
        `;
        accountDetails.innerHTML = html;
      });

    //toggle UI elements
    loggedInLinks.forEach((item) => (item.style.display = "block"));
    loggedOutLinks.forEach((item) => (item.style.display = "none"));
  } else {
    //hide account info
    accountDetails.innerHTML = "";
    //toggle UI elements
    loggedOutLinks.forEach((item) => (item.style.display = "block"));
    loggedInLinks.forEach((item) => (item.style.display = "none"));
  }
};

//setup the passwords
const setupList = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const password = doc.data();
      const li = `
        <li>
            <div class="collapsible-header grey lighten-4"><strong>Account Name:</strong> ${password.account}</div>
            <div class="collapsible-body white"><span><strong>Login Id:</strong> ${password.loginId}<p><strong>Password:</strong> ${password.password}</p></span></div>
        </li>
      `;
      html += li;
    });
    passwordList.innerHTML = html;
  } else {
    passwordList.innerHTML = `<h5 class="center-align">Login or sign up to view your passwords.</h5>`;
  }
};

//generate a password
//modal elements
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const passwordEl = document.getElementById("newPassword");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

generateBtn.addEventListener("click", () => {
  const length = lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  let passwordString = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
  passwordEl.value = passwordString;
});

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );
  // Doesn't have a selected type
  if (typesCount === 0) {
    return "";
  }

  // create a loop
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

//randomizers
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// setup materialize components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
