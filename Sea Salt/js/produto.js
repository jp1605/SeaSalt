import { supabase } from './supabase.js';

async function carregarProduto() {
    // 1. Obter o ID do produto a partir do URL (ex: produto.html?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const idProduto = urlParams.get('id');

    // Elementos HTML que vão receber a informação
    const imagemElement = document.getElementById('produto-imagem');
    const nomeElement = document.getElementById('produto-nome');
    const precoElement = document.getElementById('produto-preco');
    const descElement = document.getElementById('produto-descricao');

    if (!idProduto) {
        if (nomeElement) nomeElement.textContent = 'Produto não encontrado.';
        return;
    }

    try {
        // 2. Pedir ao Supabase o produto com este ID específico
        const { data: produto, error } = await supabase
            .from('produto')
            .select('*')
            .eq('id_produto', idProduto)
            .single(); // .single() retorna 1 objeto em vez de um array (lista)

        if (error) throw error;

        // 3. Preencher o HTML com os dados e a imagem vindos da Base de Dados
        if (imagemElement) imagemElement.src = produto.imagem_url;
        if (nomeElement) nomeElement.textContent = produto.nome;
        if (precoElement) precoElement.textContent = `${produto.preco.toFixed(2)}€`;
        if (descElement) descElement.textContent = produto.descricao;
    } catch (erro) {
        console.error("Erro ao carregar o produto:", erro.message);
        if (nomeElement) nomeElement.textContent = 'Erro ao carregar detalhes do produto.';
    }
}

document.addEventListener('DOMContentLoaded', carregarProduto);