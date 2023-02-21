import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetSeedlings } from 'src/app/actions/seedling-actions/get-seedlings/get-seedlings';
import { Seedling } from 'src/app/entity/seedling';
import { SeedlingState } from 'src/app/state/seedling-state';

@Component({
  selector: 'app-seedling-console',
  templateUrl: './seedling-console.component.html',
  styleUrls: ['./seedling-console.component.scss']
})
export class SeedlingConsoleComponent implements OnInit {
  @Select(SeedlingState.seedlingStatus) seedlings$!: Observable<Seedling[]>
  @Select(SeedlingState.loading) loading$!: Observable<boolean>;

  seedling!: Seedling;
  seedlings!: Seedling[];
  displayedColumns: string[] =
    [
      'id',
      'treeSpecies',
      'userName',
      'price',
      'xCoordinate',
      'yCoordinate'
    ];

  constructor(private store: Store) {

  }
  dataSource = new MatTableDataSource(this.seedlings);
  ngOnInit(): void {
    this.seedlings$.subscribe(
      (value: Seedling[]) => {
        this.seedlings = value;
        this.getDataSource();
      });
    this.store.dispatch(new GetSeedlings());
  }

  getDataSource() {
    this.dataSource = new MatTableDataSource(this.seedlings);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    (this.dataSource).filter = filterValue.trim().toLowerCase();

  }

}
