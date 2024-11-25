import {supabaseMonad} from './supabase.js';


export const addToLeaderboard = (name, score) => {
    return supabaseMonad.chain(async (client) => {
            const { data, error } = await client
                .from('leaderboard')
                .insert([{ name, score }]);

            if (error) throw new Error('Greška pri dodavanju rezultata:', error);
            return data;
    });
};


export const getLeaderboard = () => {
    return supabaseMonad.chain(async (client) => {
        const { data, error } = await client
            .from('leaderboard')
            .select('name, score')
            .order('score', { ascending: false });

        if (error) throw new Error('Greška pri dohvaćanju rezultata:', error);
        return data;
    }).promise; // Ensure we return the promise result
};


export const updateLeaderboard = (name, score) => {
    return addToLeaderboard(name, score).chain(() => {
        try {
            // Dohvatanje svih rezultata iz baze i sortiranje po broju bodova
            const leaderboard = getLeaderboard();

            return leaderboard.slice(0, 10); // Vraća leaderboard sa ažuriranim rezultatima
        } catch (err) {
            console.error('Greška pri ažuriranju leaderboard-a:', err);
            return [];
        }
    })

};

