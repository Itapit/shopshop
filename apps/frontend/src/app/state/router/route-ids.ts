export const RouteIds = {
    Home: 'Home',
    AuthSignIn: 'AuthSignIn',
    AuthSignUp: 'AuthSignUp',
    AdminStats: 'AdminStats',
    Cart: 'Cart',
    ProductsList: 'ProductsList',
    ProductDetail: 'ProductDetail',
    Unknown: 'Unknown',
} as const;

export type RouteId = (typeof RouteIds)[keyof typeof RouteIds];
