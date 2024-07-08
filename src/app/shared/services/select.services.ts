import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, catchError, fromEvent, map, startWith, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { v4 as uuid } from 'uuid';


// import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable()
export class SelectService {
  @Output() revisionChange = new EventEmitter();
  private apiUrlYha = environment.apiUrl + 'yha';
  constructor(
    private httpClient: HttpClient,
    // private authService: AuthService,
  ) 
  {
    // this.userEmail = this.authService.idToken.claims.email;
    // this.userName = this.authService.idToken.claims.name;
  }
  prodEnv = environment.production;
  innerWidth$ = fromEvent(window, 'resize').pipe(
    startWith(0),
    map(() => window.innerWidth),
  );

  getLoginUser(email: string, password: string) {
    const params = new HttpParams()
    .set('email', email)
    .set('password', password);
    // console.log("this.apiUrlYha + '/login':",this.apiUrlYha + '/login')
    // return this.httpClient.get(this.apiUrlYha + '/login',{ params: params });
    return this.httpClient.post(this.apiUrlYha + '/login',{},{ params: params }); // sent empty body to get posting working

  }


  



}
