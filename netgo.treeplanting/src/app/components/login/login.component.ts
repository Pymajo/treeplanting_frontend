import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetUser } from '../../actions/user-actions/get-user/get-user';
import { GetUserSuccess } from '../../actions/user-actions/get-user/get-user-success';
import { Login } from '../../actions/auth-actions/login.actions';
import { LoginData } from '../../entity/login-data';
import { User } from '../../entity/user';
import { LoginService } from '../../service/login-service';
import { UserService } from '../../service/user/user-service';
import { ApiResponse } from '../../state/models/api-response.model';
import { UserState } from '../../state/user-state';
import { Navigate } from '@ngxs/router-plugin';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Select(UserState.userStatus) users$!: Observable<ApiResponse<User[]>>;
  reactiveForm!: UntypedFormGroup;
  users!: ApiResponse<User[]>;
  user!: User;

  constructor(
    private router: Router,
    private builder: UntypedFormBuilder,
    private userService: UserService,
    private loginService: LoginService,
    private store: Store) { }

  ngOnInit(): void {
    this.reactiveForm = this.builder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  loginUser(): void {
    const loginData: LoginData = {
      passwordHash: this.reactiveForm.get("password")?.value,
      email: this.reactiveForm.get("email")?.value
    };

    this.store.dispatch(new Login({
      email: loginData.email,
      passwordHash: loginData.passwordHash
    }));

  }
}
