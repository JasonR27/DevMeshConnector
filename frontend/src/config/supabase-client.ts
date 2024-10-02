import { createClient } from '@supabase/supabase-js';

console.log('sb url: ', process.env.REACT_APP_SUPABASE_URL!)

const supabaseUrl: string = process.env.REACT_APP_SUPABASE_URL!;
const supabaseAnonKey: string = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
