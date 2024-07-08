import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/data/interface/model';
import { FileHandle } from 'src/app/data/interface/file-handle.model';


@Injectable({ providedIn: 'root' })
export class AuthService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>; //user to be shared with rest of the app via session
    private apiUrlYha = environment.apiUrl + '/api/yha';

    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];

    constructor(
        private router: Router,
        private httpClient: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(email: string, password: string) {
        const params = new HttpParams()
        .set('email', email)
        .set('password', password);
        return this.httpClient.post(this.apiUrlYha + '/users/login',{},{ params: params })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes   
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        })); 
    }

    getLogout(){
        this.logout().subscribe({
            next: (res) => {
                const returnUrl = '/logout';
                if (res == "Logged Out"){
                  this.router.navigateByUrl(returnUrl);
                } else if (res == "Not Logged In"){ }
            },
            error: error => {
                // this.alertService.error(error);
                console.log("error?")
            }
        });
    }

    logout() {
        // remove user from local storage and set current user to null  
        var user = JSON.parse(localStorage.getItem("user"));        
        if (user != null){            
            localStorage.removeItem('user');
            this.userSubject.next(null);
            // this.router.navigate(['/logout']);           
            this.isLoggedIn = user.isLoggedIn;  
            console.log("this.isLoggedIn;",this.isLoggedIn)             
        } else {
            this.isLoggedIn = false
        }
        const params = new HttpParams()
        .set('isLoggedIn', this.isLoggedIn)     
        return this.httpClient.get(this.apiUrlYha + '/users/logout',{ params: params })
    }
        
    delete(id: string) {
        return this.httpClient.delete(`${environment.apiUrl}/users/${id}`)
        .pipe(map(x => {
            // auto logout if the logged in user deleted their own record
            if (id == this.userValue?.id) {
                this.logout();
            }
            return x;
        }));
    }

    register(user: User) {
        // trunks_vegta@hotmail.com
        // mkaansah@gmail.com
        // m2e_mic-e@hotmail.com
        // samsonphili12@gmail.com
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        var data: JSON;
        var saveObj: any;
        saveObj = { data: user };
        data = <JSON>saveObj;
        return this.httpClient.post<any>(this.apiUrlYha + '/users/register', data, {headers: headers })
        // return this.httpClient.post(`${environment.apiUrl}users/register`, data);
    }

    getResetRequest(email: string){
        const YHAurl = "http://localhost:4401/";
        const params = new HttpParams()
        .set('email', email)
        .set('YHAurl', YHAurl)
        return this.httpClient.get<any>(this.apiUrlYha + '/reset_request',{ params: params } )
    }
    
    updateUserPassword(user: User, oldPassword: string) {
        var token = this.userValue?.token
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          })
        var data: JSON;
        var saveObj: any;
        saveObj = { data: {"password": user.password, "oldPassword": oldPassword} };
        data = <JSON>saveObj;

        return this.httpClient.post<any>(this.apiUrlYha + '/users/account-password-update', data, {headers: headers });
        // return this.httpClient.post(`${environment.apiUrl}yha/users/account-password-update`, data, {headers: headers });
    }
    
    getUserAccount() {     
        var token = this.userValue?.token;        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          })
        // console.log(headers)        
        return this.httpClient.get<any>(this.apiUrlYha + '/users/account', { headers: headers })
    }

    getFullImageUrl(){
        var imgUrl: string;
        return imgUrl = environment.apiUrl
    }
    
    updateUserAccount(user: User) {
        console.log("activated")
        var token = this.userValue?.token
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          })
        var data: JSON;
        var saveObj: any;
        saveObj = { data: user };
        data = <JSON>saveObj;
        console.log("data: ",data)
        return this.httpClient.post<any>(this.apiUrlYha + '/users/account', data, { headers: headers })
    }
    
    getAll() {
        return this.httpClient.get<User[]>(`${environment.apiUrl}/users`);
    }
    
    getById(id: string) {
        return this.httpClient.get<User>(`${environment.apiUrl}/users/${id}`);
    }
    
    update(id: string, params: any) {
        return this.httpClient.put(`${environment.apiUrl}/users/${id}`, params)
        .pipe(map(x => {
            // update stored user if the logged in user updated their own record
            if (id == this.userValue?.id) {
                // update local storage
                const user = { ...this.userValue, ...params };
                localStorage.setItem('user', JSON.stringify(user));
                
                // publish updated user to subscribers
                this.userSubject.next(user);
            }
            return x;
        }));
    }
    
    IsAuthenticated(){
        return this.isLoggedIn;
    }

    //--------------------------------------------------------------------------------
    // ---------- Image Requests Begin ----------
    //--------------------------------------------------------------------------------
    getUserProfilePic(){   
        var token = this.userValue?.token
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          })
        // alert("this.apiUrlYha: "+this.apiUrlYha)
        return this.httpClient.get<any>(this.apiUrlYha + '/users/account-image', { headers: headers })
    }

    /**
     * Use Similar function to post images for cnn
     */
    postUserProfilePic(userImage: FileHandle) {
        var token = this.userValue?.token
        const headers = new HttpHeaders({            
            'Authorization': `Bearer ${token}`
        })
        // var blobFile = new Blob([userImage.file], {type: 'multipart/form-data'} );
        
        var fileName = userImage.file.name;
        var blobAttrs = {type: 'multipart/form-data'};
        var file = new File([userImage.file], fileName, blobAttrs)

        console.log("file: ",file)
        const formData = new FormData();
        formData.append('file', file, fileName);
        return this.httpClient.post<any>(this.apiUrlYha + '/users/account-image', formData, {headers: headers });
    }
    
    //--------------------------------------------------------------------------------
    // ---------- Image Requests End ----------
    //--------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------
    // ---------- Test Section Begins ----------
    //--------------------------------------------------------------------------------
    getTestAPI(){
        this.testAPI().subscribe({
            next: (res) => {
                const returnUrl = '/logout';
                if (res == "Logged Out"){
                  this.router.navigateByUrl(returnUrl);
                } else if (res == "Not Logged In"){ }
            },
            error: error => {
                // this.alertService.error(error);
                console.log("error?")
            }
        });
    }
    testAPI() {     
        console.log("Test url: ",this.apiUrlYha + '/test-url')
        return this.httpClient.get<any>(this.apiUrlYha + '/test-url', {})
    }

    //--------------------------------------------------------------------------------
    // ---------- Test Section Ends ----------
    //--------------------------------------------------------------------------------
}