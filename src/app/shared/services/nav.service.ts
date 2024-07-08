
import { Injectable, inject } from '@angular/core';
import { Route, Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class NavigationService {
  private router = inject(Router);
  
  getNavigationRoutes(): Route[] { 
    var allRoutes = this.router.config     
    .flatMap((route) => [route, ...(route.children || [])])
    .filter((route) => route.data?.["include"]);

    var allChildRoutes: Array<Route> = []  
    for (let i = 0; i < allRoutes.length; i++) {
      var chile: Route = allRoutes[i]?.['_loadedRoutes']
      if (chile){
        allChildRoutes = this.getAllChildRoutes(chile)
      }      
    } 
    for (let i = 0; i < allChildRoutes.length; i++) {
      allRoutes.push(allChildRoutes[i])
    }

    const filteredRoutes = allRoutes.filter(element => {
      if (element.data?.["showInHomeNav"] == true){
        return element
      }
    })
    console.log("filteredRoutes:",filteredRoutes)
    return filteredRoutes
  }
  
  // TODO: Need to update this function to allow viewing deeper child routes
  getAllChildRoutes(childs): Route[] {  
    var finalChileRoutes: Array<Route> = []
    for (let i = 0; i < childs.length; i++) {
      //FIXME: Need to complete this code for deeper levelled childrenfor getting child routes
      var childRoutes: Route = childs[i]?.['_loadedRoutes'] 
      var showInNavRoute = childs[i].data?.["showInHomeNav"]
      if (showInNavRoute == true){
        finalChileRoutes.push(childs[i])
      }      
    }  
    console.log("finalChileRoutes:",finalChileRoutes)
    return finalChileRoutes
  }
}