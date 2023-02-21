import { LoginData } from "src/app/entity/login-data";
import { User } from "src/app/entity/user";

export class LoginUser {
    static readonly type: string = '[actions.loginuser]login user';

    constructor(public loginData: LoginData) { }
}