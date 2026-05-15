import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-produto');
    const btnSubmit = document.getElementById('btn-submit');
    const mensagem = document.getElementById('mensagem-status');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Impede a página de recarregar
        
        btnSubmit.textContent = 'A guardar produto...';
        btnSubmit.disabled = true;
        mensagem.textContent = '';

        try {
            // Obter os valores do formulário
            const nome = document.getElementById('nome').value;
            const preco = parseFloat(document.getElementById('preco').value);
            const descricao = document.getElementById('descricao').value;
            const tamanho = document.getElementById('tamanho').value;
            const cor = document.getElementById('cor').value;
            const categoria = document.getElementById('categoria').value;
            const imagemInput = document.getElementById('imagem');
            const file = imagemInput.files[0];

            if (!file) {
                throw new Error("Por favor, seleciona uma imagem.");
            }

            // 1. Upload da imagem para o Supabase Storage (bucket 'produtos')
            const fileExt = file.name.split('.').pop(); // Descobre se é jpg, png, etc
            const fileName = `${Date.now()}.${fileExt}`; // Dá um nome único para não haver ficheiros repetidos
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('produto')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Obter o URL público da imagem recém guardada
            const { data: publicUrlData } = supabase.storage
                .from('produto')
                .getPublicUrl(filePath);

            const imagemUrl = publicUrlData.publicUrl;

            // 3. Guardar os dados todos na tabela 'produto'
            const { error: dbError } = await supabase
                .from('produto')
                .insert([
                    { 
                        nome: nome, 
                        preco: preco, 
                        categoria: categoria,
                        tamanho: tamanho,
                        cor: cor,
                        descricao: descricao, 
                        imagem_url: imagemUrl,
                        ativo: true // Adicionado para aparecer na página de Coleção automaticamente
                    }
                ]);

            if (dbError) throw dbError;

            mensagem.style.color = 'green';
            mensagem.textContent = '✅ Produto adicionado com sucesso ao Supabase!';
            form.reset(); // Limpa o formulário para poderes adicionar o próximo

        } catch (error) {
            console.error("Erro:", error);
            mensagem.style.color = 'red';
            mensagem.textContent = `❌ Erro: ${error.message}`;
        } finally {
            btnSubmit.textContent = 'Registar Produto';
            btnSubmit.disabled = false;
        }
    });
});