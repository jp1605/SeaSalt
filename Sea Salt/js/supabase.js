import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yzvtqoxgiywqhkkyuqcj.supabase.co/rest/v1/'
const supabaseKey = 'sb_publishable_LCEZmdACiqQJdwUSW5FEGw_IeuQ5jAl'
export const supabase = createClient(supabaseUrl, supabaseKey)