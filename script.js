// script.js - Lógica de interface da SeaSalt

window.onscroll = function() {
    const nav = document.querySelector('.navbar4');
    const logoDot = document.querySelector('.logo span');
    
    if (window.pageYOffset > 50) {
        // --- ESTADO AO DESCER (Design Azul Oceano) ---
        nav.style.background = "linear-gradient(135deg, rgba(26, 55, 77, 0.95), rgba(91, 130, 145, 0.95))";
        nav.style.backdropFilter = "blur(10px)";
        nav.style.padding = "1rem 5%";
        nav.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.2)";
        nav.style.borderBottom = "1px solid rgba(255, 255, 255, 0.1)";
        
        // Mudar cores do texto para Branco
        document.querySelectorAll('.nav-links a, .logo').forEach(el => {
            el.style.color = "#ffffff";
        });
        
        if(logoDot) logoDot.style.color = "#a2d2ff"; // Azul claro no detalhe do logo
        
    } else {
        // --- ESTADO NO TOPO (Transparente) ---
        nav.style.background = "transparent";
        nav.style.backdropFilter = "none";
        nav.style.padding = "2rem 5%";
        nav.style.boxShadow = "none";
        nav.style.borderBottom = "none";
        
        // Mudar cores do texto de volta (Preto ou cor padrão)
        document.querySelectorAll('.nav-links a, .logo').forEach(el => {
            el.style.color = "#121212";
        });
        
        if(logoDot) logoDot.style.color = "var(--accent)"; 
    }
};

// Se tiveres outras funções de animação (como o Quick Add), podes colocá-las aqui também