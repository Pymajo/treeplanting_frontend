export class CheckSeedlingManager {
    static readonly type = '[Auth] CheckSeedlingManager';

    constructor(public payload: {
        id: string
    }) { }
}