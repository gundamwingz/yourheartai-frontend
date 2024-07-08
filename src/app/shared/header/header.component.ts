import { Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { Route, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { NavigationService } from '../services/nav.service';


@Component({
  selector: 'app-header',
  // standalone: true,
  // imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private router: Router,    
  ) { }
  private navigation = inject(NavigationService)

  isHomeActive: boolean = false;
  user = JSON.parse(localStorage.getItem("user")); 
  isLoggedIn = false;

  items = [];
  unsubscribe$: Subject<boolean> = new Subject<boolean>();
  
  routerUrl: string
  routes: Route[] = [];
  stringPath: Array<string> = [];

  ngOnInit() {
    if (this.user){
      this.isLoggedIn = this.user?.isLoggedIn;
    }    
    console.log("this.isLoggedIn",this.isLoggedIn)
    this.routes = this.getRoutes();
    for ( var route of this.routes) {
      console.log("route.path: ",route.path)
      this.stringPath.push(route.path)
    }
    this.routerUrl = this.router.url
    if (this.routerUrl == "/index" || this.routerUrl== "/" || this.routerUrl== ""){
      this.isHomeActive = true
    } else {
      this.isHomeActive = false
    }   
  }

  private getRoutes(): Route[] {
    return this.navigation.getNavigationRoutes();
  }

  ngOnDestroy() {
    // this.unsubscribe$.next(true);
    // // Unsubscribe from the subject
    // this.unsubscribe$.unsubscribe();  
  }
    /**
   * Window scroll method
   */
  // tslint:disable-next-line: typedef
  windowScroll() {
    const navbar = document.getElementById('navbar');
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
      navbar.style.backgroundColor = '#272a33';
      navbar.style.padding = '10px';
    }
    else {
      navbar.style.backgroundColor = '';
      navbar.style.padding = '20px';
    }
  }

  // onClick(){
  //   this.router.navigateByUrl("/logout")
  // }
  
  currentSection = 'home';
  toggleMenu() {
    document.getElementById('navbarCollapse').classList.toggle('show');
  } 
}

@Component({
  selector: "app-dynamic-navbar",
  template: `
    <nav aria-label="Main navigation" >
      <ul style="background: black">
        @for (route of routes; track $index) {
          <li style="background: black">
            <a routerLink="{{ route.path }}">{{ route.data?.['title'] }}</a>
          </li>
        }
      </ul>
    </nav>`
})
export class DynamicNavbarComponent {
  private navigation = inject(NavigationService);

  routes: Route[] = [];

  ngOnInit(): void {
    this.routes = this.getRoutes();
  }

  private getRoutes(): Route[] {
    return this.navigation.getNavigationRoutes();
  }
}