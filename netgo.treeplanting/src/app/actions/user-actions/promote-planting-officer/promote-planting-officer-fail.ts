export class PromotePlantingOfficerFail {
    static readonly type: string = '[user.action.user] PromotePlantingOfficer';

    constructor(public errors: string[] | unknown) { }
}