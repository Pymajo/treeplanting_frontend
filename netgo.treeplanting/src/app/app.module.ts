import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { UserState } from './state/user-state';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConfirmRegistrationComponent } from './components/confirm-registration/confirm-registration.component';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { AuthGuard } from './service/guard/auth-guard';
import { AuthState } from './state/auth-state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { MatTableModule } from '@angular/material/table'
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { AdminGuard } from './service/guard/admin-guard';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OverlayModule } from "@angular/cdk/overlay";
import { TreecoinsConsoleComponent } from './components/treecoins-console/treecoins-console.component';
import { TreecoinsDeterminerGuard } from './service/guard/treecoins-determiner.guard';
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip';
import { SeedlingConsoleComponent } from './components/seedling-console/seedling-console.component';
import { AdminConsoleComponent } from './components/admin-console/admin-console.component';
import { SeedlingState } from './state/seedling-state';
import { SeedlingManagerGuard } from './service/guard/seedling-manager-guard';
import { PlantingPlaceConsoleComponent } from './components/planting-place-console/planting-place-console.component';
import { PlantingPlaceState } from './state/planting-place-state';
import { MatTabsModule } from '@angular/material/tabs';
import { IvyCarouselModule } from 'carousel-angular';
import { PollConsoleComponent } from './components/poll-console/poll-console.component';

const routes: Routes = [
  {
    path: 'dashboard/:userId',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'confirmRegister/:userId',
    component: ConfirmRegistrationComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  { path: 'register', component: RegisterComponent },

  { path: '', component: WelcomeComponent },

  {
    path: 'admin',
    component: AdminConsoleComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'treecoins',
    component: TreecoinsConsoleComponent,
  },
  {
    path: 'seedling',
    component: SeedlingConsoleComponent,
    canActivate: [SeedlingManagerGuard],
  },
  {
    path: 'plantingPlace/console',
    component: PlantingPlaceConsoleComponent,
  },
  {
    path: 'pollconsole',
    component: PollConsoleComponent,
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    DashboardComponent,
    ConfirmRegistrationComponent,
    AdminConsoleComponent,
    TreecoinsConsoleComponent,
    SeedlingConsoleComponent,
    PlantingPlaceConsoleComponent,
    PollConsoleComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatButtonModule,
    MatTabsModule,
    OverlayModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    IvyCarouselModule,
    MatRippleModule,
    NgxsModule.forRoot([
      UserState, AuthState, SeedlingState, PlantingPlaceState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: 'auth.token'
    }),
    NgxsRouterPluginModule.forRoot(),
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
