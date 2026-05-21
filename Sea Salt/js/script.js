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
    const grid = document.querySelector('.product-grid');
    const pager = document.getElementById('pager-container');
    if (!grid) return;

    try {
        const { data: produtos, error } = await supabase
            .from('produto')
            .select('*')
            .eq('ativo', true); // Carrega tudo o que estiver ativo

        if (error) throw error;
        if (!produtos || produtos.length === 0) return;

        grid.innerHTML = '';
        pager.innerHTML = ''; // Limpa os botões antigos

        // 1. Desenhar produtos
        produtos.forEach((p, index) => {
            grid.innerHTML += `...`; // (Mantém o teu código de inserir o card aqui)
            
            // 2. Criar botão dinâmico para cada produto
            const btn = document.createElement('button');
            if (index === 0) btn.classList.add('active');
            btn.innerHTML = '<span></span>';
            
            // Lógica de deslize ao clicar
            btn.addEventListener('click', () => {
                document.querySelectorAll('.pager button').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                grid.style.transform = `translateX(-${index * 100}%)`;
            });
            
            pager.appendChild(btn);
        });
        
    } catch (erro) {
        console.error("Erro:", erro.message);
    }
}
document.addEventListener('DOMContentLoaded', carregarEssenciaisVerao);