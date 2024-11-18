import { supabase } from './supabase.js';

// Funkcija za dodavanje rezultata
export const addToLeaderboard = async (name, score) => {
    try {
        const { data, error } = await supabase
            .from('leaderboard')
            .insert([{ name, score }]);

        if (error) {
            console.error('Greška pri dodavanju rezultata:', error);
        } else {
            console.log('Rezultat uspešno dodat:', data);
        }

        // Dodatno logovanje da biste uočili šta se tačno dešava
        console.log('Puni odgovor od Supabase:', { data, error });
    } catch (err) {
        console.error('Greška pri dodavanju rezultata:', err);
    }
};


// Funkcija za dohvaćanje rezultata sa Supabase
export const getLeaderboard = async () => {
    const { data, error } = await supabase
        .from('leaderboard')
        .select('name, score')
        .order('score', { ascending: false });

    if (error) {
        console.error('Greška pri dohvaćanju rezultata:', error);
        return [];
    } else {
        console.log('Podaci sa baze:', data);  // Logovanje podataka
        return data;
    }
};


// Funkcija za dodavanje novog rezultata u leaderboard
export const updateLeaderboard = async (name, score) => {
    try {
        // Dodavanje rezultata u bazu
        await addToLeaderboard(name, score);

        // Dohvatanje svih rezultata iz baze i sortiranje po broju bodova
        const leaderboard = await getLeaderboard();

        // Čuvanje samo prvih 10 rezultata
        const trimmedLeaderboard = leaderboard.slice(0, 10);

        return trimmedLeaderboard; // Vraća leaderboard sa ažuriranim rezultatima
    } catch (err) {
        console.error('Greška pri ažuriranju leaderboard-a:', err);
        return [];
    }
};

