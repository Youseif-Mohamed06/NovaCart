document.querySelector("#register_form").addEventListener("submit", (event) => {
    event.preventDefault();
    const fullName = document.querySelector("#full_name").value.trim().replace(/\s+/g, " ");
    const email = document.querySelector("#email").value.trim().toLowerCase();
    const phone = document.querySelector("#phone").value.trim();
    const password = document.querySelector("#password").value;
    const message = document.querySelector("#form_message");
    const normalizedPhone = phone.replace(/[\s()-]/g, "");

    if (fullName.length < 3 || !fullName.includes(" ")) {
        message.textContent = "Please enter your first and last name.";
        message.className = "form-message error";
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || !/^\+?[0-9]{10,15}$/.test(normalizedPhone)) {
        message.textContent = "Enter a valid email address and phone number.";
        message.className = "form-message error";
        return;
    }
    if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
        message.textContent = "Use at least 8 characters, including a letter and a number.";
        message.className = "form-message error";
        return;
    }

    localStorage.setItem("username", fullName);
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", normalizedPhone);
    localStorage.setItem("password", password);
    message.textContent = "Account created! Redirecting to sign in…";
    message.className = "form-message success";
    setTimeout(() => { window.location.href = "login.html"; }, 600);
});
