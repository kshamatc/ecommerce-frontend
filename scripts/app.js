// ================= HAMBURGER MENU =================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.style.display =
    navMenu.style.display === "flex" ? "none" : "flex";
});

// ================= PRODUCT GRID =================
const productGrid = document.getElementById("productGrid");
productGrid.innerHTML = "<p>Loading products...</p>";

fetch("https://fakestoreapi.com/products")
  .then(response => response.json())
  .then(products => {
    displayProducts(products);
  })
  .catch(error => {
    productGrid.innerHTML = "<p>Failed to load products.</p>";
    console.error("Error fetching products:", error);
  });

// ================= DISPLAY PRODUCTS =================
function displayProducts(products) {
  productGrid.innerHTML = "";

  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <a href="product.html?id=${product.id}"  class="view-btn">View Details</a>
    
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        <h3>${product.title}</h3>
        <p class="price">$${product.price}</p>
      </a>
      <button>Add to Cart</button>
    `;

    productGrid.appendChild(productCard);
  });
}
