import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { PlantingPlace } from "src/app/entity/planting-place";
import { Seedling } from "src/app/entity/seedling";
import { ApiResponse } from "src/app/state/models/api-response.model";
import { MessagesService } from "../messages-service";

@Injectable({
    providedIn: 'root'
})

export class PlantingPlaceService {
    endpoint = "https://localhost:5001/api/PlantingPlace/plantingPlace";
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/http' })
    };

    private log(message: string) {
        this.messageService.add('PlantingPlaceService: ${message}');
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

    getPlantingPlaces(): Observable<ApiResponse<PlantingPlace[]>> {
        return this.http.get<ApiResponse<PlantingPlace[]>>(this.endpoint, this.httpOptions);
    }

    createPlantingPlace(plantingPlace: PlantingPlace): Observable<ApiResponse<PlantingPlace>> {
        return this.http.post<ApiResponse<PlantingPlace>>(this.endpoint, plantingPlace);
    }

    editPlantingPlace(plantingPlace: PlantingPlace): Observable<ApiResponse<PlantingPlace>> {
        return this.http.put<ApiResponse<PlantingPlace>>(this.endpoint, plantingPlace, this.httpOptions);
    }
}