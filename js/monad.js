export const supabaseMonad = (request) => {
    return request
        .then(data => ({ data, error: null }))
        .catch(error => ({ data: null, error }));
};