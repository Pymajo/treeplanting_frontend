import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { DemotePlantingOfficer } from "src/app/actions/user-actions/demote-planting-officer/demote-planting-officer";
import { DemotePollManager } from "src/app/actions/user-actions/demote-poll-manager/demote-poll-manager";
import { DemoteSeedlingsManager } from "src/app/actions/user-actions/demote-seedlings-manager/demote-seedlings-manager";
import { DemoteUserAdmin } from "src/app/actions/user-actions/demote-user-admin/demote-user-admin";
import { DemoteUserTreecoins } from "src/app/actions/user-actions/demote-user-treecoins-determiner/demote-user-treecoins";
import { GetUsers } from "src/app/actions/user-actions/get-users/get-users";
import { PromotePlantingOfficer } from "src/app/actions/user-actions/promote-planting-officer/promote-planting-officer";
import { PromotePollManager } from "src/app/actions/user-actions/promote-poll-manager/promote-poll-manager";
import { PromoteSeedlingsManager } from "src/app/actions/user-actions/promote-seedlings-manager/promote-seedlings-manager";
import { PromoteUserAdmin } from "src/app/actions/user-actions/promote-user-admin/promote-user-admin";
import { PromoteUserTreecoins } from "src/app/actions/user-actions/promote-user-treecoins-determiner/promote-user-treecoins-determiner";
import { User } from "src/app/entity/user";
import { UserState } from "src/app/state/user-state";

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.scss']
})

export class AdminConsoleComponent implements OnInit {
  @Select(UserState.userStatus) users$!: Observable<User[]>;
  @Select(UserState.loading) loading$!: Observable<boolean>;
  users!: User[];
  user!: User | undefined;
  public selectedVal!: string;

  displayedColumns: string[] =
    [
      'id',
      'name',
      'email',
      'registered',
      'permissions',
    ];
  constructor(private store: Store) { }

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

  async applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    (await this.dataSource).filter = filterValue.trim().toLowerCase();

  }

  public onValChange(val: string) {
    this.selectedVal = val;
  }

  changeAdmin(id: string) {
    this.user = this.users.find(x => x.id == id);

    if (!this.user?.isAdmin) {
      this.promoteAdmin(id);
    }
    else {
      this.demoteAdmin(id);
    }
  }

  demoteAdmin(id: string) {
    this.store.dispatch(new DemoteUserAdmin(id));
  }
  promoteAdmin(id: string) {
    this.store.dispatch(new PromoteUserAdmin(id));

  }

  changeTreecoins(id: string) {
    this.user = this.users.find(x => x.id == id);

    if (!this.user?.treecoinsDeterminer) {
      this.promoteTreecoins(id);
    }
    else {
      this.demoteTreecoins(id);
    }
  }

  demoteTreecoins(id: string) {
    this.store.dispatch(new DemoteUserTreecoins(id));
  }
  promoteTreecoins(id: string) {
    this.store.dispatch(new PromoteUserTreecoins(id));

  }

  changePlantingOfficer(id: string) {
    this.user = this.users.find(x => x.id == id);
    if (!this.user?.plantingOfficer) {
      this.promotePlantingOfficer(id);
    }
    else {
      this.demotePlantingOfficer(id);
    }
  }

  demotePlantingOfficer(id: string) {
    this.store.dispatch(new DemotePlantingOfficer(id));
  }
  promotePlantingOfficer(id: string) {
    this.store.dispatch(new PromotePlantingOfficer(id));

  }

  changePollManager(id: string) {
    this.user = this.users.find(x => x.id == id);

    if (!this.user?.pollManager) {
      this.promotePollManager(id);
    }
    else {

      this.demotePollManager(id);
    }
  }

  demotePollManager(id: string) {
    this.store.dispatch(new DemotePollManager(id));
  }
  promotePollManager(id: string) {
    this.store.dispatch(new PromotePollManager(id));

  }

  changeSeedlingsManager(id: string) {
    this.user = this.users.find(x => x.id == id);
    if (!this.user?.seedlingsManager) {
      this.promoteSeedlings(id);
    }
    else {
      this.demoteSeedlingsManager(id);
    }
  }

  demoteSeedlingsManager(id: string) {
    this.store.dispatch(new DemoteSeedlingsManager(id));
  }
  promoteSeedlings(id: string) {
    this.store.dispatch(new PromoteSeedlingsManager(id));

  }
}
