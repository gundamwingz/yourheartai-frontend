import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Observable } from 'rxjs';
import { User } from './data/interface/model';
import { Index1Component } from './pages/index1/index1.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'yourheartai';
  session$: Observable<User | null>;

  constructor(private loginService: AuthService) {    
    this.session$ = loginService.user;
  }

  isShow=true;
  showHide(event){
    if(event instanceof Index1Component) {
      this.isShow=false
    }else{ 
      this.isShow=true
    };
 } 
  routerOutletComponent: object;
  routerOutletComponentClass: string;

  onActivate(event: any): void {
    console.log("triggered:")
    this.routerOutletComponent = event;
    this.routerOutletComponentClass = event.constructor.name;
    console.log("Activated: ", this.routerOutletComponentClass);
  }

}



