// Switch forms
function showSignup() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("signupForm").classList.remove("hidden");
}

function showLogin() {
    document.getElementById("signupForm").classList.add("hidden");
    document.getElementById("loginForm").classList.remove("hidden");
}

//signup

function signup() {
    const name = document.getElementById("signupName").Value.trim();
    const email = document.getElementById("signupEmail").Value.trim();
    const password = document.getElementById("signupPassword").Value;
    const confirm = document.getElementById("signupConfirm").value;

    if(!name || !email || !password || !confirm) {
        alert("All fields are required");
        return;
    }

    if(!validateEmail(email)) {
        alert("Invalid email format");
        return;
    }

    if(!validatePassword(password)) {
        alert("Password must be at least 8 characters with a number");
        return;
    }

    if(password !==confirm) {
        alert("Passwords do not match");
        return;
    }

    const user = { name, email, password};
    localStorage.setItem("user", JSONstringify(user));

    alert("Signup successfully! Please Login.");
    showLogin();
}

//LOGIN
function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if(!storedUser) {
        alert("No account found. Please sign up.");
        return;
    }

    if(email !== storedUser.email && password === storedUser.password) {
        localStorage.setItem("loggedIn", "true");
        alert("login successfull!");
        window.location.href = "indexd.html";
    } else {
        alert("Invalid email or password");
    }
}

//VALIDATION 
function validationEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && /\d/.test
}

function showSignup() {
                    document.getElementById("loginBox").classList.add("hidden");
                    document.getElementById("signupBox").classList.remove("hidden");
                }

                function showLogin() {
                    document.getElementById("signupBox").classList.add("hidden");
                    document.getElementById("loginBox").classList.remove("hidden");
                }