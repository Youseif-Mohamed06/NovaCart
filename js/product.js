document.addEventListener("DOMContentLoaded", () => {
    const id = new URLSearchParams(window.location.search).get("id");
    const product = Store.findProduct(id);
    const detail = document.querySelector("#product_detail");

    if (!product) {
        detail.innerHTML = '<div class="empty-state"><h1>Product Not Found</h1><p>This product may no longer be available.</p><a class="button" href="index.html">Browse Products</a></div>';
        return;
    }

    const discount = Store.discountPercent(product);
    const gallery = product.gallery?.length ? product.gallery : [product.imageUrl];
    const stockText = product.stock <= 5 ? `Limited stock — only ${product.stock} left` : `${product.stock} available`;
    document.title = `${product.title} | NovaCart`;
    document.querySelector("#product_breadcrumb").innerHTML = `<a href="index.html">Home</a><span>›</span><a href="index.html#shop">${product.category}</a><span>›</span><span>${Store.escapeHtml(product.title)}</span>`;

    detail.innerHTML = `
        <div class="product-detail">
            <div class="product-gallery">
                <div class="product-detail-image"><img id="gallery_main" src="${gallery[0]}" alt="${Store.escapeHtml(product.title)}"></div>
                <div class="gallery-thumbnails" aria-label="Product images">
                    ${gallery.map((image, index) => `<button class="${index === 0 ? "active" : ""}" data-gallery-image="${image}" aria-label="View image ${index + 1}"><img src="${image}" alt=""></button>`).join("")}
                </div>
            </div>
            <div class="product-detail-info">
                <div class="detail-badges">${product.badge ? `<span class="product-badge">${Store.escapeHtml(product.badge)}</span>` : ""}${discount ? `<span class="discount-badge">Save ${discount}%</span>` : ""}</div>
                <span class="eyebrow">${product.brand} · ${product.category}</span>
                <h1>${Store.escapeHtml(product.title)}</h1>
                <div class="rating">★ ${product.rating} <a href="#product_reviews">${product.reviewCount || 0} Reviews</a></div>
                <p>${Store.escapeHtml(product.description)}</p>
                <div class="detail-price-row"><strong class="detail-price">${Store.formatPrice(product.price)}</strong>${product.originalPrice ? `<del>${Store.formatPrice(product.originalPrice)}</del>` : ""}</div>
                <p class="stock-status ${product.stock <= 5 ? "low-stock" : ""}">${stockText}</p>
                <ul class="feature-list">${product.features.slice(0, 4).map((feature) => `<li>${Store.escapeHtml(feature)}</li>`).join("")}</ul>
                <div class="detail-actions">
                    <label>Quantity<input id="detail_quantity" type="number" min="1" max="${Math.min(product.stock, 10)}" value="1"></label>
                    <button id="detail_add" class="button button-large">Add to Cart</button>
                    <button class="button button-secondary button-large" data-favorite="${product.id}">${Store.isFavorite(product.id) ? "Saved ♥" : "Save ♥"}</button>
                </div>
                <ul class="benefit-list"><li>30-day returns</li><li>${product.warranty} warranty</li><li>Free delivery over EGP 3,000</li></ul>
            </div>
        </div>`;

    document.querySelector("#product_information").innerHTML = `
        <div><span class="eyebrow">Product Details</span><h2>Built for Everyday Use</h2><ul class="feature-list">${product.features.map((feature) => `<li>${Store.escapeHtml(feature)}</li>`).join("")}</ul></div>
        <div><h2>Specifications</h2><dl class="specification-list"><div><dt>Brand</dt><dd>${product.brand}</dd></div><div><dt>Dimensions</dt><dd>${product.dimensions}</dd></div><div><dt>Weight</dt><dd>${product.weight}</dd></div><div><dt>Warranty</dt><dd>${product.warranty}</dd></div>${Object.entries(product.specifications).map(([key, value]) => `<div><dt>${key.replace(/([A-Z])/g, " $1")}</dt><dd>${value}</dd></div>`).join("")}</dl></div>`;

    document.querySelector(".gallery-thumbnails").addEventListener("click", (event) => {
        const button = event.target.closest("[data-gallery-image]");
        if (!button) return;
        document.querySelector("#gallery_main").src = button.dataset.galleryImage;
        document.querySelectorAll("[data-gallery-image]").forEach((item) => item.classList.toggle("active", item === button));
    });
    document.querySelector("#detail_add").addEventListener("click", () => Store.addToCart(product.id, Number(document.querySelector("#detail_quantity").value)));
    document.addEventListener("favorites:updated", () => {
        const button = document.querySelector(`[data-favorite="${product.id}"]`);
        if (button) button.textContent = Store.isFavorite(product.id) ? "Saved ♥" : "Save ♥";
    });

    const related = Store.products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);
    const recommended = Store.products.filter((item) => item.category !== product.category && item.id !== product.id).sort((a, b) => b.rating - a.rating).slice(0, 3);
    const bundlePricing = Store.getBundleForProduct(product.id);
    const { items: bundleItems, originalTotal: bundleOriginalTotal, bundlePrice, savings: bundleSavings } = bundlePricing;

    document.querySelector("#related_products").innerHTML = related.map(Store.productCard).join("");
    document.querySelector("#recommended_products").innerHTML = recommended.map(Store.productCard).join("");
    document.querySelector("#bought_together").innerHTML = `
        <div class="section-heading"><div><span class="eyebrow">Complete Your Setup</span><h2>Frequently Bought Together</h2></div></div>
        <div class="bundle-offer-card">
            <div class="bundle-offer-banner"><span>Bundle Offer</span><strong>Buy Together And Save 10%</strong><p>Handpicked accessories that work well with this product.</p></div>
            <div class="bundle-card"><div class="bundle-products">${bundleItems.map((item, index) => `${index ? "<span>+</span>" : ""}<a href="product.html?id=${item.id}"><img src="${item.imageUrl}" alt="${Store.escapeHtml(item.title)}"><small>${Store.escapeHtml(item.title)}</small></a>`).join("")}</div><div class="bundle-pricing"><p>Original Total <del>${Store.formatPrice(bundleOriginalTotal)}</del></p><span>Bundle Price</span><strong>${Store.formatPrice(bundlePrice)}</strong><small>You Save ${Store.formatPrice(bundleSavings)}</small><button class="button" id="add_bundle">Add Bundle to Cart</button></div></div>
        </div>`;
    document.querySelector("#add_bundle").addEventListener("click", () => Store.addBundleToCart(product.id));

    const reviews = product.reviews.length ? product.reviews : [
        { name: "Salma M.", rating: 5, text: "The product matched the description, arrived well packed, and feels thoughtfully made." },
        { name: "Karim R.", rating: 4, text: "Good value for the price and easy to use. Delivery was quick as well." }
    ];
    document.querySelector("#product_reviews").innerHTML = `<div class="review-summary"><strong>${product.rating}</strong><span>★ ${product.rating} average<br>${product.reviewCount || reviews.length} ratings</span></div><div class="review-list">${reviews.map((review) => `<article><div><b>${Store.escapeHtml(review.name)}</b><span>${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</span></div><p>${Store.escapeHtml(review.text)}</p><small>Verified purchase</small></article>`).join("")}</div>`;
});
