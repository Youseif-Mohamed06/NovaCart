document.addEventListener("DOMContentLoaded", () => {
    if (!Store.isLoggedIn()) {
        window.location.replace("login.html?next=cartsproducts.html");
        return;
    }

    const cartContainer = document.querySelector("#cart_items_page");
    const favoritesContainer = document.querySelector("#favorites_container");

    function renderCart() {
        const cart = Store.getCart();
        cartContainer.innerHTML = cart.length
            ? cart.map((item) => {
                const product = Store.findProduct(item.id);
                const unitPrice = Store.getItemUnitPrice(item);
                const unitPriceAttr = item.unitPrice != null ? ` data-unit-price="${item.unitPrice}"` : "";
                return `
                    <article class="cart-line">
                        <a href="product.html?id=${product.id}"><img src="${product.imageUrl}" alt="${Store.escapeHtml(product.title)}"></a>
                        <div class="cart-line-info">
                            <span>${product.category}</span>
                            <h3><a href="product.html?id=${product.id}">${Store.escapeHtml(product.title)}</a></h3>
                            <strong>${Store.formatPrice(unitPrice)}</strong>
                        </div>
                        <div class="quantity-control" aria-label="Quantity for ${Store.escapeHtml(product.title)}">
                            <button data-quantity="${product.id}" data-change="-1"${unitPriceAttr} aria-label="Decrease quantity">−</button>
                            <span>${item.quantity}</span>
                            <button data-quantity="${product.id}" data-change="1"${unitPriceAttr} aria-label="Increase quantity">+</button>
                        </div>
                        <strong class="line-total">${Store.formatPrice(unitPrice * item.quantity)}</strong>
                        <button class="remove-button" data-remove="${product.id}"${unitPriceAttr} aria-label="Remove ${Store.escapeHtml(product.title)}">Remove</button>
                    </article>`;
            }).join("")
            : '<div class="empty-state"><h2>Your Cart Is Empty</h2><p>Add a few products and they will appear here.</p><a class="button" href="index.html">Continue Shopping</a></div>';

        const subtotal = Store.cartSubtotal();
        document.querySelector("#summary_subtotal").textContent = Store.formatPrice(subtotal);
        document.querySelector("#summary_shipping").textContent = subtotal >= 3000 || subtotal === 0 ? "Free" : Store.formatPrice(120);
        document.querySelector("#summary_total").textContent = Store.formatPrice(subtotal + (subtotal > 0 && subtotal < 3000 ? 120 : 0));
        document.querySelector("#checkout_link").classList.toggle("disabled", cart.length === 0);
    }

    function renderFavorites() {
        const favorites = Store.getFavorites().map(Store.findProduct);
        favoritesContainer.innerHTML = favorites.length
            ? favorites.map(Store.productCard).join("")
            : '<div class="empty-state compact"><p>You have no saved favorites yet.</p></div>';
    }

    cartContainer.addEventListener("click", (event) => {
        const quantityButton = event.target.closest("[data-quantity]");
        const removeButton = event.target.closest("[data-remove]");
        const lineUnitPrice = (element) => (element.dataset.unitPrice ? Number(element.dataset.unitPrice) : undefined);

        if (quantityButton) {
            const unitPrice = lineUnitPrice(quantityButton);
            const item = Store.getCart().find((entry) => entry.id === Number(quantityButton.dataset.quantity)
                && (entry.unitPrice ?? null) === (unitPrice ?? null));
            Store.updateQuantity(item.id, item.quantity + Number(quantityButton.dataset.change), unitPrice);
        }
        if (removeButton) Store.removeFromCart(removeButton.dataset.remove, lineUnitPrice(removeButton));
    });

    document.querySelector("#checkout_link").addEventListener("click", (event) => {
        if (!Store.getCart().length) event.preventDefault();
    });

    document.addEventListener("cart:updated", renderCart);
    document.addEventListener("favorites:updated", renderFavorites);
    renderCart();
    renderFavorites();
});
