export class CheckAdmin {
    static readonly type = '[Auth] CheckAdmin';

    constructor(public payload: {
        id: string
    }) { }
}