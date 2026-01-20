import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* ✅ Firebase configuration (EXACT from console) */
const firebaseConfig = {
  apiKey: "AIzaSyAm2YdAXV8HAJi8RV6O5Gn-bMvB8PVM5S4",
  authDomain: "ecommerce-frontend-3d656.firebaseapp.com",
  projectId: "ecommerce-frontend-3d656",
  storageBucket: "ecommerce-frontend-3d656.firebasestorage.app",
  messagingSenderId: "696811086758",
  appId: "1:696811086758:web:cc36aee195840598162567",
};

/* ✅ Initialize Firebase */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* ========= SIGN UP ========= */
window.signup = function () {
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;
  const confirm = document.getElementById("signupConfirmPassword").value;

  if (!email || !password || !confirm) {
    alert("Please fill all fields");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  if (password !== confirm) {
    alert("Passwords do not match");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Signup successful!");
      window.location.href = "login.html"; // or index.html
    })
    .catch(error => {
      alert(error.message);
    });
};

/* ========= LOGIN ========= */
window.login = function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch(error => alert(error.message));
};

/* ========= LOGOUT ========= */
window.logout = function () {
  signOut(auth).then(() => {
    alert("Logged out");
    window.location.href = "login.html";
  });
};

/* ========= AUTH STATE ========= */
onAuthStateChanged(auth, user => {
  if (user) {
    console.log("User logged in:", user.email);
  } else {
    console.log("Logged out");
  }
});
