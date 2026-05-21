// js/cart.js
let cart = JSON.parse(localStorage.getItem('seaSaltCart')) || [];

// O window. serve para tornar a função global e poder ser chamada por outros ficheiros
window.addToCart = function(name, price, image, tamanho) {
    const item = { name, price, image, tamanho, id: Date.now() };
    cart.push(item);
    localStorage.setItem('seaSaltCart', JSON.stringify(cart));
    updateCartCounter();
    
    // Alerta de sucesso com o tamanho incluído
    alert(`O artigo ${name} (Tamanho: ${tamanho}) foi adicionado ao teu carrinho!`);
}

window.removeItem = function(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('seaSaltCart', JSON.stringify(cart));
    renderCart();
    updateCartCounter();
}

function updateCartCounter() {
    // Procura por todos os contadores (caso estejas no index, colecao ou produto)
    const counters = document.querySelectorAll('.cart-status'); 
    counters.forEach(counter => {
        counter.innerText = `carrinho (${cart.length})`;
    });
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
        const precoNum = parseFloat(item.price);
        total += precoNum;
        
        cartList.innerHTML += `
            <div style="display: flex; gap: 25px; align-items: center; margin-bottom: 25px; background: white; padding: 20px; border-radius: 20px; border: 1px solid #f7f7f7;">
                <img src="${item.image}" style="width: 100px; height: 120px; object-fit: cover; border-radius: 12px;">
                <div style="flex: 1;">
                    <h4 style="margin: 0; font-size: 1.1rem;">${item.name}</h4>
                    <p style="font-size: 0.85rem; color: #888; margin-top: 5px; text-transform: uppercase;">Tamanho: <strong>${item.tamanho}</strong></p>
                    <p style="color: #5b8291; font-weight: 600; margin-top: 8px;">${precoNum.toFixed(2)}€</p>
                </div>
                <button onclick="removeItem(${item.id})" style="background: #fdf2f2; border: none; color: #ff4d4d; width: 40px; height: 40px; border-radius: 50%; cursor: pointer;"><i class="fas fa-trash"></i></button>
            </div>
        `;
    });

    subtotalEl.innerText = `${total.toFixed(2)}€`;
    totalEl.innerText = `${total.toFixed(2)}€`;
}

// Executa assim que as páginas abrem
document.addEventListener('DOMContentLoaded', () => {
    updateCartCounter();
    renderCart();
});