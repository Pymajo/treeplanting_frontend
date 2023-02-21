export class CheckPlantingOfficer {
    static readonly type = '[Auth] CheckPlantingOfficer';

    constructor(public payload: {
        id: string
    }) { }
}