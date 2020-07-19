let thisUserId = "";
//listen for auth status changes
auth.onAuthStateChanged((user) => {
  if (user) {
    // get data

    db.collection("passwords").onSnapshot(
      (snapshot) => {
        setupList(snapshot.docs);
        setupUI(user);
      },
      (err) => {
        console.log(err.message);
      }
    );
    console.log("user logged in: ", user);
  } else {
    setupUI();
    setupList([]);
  }
});

//create a new password entry
const createForm = document.querySelector("#create-form");

createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("passwords")
    .add({
      account: createForm["account"].value,
      loginId: createForm["newLoginId"].value,
      password: createForm["newPassword"].value,
    })
    .then(() => {
      //close the modal and reset form
      const modal = document.querySelector("#modal-create");
      M.Modal.getInstance(modal).close();
      createForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  // sign up the user
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      return db.collection("users").doc(cred.user.uid).set({
        bio: signupForm["signup-bio"].value,
      });
    })
    .then(() => {
      // close the signup modal & reset form
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
      signupForm.reset();
      signupForm.querySelector(".error").innerHTML = "";
    })
    .catch((err) => {
      signupForm.querySelector(".error").innerHTML = err.message;
    });
});

//logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  thisUserId = "";
  e.preventDefault();
  auth.signOut();
});

//login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //get user info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      // close the login modal & reset form
      const modal = document.querySelector("#modal-login");
      M.Modal.getInstance(modal).close();
      loginForm.reset();
      loginForm.querySelector(".error").innerHTML = "";
    })
    .catch((err) => {
      loginForm.querySelector(".error").innerHTML = err.message;
    });
});
