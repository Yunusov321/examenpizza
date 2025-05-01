function loadCart() {
    const container = document.getElementById('cart-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    container.innerHTML = '';
    let total = 0;
    let totalCount = 0;
  
    if (cart.length === 0) {
      container.innerHTML = '<p style="text-align:center;">Корзина пуста.</p>';
      document.getElementById('total').textContent = '0 ₽';
      return;
    }
  
    cart.forEach((item, index) => {
      total += item.quantity * item.price_from;
      totalCount += item.quantity;
  
      const card = document.createElement('div');
      card.className = 'cart-item';
  
      card.innerHTML = `
        <div class="item-left">
          <img src="img/image2.png" alt="${item.name}">
          <div class="item-details">
            <strong>${item.name}</strong>
            <span>Пицца, 26 см</span>
          </div>
        </div>
        <div class="item-middle">
          <button class="counter-btn" onclick="changeQuantity(${index}, -1)">−</button>
          <div>${item.quantity}</div>
          <button class="counter-btn" onclick="changeQuantity(${index}, 1)">+</button>
        </div>
        <div class="item-price">${item.price_from * item.quantity} ₽</div>
        <button class="remove-btn" onclick="removeItem(${index})">×</button>
      `;
  
      container.appendChild(card);
    });
  
    document.getElementById('total').textContent = `${total} ₽`;
  }
  
  function changeQuantity(index, delta) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
  }
  
  function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
  }
  
  function clearCart() {
    localStorage.removeItem('cart');
    loadCart();
  }
  
  document.addEventListener('DOMContentLoaded', loadCart);