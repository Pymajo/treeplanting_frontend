import { Observable } from "rxjs";
import { User } from "src/app/entity/user";
import { ApiResponse } from "src/app/state/models/api-response.model";

export class GetUsersSuccess {
    static readonly type: string = '[user.action.users] GetUsersSuccess';

    constructor(public readonly data: User[]) {
    }
}