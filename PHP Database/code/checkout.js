
// Display cart items on checkout page
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    let total = 0;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length > 0) {
        cart.forEach(item => {
            const itemPrice = parseFloat(item.sizePrice.match(/₱(\d+)/)[1]);
            const itemTotal = itemPrice * item.quantity;
            total += itemTotal;

            const row = `
                <tr>
                    <td>${item.name} (${item.sizePrice})</td>
                    <td>₱${itemPrice}</td>
                    <td>${item.quantity}</td>
                    <td>₱${itemTotal}</td>
                </tr>
            `;

            cartItemsContainer.innerHTML += row;
        });

        document.getElementById('total-price').textContent = `₱${total}`;
    } else {
        cartItemsContainer.innerHTML = '<tr><td colspan="4">Your cart is empty.</td></tr>';
    }
}

// Load cart items on page load
window.onload = displayCartItems;

// Remove all cart items from localStorage when the user leaves the checkout page
window.addEventListener('unload', () => {
    localStorage.removeItem('cart');
});
