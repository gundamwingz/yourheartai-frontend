import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Index1Component } from './index1/index1.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { RecoverpwdComponent } from './recoverpwd/recoverpwd.component';

import { CanActivate } from '../shared/auth/auth.guard';
import { AuthService } from '../shared/services/auth.service';
import { DashboardComponent } from './userpages/dashboard/dashboard.component';
import { UserProfileComponent } from './userpages/user-profile/user-profile.component';
import { AiSummaryComponent } from './ai_models/ai-summary/ai-summary.component';
import { AiFrontComponent } from './ai_models/ai-front.component';
import { PostsComponent } from './posts/posts.component';
import { TempComponent } from './temp/temp.component';

export const routes: Routes = [
  {
    path: '',
    component: Index1Component,
  },
  /////////////////////////////UserLogins////////////////////////////////////////
  {
    path: 'index',
    data: { title: 'Home', showInHomeNav: true },
    component: Index1Component,
  },
  {
    path: 'login',
    data: { title: 'Login', showInHomeNav: false },
    component: LoginComponent,
  },
  {
    path: 'logout',
    data: { title: 'Logout', showInHomeNav: false },
    component: LogoutComponent,
  },
  {
    path: 'register',
    data: { title: 'Register', showInHomeNav: false },
    component: SignupComponent,
  },
  {
    path: 'password-forget',
    data: { title: 'Reset', showInHomeNav: false },
    component: RecoverpwdComponent,
  },
  /////////////////////////////UserPages////////////////////////////////////////
  {
    path: 'dashboard',
    data: { title: 'Dashboard', showInHomeNav: true },
    component: DashboardComponent,
    // canActivate: [authGuard],
    //   roles: ['admin', 'patient','medicalStaff'],
  },
  {
    path: 'user-profile',
    data: { title: 'User Profile', showInHomeNav: true },
    component: UserProfileComponent,
    // canActivate: [authGuard],
    //   roles: ['admin', 'patient','medicalStaff'],
  },
  {
    path: 'testimonials',
    data: { title: 'Testimonials', showInHomeNav: true },
    component: PostsComponent,
    // canActivate: [authGuard],
    //   roles: ['admin', 'patient','medicalStaff'],
  },
  {
    path: 'cancer-ai-predict',
    data: { title: 'Cancer Model', showInHomeNav: true },
    component: TempComponent,
    // canActivate: [authGuard],
    //   roles: ['admin', 'patient','medicalStaff'],
  },
  {
    path: 'ai-front',
    data: { title: 'AI Models', showInHomeNav: true },
    component: AiFrontComponent,
    // canActivate: [authGuard],
    // data: {
    //   group: 'CAPS/PFT/CHK',
    //   roles: ['admin', 'patient','medicalStaff'],
    // },
  },
  {
    path: '**',
    redirectTo: 'index',
    pathMatch: 'full',
  },

  // {
  //     path: "first-page",
  //     data: { title: "First Page", showInHomeNav: true }
  //     // other properties...
  // },
  // // other routes...
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
