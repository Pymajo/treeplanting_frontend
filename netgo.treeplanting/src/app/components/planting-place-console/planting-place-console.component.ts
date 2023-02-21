import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetPlantingPlaces } from 'src/app/actions/planting-place-actions/get-planting-places/get-planting-places';
import { PlantingPlace } from 'src/app/entity/planting-place';
import { PlantingPlaceState } from 'src/app/state/planting-place-state';

@Component({
  selector: 'app-planting-place-console',
  templateUrl: './planting-place-console.component.html',
  styleUrls: ['./planting-place-console.component.scss']
})
export class PlantingPlaceConsoleComponent implements OnInit {
  @Select(PlantingPlaceState.plantingPlaceStatus) plantingPlaces$!: Observable<PlantingPlace[]>
  @Select(PlantingPlaceState.loading) loading$!: Observable<boolean>;

  plantingPlace!: PlantingPlace;
  plantingPlaces!: PlantingPlace[];
  displayedColumns: string[] =
    [
      'id',
      'name',
      'pictures',
      'description',
      'xCoordinate',
      'yCoordinate',
      'seedling',
      'plantingArea'
    ];

  plantingPlacesList: PlantingPlace[] = [
    {
      "id": "68bc7c98-0d42-4dc7-98bf-1d5778f6bbd4",
      "xCoordinate": 3,
      "yCoordinate": 1,
      "name": "netgo Bochum",
      "image": "assets/netgo_bochum.png",
      "description": "Das alte tolle Büro",
      "seedlingId": "63d5a0f9-44aa-449f-99b3-03c1cf497f86",
      "plantingAreaId": "f80e8d3b-1f49-4354-9160-3ceba734e413"
    },
    {
      "id": "63d5a0f9-44aa-449f-99b3-03c1cf497f86",
      "xCoordinate": 7,
      "yCoordinate": 4,
      "name": "Basecamp",
      "image": "assets/basecamp.png",
      "description": "Basecamp",
      "seedlingId": "f80e8d3b-1f49-4354-9160-3ceba734e413",
      "plantingAreaId": "f80e8d3b-1f49-4354-9160-3ceba734e413"
    },
    {
      "id": "63d5a0f9-44aa-449f-99b3-03c1cf497f86",
      "xCoordinate": 8,
      "yCoordinate": 8,
      "name": "Ben´s Dj Pult",
      "image": "assets/djben.jpeg",
      "description": "Dort wo Ben Beatjuggling betreibt",
      "seedlingId": "f80e8d3b-1f49-4354-9160-3ceba734e413",
      "plantingAreaId": "f80e8d3b-1f49-4354-9160-3ceba734e413"
    }
  ];

  constructor(private store: Store) {

  }
  dataSource = new MatTableDataSource(this.plantingPlaces);
  ngOnInit(): void {
    this.plantingPlaces$.subscribe(
      (value: PlantingPlace[]) => {
        this.plantingPlaces = value;
        this.getDataSource();
      });
    this.store.dispatch(new GetPlantingPlaces());
  }

  getDataSource() {


    this.dataSource = new MatTableDataSource(this.plantingPlacesList);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    (this.dataSource).filter = filterValue.trim().toLowerCase();

  }

}
