
// let cart = [];
// let tShirts = []; // Define tShirts globally

// function fetchDataAndUpdateUI() {
//     const headers = new Headers({
//         'Authorization': 'Basic ' + btoa('user:password')
//     });

//     fetch('http://127.0.0.1:8081/TShirts', { headers })
//         .then(response => response.json())
//         .then(data => {
//             tShirts = data; // Assign fetched data to tShirts
//             renderTShirts();
//         })
//         .catch(error => console.error('Error fetching data:', error));
// }

// function renderTShirts() {
//     const tShirtsContainer = document.getElementById('tshirt-list');
//     tShirtsContainer.innerHTML = ''; // Clear existing content

//     tShirts.forEach(tShirt => {
//         const tShirtElement = document.createElement('div');
//         tShirtElement.classList.add('tshirt'); // Optional: Add a class for styling

//         tShirtElement.innerHTML = `
//             <p>T-Shirt ID: ${tShirt.tShirtId}</p>
//             <p>Size: ${tShirt.size}</p>
//             <p>Kit: ${tShirt.kit}</p>
//             <p>Number: ${tShirt.number}</p>
//             <p>Condition: ${tShirt.condition}</p>
//             <p>Price: £${tShirt.price}</p>
//             <button onclick="addToCart(${tShirt.tShirtId})">Add to Cart</button>
//         `;

//         tShirtsContainer.appendChild(tShirtElement);
//     });
// }

// function addToCart(tShirtId) {
//     // Find the selected T-shirt by its ID
//     const selectedTShirt = tShirts.find(tShirt => tShirt.tShirtId === tShirtId);

//     // Check if the item is already in the cart
//     const alreadyInCart = cart.some(item => item.tShirtId === tShirtId);

//     if (alreadyInCart) {
//         alert('This item is already in the cart!');
//     } else {
//         // Add the selected T-shirt to the cart array
//         cart.push(selectedTShirt);
//         alert('T-Shirt added to cart!');
//     }
// }

// function goToCart() {
//     // Store the cart in localStorage to be retrieved on the cart page
//     localStorage.setItem('cart', JSON.stringify(cart));
//     // Navigate to the cart page
//     window.location.href = 'cart.html';
// }

// document.addEventListener('DOMContentLoaded', fetchDataAndUpdateUI);

// Define global variables
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
        linkShopperToTShirt(tshirtId, 252)
        alert('T-Shirt added to cart!');
    }
}



// Function to navigate to cart page
function goToCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'cart.html';
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', fetchDataAndUpdateUI);
