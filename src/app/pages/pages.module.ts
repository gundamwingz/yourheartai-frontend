import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';

import { Index1Component } from './index1/index1.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RecoverpwdComponent } from './recoverpwd/recoverpwd.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout/logout.component';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DashboardComponent } from './userpages/dashboard/dashboard.component';

import { MatTooltipModule } from '@angular/material/tooltip';
import {
  ChangePasswordComponent,
  UpdateProfilePicComponent,
  UserProfileComponent,
} from './userpages/user-profile/user-profile.component';
import { MatInputModule } from '@angular/material/input';
import { AiSummaryComponent } from './ai_models/ai-summary/ai-summary.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { AiFrontComponent } from './ai_models/ai-front.component';
import { PostsComponent } from './posts/posts.component';
import { AiMRcnnComponent } from './ai_models/ai-m-rcnn/ai-m-rcnn.component';
import { AiMlpComponent } from './ai_models/ai-mlp/ai-mlp.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TempComponent } from './temp/temp.component';

@NgModule({
  declarations: [
    Index1Component,
    LoginComponent,
    LogoutComponent,
    SignupComponent,
    RecoverpwdComponent,
    DashboardComponent,
    UserProfileComponent,
    AiMRcnnComponent,
    AiFrontComponent,
    AiMlpComponent,
    AiSummaryComponent,
    ChangePasswordComponent,
    UpdateProfilePicComponent,
    PostsComponent,
    TempComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ScrollToModule.forRoot(),
    NgbModalModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatInputModule,
    MatGridListModule,
    MatDialogModule,
    MatTabsModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' },
    },
  ],
})
export class PagesModule {}
