// auth.js - Lógica de Autenticação para SeaSalt

// Função para Registar utilizador
function handleRegister(event) {
    event.preventDefault();
    
    const form = event.target;
    const nome = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    if (nome && email && password.length >= 8) {
        const novoUtilizador = { nome, email, password };
        
        // Simulação de base de dados no navegador
        localStorage.setItem('userAccount', JSON.stringify(novoUtilizador));
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userName', nome.split(' ')[0]);

        alert('Bem-vinda à SeaSalt, ' + nome + '!');
        window.location.href = 'index2.html';
    } else {
        alert('Dados inválidos. A password deve ter pelo menos 8 caracteres.');
    }
}

// Função para Login
function handleLogin(event) {
    event.preventDefault();
    
    const emailInserido = document.getElementById('email').value;
    const passInserida = document.getElementById('password').value;
    const contaGuardada = JSON.parse(localStorage.getItem('userAccount'));

    if (contaGuardada && emailInserido === contaGuardada.email && passInserida === contaGuardada.password) {
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userName', contaGuardada.nome.split(' ')[0]);
        
        window.location.href = 'index2.html';
    } else {
        alert('Credenciais incorretas ou conta inexistente.');
    }
}

// Função para verificar estado da sessão (usar na Homepage)
function checkUserSession() {
    const isLoggedIn = localStorage.getItem('userLoggedIn');
    const userName = localStorage.getItem('userName');
    const authLink = document.querySelector('a[href="login.html"]');

    if (isLoggedIn === 'true' && authLink) {
        authLink.innerHTML = `Olá, ${userName}`;
        authLink.href = "#"; // Ou link para página de perfil
        
        // Adicionar um botão de logout opcional
        const logoutBtn = document.createElement('li');
        logoutBtn.innerHTML = '<a href="#" onclick="logout()">Sair</a>';
        authLink.parentElement.parentElement.appendChild(logoutBtn);
    }
}

function logout() {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userName');
    window.location.reload();
}