// js/components.js

async function loadComponent(elementId, filePath) {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        
        const html = await response.text();
        element.innerHTML = html;
        console.log(`${filePath} carregado com sucesso.`);
        
        // Se for a navbar, precisamos de atualizar o contador do carrinho após carregar
        if (elementId === 'main-nav' && typeof updateCartCounter === 'function') {
            updateCartCounter();
        }
    } catch (error) {
        console.error(`Erro ao carregar o componente ${filePath}:`, error);
        // Fallback: Caso falhe, mostra um link simples
        if (elementId === 'main-footer') {
            element.innerHTML = '<div style="text-align:center; padding:20px; color:white;">SeaSalt &copy; 2026</div>';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Usar caminhos relativos (sem a / no início) para evitar problemas no Live Server
    loadComponent('main-nav', 'html/navbar.html'); 
    loadComponent('main-footer', 'html/footer.html'); 
});