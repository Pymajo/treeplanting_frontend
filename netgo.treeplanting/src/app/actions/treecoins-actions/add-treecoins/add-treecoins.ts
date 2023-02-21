export class AddTreecoins {
    static readonly type: string = '[actions.addTreecoins]add treecoins';

    constructor(public id: string, public deposit: number) { }
}
