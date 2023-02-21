import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { CheckPlantingOfficer } from 'src/app/actions/auth-actions/planting-officer.action';
import { CheckSeedlingManager } from 'src/app/actions/auth-actions/seedling-manager.action';
import { GetSeedlings } from 'src/app/actions/seedling-actions/get-seedlings/get-seedlings';
import { Seedling } from 'src/app/entity/seedling';
import { SeedlingService } from 'src/app/service/seedling/seedling-service';
import { SeedlingState } from 'src/app/state/seedling-state';
import { CheckAdmin } from '../../actions/auth-actions/admin.action';
import { CheckTreecoinsDeterminer } from '../../actions/auth-actions/treecoins-determiner.action';
import { MeViewModel } from '../../entity/me-view.model';
import { User } from '../../entity/user';
import { UserService } from '../../service/user/user-service';
import { ApiResponse } from '../../state/models/api-response.model';
import { UserState } from '../../state/user-state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Select(UserState.loading) loading$!: Observable<boolean>;
  @Select(SeedlingState.seedlingStatus) seedlings$!: Observable<Seedling[]>

  user!: MeViewModel;
  seedlings!: Seedling[];
  isAdmin: boolean = false;
  treecoinsDeterminer: boolean = true;
  seedlingsManager: boolean = true;
  plantingOfficer: boolean = true;
  seedlingsLenght!: number;
  //sollen hinterher aus pflanzarea gezogen werden
  slides = [
    { 'image': 'https://gsr.dev/material2-carousel/assets/demo.png' },
    { 'image': 'https://gsr.dev/material2-carousel/assets/demo.png' },
    { 'image': 'https://gsr.dev/material2-carousel/assets/demo.png' },
    { 'image': 'https://gsr.dev/material2-carousel/assets/demo.png' },
    { 'image': 'https://gsr.dev/material2-carousel/assets/demo.png' }
  ];

  constructor(
    private store: Store,
    private userService: UserService,
    private seedlingService: SeedlingService,
    private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    var id = this.route.snapshot.paramMap.get('userId');

    this.userService.getMe(id).subscribe(
      async (value: ApiResponse<MeViewModel>) => {
        this.user = value.data;
        this.isAdmin = this.user.isAdmin;
        this.treecoinsDeterminer = this.user.treecoinsDeterminer;
        this.seedlingsManager = this.user.seedlingsManager;
        this.plantingOfficer = this.user.plantingOfficer;
      })
    this.seedlings$.subscribe(
      (value: Seedling[]) => {
        this.seedlings = value;
        this.seedlingsLenght = this.seedlings.length;
      });
    this.store.dispatch(new GetSeedlings());
  }

  adminConsole(id: string) {
    this.store.dispatch(new CheckAdmin({
      id: id
    }));
  }
  treecoinsDeterminerConsole(id: string) {
    this.store.dispatch(new CheckTreecoinsDeterminer({
      id: id
    }));
  }

  seedlingsManagerConsole(id: string) {
    this.store.dispatch(new CheckSeedlingManager({
      id: id
    }));
  }
  plantingPlaceConsole(id: string) {
    this.store.dispatch(new CheckPlantingOfficer({
      id: id
    }));
  }
}
