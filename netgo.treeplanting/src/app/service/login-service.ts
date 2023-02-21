import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../entity/user';
import { LoginData } from '../entity/login-data';
@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) { }

    login(user: LoginData): Observable<any> {
        return this.http.post(`https://localhost:5001/api/User/loginUser`, user);
    }
}