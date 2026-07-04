document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector("#products_grid");
    const offersGrid = document.querySelector("#offers_grid");
    const input = document.querySelector("#search_input");
    const suggestions = document.querySelector("#search_suggestions");
    const category = document.querySelector("#category_filter");
    const sort = document.querySelector("#sort_products");
    const results = document.querySelector("#result_count");
    const loadMore = document.querySelector("#load_more");
    const pageSize = 6;
    let visibleCount = pageSize;

    const skeletons = (count) => Array.from({ length: count }, () => `
        <article class="product-card skeleton-card" aria-hidden="true">
            <div class="skeleton skeleton-image"></div>
            <div class="product-card-body">
                <div class="skeleton skeleton-line short"></div><div class="skeleton skeleton-line"></div>
                <div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line medium"></div>
            </div>
        </article>`).join("");

    function filteredProducts() {
        const query = input.value.trim().toLowerCase();
        const filtered = Store.products.filter((item) => {
            const searchable = `${item.title} ${item.brand} ${item.category} ${item.description}`.toLowerCase();
            return searchable.includes(query) && (category.value === "all" || item.category === category.value);
        });
        if (sort.value === "price-low") filtered.sort((a, b) => a.price - b.price);
        if (sort.value === "price-high") filtered.sort((a, b) => b.price - a.price);
        if (sort.value === "rating") filtered.sort((a, b) => b.rating - a.rating);
        return filtered;
    }

    function renderProducts() {
        const filtered = filteredProducts();
        const visible = filtered.slice(0, visibleCount);
        grid.innerHTML = visible.length ? visible.map(Store.productCard).join("")
            : '<div class="empty-state"><h3>No Products Found</h3><p>Try another search term or category.</p></div>';
        results.textContent = `Showing ${visible.length} of ${filtered.length} products`;
        loadMore.hidden = visible.length >= filtered.length;
    }

    function renderSuggestions() {
        const query = input.value.trim().toLowerCase();
        if (query.length < 2) { suggestions.hidden = true; return; }
        const matches = Store.products.filter((item) =>
            `${item.title} ${item.brand} ${item.category}`.toLowerCase().includes(query)
        ).slice(0, 5);
        suggestions.innerHTML = matches.length
            ? matches.map((item) => `<button type="button" role="option" data-suggestion="${Store.escapeHtml(item.title)}"><img src="${item.imageUrl}" alt=""><span><b>${Store.escapeHtml(item.title)}</b><small>${item.category} · ${Store.formatPrice(item.price)}</small></span></button>`).join("")
            : '<p>No matching suggestions</p>';
        suggestions.hidden = false;
    }

    function renderOffers() {
        const offers = Store.products.filter((item) => item.originalPrice)
            .sort((a, b) => Store.discountPercent(b) - Store.discountPercent(a)).slice(0, 4);
        offersGrid.innerHTML = offers.map((item) => `
            <a class="offer-card" href="product.html?id=${item.id}">
                <img src="${item.imageUrl}" alt="${Store.escapeHtml(item.title)}" loading="lazy">
                <div><span>Save ${Store.discountPercent(item)}%</span><h3>${Store.escapeHtml(item.title)}</h3><p>${Store.formatPrice(item.price)} <del>${Store.formatPrice(item.originalPrice)}</del></p></div>
            </a>`).join("");
    }

    grid.innerHTML = skeletons(pageSize);
    offersGrid.innerHTML = skeletons(4);
    window.setTimeout(() => { renderOffers(); renderProducts(); }, 250);

    input.addEventListener("input", () => { visibleCount = pageSize; renderSuggestions(); renderProducts(); });
    input.addEventListener("keydown", (event) => { if (event.key === "Escape") suggestions.hidden = true; });
    suggestions.addEventListener("click", (event) => {
        const choice = event.target.closest("[data-suggestion]");
        if (!choice) return;
        input.value = choice.dataset.suggestion;
        suggestions.hidden = true;
        visibleCount = pageSize;
        renderProducts();
    });
    document.addEventListener("click", (event) => {
        if (!event.target.closest(".search-field")) suggestions.hidden = true;
    });
    category.addEventListener("change", () => { visibleCount = pageSize; renderProducts(); });
    sort.addEventListener("change", () => { visibleCount = pageSize; renderProducts(); });
    loadMore.addEventListener("click", () => { visibleCount += pageSize; renderProducts(); });
    document.addEventListener("favorites:updated", renderProducts);
});
