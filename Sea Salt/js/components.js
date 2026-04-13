// js/components.js - Versão corrigida
async function loadComponent(elementId, filePath) {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        // O fetch precisa de um servidor local para funcionar
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        
        const html = await response.text();
        element.innerHTML = html;
        console.log(`${filePath} carregado com sucesso.`);
    } catch (error) {
        console.error(`Erro ao carregar o componente ${filePath}:`, error);
        // Fallback: Caso falhe, mostra um link simples
        element.innerHTML = '<div style="text-align:center; padding:20px; color:white;">SeaSalt &copy; 2026</div>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('main-footer', 'html/footer.html');
});


// js/components.js

async function loadComponent(elementId, filePath) {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        const response = await fetch(filePath);
        if (response.ok) {
            const html = await response.text();
            element.innerHTML = html;
            
            // Se for a navbar, precisamos de atualizar o contador do carrinho após carregar
            if (elementId === 'main-nav' && typeof updateCartCounter === 'function') {
                updateCartCounter();
            }
        }
    } catch (error) {
        console.error(`Erro ao carregar o componente ${filePath}:`, error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('main-nav', '/html/navbar.html'); // Carrega a Navbar
    loadComponent('main-footer', '/html/footer.html'); // Carrega o Footer
});