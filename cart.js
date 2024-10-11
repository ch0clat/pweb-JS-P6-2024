function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Get cart from localStorage
    const cartTableBody = document.querySelector('#timeTable tbody');
    cartTableBody.innerHTML = ''; // Clear the table body

    let subtotal = 0; // Initialize subtotal

    // Iterate through the cart items and display them
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        // Create a new row for each item
        const row = document.createElement('tr');

        // Add the item details to the row
        row.innerHTML = `
            <td>${item.title}</td>
            <td>${item.price.toFixed(2)} USD</td>
            <td>
                <button onclick="changeCartQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeCartQuantity(${index}, 1)">+</button>
                
            </td>
            <td>
                ${itemTotal.toFixed(2)} USD
                <button class="remove" onclick="removeItem(${index})">x</button>
            </td>
        `;

        cartTableBody.appendChild(row); // Add the row to the table
    });

    // Calculate taxes and total
    const tax = subtotal * 0.05; // Assume 5% tax rate
    const total = subtotal + tax;

    // Update subtotal, tax, and total amounts
    document.getElementById('cart-subtotal').textContent = subtotal.toFixed(2) + ' USD';
    document.getElementById('cart-tax').textContent = tax.toFixed(2) + ' USD';
    document.getElementById('cart-total').textContent = total.toFixed(2) + ' USD';
}

// Change the quantity of an item in the cart
function changeCartQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart[index]) {
        cart[index].quantity += change;

        // If the quantity is less than 1, remove the item
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1); // Remove item from cart
        }

        // Save updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart(); // Reload the cart
    }
}

// Remove an item from the cart
function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart[index]) {
        cart.splice(index, 1); // Remove item from cart
    }

    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Reload the cart
}

// Handle checkout process
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before checking out.");
        return;
    }

    // Perform checkout logic (e.g., send data to a server)
    alert("Checkout complete! Thank you for your order.");

    // Clear the cart after successful checkout
    localStorage.removeItem('cart');
    loadCart(); // Reload the cart
}

// Load cart when the page loads
window.onload = loadCart;
