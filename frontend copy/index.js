let cart = [];
let tShirts = [];

// Function to link a TShirt to a Shopper
function linkShopperToTShirt(tShirtId, shopperId) {
    const headers = new Headers({
        'Authorization': 'Basic ' + btoa('user:password'),
        'Content-Type': 'application/json'
    });

    fetch(`http://127.0.0.1:8081/TShirts/${tShirtId}/${shopperId}`, {
        method: 'PUT',
        headers: headers
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to link T-Shirt with Shopper');
        }
    })
    .then(data => {
        console.log('Link successful:', data);
        alert('T-Shirt linked successfully to Shopper!');
    })
    .catch(error => {
        console.error('Error linking T-Shirt to Shopper:', error);
        alert('Error linking T-Shirt to Shopper!');
    });
}

// Function to fetch data and update UI
async function fetchDataAndUpdateUI() {
    try {
        const headers = new Headers({
            'Authorization': 'Basic ' + btoa('user:password')
        });

        const response = await fetch('http://127.0.0.1:8081/TShirts', { headers });
        const data = await response.json();
        console.log("Response is: ", response);
        console.log("Data is: ", data);
        tShirts = data;
        renderTShirts();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to render T-shirts
function renderTShirts() {
    const tShirtsContainer = document.getElementById('tshirt-list');
    tShirtsContainer.innerHTML = '';

    tShirts.forEach(tShirt => {
        const tShirtElement = document.createElement('div');
        tShirtElement.classList.add('tshirt');

        tShirtElement.innerHTML = `
            <p>T-Shirt ID: ${tShirt.tShirtId}</p>
            <p>Size: ${tShirt.size}</p>
            <p>Kit: ${tShirt.kit}</p>
            <p>Number: ${tShirt.number}</p>
            <p>Condition: ${tShirt.condition}</p>
            <p>Price: £${tShirt.price}</p>
            <button onclick="addToCart(${tShirt.tShirtId})">Add to Cart</button>
        `;

        tShirtsContainer.appendChild(tShirtElement);
    });
}

// Function to add item to cart
function addToCart(tShirtId) {
    const selectedTShirt = tShirts.find(tShirt => tShirt.tShirtId === tShirtId);
    const alreadyInCart = cart.some(item => item.tShirtId === tShirtId);

    if (alreadyInCart) {
        alert('This item is already in the cart!');
    } else {
        cart.push(selectedTShirt);
        linkShopperToTShirt(tShirtId, 252)
        alert('T-Shirt added to cart!');
    }
}



// Function to navigate to cart page
function goToCart() {
    // localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'cart.html';
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', fetchDataAndUpdateUI);
