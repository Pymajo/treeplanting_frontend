import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetPlantingPlaces } from 'src/app/actions/planting-place-actions/get-planting-places/get-planting-places';
import { PlantingPlace } from 'src/app/entity/planting-place';
import { Poll } from 'src/app/entity/poll';
import { PlantingPlaceState } from 'src/app/state/planting-place-state';

@Component({
  selector: 'app-poll-console',
  templateUrl: './poll-console.component.html',
  styleUrls: ['./poll-console.component.scss']
})
export class PollConsoleComponent implements OnInit {

  poll!: Poll;
  polls!: Poll[];
  displayedColumns: string[] =
    [
      'id',
      'name',
      'pictures',
      'description',
      'xCoordinate',
      'yCoordinate',
      'cost',
      'buy'
    ];

  plantingPlacesList: Poll[] = [
    {
      "id": "68bc7c98-0d42-4dc7-98bf-1d5778f6bbd4",
      "xCoordinate": 1,
      "yCoordinate": 1,
      "name": "Knuspi",
      "image": "assets/knpusi.png",
      "description": "Der Rentner unter den Pflanzen",
      "cost": 22,
      "buy": "f80e8d3b-1f49-4354-9160-3ceba734e413"
    },
    {
      "id": "63d5a0f9-44aa-449f-99b3-03c1cf497f86",
      "xCoordinate": 2,
      "yCoordinate": 2,
      "name": "Plastik Pflanze",
      "image": "assets/plastikpflanze.png",
      "description": "Wird benötigt aufgrund von mangelnder Pflanzen Begeisterung",
      "cost": 63,
      "buy": "f80e8d3b-1f49-4354-9160-3ceba734e413"
    },
    {
      "id": "63d5a0f9-44aa-449f-99b3-03c1cf497f86",
      "xCoordinate": 3,
      "yCoordinate": 3,
      "name": "Ben´s Dj Pult",
      "image": "assets/RgbPflanze.png",
      "description": "Dort wo Ben Beatjuggling betreibt",
      "cost": 600,
      "buy": "f80e8d3b-1f49-4354-9160-3ceba734e413"
    }
  ];

  constructor(private store: Store) {

  }
  dataSource = new MatTableDataSource(this.polls);
  ngOnInit(): void {
    this.getDataSource();

  }

  getDataSource() {


    this.dataSource = new MatTableDataSource(this.plantingPlacesList);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    (this.dataSource).filter = filterValue.trim().toLowerCase();

  }

}

