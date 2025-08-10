import { Role } from '@common/Enums';

export interface AuthState {
    username: string | null;
    email: string | null;
    role: Role | null;
}
export const initialAuthState: AuthState = { username: null, email: null, role: null };
