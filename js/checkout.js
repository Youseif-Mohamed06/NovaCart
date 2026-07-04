document.addEventListener("DOMContentLoaded", () => {
    if (!Store.isLoggedIn()) {
        window.location.replace("login.html?next=checkout.html");
        return;
    }

    const cart = Store.getCart();
    const content = document.querySelector("#checkout_content");

    if (!cart.length) {
        content.innerHTML = '<div class="empty-state"><h2>Your Cart Is Empty</h2><p>Add products before starting checkout.</p><a class="button" href="index.html">Browse Products</a></div>';
        return;
    }

    const subtotal = Store.cartSubtotal();
    const shipping = subtotal >= 3000 ? 0 : 120;
    document.querySelector("#checkout_items").innerHTML = cart.map((item) => {
        const product = Store.findProduct(item.id);
        return `<div class="checkout-item"><img src="${product.imageUrl}" alt=""><span>${Store.escapeHtml(product.title)} <small>×${item.quantity}</small></span><strong>${Store.formatPrice(product.price * item.quantity)}</strong></div>`;
    }).join("");
    document.querySelector("#checkout_subtotal").textContent = Store.formatPrice(subtotal);
    document.querySelector("#checkout_shipping").textContent = shipping ? Store.formatPrice(shipping) : "Free";
    document.querySelector("#checkout_total").textContent = Store.formatPrice(subtotal + shipping);
    document.querySelector("#checkout_email").value = localStorage.getItem("email") || "";

    document.querySelectorAll('input[name="payment"]').forEach((radio) => {
        radio.addEventListener("change", () => {
            const isCard = radio.checked && radio.value === "Demo card";
            const fields = document.querySelector("#card_fields");
            fields.hidden = !isCard;
            fields.querySelectorAll("input").forEach((input) => { input.required = isCard; });
        });
    });

    document.querySelector("#checkout_form").addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const orderNumber = `NC-${Date.now().toString().slice(-6)}`;
        const order = { number: orderNumber, total: subtotal + shipping, payment: data.get("payment"), createdAt: new Date().toISOString() };
        localStorage.setItem(Store.KEYS.order, JSON.stringify(order));
        Store.clearCart();
        window.location.href = "order-success.html";
    });
});
