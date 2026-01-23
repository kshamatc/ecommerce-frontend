console.log("product.js loaded");

//get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const productDetails = document.getElementById("productDetails");

if(!productId) {
    productDetails.innerHTML = "<p>Product not found.</p>";
    throw new Error("No product ID found in URL");
}

//Fetch product details
fetch(`https://fakestoreapi.com/products/${productId}`)
.then(res => res.json())
.then(product => {
    productDetails.innerHTML = `
    <div class="product-detail-card">
    <img src="${product.image}" alt="${product.title}">
    <div class="info">
    <h2>${product.title}</h2>
    <p class="price">$${product.price}</p>
    <p>${product.description}</p>
    <button id="addToCartBtn">Add to Cart</button>
    <p id="cartMessage"></p>
    </div>
    </div>
    `;

    document.getElementById("addToCartBtn").onclick = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ 
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: 1,
                image: product.image
            
            });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        document.getElementById("cartMessage").innerText = 
        "✅ Added to cartsuccessfully!";
    };
})
.catch(err => {
    productDetails.innerHTML = "<p>Failed to load product details.</p>";
    console.error(err);
});