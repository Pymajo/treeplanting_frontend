import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from '../../entity/user';
import { UserService } from '../../service/user/user-service';
import { ApiResponse } from '../../state/models/api-response.model';
import { UserState } from '../../state/user-state';
@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.scss']
})
export class ConfirmRegistrationComponent implements OnInit {
  @Select(UserState.loading) loading$!: Observable<boolean>;
  userId!: string;
  users!: ApiResponse<User[]>;
  user!: User;
  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,) { }

  async ngOnInit(): Promise<void> {
    (await (this.userService.getUsers())).subscribe(
      async (value: ApiResponse<User[]>) => {
        this.users = value;

        this.route.params.subscribe(async (params) => {
          this.userId = params['userId'];
          var filteredUserArray = this.users.data.filter(x => x.id == this.userId);
          this.user = filteredUserArray[0];
          debugger;
        })
      })
  }

  confirmUser(): void {

    this.userService.confirmUser(this.userId)
      .subscribe()
    {
      this.router.navigateByUrl(`login`);
    }
  }
}
