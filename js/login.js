document.querySelector("#login_form").addEventListener("submit", (event) => {
    event.preventDefault();
    const identifier = document.querySelector("#identifier").value.trim();
    const password = document.querySelector("#password").value;
    const message = document.querySelector("#form_message");
    const normalizedIdentifier = identifier.includes("@")
        ? identifier.toLowerCase()
        : identifier.replace(/[\s()-]/g, "");
    const matchesAccount = normalizedIdentifier === localStorage.getItem("email")
        || normalizedIdentifier === localStorage.getItem("phone");

    if (!matchesAccount || password !== localStorage.getItem("password")) {
        message.textContent = "The email, phone number, or password is incorrect.";
        message.className = "form-message error";
        return;
    }

    localStorage.setItem("isLoggedIn", "true");
    message.textContent = "Welcome back! Redirecting…";
    message.className = "form-message success";
    const requestedPage = new URLSearchParams(window.location.search).get("next");
    const safePage = /^(cartsproducts|checkout|wishlist)\.html$/.test(requestedPage || "")
        ? requestedPage
        : "index.html";
    setTimeout(() => { window.location.href = safePage; }, 500);
});
