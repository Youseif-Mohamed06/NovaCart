const Store = (() => {
    const KEYS = {
        cart: "product",
        favorites: "love",
        loggedIn: "isLoggedIn",
        order: "lastOrder"
    };

    const product = (data) => ({
        originalPrice: null, badge: "", stock: 20, brand: "NovaTech", warranty: "1 year",
        dimensions: "—", weight: "—", features: [], specifications: {}, reviews: [],
        gallery: [data.imageUrl], ...data
    });

    const products = [
        product({ id: 1, title: "QuietWave ANC Headphones", category: "Audio", brand: "SoundCore", description: "Over-ear wireless headphones with adaptive noise cancellation, clear calls, and balanced all-day sound.", price: 1199, originalPrice: 1499, badge: "Best Seller", stock: 18, rating: 4.8, reviewCount: 126, imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_52_19 PM.png", gallery: ["image/ChatGPT Image Feb 25, 2026, 04_52_19 PM.png", "image/ChatGPT Image Feb 25, 2026, 04_06_49 PM.png"], dimensions: "19 × 17 × 8 cm", weight: "254 g", warranty: "18 months", features: ["Adaptive ANC", "30-hour battery", "Multipoint Bluetooth 5.3", "Fast charge: 5 hours in 10 minutes"], specifications: { Driver: "40 mm dynamic", Codec: "AAC / SBC", Charging: "USB-C", Microphones: "4 beamforming mics" }, reviews: [{ name: "Mariam A.", rating: 5, text: "Comfortable through a full workday and the noise cancellation handles office chatter very well." }, { name: "Omar H.", rating: 4, text: "Warm, detailed sound and excellent battery life. The case could be a little smaller." }] }),
        product({ id: 2, title: "Vertex Pro 15 Laptop", category: "Computers", brand: "Vertex", description: "A dependable 15.6-inch productivity laptop for demanding office work, study, and light creative projects.", price: 19999, originalPrice: 26999, badge: "Sale", stock: 7, rating: 4.7, reviewCount: 48, imageUrl: "image/ChatGPT Image Feb 25, 2026, 05_02_03 PM.png", dimensions: "35.7 × 23.5 × 1.8 cm", weight: "1.72 kg", warranty: "2 years", features: ["Intel Core i7 processor", "16 GB DDR5 memory", "512 GB NVMe SSD", "Backlit keyboard"], specifications: { Display: "15.6-inch IPS, 1920 × 1080", Graphics: "Integrated Iris Xe", Wireless: "Wi-Fi 6E / Bluetooth 5.3", Ports: "USB-C, 2× USB-A, HDMI, audio" }, reviews: [{ name: "Nour E.", rating: 5, text: "Quick startup, a sharp display, and enough power for my design coursework." }] }),
        product({ id: 3, title: "FlexFit Silicone Watch Band", category: "Wearables", brand: "FlexFit", description: "A breathable, skin-friendly replacement band with a secure pin-and-tuck closure.", price: 1200, badge: "New", stock: 36, rating: 4.5, reviewCount: 73, imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_26_41 PM.png", dimensions: "22 mm width; fits 140–210 mm wrists", weight: "28 g", warranty: "6 months", features: ["Sweat-resistant silicone", "Tool-free installation", "Stainless-steel pin", "Easy-clean finish"], specifications: { Compatibility: "22 mm watch lugs", Material: "Soft-touch silicone", Closure: "Pin-and-tuck" } }),
        product({ id: 4, title: "Roam Mini Bluetooth Speaker", category: "Audio", brand: "Roam", description: "A compact water-resistant speaker with full-range sound and a practical carry loop.", price: 350, originalPrice: 250, badge: "Sale", stock: 12, rating: 4.7, reviewCount: 91, imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_32_34 PM.png", dimensions: "17.8 × 7.2 × 7.2 cm", weight: "520 g", warranty: "1 year", features: ["IPX7 water resistance", "12-hour playtime", "Stereo pairing", "Built-in microphone"], specifications: { Output: "20 W", Wireless: "Bluetooth 5.2", Battery: "3600 mAh", Charging: "USB-C" } }),
        product({ id: 5, title: "VoltMax 20K Power Bank", category: "Accessories", brand: "VoltMax", description: "A high-capacity portable charger with USB-C Power Delivery and a clear battery display.", price: 500, originalPrice: 750, badge: "Best Seller", stock: 24, rating: 4.6, reviewCount: 154, imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_31_04 PM.png", gallery: ["image/ChatGPT Image Feb 25, 2026, 04_31_04 PM.png", "image/ChatGPT Image Feb 25, 2026, 04_29_38 PM.png"], dimensions: "15.2 × 6.8 × 2.9 cm", weight: "410 g", warranty: "18 months", features: ["20,000 mAh capacity", "22.5 W fast charging", "Three-device charging", "LED percentage display"], specifications: { Input: "USB-C 18 W", Output: "USB-C PD + 2× USB-A", Protection: "Overheat and short-circuit" } }),
        product({ id: 6, title: "Halo 15W Wireless Charger", category: "Accessories", brand: "Halo", description: "A slim Qi charging pad with foreign-object detection and a non-slip surface.", price: 749, badge: "New", stock: 30, rating: 4.4, reviewCount: 57, imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_43_27 PM.png", dimensions: "10 × 10 × 0.8 cm", weight: "92 g", warranty: "1 year", features: ["Up to 15 W output", "Case-friendly charging", "Temperature control", "Status indicator"], specifications: { Standard: "Qi", Input: "USB-C", RecommendedAdapter: "20 W PD" } }),
        product({ id: 7, title: "LinkPro USB-C Cable 2 m", category: "Accessories", brand: "LinkPro", description: "A reinforced braided USB-C cable designed for reliable daily charging and data transfer.", price: 299, originalPrice: 399, badge: "Sale", stock: 42, rating: 4.4, reviewCount: 203, imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_41_22 PM.png", dimensions: "2 m length", weight: "64 g", warranty: "2 years", features: ["100 W Power Delivery", "Braided nylon jacket", "10,000-bend tested", "E-marker chip"], specifications: { Connector: "USB-C to USB-C", DataSpeed: "480 Mbps", Power: "Up to 100 W" } }),
        product({ id: 8, title: "Pulse X8 Gaming Mouse", category: "Gaming", brand: "Pulse", description: "A precise ergonomic gaming mouse with a lightweight shell and configurable controls.", price: 999, badge: "Best Seller", stock: 15, rating: 4.8, reviewCount: 118, imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_44_10 PM.png", dimensions: "12.4 × 6.6 × 4 cm", weight: "76 g", warranty: "2 years", features: ["16,000 DPI optical sensor", "Six programmable buttons", "Onboard profiles", "RGB lighting"], specifications: { PollingRate: "1000 Hz", Switches: "50-million-click rated", Connection: "Wired USB" } }),
        product({ id: 9, title: "Forge TKL Mechanical Keyboard", category: "Gaming", brand: "Forge", description: "A compact tenkeyless mechanical keyboard with tactile switches and durable keycaps.", price: 1500, originalPrice: 2000, badge: "Sale", stock: 9, rating: 4.7, reviewCount: 84, imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_45_20 PM.png", dimensions: "35.9 × 13.6 × 3.7 cm", weight: "790 g", warranty: "2 years", features: ["Hot-swappable switches", "Per-key RGB", "PBT keycaps", "Detachable USB-C cable"], specifications: { Layout: "87-key TKL", Switch: "Tactile brown", Rollover: "Full N-key" } }),
        product({ id: 10, title: "Luma RGB Desk Mat", category: "Gaming", brand: "Luma", description: "An extended desk mat with a smooth tracking surface, stitched edges, and soft RGB perimeter lighting.", price: 799, badge: "Limited Stock", stock: 4, rating: 4.5, reviewCount: 39, imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_49_25 PM.png", dimensions: "80 × 30 × 0.4 cm", weight: "620 g", warranty: "1 year", features: ["Micro-textured surface", "Non-slip rubber base", "Stitched edges", "Ten lighting modes"], specifications: { Power: "USB", Surface: "Water-resistant fabric" } }),
        product({ id: 11, title: "GripDrive Car Phone Mount", category: "Accessories", brand: "GripDrive", description: "A sturdy dashboard phone mount with one-hand operation and flexible positioning.", price: 344, badge: "", stock: 21, rating: 4.3, reviewCount: 66, imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_49_54 PM.png", dimensions: "11 × 7.5 × 12 cm", weight: "185 g", warranty: "1 year", features: ["360° rotating head", "Reusable suction base", "One-hand release", "Fits 4.7–6.9-inch phones"], specifications: { Mounting: "Dashboard / windscreen", Material: "ABS and silicone" } }),
        product({ id: 12, title: "Shield AirPods Pro Case", category: "Audio", brand: "Shield", description: "A shock-absorbing protective case with precise charging access and a secure metal clip.", price: 250, badge: "New", stock: 28, rating: 4.4, reviewCount: 45, imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_51_19 PM.png", dimensions: "7.1 × 5.1 × 2.7 cm", weight: "34 g", warranty: "6 months", features: ["Impact-resistant silicone", "Wireless charging compatible", "Visible status light", "Metal carabiner"], specifications: { Compatibility: "AirPods Pro 1st / 2nd gen", Material: "Silicone" } }),
        product({ id: 13, title: "ArmorGuard Phone Case", category: "Accessories", brand: "ArmorGuard", description: "A rugged phone case with reinforced corners, raised camera protection, and a secure textured grip.", price: 249, originalPrice: 350, badge: "New", stock: 14, rating: 4.6, reviewCount: 32, imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_09_05 PM.png", gallery: ["image/ChatGPT Image Feb 25, 2026, 04_09_05 PM.png", "image/ChatGPT Image Feb 25, 2026, 04_19_24 PM.png"], dimensions: "16.3 × 8.1 × 1.4 cm", weight: "58 g", warranty: "1 year", features: ["2 m drop protection", "Raised screen lip", "Camera guard", "Wireless charging compatible"], specifications: { Material: "TPU and polycarbonate", Compatibility: "6.7-inch Pro smartphones" } }),
        product({ id: 14, title: "MetroCharge Laptop Backpack", category: "Accessories", brand: "MetroGear", description: "A structured commuter backpack with a padded laptop compartment and convenient external charging port.", price: 999, originalPrice: 1299, badge: "Sale", stock: 6, rating: 4.7, reviewCount: 51, imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_45_43 PM.png", dimensions: "46 × 31 × 18 cm", weight: "860 g", warranty: "1 year", features: ["Fits laptops up to 15.6 inches", "External USB charging port", "Water-resistant fabric", "Breathable padded back"], specifications: { Capacity: "28 L", Material: "900D polyester", Compartments: "3 main + organizer pockets" } }),
        product({ id: 15, title: "StudioLite Wireless Headphones", category: "Audio", brand: "StudioLite", description: "Comfortable everyday wireless headphones tuned for podcasts, music, and video calls.", price: 2199, badge: "Limited Stock", stock: 5, rating: 4.5, reviewCount: 67, imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_06_49 PM.png", dimensions: "18.5 × 16.5 × 7.8 cm", weight: "228 g", warranty: "1 year", features: ["Passive noise isolation", "25-hour battery", "Fold-flat earcups", "Clear-call microphone"], specifications: { Driver: "40 mm", Wireless: "Bluetooth 5.2", Charging: "USB-C" } }),
        product({ id: 16, title: "VoltMax Outdoor 30K Power Bank", category: "Accessories", brand: "VoltMax", description: "A rugged high-capacity power bank with multiple outputs, an emergency light, and easy-read display.", price: 549, badge: "Limited Stock", stock: 3, rating: 4.6, reviewCount: 29, imageUrl: "image/ChatGPT Image Feb 25, 2026, 04_29_38 PM.png", dimensions: "16.8 × 8.2 × 3.4 cm", weight: "610 g", warranty: "18 months", features: ["30,000 mAh capacity", "Six charging outputs", "Built-in LED light", "Rugged shell"], specifications: { Output: "22.5 W max", Input: "USB-C", Display: "Digital percentage" } })
    ];

    const read = (key, fallback = []) => {
        try {
            const value = JSON.parse(localStorage.getItem(key));
            return value ?? fallback;
        } catch {
            return fallback;
        }
    };

    const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
    const findProduct = (id) => products.find((product) => product.id === Number(id));

    function getCart() {
        if (!isLoggedIn()) {
            localStorage.removeItem(KEYS.cart);
            return [];
        }

        const saved = read(KEYS.cart);
        const grouped = new Map();

        saved.forEach((item) => {
            const id = Number(item.id);
            if (!findProduct(id)) return;
            const quantity = Number(item.quantity) || 1;
            grouped.set(id, (grouped.get(id) || 0) + quantity);
        });

        return [...grouped].map(([id, quantity]) => ({ id, quantity }));
    }

    function saveCart(cart) {
        if (!isLoggedIn()) {
            localStorage.removeItem(KEYS.cart);
            document.dispatchEvent(new CustomEvent("cart:updated"));
            return;
        }

        write(KEYS.cart, cart.filter((item) => item.quantity > 0));
        document.dispatchEvent(new CustomEvent("cart:updated"));
    }

    function requireAuthentication() {
        if (isLoggedIn()) return true;
        const page = window.location.pathname.split("/").pop() || "index.html";
        const next = `${page}${window.location.hash}`;
        window.location.href = `login.html?next=${encodeURIComponent(next)}`;
        return false;
    }

    function addToCart(id, quantity = 1, options = {}) {
        if (!requireAuthentication()) return;
        const cart = getCart();
        const selectedProduct = findProduct(id);
        const item = cart.find((entry) => entry.id === Number(id));
        if (item) item.quantity += quantity;
        else cart.push({ id: Number(id), quantity });
        saveCart(cart);
        if (!options.silent) toast(`${selectedProduct.title} Added to Cart`, "success");
    }

    function updateQuantity(id, quantity) {
        const cart = getCart();
        const item = cart.find((entry) => entry.id === Number(id));
        if (!item) return;
        item.quantity = Math.max(0, Number(quantity));
        saveCart(cart);
    }

    const removeFromCart = (id) => saveCart(getCart().filter((item) => item.id !== Number(id)));
    const clearCart = () => saveCart([]);
    const cartCount = () => getCart().reduce((sum, item) => sum + item.quantity, 0);
    const cartSubtotal = () => getCart().reduce((sum, item) => sum + findProduct(item.id).price * item.quantity, 0);

    function getFavorites() {
        if (!isLoggedIn()) return [];
        return [...new Set(read(KEYS.favorites).map((item) => Number(item.id ?? item)).filter((id) => findProduct(id)))];
    }

    function toggleFavorite(id) {
        if (!requireAuthentication()) return;
        const favorites = getFavorites();
        const productId = Number(id);
        const next = favorites.includes(productId)
            ? favorites.filter((favoriteId) => favoriteId !== productId)
            : [...favorites, productId];
        write(KEYS.favorites, next);
        document.dispatchEvent(new CustomEvent("favorites:updated"));
        toast(favorites.includes(productId) ? "Removed from favorites." : "Saved to favorites.");
    }

    const isFavorite = (id) => getFavorites().includes(Number(id));
    const isLoggedIn = () => localStorage.getItem(KEYS.loggedIn) === "true";
    const formatPrice = (price) => new Intl.NumberFormat("en-US", { style: "currency", currency: "EGP", maximumFractionDigits: 0 }).format(price);
    const discountPercent = (item) => item.originalPrice
        ? Math.round((1 - item.price / item.originalPrice) * 100)
        : 0;

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, (character) => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
        })[character]);
    }

    function toast(message, type = "default") {
        let element = document.querySelector(".toast");
        if (!element) {
            element = document.createElement("div");
            element.setAttribute("role", "status");
            element.setAttribute("aria-live", "polite");
            document.body.appendChild(element);
        }
        element.className = `toast toast-${type}`;
        element.textContent = message;
        element.classList.add("show");
        clearTimeout(toast.timer);
        toast.timer = setTimeout(() => element.classList.remove("show"), 2600);
    }

    function productCard(item) {
        const discount = discountPercent(item);
        return `
            <article class="product-card">
                <a class="product-image-link" href="product.html?id=${item.id}" aria-label="View ${escapeHtml(item.title)}">
                    <img src="${item.imageUrl}" alt="${escapeHtml(item.title)}" loading="lazy">
                    <span class="product-category">${item.category}</span>
                    <div class="product-badges">${item.badge ? `<span class="product-badge">${escapeHtml(item.badge)}</span>` : ""}${discount ? `<span class="discount-badge">-${discount}%</span>` : ""}</div>
                </a>
                <div class="product-card-body">
                    <div class="rating" aria-label="${item.rating} out of 5 stars">★ ${item.rating} <span>(${item.reviewCount || 0})</span></div>
                    <h3><a href="product.html?id=${item.id}">${escapeHtml(item.title)}</a></h3>
                    <p>${escapeHtml(item.description)}</p>
                    <span class="stock-status ${item.stock <= 5 ? "low-stock" : ""}">${item.stock <= 5 ? `Only ${item.stock} left` : "In stock"}</span>
                    <div class="product-card-footer">
                        <div class="price-stack"><strong>${formatPrice(item.price)}</strong>${item.originalPrice ? `<del>${formatPrice(item.originalPrice)}</del>` : ""}</div>
                        <div class="card-actions">
                            <button class="icon-button favorite-button ${isFavorite(item.id) ? "active" : ""}" data-favorite="${item.id}" aria-label="Toggle favorite">♥</button>
                            <button class="button button-small" data-add-cart="${item.id}">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </article>`;
    }

    function renderHeader() {
        const links = document.querySelector("#links");
        const userInfo = document.querySelector("#user_info");
        const username = document.querySelector("#user");
        const loggedIn = isLoggedIn();
        if (links) links.hidden = loggedIn;
        if (userInfo) userInfo.hidden = !loggedIn;
        document.querySelectorAll(".footer-guest-link").forEach((link) => {
            link.hidden = loggedIn;
        });
        document.querySelectorAll(".footer-member-link").forEach((link) => {
            link.hidden = !loggedIn;
        });
        document.querySelectorAll(".shopping_cart").forEach((cart) => {
            cart.hidden = !loggedIn;
        });
        if (username) username.textContent = loggedIn ? localStorage.getItem("username") || "Account" : "";
        updateCartPreview();
    }

    function updateCartPreview() {
        const badge = document.querySelector(".badge");
        const items = document.querySelector(".cart_items");
        const total = document.querySelector("#total_price");
        if (badge) badge.textContent = cartCount();
        if (total) total.textContent = formatPrice(cartSubtotal());
        if (items) {
            const cart = getCart();
            items.innerHTML = cart.length
                ? cart.slice(0, 4).map((item) => `<div class="mini-cart-item"><span>${escapeHtml(findProduct(item.id).title)}</span><b>×${item.quantity}</b></div>`).join("")
                : '<p class="empty-mini-cart">Your cart is empty.</p>';
        }
    }

    function bindSharedEvents() {
        document.addEventListener("click", (event) => {
            const addButton = event.target.closest("[data-add-cart]");
            const favoriteButton = event.target.closest("[data-favorite]");
            const cartButton = event.target.closest("#cart_toggle");
            const logoutButton = event.target.closest("#logout");
            if (favoriteButton) {
    toggleFavorite(favoriteButton.dataset.favorite);

    favoriteButton.classList.toggle(
        "active",
        isFavorite(favoriteButton.dataset.favorite)
    );
}

if (addButton) {
    addToCart(addButton.dataset.addCart);

    addButton.textContent = "Added ✓";
    addButton.disabled = true;

    setTimeout(() => {
        addButton.textContent = "Add to Cart";
        addButton.disabled = false;
    }, 1500);
}

if (cartButton) {
    event.stopPropagation();

    const preview = document.querySelector(".carts_products");

    if (preview) {
        preview.classList.toggle("open");
    }
}

            if (logoutButton) {
                event.preventDefault();
                localStorage.removeItem(KEYS.loggedIn);
                localStorage.removeItem(KEYS.cart);
                sessionStorage.clear();
                document.dispatchEvent(new CustomEvent("cart:updated"));
                document.querySelector(".carts_products")?.classList.remove("open");
                renderHeader();
                toast("You have been logged out.");
                if (["cartsproducts.html", "checkout.html", "wishlist.html"].includes(window.location.pathname.split("/").pop())) {
                    window.location.replace("index.html");
                }
            }
            if (!event.target.closest(".shopping_cart")) {
                document.querySelector(".carts_products")?.classList.remove("open");
            }
        });
        document.addEventListener("cart:updated", updateCartPreview);
        renderHeader();
    }

    return {
        products, findProduct, getCart, addToCart, updateQuantity, removeFromCart, clearCart,
        cartCount, cartSubtotal, getFavorites, toggleFavorite, isFavorite, isLoggedIn,
        formatPrice, discountPercent, escapeHtml, toast, productCard, renderHeader, bindSharedEvents, KEYS
    };
})();

document.addEventListener("DOMContentLoaded", Store.bindSharedEvents);
