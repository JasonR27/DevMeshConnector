import { createClient } from '@supabase/supabase-js';

// require('console-polyfill');

// import console-polyfill from 'console-polyfill';

// import 'console-polyfill';



console.log('sb url: ', process.env.VITE_SUPABASE_URL!)

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
