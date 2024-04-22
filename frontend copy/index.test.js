// import { fetchDataAndUpdateUI, addToCart, goToCart, cart, tShirts } from './index.js';
// import { JSDOM } from 'jsdom';
// import { TextEncoder, TextDecoder } from 'text-encoding';

// global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;

// // Set up a mock DOM environment
// const { document } = new JSDOM('<!doctype html><html><body></body></html>').window;
// global.document = document;
// global.window = document.defaultView;
import fetchMock from 'jest-fetch-mock';



let cart = [];
let tShirts = []; // Define tShirts globally

function fetchDataAndUpdateUI() {
    const headers = new Headers({
        'Authorization': 'Basic ' + btoa('user:password')
    });

    fetch('http://127.0.0.1:8081/TShirts', { headers })
        .then(response => response.json())
        .then(data => {
            tShirts = data; // Assign fetched data to tShirts
            renderTShirts();
        })
        .catch(error => console.error('Error fetching data:', error));
}

function renderTShirts() {
    const tShirtsContainer = document.getElementById('tshirt-list');
    tShirtsContainer.innerHTML = ''; // Clear existing content

    tShirts.forEach(tShirt => {
        const tShirtElement = document.createElement('div');
        tShirtElement.classList.add('tshirt'); // Optional: Add a class for styling

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

function addToCart(tShirtId) {
    // Find the selected T-shirt by its ID
    const selectedTShirt = tShirts.find(tShirt => tShirt.tShirtId === tShirtId);

    // Check if the item is already in the cart
    const alreadyInCart = cart.some(item => item.tShirtId === tShirtId);

    if (alreadyInCart) {
        alert('This item is already in the cart!');
    } else {
        // Add the selected T-shirt to the cart array
        cart.push(selectedTShirt);
        alert('T-Shirt added to cart!');
    }
}

function goToCart() {
    // Store the cart in localStorage to be retrieved on the cart page
    localStorage.setItem('cart', JSON.stringify(cart));
    // Navigate to the cart page
    window.location.href = 'cart.html';
}

document.addEventListener('DOMContentLoaded', fetchDataAndUpdateUI);




describe('fetchDataAndUpdateUI function', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
        tShirts = [];
    });
    

    it('handles fetch error correctly', async () => {
        // Mock fetch function to simulate error
        global.fetch = jest.fn().mockRejectedValue(new Error('Fetch error'));

        // Call the function to be tested
        await fetchDataAndUpdateUI();

        // Check if fetch was called with the correct URL and headers
        expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8081/TShirts', {
            headers: new Headers({
                'Authorization': 'Basic dXNlcjpwYXNzd29yZA==' // base64 encoding of 'user:password'
            })
        });

        // Check if tShirts array remains empty
        expect(tShirts).toEqual([]);
    });


});

// Test case for addToCart function
describe('addToCart function', () => {
       it('does not add the same T-shirt to the cart array twice (mock)', () => {
        // Mock data
        const mockTShirtId = 1;
        const mockSelectedTShirt = { tShirtId: mockTShirtId, size: 'M', kit: 'Home', number: 10, condition: 'New', price: 20 };

        // Add a T-shirt to the cart array
        cart.push(mockSelectedTShirt);

        // Call the function to be tested with the same T-shirt ID
        addToCart(mockTShirtId);

        // Check if the T-shirt was not added again to the cart array
        expect(cart).toEqual([mockSelectedTShirt]);
    });

    // Stub test
    it('adds a T-shirt to the cart correctly (stub)', () => {
        // Define mock data
        const mockTShirtId = 1;
        const selectedTShirt = { tShirtId: mockTShirtId, size: 'M', kit: 'Home', number: 10, condition: 'New', price: 20 };
    
        // Stub tShirts.find to return the selected T-shirt
        tShirts.find = jest.fn().mockReturnValue(selectedTShirt);
        // Stub cart.some to return false (T-shirt not in cart)
        cart.some = jest.fn().mockReturnValue(false);
    
        // Mock the alert function
        global.alert = jest.fn();
    
        // Call the function to be tested
        addToCart(mockTShirtId);
    
        // Check if the selected T-shirt is added to the cart array
        expect(cart).toContain(selectedTShirt);
        // Check if the correct alert message is shown
        expect(global.alert).toHaveBeenCalledWith('T-Shirt added to cart!');
    });
    

});

describe('goToCart function', () => {
    beforeEach(() => {
        // Clear localStorage and reset window.location.href before each test
        localStorage.clear();
        delete window.location;
        window.location = { href: '' };
    });
    it('navigates to the cart page', () => {
        // Mock data
        const mockCart = [
            { tShirtId: 1, size: 'M', kit: 'Home', number: 10, condition: 'New', price: 20 },
            { tShirtId: 2, size: 'L', kit: 'Away', number: 7, condition: 'Used', price: 15 }
        ];

        // Call the function to be tested
        goToCart(mockCart);

        // Check if window.location.href was set to the cart page URL
        expect(window.location.href).toBe('cart.html');
    });


});

