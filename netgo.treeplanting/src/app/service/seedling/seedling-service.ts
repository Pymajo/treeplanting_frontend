import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Seedling } from "src/app/entity/seedling";
import { ApiResponse } from "src/app/state/models/api-response.model";
import { MessagesService } from "../messages-service";

@Injectable({
    providedIn: 'root'
})

export class SeedlingService {
    private userUrl = "https://localhost:5001/api/Seedling/seedlings";
    endpoint = "https://localhost:5001/api/Seedling/seedlings";
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/http' })
    };

    private log(message: string) {
        this.messageService.add('SeedlingService: ${message}');
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

    getSeedlings(): Observable<ApiResponse<Seedling[]>> {
        return this.http.get<ApiResponse<Seedling[]>>(this.endpoint, this.httpOptions);
    }

    createSeedling(seedling: Seedling): Observable<ApiResponse<Seedling>> {
        return this.http.post<ApiResponse<Seedling>>(this.endpoint, seedling);
    }

    editSeedling(seedling: Seedling): Observable<ApiResponse<Seedling>> {
        return this.http.put<ApiResponse<Seedling>>(this.endpoint, seedling, this.httpOptions);
    }
}