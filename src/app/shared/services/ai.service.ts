import { EventEmitter, Injectable, Output } from '@angular/core';
import { catchError, fromEvent, startWith, throwError, BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/data/interface/model';
import { FileHandle } from 'src/app/data/interface/file-handle.model';
import { v4 as uuid } from 'uuid';
import { AuthService } from './auth.service';


@Injectable({ providedIn: 'root' })
export class AIModelService  {  
  private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>; //user to be shared with rest of the app via session
    private apiUrlYha = environment.apiUrl + '/api/yha';

    // isLoggedIn = false;
    // isLoginFailed = false;
    // errorMessage = '';
    // roles: string[] = [];

    constructor(
        private router: Router,
        private httpClient: HttpClient,
        private authService: AuthService,
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    // public get userValue() {
    //     return this.userSubject.value;
    // }




    postStenosisCNNImage(userImage: FileHandle) {
      var token = this.authService.userValue?.token
      const headers = new HttpHeaders({            
          'Authorization': `Bearer ${token}`
      })
      
      var fileName = userImage.file.name;
      var blobAttrs = {type: 'multipart/form-data'};
      var file = new File([userImage.file], fileName, blobAttrs)

      console.log("file: ",file)

      const formData = new FormData();
      formData.append('file', file, fileName);
      return this.httpClient.post<any>(this.apiUrlYha + '/ai-prediction/cvd-mrcnn', formData, {headers: headers });
  }
    postCancerCNNImage(userImage: FileHandle) {
      var token = this.authService.userValue?.token
      const headers = new HttpHeaders({            
          'Authorization': `Bearer ${token}`
      })
      
      var fileName = userImage.file.name;
      var blobAttrs = {type: 'multipart/form-data'};
      var file = new File([userImage.file], fileName, blobAttrs)

      console.log("file: ",file)

      const formData = new FormData();
      formData.append('file', file, fileName);
      return this.httpClient.post<any>(this.apiUrlYha + '/prediction/cancer', formData, {headers: headers });
  }


}
    
