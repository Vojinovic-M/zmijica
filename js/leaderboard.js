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
    }).promise;
};

export const updateLeaderboard = (name, score) => {
    return addToLeaderboard(name, score).chain(() => {
        try {
            const leaderboard = getLeaderboard();
            return leaderboard.slice(0, 10);
        } catch (err) {
            console.error('Greška pri ažuriranju leaderboard-a:', err);
            return [];
        }
    })
};
