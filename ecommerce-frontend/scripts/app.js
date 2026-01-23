// ================= HAMBURGER MENU =================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.style.display =
      navMenu.style.display === "flex" ? "none" : "flex";
  });
}

// ================= PRODUCT GRID =================
const productGrid = document.getElementById("productGrid");

if (productGrid) {
  productGrid.innerHTML = "<p>Loading products...</p>";

  fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(products => displayProducts(products))
    .catch(err => {
      console.error(err);
      productGrid.innerHTML = "<p>Failed to load products.</p>";
    });
}

// ================= DISPLAY PRODUCTS =================
function displayProducts(products) {
  productGrid.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <a href="product.html?id=${product.id}" class="product-link">
        <img 
          src="${product.image}" 
          alt="${product.title}" 
          loading="lazy"
          onerror="this.src='assets/image.webp'"
        >
        <h3>${product.title}</h3>
      </a>

      <p class="price">$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productGrid.appendChild(card);
  });
}

// ================= ADD TO CART FUNCTION =================
function addToCart(productId) {
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(res => res.json())
    .then(product => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingItem = cart.find(item => item.id === product.id);

      if(existingItem) {
        existingItem.qty += 1;
      }else {
          cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            qty:1
          });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert("Product added to cart");
    })
    .catch(err => console.error("Add to cart failed", err));
  }

// ================= CART COUNT ==================
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) cartCount.innerText = count;
}

//Run once on page load
updateCartCount();