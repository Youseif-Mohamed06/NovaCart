document.addEventListener("DOMContentLoaded", () => {
    if (!Store.isLoggedIn()) {
        window.location.replace("login.html?next=wishlist.html");
        return;
    }

    const container = document.querySelector("#wishlist_products");

    function renderWishlist() {
        const saved = Store.getFavorites().map(Store.findProduct).filter(Boolean);
        container.innerHTML = saved.length
            ? saved.map(Store.productCard).join("")
            : '<div class="empty-state"><h2>Your Wishlist Is Empty</h2><p>Save products you love and they will appear here.</p><a class="button" href="index.html#shop">Browse Products</a></div>';
    }

    document.addEventListener("favorites:updated", renderWishlist);
    renderWishlist();
});
