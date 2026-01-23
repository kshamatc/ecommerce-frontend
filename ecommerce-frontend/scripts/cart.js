document.addEventListener("DOMContentLoaded", () => {
  const cartItemsDiv = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("checkoutBtn");

  if (!cartItemsDiv) {
    console.log("Not on cart page");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    checkoutBtn.disabled = true;
    return;
  }

  renderCart();

  function renderCart() {
    cartItemsDiv.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.qty;

      const div = document.createElement("div");
      div.innerHTML = `
        <img src="${item.image}">
        <h4>${item.title}</h4>
        <p>$${item.price}</p>
        <button onclick="removeItem(${index})">Remove</button>
      `;

      cartItemsDiv.appendChild(div);
    });

    cartTotalEl.innerText = total.toFixed(2);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  window.removeItem = function(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  };
});
