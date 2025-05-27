let cart = [];

function renderCart() {
  const cartEl = document.getElementById('cart');
  cartEl.innerHTML = '';
  if (cart.length === 0) {
    cartEl.innerHTML = '<li>Warenkorb ist leer</li>';
    return;
  }
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.title} x ${item.quantity}`;
    cartEl.appendChild(li);
  });
}

function addToCart(product) {
  const found = cart.find(item => item.id === product.id);
  if (found) {
    found.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  renderCart();
}

function clearCart() {
  cart = [];
  renderCart();
}

fetch("https://localhost:7106/api/products")
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById('products');
    container.innerHTML = '';
    products.forEach(product => {
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p><strong>${product.price} €</strong></p>
        <p>${product.description}</p>
        <p>Kategorie: ${product.category}</p>
        <button>In den Warenkorb</button>
      `;
      div.querySelector('button').onclick = () => addToCart(product);
      container.appendChild(div);
    });
  });

renderCart();
