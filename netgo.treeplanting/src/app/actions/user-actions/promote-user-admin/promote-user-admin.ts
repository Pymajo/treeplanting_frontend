export class PromoteUserAdmin {
    static readonly type: string = '[actions.PromoteUserAdmin]promote user admin';

    constructor(public userId: string) { }
}