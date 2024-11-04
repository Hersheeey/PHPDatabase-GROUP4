let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

let cartItem = document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick = () =>{
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

document.getElementById("login-btn").onclick = function() {
    window.location.href = "login.html";
};

let cartItemContainer = document.querySelector('.cart-items-container');

function showProductDetails(name, description, imgSrc, sizes) {
    document.getElementById('modal-title').textContent = name;
    document.getElementById('modal-description').textContent = description;
    document.getElementById('modal-image').src = imgSrc;

    // Clear existing size options
    let sizeOptions = document.getElementById('size-options');
    sizeOptions.innerHTML = '';

    // Loop through sizes and create radio buttons with labels
    sizes.forEach(size => {
        let [price, label] = size.split(' - ');

        let radioWrapper = document.createElement('div');
        radioWrapper.classList.add('size-option');  // Add a class for styling

        let radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'size';
        radio.value = size;
        radio.onchange = checkFormCompletion;

        let labelElement = document.createElement('label');
        labelElement.textContent = `${label} (${price})`;

        // Add radio button and label together inside the wrapper
        labelElement.insertBefore(radio, labelElement.firstChild); // Place radio button inside label before text
        radioWrapper.appendChild(labelElement);

        sizeOptions.appendChild(radioWrapper);
    });

    document.getElementById('quantity').value = 1;
    document.getElementById('add-to-cart-btn').disabled = true;
    document.getElementById('product-modal').style.display = 'flex';
};

// Close the modal
function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
};

// Check if form is completed to enable the "Add to Cart" button
function checkFormCompletion() {
    let sizeSelected = document.querySelector('input[name="size"]:checked');
    let quantity = document.getElementById('quantity').value;
    document.getElementById('add-to-cart-btn').disabled = !(sizeSelected && quantity > 0);
};

// Check if this is the first load of the checkout page in this session
if (!sessionStorage.getItem('checkoutLoaded')) {
    // Set a session flag to indicate the checkout page is loaded for the first time in this session
    sessionStorage.setItem('checkoutLoaded', 'true');
} else {
    // If the page is refreshed, clear the cart from localStorage
    localStorage.removeItem('cart');
};


function addToCartFromModal() {
    let itemName = document.getElementById('modal-title').textContent;
    let itemSizePrice = document.querySelector('input[name="size"]:checked').value;
    let itemQuantity = document.getElementById('quantity').value;
    let itemImg = document.getElementById('modal-image').src;

    // Create a new cart item object
    let newItem = {
        name: itemName,
        sizePrice: itemSizePrice,
        quantity: itemQuantity,
        imgSrc: itemImg
    };

    // Retrieve the current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the new item to the cart
    cart.push(newItem);

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Add the item to the cart in the UI
    let cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    let closeButton = document.createElement('span');
    closeButton.classList.add('fas', 'fa-times');
    closeButton.onclick = () => {
        cartItem.remove();
        updateLocalStorageCart();
    };

    let itemImage = document.createElement('img');
    itemImage.src = itemImg;

    let contentDiv = document.createElement('div');
    contentDiv.classList.add('content');

    let itemNameElement = document.createElement('h3');
    itemNameElement.textContent = `${itemName} - ${itemSizePrice}`;

    let itemPriceElement = document.createElement('div');
    itemPriceElement.classList.add('price');
    itemPriceElement.textContent = `Qty: ${itemQuantity}`;

    // Append elements to the cart item
    contentDiv.appendChild(itemNameElement);
    contentDiv.appendChild(itemPriceElement);
    cartItem.appendChild(closeButton);
    cartItem.appendChild(itemImage);
    cartItem.appendChild(contentDiv);

    // Add cart item to the container
    cartItemContainer.insertBefore(cartItem, cartItemContainer.querySelector('.btn'));

    // Close the modal after adding to the cart
    closeModal();
};

// Update localStorage after removing an item from the cart
function updateLocalStorageCart() {
    let updatedCart = [];

    // Loop through the cart items in the UI
    document.querySelectorAll('.cart-item').forEach(cartItem => {
        let itemName = cartItem.querySelector('h3').textContent;
        let itemQuantity = cartItem.querySelector('.price').textContent.match(/\d+/)[0];
        let itemImg = cartItem.querySelector('img').src;

        updatedCart.push({
            name: itemName,
            quantity: itemQuantity,
            imgSrc: itemImg
        });
    });

    // Update localStorage with the new cart
    localStorage.setItem('cart', JSON.stringify(updatedCart));
};


// Add an event listener to the Checkout Now button
document.getElementById('checkout-now-btn').addEventListener('click', function() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart && cart.length > 0) {
        window.location.href = 'checkout.html'; // Redirect to the checkout page
    } else {
        alert('Your cart is empty. Please add some items.');
    }
});

// Function to load cart items from localStorage when the index page loads
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-items-container');

    // Clear existing items but keep the checkout button
    const checkoutButton = document.getElementById('checkout-now-btn');
    cartContainer.innerHTML = '';
    if (checkoutButton) cartContainer.appendChild(checkoutButton);

    // Render each item in the cart
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.name}">
            <div class="content">
                <h3>${item.name} (${item.sizePrice})</h3>
                <span>Quantity: ${item.quantity}</span>
            </div>
        `;

        // Insert cart items above the checkout button
        cartContainer.insertBefore(cartItem, checkoutButton);
    });
}

// Call loadCartItems when the page loads
window.onload = loadCartItems;


// Make the widget draggable
const widget = document.getElementById('taste-finder-widget');
const header = widget.querySelector('.widget-header');

let offsetX = 0, offsetY = 0, isDragging = false;

header.addEventListener('mousedown', (e) => {
    offsetX = e.clientX - widget.offsetLeft;
    offsetY = e.clientY - widget.offsetTop;
    isDragging = true;
    widget.classList.add('draggable');
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    widget.classList.remove('draggable');
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        widget.style.left = `${e.clientX - offsetX}px`;
        widget.style.top = `${e.clientY - offsetY}px`;
    }
});

// Toggle the widget's visibility
function toggleWidget() {
    const widget = document.getElementById('taste-finder-widget');
    const minimizeBtn = document.querySelector('.minimize-btn');

    if (widget.classList.contains('minimized')) {
        widget.classList.remove('minimized');
        minimizeBtn.textContent = '−';
    } else {
        widget.classList.add('minimized');
        minimizeBtn.textContent = '+';
    }

}
// Select all slider elements and the button
const sweetnessSlider = document.getElementById("sweetness");
const bitternessSlider = document.getElementById("bitterness");
const creaminessSlider = document.getElementById("creaminess");
const boldnessSlider = document.getElementById("boldness");
const mildnessSlider = document.getElementById("mildness");
const findCoffeeBtn = document.querySelector(".find-coffee-btn");

// Function to get slider values and recommend a coffee
function recommendCoffee() {
    const sweetness = parseInt(sweetnessSlider.value, 10);
    const bitterness = parseInt(bitternessSlider.value, 10);
    const creaminess = parseInt(creaminessSlider.value, 10);
    const boldness = parseInt(boldnessSlider.value, 10);
    const mildness = parseInt(mildnessSlider.value, 10);

    let recommendation = "Based on your preferences, Caffeine Kick recommends you: ";

    // Update the logic to work with slider values (0, 1, 2, 3) representing 25%, 50%, 75%, 100%
    if (sweetness === 3 && creaminess === 3) {
        recommendation += "a Creamy Latte with Caramel or Vanilla Flavors.";
    } else if (bitterness === 3 && boldness === 3) {
        recommendation += "a Strong Espresso or Dark Roast.";
    } else if (mildness === 3) {
        recommendation += "a Light Roast or Americano for a smooth experience.";
    } else if (sweetness === 3 && mildness <= 1) {
        recommendation += "a Sweet Cold Brew or Fruit-infused Drink.";
    } else if (boldness === 3 && creaminess <= 1) {
        recommendation += "a Bold Black Coffee or Matcha.";
    } else {
        recommendation += "a Balanced blend like a Cappuccino or a Cafe Latte.";
    }

    alert(recommendation);
};

// JavaScript to handle the reset functionality
document.getElementById('reset-button').addEventListener('click', function() {
    // Reset each slider to the default value
    document.getElementById('sweetness').value = 0; // Default to 50%
    document.getElementById('bitterness').value = 0;
    document.getElementById('creaminess').value = 0;
    document.getElementById('boldness').value = 0;
    document.getElementById('mildness').value = 0;
});

