import {supabase} from './supabase.js';
import {supabaseMonad} from './monad.js';

export const addToLeaderboard = async (name, score) => {
    const result = await supabaseMonad(
        supabase.from('leaderboard')
            .insert([{ name, score }])
    );

    if (result.error) {
        console.error('Greška pri dodavanju rezultata:', result.error);
    } else {
        console.log('Rezultat uspešno dodat:', result.data);
    }
};

export const getLeaderboard = async () => {
    const result = await supabaseMonad(
        supabase.from('leaderboard')
            .select('name, score')
            .order('score', { ascending: false })
    );

    if (result.error) {
        console.error('Greška pri dohvaćanju rezultata:', result.error);
        return [];
    } else {
        console.log('Podaci sa baze:', result.data);
        return result.data;
    }
};

export const updateLeaderboard = async (name, score) => {
    try {
        // Dodavanje rezultata u bazu
        await addToLeaderboard(name, score);

        // Dohvatanje svih rezultata iz baze i sortiranje po broju bodova
        const leaderboard = await getLeaderboard();

        // Čuvanje samo prvih 10 rezultata
        return leaderboard.slice(0, 10); // Vraća leaderboard sa ažuriranim rezultatima
    } catch (err) {
        console.error('Greška pri ažuriranju leaderboard-a:', err);
        return [];
    }
};