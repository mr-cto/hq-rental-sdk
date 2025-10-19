import http from '../utils/http';

/**
 * Set the API token to be used for subsequent requests.
 * Call `auth.setToken(null)` to clear the token.
 */
export const setToken = (token: string | null) => {
    http.setToken(token);
};

/**
 * Convenience for using an API key (same as token here).
 */
export const useApiKey = (apiKey: string) => setToken(apiKey);

export default {
    setToken,
    useApiKey,
};