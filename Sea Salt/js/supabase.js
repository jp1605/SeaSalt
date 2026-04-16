import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'O_TEU_URL_AQUI'
const supabaseKey = 'A_TUA_CHAVE_AQUI'
export const supabase = createClient(supabaseUrl, supabaseKey)