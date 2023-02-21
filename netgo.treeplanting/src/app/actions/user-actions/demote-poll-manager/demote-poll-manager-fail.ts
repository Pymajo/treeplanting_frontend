export class DemotePollManagerFail {
    static readonly type: string = '[user.action.user] DemotePollManagerFail';

    constructor(public errors: string[] | unknown) { }
}