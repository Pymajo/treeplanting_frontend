export class RemoveTreecoins {
    static readonly type: string = '[actions.removeTreecoins]remove treecoins';

    constructor(public id: string, public withdraw: number) { }
}
