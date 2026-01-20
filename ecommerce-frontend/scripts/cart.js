const cartItemsDiv = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

//If cart is empty
if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    checkoutBtn.disabled = true;
} else {
    renderCart();
}

function renderCart() {
    cartItemsDiv.innerHTML ="";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <img src="${item.image || item.imageUrl || '' }" alt ="${item.title}">
            <div class="cart-info">
            <h4>${item.title}</h4>
            <p>$${item.price}</p>

            <div class="qty-controls">
            <button onclick="changeQty(${index}, -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
            </div>

            <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
            `;

            cartItemsDiv.appendChild(div);
    });
    cartTotalEl.innerText = total.toFixed(2);
    localStorage.setItem("cart", JSON.stringify(cart));
}

//Quantity change
function changeQty(index, change) {
    cart[index].qty += change;
    if(cart[index].qty < 1) cart[index].qty =1;
    renderCart();
}

//remove item
function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

//checkout
checkoutBtn.onclick = () => {
    if(cart.length == 0) return;
    alert("checkout coming soon");
};
