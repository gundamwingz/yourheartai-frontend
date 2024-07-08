import { inject } from "@angular/core";
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";


export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  const router: Router = inject(Router);
  // const tokenStorage: TokenStorageService = inject(TokenStorageService);

  // if (tokenStorage.isTokenExpired()) {
  //   return router.navigate(['forbidden']);    
  // }
  // else {
  //   const roles = route.data['permittedRoles'] as Array<string>;
  //   const userRole = tokenStorage.getUserToken().role;

  //   if (roles && !roles.includes(userRole)) {
  //     return router.navigate(['login']);
  //   }
  //   else
  //     return true;
  // }

  const roles = route.data['permittedRoles'] as Array<string>;

  if (roles) {
    return router.navigate(['login']);
  }
  else
    return true;

}

export const CanActivate = () => {
  const authService = inject(AuthService)
  const router = inject(Router);
  if(authService.IsAuthenticated()){
    return true
  } else {
    router.navigate(['/Login'])
    return false
  }
}

export const CanActivateChild = () => {
  return CanActivate();
}

// no sure what this "method" is but...
export const resolve = () =>{
  // const courseService = inject(CourseService);
  // return courseService.getAllcourses();
}





