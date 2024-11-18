import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
    
// Konfiguracija Supabase klijenta
const supabaseUrl = 'https://vfgkgacseuinipizicho.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmZ2tnYWNzZXVpbmlwaXppY2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4OTYzMDIsImV4cCI6MjA0NzQ3MjMwMn0.lYbQoufWTsNa26EHluO5qSRWRnzVY7mW13zYMRcQTnQ';
export const supabase = createClient(supabaseUrl, supabaseKey);

// Proba povezivanja
console.log('Supabase client initialized:', supabase);