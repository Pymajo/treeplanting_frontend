export class Login {
    static readonly type = '[Auth] Login';
    constructor(public payload: {
        passwordHash: string,
        email: string;
    }) { }
}

export class Logout {
    static readonly type = '[Auth] Logout';
}