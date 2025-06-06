// Sample product data (mocked)
const products = [
  {
    id: 1,
    name: "Blvck Signature Tie-Front Skirt",
    price: 120.00,
    image: "https://blvck.com/cdn/shop/files/00_30da6060-b9ae-4638-b07d-36ca0f6c0b08.jpg?v=1726410737",
    url: "/products/blvck-essential-skirt"
  },
  {
    id: 2,
    name: "Blvck Muse Dress",
    price: 160.00,
    image: "https://blvck.com/cdn/shop/files/00_01522c8e-4558-4c2b-9db3-f5b6a8a4ee78.jpg?v=1743944417",
    url: "/products/blvck-mini-dress"
  },
  {
    id: 3,
    name: "Blvck Tennis Cap 'Cream'",
    price: 60.00,
    image: "https://blvck.com/cdn/shop/files/front-cream-2.jpg?v=1739462777",
    url: "/products/blvck-tennis-cap-cream"
  },
  {
    id: 4,
    name: "Blvck Tennis Tee 'Cream'",
    price: 75.00,
    image: "https://blvck.com/cdn/shop/files/Front2_3684b0a9-042d-4130-90be-59aeaf96e686.jpg?v=1739462829",
    url: "/products/blvck-tennis-tee-cream"
  }
];

// Cart state
let cart = [];

// DOM elements
const productsContainer = document.getElementById('products');
const cartButton = document.getElementById('cart-button');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartButton = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');

// Render products
function renderProducts() {
  products.forEach(product => {
    const productEl = document.createElement('div');
    productEl.className = 'border border-gray-700 rounded-md overflow-hidden flex flex-col';
    productEl.innerHTML = `
      <a href="${product.url}" target="_blank" rel="noopener noreferrer" class="block overflow-hidden">
        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
      </a>
      <div class="p-4 flex flex-col flex-grow">
        <a href="${product.url}" target="_blank" rel="noopener noreferrer" class="font-semibold mb-2 hover:underline">${product.name}</a>
        <div class="mt-auto flex items-center justify-between">
          <span class="font-semibold">$${product.price.toFixed(2)}</span>
          <button class="add-to-cart bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition" data-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    `;
    productsContainer.appendChild(productEl);
  });
}

// Update cart UI
function updateCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const itemEl = document.createElement('div');
    itemEl.className = 'flex items-center justify-between mb-4';
    itemEl.innerHTML = `
      <div>
        <div class="font-semibold">${item.name}</div>
        <div class="text-sm text-gray-400">Qty: ${item.quantity}</div>
      </div>
      <div class="flex items-center space-x-2">
        <span class="font-semibold">$${(item.price * item.quantity).toFixed(2)}</span>
        <button class="remove-from-cart text-red-500 font-bold text-xl leading-none" data-id="${item.id}" aria-label="Remove item">&times;</button>
      </div>
    `;
    cartItemsContainer.appendChild(itemEl);
  });
  cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Add product to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({...product, quantity: 1});
  }
  updateCart();
}

// Remove product from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

// Event listeners
productsContainer.addEventListener('click', e => {
  if (e.target.classList.contains('add-to-cart')) {
    const id = parseInt(e.target.getAttribute('data-id'));
    addToCart(id);
  }
});

cartItemsContainer.addEventListener('click', e => {
  if (e.target.classList.contains('remove-from-cart')) {
    const id = parseInt(e.target.getAttribute('data-id'));
    removeFromCart(id);
  }
});

cartButton.addEventListener('click', () => {
  cartSidebar.classList.remove('translate-x-full');
});

closeCartButton.addEventListener('click', () => {
  cartSidebar.classList.add('translate-x-full');
});

// Stripe Checkout integration
checkoutButton.addEventListener('click', async () => {
  if (cart.length === 0) {
    alert('Your cart is empty.');
    return;
  }

  // Prepare line items for Stripe
  const lineItems = cart.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  // Call backend or Stripe API to create checkout session
  // Since this is frontend only, we will simulate checkout with Stripe Checkout client-only integration

  // Using Stripe public test key
  const stripe = Stripe('pk_test_51N6xQkLzq6X9Yz7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7vQ7v
