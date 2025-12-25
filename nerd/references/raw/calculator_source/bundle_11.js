import { createClient } from '@supabase/supabase-js';
// Use the specific credentials provided
const supabaseUrl = 'https://qogsmbivvhudqgqzeynd.supabase.co';
// The key provided: sb_publishable_iAhCkMoI24Qljlt2XWwiWg_XqHGb9ft
const supabaseKey = 'sb_publishable_iAhCkMoI24Qljlt2XWwiWg_XqHGb9ft';
export const supabase = createClient(supabaseUrl, supabaseKey);
// Log initialization status
console.log(`[Supabase] Initialized client for ${supabaseUrl}`);
