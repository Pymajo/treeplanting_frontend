import { MeViewModel } from "src/app/entity/me-view.model";
import { User } from "src/app/entity/user";

export class GetMeSuccess {
    static readonly type: string = '[user.action.user] GetUserSuccess';

    constructor(public readonly data: MeViewModel) {
    }

}