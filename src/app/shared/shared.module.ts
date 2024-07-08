import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServicesComponent } from './services/services.component';
import { PricingComponent } from './pricing/pricing.component';
import { FeaturesComponent } from './features/features.component';
import { TeamComponent } from './team/team.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { ScrollspyDirective } from './scrollspy.directive';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent, DynamicNavbarComponent } from './header/header.component';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { RouterModule } from '@angular/router';

import { SelectService } from './services/select.services';

import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top/scroll-to-top.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserNavbarComponent } from './user-navbar/navbar.component';
import { UserFooterComponent } from './user-footer/user-footer.component';
import { DragDirective } from './drag.directive';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [
    ServicesComponent, 
    PricingComponent, 
    FeaturesComponent, 
    TeamComponent, 
    BlogComponent, 
    ContactComponent, 
    ScrollspyDirective, 
    FooterComponent,
    HeaderComponent,
    DynamicNavbarComponent,
    ScrollToTopComponent,
    SidebarComponent,
    UserNavbarComponent,
    UserFooterComponent,
    DragDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollToModule.forRoot(),
    NgbModalModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  // tslint:disable-next-line: max-line-length
  exports: [ServicesComponent, 
    PricingComponent, 
    FeaturesComponent, 
    TeamComponent, 
    BlogComponent, 
    ContactComponent, 
    ScrollspyDirective, 
    FooterComponent,
    HeaderComponent,
    ScrollToTopComponent,
    SidebarComponent,
    UserNavbarComponent,
    UserFooterComponent,
    DragDirective
  ],
  providers: [SelectService],
  bootstrap: [],
})
export class SharedModule { }
