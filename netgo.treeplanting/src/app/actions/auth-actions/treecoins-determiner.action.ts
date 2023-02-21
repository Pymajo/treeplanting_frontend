export class CheckTreecoinsDeterminer {
    static readonly type = '[Auth] CheckTreecoinsManager';

    constructor(public payload: {
        id: string
    }) { }
}