import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessagesService } from '../messages-service';
import { catchError, Observable, of, tap } from 'rxjs';
import { User } from "src/app/entity/user";
import { ApiResponse } from "src/app/state/models/api-response.model";
import { LoginData } from "src/app/entity/login-data";
import { JwtModel } from "src/app/entity/jwt.model";
import { MeViewModel } from "src/app/entity/me-view.model";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private userUrl = "https://localhost:5001/api/User/users";
    endpoint = "https://localhost:5001/api/User/users";
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/http' })
    };

    private log(message: string) {
        this.messageService.add('UserService: ${message}');
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

    constructor(private http: HttpClient,
        private messageService: MessagesService) { }

    getUsers(): Observable<ApiResponse<User[]>> {
        return this.http.get<ApiResponse<User[]>>(this.endpoint, {
            headers: new HttpHeaders({ 'access-control.allow.origin': '*' })
        });
    }

    loginUsers(loginData: LoginData): Observable<ApiResponse<JwtModel>> {
        return this.http.post<ApiResponse<JwtModel>>("https://localhost:5001/api/User/loginUser", loginData);
    }

    getMe(id: string | null): Observable<ApiResponse<MeViewModel>> {
        return this.http.get<ApiResponse<MeViewModel>>(`https://localhost:5001/api/User/Me/${id}`, this.httpOptions)
    }

    addUser(user: User): Observable<ApiResponse<User>> {
        return this.http.post<ApiResponse<User>>(this.userUrl, user)
    }

    deleteUser(user: User): Observable<ApiResponse<User>> {
        const url = `${this.userUrl}/${user.id}`;
        return this.http.delete<ApiResponse<User>>(url, this.httpOptions).pipe(
            tap(x => this.log(`deleted user`)),
            catchError(this.handleError<ApiResponse<User>>('deleteUser'))
        );
    }

    confirmUser(userId: string): Observable<ApiResponse<User>> {
        const url = `${this.userUrl}/${userId}`;
        return this.http.patch<ApiResponse<User>>(url, this.httpOptions)
    }

    demoteUserAdmin(userId: string): Observable<ApiResponse<User>> {
        const url = `https://localhost:5001/api/User/DemoteAdmin/${userId}`;
        return this.http.patch<ApiResponse<User>>(url, this.httpOptions)
    }

    promoteUserAdmin(userId: string): Observable<ApiResponse<User>> {
        const url = `https://localhost:5001/api/User/PromoteAdmin/${userId}`;
        return this.http.patch<ApiResponse<User>>(url, this.httpOptions)
    }

    demoteUserTreecoins(userId: string): Observable<ApiResponse<User>> {
        const url = `https://localhost:5001/api/User/DemoteTreecoinsDeterminer/${userId}`;
        return this.http.patch<ApiResponse<User>>(url, this.httpOptions)
    }

    promoteUserTreecoins(userId: string): Observable<ApiResponse<User>> {
        const url = `https://localhost:5001/api/User/PromoteTreecoinsDeterminer/${userId}`;
        return this.http.patch<ApiResponse<User>>(url, this.httpOptions);
    }

    demotePlantingOfficer(userId: string): Observable<ApiResponse<User>> {
        const url = `https://localhost:5001/api/User/DemotePlantingOfficer/${userId}`;
        return this.http.patch<ApiResponse<User>>(url, this.httpOptions)
    }

    promotePlantingOfficer(userId: string): Observable<ApiResponse<User>> {
        const url = `https://localhost:5001/api/User/PromotePlantingOfficer/${userId}`;
        return this.http.patch<ApiResponse<User>>(url, this.httpOptions);
    }

    demotePollManager(userId: string): Observable<ApiResponse<User>> {
        const url = `https://localhost:5001/api/User/DemotePollManager/${userId}`;
        return this.http.patch<ApiResponse<User>>(url, this.httpOptions)
    }

    promotePollManager(userId: string): Observable<ApiResponse<User>> {
        const url = `https://localhost:5001/api/User/PromotePollManager/${userId}`;
        return this.http.patch<ApiResponse<User>>(url, this.httpOptions);
    }

    demoteSeedlingsManager(userId: string): Observable<ApiResponse<User>> {
        const url = `https://localhost:5001/api/User/DemoteSeedlingsManager/${userId}`;
        return this.http.patch<ApiResponse<User>>(url, this.httpOptions)
    }

    promoteSeedlingsManager(userId: string): Observable<ApiResponse<User>> {
        const url = `https://localhost:5001/api/User/PromoteSeedlingsManager/${userId}`;
        return this.http.patch<ApiResponse<User>>(url, this.httpOptions);
    }

    updateUser(user: User): Observable<ApiResponse<User>> {
        const url = `${this.userUrl}`;
        return this.http.put<ApiResponse<User>>(url, this.httpOptions).pipe(
            tap(x => this.log(`update user`)),
            catchError(this.handleError<ApiResponse<User>>('updateUser'))
        );
    }
    removeTreecoins(id: string, withdraw: number): Observable<ApiResponse<User>> {
        const url = `https://localhost:5001/api/Treecoins/RemoveTreecoins/${id}/${withdraw}`;
        return this.http.patch<ApiResponse<User>>(url, this.httpOptions);
    }
    addTreecoins(id: string, deposit: number): Observable<ApiResponse<User>> {
        const url = `https://localhost:5001/api/Treecoins/AddTreecoins/${id}/${deposit}`;
        return this.http.patch<ApiResponse<User>>(url, this.httpOptions);
    }
}