// -----------------------------
// Firebase Config (Paste Yours)
// -----------------------------
const firebaseConfig = {
    apiKey: "AIzaSyC3Your-Key",
    authDomain: "yourapp.firebaseapp.com",
    projectId: "yourproject",
    appId: "1:123456789:web:xxxxx"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Allowed Gmail
const allowedEmail = "psanthoshreddy.ai@gmail.com";
// Password
const correctPassword = "testing @2025";

// Elements
const googleLoginBtn = document.getElementById("google-login-btn");
const googleStatus = document.getElementById("google-status");
const passwordSection = document.getElementById("password-section");
const appSection = document.getElementById("app-section");
const loginSection = document.getElementById("login-section");

// ----------------------------------
// Google Login
// ----------------------------------
googleLoginBtn.addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(result => {
        const email = result.user.email;

        if (email === allowedEmail) {
            googleStatus.classList.remove("hidden");
            googleStatus.innerHTML = "Google Login Verified ✔";
            passwordSection.classList.remove("hidden");
        } else {
            googleStatus.classList.remove("hidden");
            googleStatus.innerHTML = "Unauthorized Email ❌";
            auth.signOut();
        }
    });
});

// ----------------------------------
// Password Verification
// ----------------------------------
function verifyPassword() {
    const entered = document.getElementById("password-input").value;

    if (entered === correctPassword) {
        loginSection.classList.add("hidden");
        appSection.classList.remove("hidden");
    } else {
        document.getElementById("password-error").innerText =
            "Incorrect password ❌";
    }
}

// ----------------------------------
// Call n8n Webhook
// ----------------------------------
async function generate() {
    const topic = document.getElementById("topic").value;

    const response = await fetch("YOUR_N8N_WEBHOOK_URL", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic })
    });

    const result = await response.json();
    document.getElementById("output").innerText =
        JSON.stringify(result, null, 2);
}
