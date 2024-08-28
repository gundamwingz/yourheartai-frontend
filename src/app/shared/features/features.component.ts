import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
/**
 * Features component
 */
export class FeaturesComponent implements OnInit {
  isHomeActive: boolean = false;
  user = JSON.parse(localStorage.getItem("user")); 
  isLoggedIn = false;

  constructor() { }

  ngOnInit() {
    if (this.user){
      this.isLoggedIn = this.user?.isLoggedIn;
    }
  }
}
