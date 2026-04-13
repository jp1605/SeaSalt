let cart = JSON.parse(localStorage.getItem('seaSaltCart')) || [];

function addToCart(name, price, image) {
    const item = { name, price, image, id: Date.now() };
    cart.push(item);
    localStorage.setItem('seaSaltCart', JSON.stringify(cart));
    updateCartCounter();
    alert(`${name} foi adicionado ao seu carrinho!`);
}

function updateCartCounter() {
    const counter = document.querySelector('.cart-status');
    if (counter) {
        counter.innerText = `Carrinho (${cart.length})`;
    }
}

function renderCart() {
    const cartList = document.getElementById('cart-list');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');
    
    if (!cartList) return;

    if (cart.length === 0) {
        cartList.innerHTML = '<p style="opacity: 0.6; font-size: 1.1rem;">O teu carrinho está vazio.</p>';
        subtotalEl.innerText = "0.00€";
        totalEl.innerText = "0.00€";
        return;
    }

    cartList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += parseFloat(item.price);
        cartList.innerHTML += `
            <div style="display: flex; gap: 25px; align-items: center; margin-bottom: 25px; background: white; padding: 20px; border-radius: 20px; border: 1px solid #f7f7f7;">
                <img src="${item.image}" style="width: 100px; height: 120px; object-fit: cover; border-radius: 12px;">
                <div style="flex: 1;">
                    <h4 style="margin: 0; font-size: 1.1rem;">${item.name}</h4>
                    <p style="color: #5b8291; font-weight: 600; margin-top: 8px;">${item.price}€</p>
                </div>
                <button onclick="removeItem(${item.id})" style="background: #fdf2f2; border: none; color: #ff4d4d; width: 40px; height: 40px; border-radius: 50%; cursor: pointer;"><i class="fas fa-trash"></i></button>
            </div>
        `;
    });

    subtotalEl.innerText = `${total.toFixed(2)}€`;
    totalEl.innerText = `${total.toFixed(2)}€`;
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('seaSaltCart', JSON.stringify(cart));
    renderCart();
    updateCartCounter();
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCounter();
    renderCart();
});