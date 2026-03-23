import { createClient } from '@supabase/supabase-js';

// URL do seu projeto FHPBeto
const supabaseUrl = 'https://pajjgimxnwcfdxfyajng.supabase.co';

// Chave ANON pública (sb_publishable)
const supabaseAnonKey = 'sb_publishable_bFqdqEwU9wynCxWgnLRr_Q_wwFVvZhC'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);