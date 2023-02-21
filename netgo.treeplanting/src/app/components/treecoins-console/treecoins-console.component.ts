import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddTreecoins } from '../../actions/treecoins-actions/add-treecoins/add-treecoins';
import { RemoveTreecoins } from '../../actions/treecoins-actions/remove-treecoins/remove-treecoins';
import { GetUsers } from '../../actions/user-actions/get-users/get-users';
import { User } from '../../entity/user';
import { UserState } from '../../state/user-state';

@Component({
  selector: 'app-treecoins-console',
  templateUrl: './treecoins-console.component.html',
  styleUrls: ['./treecoins-console.component.scss']
})
export class TreecoinsConsoleComponent implements OnInit {
  @Select(UserState.userStatus) users$!: Observable<User[]>;
  @Select(UserState.loading) loading$!: Observable<boolean>;
  users!: User[];
  msisdn: any = {};

  displayedColumns: string[] =
    [
      'id',
      'userName',
      'treecoins',
      'anzahl',
      'add',
      'remove',
    ];

  constructor(private store: Store) {

  }
  dataSource = new MatTableDataSource(this.users);
  ngOnInit(): void {
    this.users$.subscribe(
      (value: User[]) => {
        this.users = value;
        this.getDataSource();
      });
    this.store.dispatch(new GetUsers());
  }

  getDataSource() {
    this.dataSource = new MatTableDataSource(this.users);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    (this.dataSource).filter = filterValue.trim().toLowerCase();

  }

  addTreecoins(id: string, deposit: number) {
    this.store.dispatch(new AddTreecoins(id, deposit));
  }

  removeTreecoins(id: string, withdraw: number) {
    this.store.dispatch(new RemoveTreecoins(id, withdraw));
  }

}
