let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let slide = document.querySelector('.slide');

// Next button click
next.addEventListener('click', function () {
    let items = document.querySelectorAll('.item');
    slide.appendChild(items[0]); // move first item to last
});

// Prev button click
prev.addEventListener('click', function () {
    let items = document.querySelectorAll('.item');
    slide.prepend(items[items.length - 1]); // move last item to first
});

// Auto slide every 3 seconds
function autoSlide() {
    let items = document.querySelectorAll('.item');
    slide.appendChild(items[0]);
}

let autoPlay = setInterval(autoSlide, 2500); // 3000ms = 3 seconds

// Optional: Pause autoplay on hover, resume on leave
slide.addEventListener('mouseenter', () => clearInterval(autoPlay));
slide.addEventListener('mouseleave', () => autoPlay = setInterval(autoSlide, 2500));


// ✅ Add your image links & category names here
const categories = [
    { name: "Paan Corner", img: "https://lnk.ink/S1kmG" },
    { name: "Dairy, Bread & Eggs", img: "https://lnk.ink/ZXvU0" },
    { name: "Fruits & Vegetables", img: "https://lnk.ink/9SDTE" },
    { name: "Snacks & Munchies", img: "https://lnk.ink/IwC0z" },
    { name: "Bakery & Biscuits", img: "https://c8.alamy.com/comp/BJ76HC/an-assortment-of-packets-of-biscuits-BJ76HC.jpg" },
    { name: "Cold Drinks & Juices", img: "https://lnk.ink/KrKZB" }
];

const container = document.getElementById("categoryContainer");

// ✅ Generate category boxes dynamically
categories.forEach(cat => {
    const div = document.createElement("div");
    div.classList.add("category");
    div.onclick = () => openCategory(cat.name);

    div.innerHTML = `
        <img src="${cat.img}" alt="${cat.name}">
        <h4>${cat.name}</h4>
      `;

    container.appendChild(div);
});

function openCategory(category) {
    alert("You clicked on " + category);
    // Example: window.location.href = category.toLowerCase().replace(/\s+/g, "-") + ".html";
}

// Add event listeners to offer cards
// script.js
function slideRight() {
    const slider = document.getElementById('productSlider');
    const cardWidth = 216; // card width + gap
    slider.scrollLeft += cardWidth * 2;
}

function slideLeft() {
    const slider = document.getElementById('productSlider');
    const cardWidth = 216; // card width + gap
    slider.scrollLeft -= cardWidth * 2;
}

// Optional: Auto-hide arrow when at end
document.getElementById('productSlider').addEventListener('scroll', function () {
    const slider = this;
    const arrowRight = document.querySelector('.nav-arrow-right');
    const arrowLeft = document.querySelector('.nav-arrow-left');

    // Right arrow
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
        arrowRight.style.opacity = '0.5';
    } else {
        arrowRight.style.opacity = '1';
    }

    // Left arrow
    if (slider.scrollLeft <= 10) {
        arrowLeft.style.opacity = '0.5';
    } else {
        arrowLeft.style.opacity = '1';
    }
});

document.addEventListener("DOMContentLoaded", function () {
    let cartCount = 0;
    const cartCountElem = document.getElementById('cartCount');
    const cartButton = document.getElementById('cartButton');

    function updateCartCount(change) {
        cartCount += change;
        if (cartCount < 0) cartCount = 0;
        cartCountElem.textContent = cartCount;
    }

    function createQtySelector(productFooter, initialQty = 1) {
        productFooter.innerHTML = `
            <button class="qty-btn minus">-</button>
            <span class="qty-num">${initialQty}</span>
            <button class="qty-btn plus">+</button>
        `;

        const minusBtn = productFooter.querySelector('.minus');
        const plusBtn = productFooter.querySelector('.plus');
        const qtyNum = productFooter.querySelector('.qty-num');

        let qty = initialQty;

        minusBtn.addEventListener('click', function () {
            qty--;
            updateCartCount(-1);
            if (qty <= 0) {
                // Revert to ADD button
                productFooter.innerHTML = `<button class="add-button">ADD</button>`;
                productFooter.querySelector('.add-button').addEventListener('click', addBtnHandler);
            } else {
                qtyNum.textContent = qty;
            }
        });

        plusBtn.addEventListener('click', function () {
            qty++;
            updateCartCount(1);
            qtyNum.textContent = qty;
        });
    }

    function addBtnHandler(e) {
        const productFooter = e.target.parentElement;
        createQtySelector(productFooter, 1);
        updateCartCount(1);
    }

    // For all product cards
    document.querySelectorAll('.product-card .add-button').forEach(btn => {
        btn.addEventListener('click', addBtnHandler);
    });

    // For all item cards (if you want similar for .item, add this block)
    document.querySelectorAll('.item .add-button').forEach(btn => {
        btn.addEventListener('click', addBtnHandler);
    });

    // Make cart clickable (show alert or open cart page)
    cartButton.addEventListener('click', function (e) {
        e.preventDefault();
        alert('Cart clicked! (Implement cart page/modal here)');
    });
});


// Cart functionality
let cart = [];

function addToCart(product) {
    let existing = cart.find(item => item.name === product.name);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    updateCart();
    updateProductButton(product.name);
}

function changeQty(name, delta) {
    let item = cart.find(p => p.name === name);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(p => p.name !== name);
    }
    updateCart();
    updateProductButton(name);
}

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.getElementById("cartCount");

    cartItems.innerHTML = "";
    let total = 0, count = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        count += item.qty;

        const div = document.createElement("div");
        div.style.display = "flex";
        div.style.alignItems = "center";
        div.style.marginBottom = "10px";

        div.innerHTML = `
            <img src="${item.img}" width="40" style="margin-right:10px;">
            <div style="flex:1;">
                <p style="margin:0;font-weight:bold;">${item.name}</p>
                <p style="margin:0;">₹${item.price} × ${item.qty} = ₹${item.price * item.qty}</p>
            </div>
            <div>
              <button onclick="changeQty('${item.name}', -1)" style="background:#ff6666; border:none; padding:2px 6px; cursor:pointer;">-</button>
              <button onclick="changeQty('${item.name}', 1)" style="background:#66cc66; border:none; padding:2px 6px; cursor:pointer;">+</button>
            </div>
        `;
        cartItems.appendChild(div);
    });

    cartTotal.textContent = total;
    cartCount.textContent = count;
}

function updateProductButton(name) {
    // Find the product card
    document.querySelectorAll(".product-card").forEach(card => {
        const pname = card.querySelector(".product-name").innerText;
        if (pname === name) {
            const btn = card.querySelector(".add-button");
            let item = cart.find(p => p.name === name);

            if (item) {
                btn.outerHTML = `
                    <div class="qty-control" style="display:flex; align-items:center; gap:6px;">
                        <button onclick="changeQty('${name}', -1)" style="background:#ff6666; border:none; padding:2px 8px; cursor:pointer;">-</button>
                        <span id="qty-${name}" style="min-width:20px;text-align:center;">${item.qty}</span>
                        <button onclick="changeQty('${name}', 1)" style="background:#66cc66; border:none; padding:2px 8px; cursor:pointer;">+</button>
                    </div>
                `;
            } else {
                btn.outerHTML = `<button class="add-button" onclick="addToCart({name:'${name}', price:${parseFloat(card.querySelector(".product-price").innerText.replace("₹", "").trim())}, img:'${card.querySelector(".product-image").src}'})">ADD</button>`;
            }
        }
    });
}

function openCart() {
    document.getElementById("cartSidebar").style.right = "0";
}

function closeCart() {
    document.getElementById("cartSidebar").style.right = "-350px";
}

// Attach onclicks initially
document.querySelectorAll(".product-card").forEach(card => {
    const name = card.querySelector(".product-name").innerText;
    const price = parseFloat(card.querySelector(".product-price").innerText.replace("₹", "").trim());
    const img = card.querySelector(".product-image").src;
    const btn = card.querySelector(".add-button");

    btn.onclick = () => {
        addToCart({ name, price, img });
        openCart();
    };
});


function openCart() {
    document.getElementById("cartSidebar").style.right = "0";
    document.querySelector(".cart-toggle").style.display = "none"; // ✅ hide button
}

function closeCart() {
    document.getElementById("cartSidebar").style.right = "-350px";
    document.querySelector(".cart-toggle").style.display = "block"; // ✅ show button again
}



