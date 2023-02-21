import { JwtModel } from "src/app/entity/jwt.model";

export class LoginUserSuccess {
    static readonly type: string = '[user.action.user] LoginUserSuccess';

    constructor(public readonly data: JwtModel) {
    }

}