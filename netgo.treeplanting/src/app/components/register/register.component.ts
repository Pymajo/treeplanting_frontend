import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { isObservable, Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../entity/user';
import { UserState } from '../../state/user-state';
import { Select, Store } from '@ngxs/store';
import { UserService } from '../../service/user/user-service';
import { ApiResponse } from '../../state/models/api-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Select(UserState.userStatus) users$!: Observable<ApiResponse<User[]>>;
  users!: ApiResponse<User[]>;
  user!: User;
  reactiveForm!: UntypedFormGroup;

  constructor(
    private builder: UntypedFormBuilder,
    private router: Router,
    private userService: UserService,
    private store: Store,) { }

  async ngOnInit(): Promise<void> {
    this.reactiveForm = this.builder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  addUser(): void {
    const user: User = {
      id: uuidv4(),
      userName: this.reactiveForm.get("name")?.value,
      passwordHash: this.reactiveForm.get("password")?.value,
      email: this.reactiveForm.get("email")?.value,
      emailRegistered: false,
      isAdmin: false,
      treecoinsDeterminer: false,
      plantingOfficer: false,
      pollManager: false,
      seedlingsManager: false,
      treecoins: 0
    };

    this.userService.addUser(user)
      .subscribe()
    {
      this.router.navigateByUrl(`login`);
    }
  }
}
