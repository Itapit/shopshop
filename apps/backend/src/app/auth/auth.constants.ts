export const AUTH_COOKIE = {
    NAME: 'access_token',
    MAX_AGE_MS: 15 * 60 * 1000, // 15 minutes
    SECURE: true as const,
    SAME_SITE: 'strict' as const,
    PATH: '/' as const,
};
