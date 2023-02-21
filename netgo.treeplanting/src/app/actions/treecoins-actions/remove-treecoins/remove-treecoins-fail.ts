export class RemoveTreecoinsFail {
    static readonly type: string = '[treecoins.action.treecoins] RemoveTreecoinsFail';

    constructor(public errors: string[] | unknown) { }
}