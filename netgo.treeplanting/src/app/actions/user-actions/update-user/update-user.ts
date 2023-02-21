import { User } from "src/app/entity/user";

export class UpdateUser {
    static readonly type: string = '[actions.updateuser]update user';

    constructor(public user: User) { }
}