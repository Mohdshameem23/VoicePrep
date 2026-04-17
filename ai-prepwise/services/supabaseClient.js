import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('Initializing Supabase client with:', {
    url: supabaseUrl ? 'URL present' : 'URL missing',
    key: supabaseAnonKey ? 'Key present' : 'Key missing'
});

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)