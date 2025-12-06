// -----------------------------
// PASSWORD PROTECTION
// -----------------------------
const correctPassword = "testing@2025";

const passwordSection = document.getElementById("password-section");
const appSection = document.getElementById("app-section");
const passwordError = document.getElementById("password-error");

function verifyPassword() {
    const entered = document.getElementById("password-input").value;
    if (entered === correctPassword) {
        passwordSection.classList.add("hidden");
        appSection.classList.remove("hidden");
    } else {
        passwordError.innerText = "Incorrect password ❌";
    }
}

// -----------------------------
// CALL N8N WEBHOOK
// -----------------------------
async function generate() {
    const topic = document.getElementById("topic").value;

    if (!topic) {
        alert("Please enter a topic or URL!");
        return;
    }

    const webhookUrl = "YOUR_N8N_WEBHOOK_URL"; // <-- replace with your n8n webhook

    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic })
        });

        const result = await response.json();
        document.getElementById("output").innerText = JSON.stringify(result, null, 2);

    } catch (error) {
        document.getElementById("output").innerText = "Error calling n8n webhook: " + error;
    }
}
