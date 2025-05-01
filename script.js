document.addEventListener('DOMContentLoaded', function () {
  const apiUrl = 'https://run.mocky.io/v3/a72c8c7b-4cc0-4949-8c7f-2e0bc3d24426';
  let pizzasData = [];

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      pizzasData = data;
      renderAllPizzas(pizzasData);
      updateCartInfo();
    })
    .catch(error => {
      console.error('Ошибка при загрузке данных:', error);
      document.getElementById('all-pizzas').innerHTML =
        '<div class="error">Не удалось загрузить меню. Пожалуйста, попробуйте позже.</div>';
    });

  function renderAllPizzas(pizzas) {
    const container = document.getElementById('all-pizzas');
    container.innerHTML = '';

    pizzas.forEach(pizza => {
      const card = document.createElement('div');
      card.className = 'pizza-card';

      card.innerHTML = `
        <img src="img/image2.png" alt="${pizza.name}" class="pizza-image">
        <div class="pizza-name">${pizza.name}</div>
        <div class="price">от ${pizza.price_from} ₽</div>
        <button class="add-btn">+ Добавить</button>
      `;

      // Добавление в корзину
      card.querySelector('.add-btn').addEventListener('click', () => {
        addToCart(pizza);
      });

      container.appendChild(card);
    });
  }

  // Сортировка
  document.getElementById('sortSelect').addEventListener('change', function (e) {
    const sortType = e.target.value;
    let sorted = [...pizzasData];

    if (sortType === 'price') {
      sorted.sort((a, b) => a.price_from - b.price_from);
    } else if (sortType === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    renderAllPizzas(sorted);
  });

  // Добавление в localStorage
  function addToCart(pizza) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const index = cart.findIndex(item => item.id === pizza.id);
    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...pizza, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartInfo();
  }

  // Обновление инфы в кнопках шапки
  function updateCartInfo() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalCount = 0;
    let totalPrice = 0;

    cart.forEach(item => {
      totalCount += item.quantity;
      totalPrice += item.quantity * item.price_from;
    });

    const btn1 = document.querySelector('.button1');
    const btn2 = document.querySelector('.button2');
    if (btn1) btn1.textContent = `${totalPrice} ₽`;
    if (btn2) btn2.textContent = `${totalCount}`;
  }
});

function updateCartInfo() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price_from, 0);

  document.getElementById('cartCount').textContent = totalItems;
  document.getElementById('totalPrice').textContent = `${totalPrice} ₽`;
}

// при добавлении товара:
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('add-btn')) {
    const pizzaName = e.target.parentElement.querySelector('.pizza-name').textContent;
    const price = parseFloat(e.target.parentElement.querySelector('.price').textContent.replace('от ', '').replace(' ₽', ''));

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(p => p.name === pizzaName);
    
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ name: pizzaName, price_from: price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartInfo();
  }
});

document.addEventListener('DOMContentLoaded', updateCartInfo);