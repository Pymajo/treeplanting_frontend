export class DemoteSeedlingsManagerFail {
    static readonly type: string = '[user.action.user] DemoteSeedlingsManagerFail';

    constructor(public errors: string[] | unknown) { }
}