import { supabase } from './supabase.js';

async function carregarProduto() {
    // 1. Apanhar o ID na barra de endereço (ex: ?id=3)
    const urlParams = new URLSearchParams(window.location.search);
    const idProduto = urlParams.get('id');

    // Elementos HTML do teu design
    const imagemElement = document.getElementById('mainImage');
    const tituloElement = document.getElementById('tituloProd');
    const precoElement = document.getElementById('precoProd');
    const descElement = document.getElementById('descProd');
    const catElement = document.getElementById('catProd');

    if (!idProduto) {
        if (tituloElement) tituloElement.textContent = 'Produto não encontrado.';
        return;
    }

    try {
        // 2. Pedir o biquíni específico ao Supabase
        const { data: produto, error } = await supabase
            .from('produto')
            .select('*')
            .eq('id_produto', idProduto)
            .single();

        if (error) throw error;

        // 3. Substituir o texto falso do HTML pelos dados reais
        if (imagemElement) imagemElement.src = produto.imagem_url;
        if (tituloElement) tituloElement.textContent = produto.nome;
        if (precoElement) precoElement.textContent = `${produto.preco.toFixed(2)}€`;
        if (descElement) descElement.textContent = produto.descricao;
        if (catElement && produto.categoria) catElement.textContent = produto.categoria;

        // Limpar as imagens falsas das miniaturas em baixo e meter a verdadeira
        const thumbnailList = document.querySelector('.thumbnail-list');
        if (thumbnailList) {
            thumbnailList.innerHTML = `
                <img src="${produto.imagem_url}" class="thumb active" onclick="changeImage(this)">
            `;
        }

        // 4. LÓGICA DO CARRINHO: Ativar o botão
        const btnComprar = document.querySelector('.btn-buy-large');
        if (btnComprar) {
            btnComprar.addEventListener('click', () => {
                // Lê o tamanho que está escrito no ecrã (S, M ou L)
                const tamanhoSelecionado = document.getElementById('selectedSize').innerText;
                
                // Envia para o ficheiro cart.js global
                if (window.addToCart) {
                    window.addToCart(produto.nome, produto.preco, produto.imagem_url, tamanhoSelecionado);
                } else {
                    console.error("A função addToCart não está disponível. Verifica se o cart.js está no HTML.");
                }
            });
        }

    } catch (erro) {
        console.error("Erro ao carregar o produto:", erro.message);
        if (tituloElement) tituloElement.textContent = 'Erro a carregar produto.';
    }
}

// Executar quando a página terminar de carregar
document.addEventListener('DOMContentLoaded', carregarProduto);