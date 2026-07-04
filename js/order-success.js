document.addEventListener("DOMContentLoaded", () => {
    let order;

    try {
        order = JSON.parse(localStorage.getItem("lastOrder"));
    } catch {
        order = null;
    }

    document.querySelector("#order_number").textContent = order?.number || "is confirmed";
});
