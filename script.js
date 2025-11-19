// Redirect if user not logged in
if (window.location.pathname.includes("dashboard.html") ||
    window.location.pathname.includes("profile.html")) {
    if (!localStorage.getItem("token")) {
        window.location.href = "login.html";
    }
}

// LOGIN
async function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.success) {
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";
    } else {
        alert(data.message);
    }
}

// SIGNUP
async function signupUser() {
    const name = document.getElementById("name").value;
    const number = document.getElementById("number").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, number, email, password })
    });

    const data = await res.json();
    if (data.success) {
        alert("Signup successful! Please log in.");
        window.location.href = "login.html";
    } else {
        alert(data.message);
    }
}

// ADD CONTACT
async function addContact() {
    const name = document.getElementById("cname").value;
    const number = document.getElementById("cnumber").value;

    const res = await fetch("/api/addContact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify({ name, number })
    });

    const data = await res.json();
    if (data.success) {
        alert("Contact added!");
        loadContacts();
    } else {
        alert(data.message);
    }
}

// LOAD CONTACTS
async function loadContacts() {
    const res = await fetch("/api/getContacts", {
        headers: { "Authorization": localStorage.getItem("token") }
    });

    const data = await res.json();

    const list = document.getElementById("contact-list");
    list.innerHTML = "";

    data.contacts.forEach(contact => {
        list.innerHTML += `
            <div class="contact-item">
                <h3>${contact.name}</h3>
                <p>${contact.number}</p>
                <div class="action-btns">
                    <button class="small-btn delete" onclick="deleteContact('${contact._id}')">Delete</button>
                </div>
            </div>
        `;
    });
}

// DELETE CONTACT
async function deleteContact(id) {
    const res = await fetch(`/api/deleteContact?id=${id}`, {
        method: "DELETE",
        headers: { "Authorization": localStorage.getItem("token") }
    });

    const data = await res.json();
    if (data.success) {
        loadContacts();
    }
}

// LOGOUT
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}
