// js/script.js - Lógica visual da homepage

import { supabase } from './supabase.js';


window.onscroll = function() {
    const nav = document.querySelector('.navbar4'); 
    const logoDot = document.querySelector('.logo span');
    
    if (nav && window.pageYOffset > 50) {
        nav.style.background = "linear-gradient(135deg, rgba(26, 55, 77, 0.95), rgba(91, 130, 145, 0.95))";
        nav.style.backdropFilter = "blur(10px)";
        nav.style.padding = "1rem 5%";
        nav.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.2)";
        nav.style.borderBottom = "1px solid rgba(255, 255, 255, 0.1)";
        
        document.querySelectorAll('.nav-links a, .logo').forEach(el => {
            el.style.color = "#ffffff";
        });
        if(logoDot) logoDot.style.color = "#a2d2ff"; 
        
    } else if (nav) {
        nav.style.background = "transparent";
        nav.style.backdropFilter = "none";
        nav.style.padding = "2rem 5%";
        nav.style.boxShadow = "none";
        nav.style.borderBottom = "none";
        
        document.querySelectorAll('.nav-links a, .logo').forEach(el => {
            el.style.color = "#ffffff";
        });
        if(logoDot) logoDot.style.color = "#ffffff";
    }
};



/* Lógica do carrossel de produtos na homepage*/
const grid = document.querySelector('.product-grid');
const dots = document.querySelectorAll('.pager button');

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        // Remove 'active' de todos e adiciona ao clicado
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');

        // Calcula o deslize (ex: se cada grupo tem 3 produtos)
        const moveAmount = index * 100; // Desliza 100% da largura visível
        grid.style.transform = `translateX(-${moveAmount}%)`;
    });
});



// ==========================================
// NOVA LÓGICA: CARREGAR PRODUTOS DO SUPABASE
// ==========================================
async function carregarEssenciaisVerao() {
    // Seleciona a grelha do teu carrossel
    const grid = document.querySelector('.product-grid');
    if (!grid) return; // Se a página não tiver a grelha, ignora

    try {
        const { data: produtos, error } = await supabase
            .from('produto')
            .select('*')
            .eq('ativo', true)
            .limit(5); // Carrega 5 biquínis para o teu carrossel

        if (error) throw error;

        if (!produtos || produtos.length === 0) return;

        grid.innerHTML = ''; // Limpa os produtos falsos

        produtos.forEach(p => {
            // Desenha os cartões usando exatamente as tuas classes CSS
            grid.innerHTML += `
                <div class="product-card">
                    <div class="product-image">
                        <a href="html/produto.html?id=${p.id_produto}">
                            <img src="${p.imagem_url}" alt="${p.nome}">
                        </a>
                        <div class="action-overlay">
                            <button class="add-to-cart">Quick Add +</button>
                        </div>
                    </div>
                    <div class="product-details">
                        <h3>${p.nome}</h3>
                        <p class="price">${p.preco.toFixed(2)}€</p>
                    </div>
                </div>
            `;
        });

    } catch (erro) {
        console.error("Erro a carregar os essenciais:", erro.message);
    }
}

document.addEventListener('DOMContentLoaded', carregarEssenciaisVerao);