import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabaseUrl = 'https://yzvtqoxgiywqhkkyuqcj.supabase.co';
const supabaseKey = 'sb_publishable_LCEZmdACiqQJdwUSW5FEGw_IeuQ5jAl'
export const supabase = createClient(supabaseUrl, supabaseKey)

// Função para testar a conexão com o Supabase
export async function testarConexao() {
    try {
        // Tenta fazer um pedido simples e seguro (ex: obter a sessão atual)
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        console.log("✅ Conexão com o Supabase estabelecida com sucesso!");
    } catch (error) {
        console.error("❌ Erro ao conectar ao Supabase:", error.message);
    }
}

// Executa o teste assim que o ficheiro é carregado
testarConexao();
