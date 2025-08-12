import { Role } from '@common/Enums';

export const authFeatureKey = 'auth';

export interface AuthState {
    username: string | null;
    email: string | null;
    role: Role | null;
    loading: boolean;
    error: string | null;
}
export const initialAuthState: AuthState = { username: null, email: null, role: null, loading: false, error: null };
