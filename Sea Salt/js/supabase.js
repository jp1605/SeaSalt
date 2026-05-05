import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabaseUrl = 'https://yzvtqoxgiywqhkkyuqcj.supabase.co';
const supabaseKey = 'sb_publishable_LCEZmdACiqQJdwUSW5FEGw_IeuQ5jAl'
export const supabase = createClient(supabaseUrl, supabaseKey)
