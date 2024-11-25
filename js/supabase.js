import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
    
// Konfiguracija Supabase klijenta
const supabaseUrl = 'https://vfgkgacseuinipizicho.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmZ2tnYWNzZXVpbmlwaXppY2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4OTYzMDIsImV4cCI6MjA0NzQ3MjMwMn0.lYbQoufWTsNa26EHluO5qSRWRnzVY7mW13zYMRcQTnQ';
const supabase = createClient(supabaseUrl, supabaseKey);

class SupabaseMonad {
    constructor(client) {
        this.client = client;
        this.promise = Promise.resolve();
    }

    static of(client) {
        return new SupabaseMonad(client);
    }

    chain(fn) {
        this.promise = this.promise.then((res) => fn(this.client, res));
        return this;
    }

    catch(fn) {
        this.promise = this.promise.catch(fn);
        return this;
    }

    fork(success, failure) {
        this.promise.then(success).catch(failure);
    }
}

export const supabaseMonad = SupabaseMonad.of(supabase);
// Proba povezivanja
console.log('Supabase client initialized:', supabase);