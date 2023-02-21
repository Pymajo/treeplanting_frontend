export interface LoginData {
    passwordHash: string;
    email: string;
    userId?: string;
    emailRegistered?: boolean;
}