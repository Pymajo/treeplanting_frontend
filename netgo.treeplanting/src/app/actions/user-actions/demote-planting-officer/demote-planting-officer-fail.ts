export class DemotePlantingOfficerFail {
    static readonly type: string = '[user.action.user] DemotePlantingOfficerFail';

    constructor(public errors: string[] | unknown) { }
}