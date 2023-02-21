export class PromoteUserTreecoins {
    static readonly type: string = '[actions.PromoteUserTreecoins]promote user treecoins';

    constructor(public userId: string) { }
}