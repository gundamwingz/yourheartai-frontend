import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first, take } from 'rxjs';
import { User } from 'src/app/data/interface/model';
import { NewUser } from 'src/app/data/user.constant';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SelectService } from 'src/app/shared/services/select.services';
import { FileHandle } from 'src/app/data/interface/file-handle.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  changePasswordActive: boolean;
  accountRoles: Array<string> = ['Patient', 'Medical Staff'];
  currentUser: User = structuredClone(NewUser);
  imgUrl: string;
  image_file: string;
  private _ngZone: any;
  
cc
  constructor(
    public selectService: SelectService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private alertService: AlertService,
    private sanitizer: DomSanitizer,
    // @Inject(MAT_DIALOG_DATA) public data: any, //TODO: Find provide for this inject Mat_dialog data
    public dialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit() {
    this.changePasswordActive = false;
    this.form = this.formBuilder.group(
      {
        username: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        role: ['', Validators.required],
        company: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        postCode: ['', Validators.required],
        aboutMe: ['', Validators.required],    
        email: ['', Validators.required],
      },
    );
    this.getUserAccount()    
    // console.log(this.image_file)
    this.getUserProfilePic()
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  getUserAccount (){
    var accountData: User = new User;
    this.authService.getUserAccount().subscribe((data)=>{
      // console.log("userData from subscribe: ",data)
      accountData = data
      this.currentUser = accountData      
      this.form.controls['username'].setValue(accountData.username)
      this.form.controls['firstName'].setValue(accountData.firstName)
      this.form.controls['lastName'].setValue(accountData.lastName)
      this.form.controls['role'].setValue(accountData.role)
      this.form.controls['company'].setValue(accountData.company)
      this.form.controls['address'].setValue(accountData.address)
      this.form.controls['city'].setValue(accountData.city)
      this.form.controls['country'].setValue(accountData.country)
      this.form.controls['postCode'].setValue(accountData.postCode)
      this.form.controls['aboutMe'].setValue(accountData.aboutMe)
      this.form.controls['email'].setValue(accountData.email)
    });
    
    return accountData
  }
  matchcheck(){
    // TODO: add a check to see if fields have changed.
  }

  onChange(){
    if (this.changePasswordActive){
      this.changePasswordActive = false
    } else {
      this.changePasswordActive =  true;
    }
  }

  changePasswordCheck(check: boolean) {  
    this.changePasswordActive = check;
  }


  onSubmit() { 
    this.matchcheck()
    this.submitted = true;
    // if (this.form.invalid) {
    //   return;
    // }
    this.currentUser.username = this.f.username.value;
    this.currentUser.firstName = this.f.firstName.value;
    this.currentUser.lastName = this.f.lastName.value;
    this.currentUser.role = this.f.role.value;
    this.currentUser.company = this.f.company.value;
    this.currentUser.address = this.f.address.value;
    this.currentUser.city = this.f.city.value;
    this.currentUser.country = this.f.country.value;
    this.currentUser.postCode = this.f.postCode.value;
    this.currentUser.aboutMe = this.f.aboutMe.value;    
    this.currentUser.email = this.f.email.value;    
    this.currentUser.password = "";
    this.currentUser.isLoggedIn = this.authService.IsAuthenticated();
    this.currentUser.id = ""
    this.currentUser.token = ""
    // this.currentUser.token = this.f.email.value;

    this.loading = true;
    console.log("this.currentUser: ",this.currentUser)
    this.authService.updateUserAccount(this.currentUser).pipe(first()).subscribe({      
        next: (res) => {
          this.toastr.success(res)
          this.form.reset();
          this.getUserAccount();
        },
        error: error => {
          this.loading = false;
          this.toastr.error(error.error)
        }
    });
  }

  //TODO: Allows users to upload multiple files, changet to only 1.
  // updateProfilePic(){
  //   const file: FileHandle = this.currentUser.image[0];
  //   this.authService.postUserProfilePic(file).pipe(first()).subscribe({      
  //     next: (res) => {
  //       this.toastr.success("Profile Pic Updated.")
  //       this.form.reset();
  //       this.getUserAccount();
  //       this.getUserProfilePic()
  //     },
  //     error: error => {
  //       this.loading = false;
  //       this.toastr.error(error.error.message)
  //     }
  //   });
  //   this.currentUser.image = [];
  // }

  //TODO: Switch to dialog window.
  updateProfilePic(){
      const dialogRef = this.dialog.open(UpdateProfilePicComponent, {
        data: this.currentUser,
        disableClose: true,
        autoFocus: false,
        viewContainerRef: this.viewContainerRef,
        // maxHeight: 'calc(100vh - 20px)', //control height of dialogue window
        // height: 'auto',
        maxHeight: 'calc(100vh - 20px)',
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        
      });
  }

  submitProfilePic(){
    const file: FileHandle = this.currentUser.image[0];
    this.authService.postUserProfilePic(file).pipe(first()).subscribe({      
      next: (res) => {
        this.toastr.success("Profile Pic Updated.")
        this.form.reset();
        this.getUserAccount();
        this.getUserProfilePic()
      },
      error: error => {
        this.loading = false;
        this.toastr.error(error.error.message)
      }
    });
    this.currentUser.image = [];
  }

  getUserProfilePic(){
    this.authService.getUserProfilePic().pipe(first()).subscribe({      
      next: (res) => {        
        this.image_file = this.authService.getFullBaseUrl()+res.image_url;
        console.log("res: ",res)    
      },
      error: error => {
        this.loading = false;
        this.toastr.error(error.error.message)
      }
    });
   return 
  }

  onFileSelected(event){
    if(event.target.files){
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.currentUser.image.push(fileHandle)
    }
  }

  removeImages(i: number) {
    this.currentUser.image.splice(i, 1)
  }

  fileDropped(fileHandle: FileHandle) {
    this.currentUser.image.push(fileHandle)
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

}


import { Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: "app-change-password",
  template: `
            <div class="card">
              <div class="card-header card-header-danger">
                  <h4 class="card-title">Edit Password</h4>
                  <p class="card-category">Update Password</p>
              </div>
              <div class="card-body">
                <form [formGroup]="form" (ngSubmit)="onSubmit()">

                  <div class="mb-3">
                      <label class="form-label">Previous Password</label>
                      <input type="password" formControlName="oldPassword" class="form-control" placeholder="Enter previous password" [ngClass]="{ 'is-invalid': submitted && f.oldPassword.errors }" />
                      <div *ngIf="submitted && f.oldPassword.errors" class="invalid-feedback">
                          <div *ngIf="f.oldPassword.errors.required">Password is required</div>
                      </div>
                    </div>

                  <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" formControlName="password" class="form-control" placeholder="Enter password" [ngClass]="{ 'is-invalid': submitted && f.password.errors }" />
                    <div *ngIf="submitted && f.password.errors" class="invalid-feedback">
                        <div *ngIf="f.password.errors.required">Password is required</div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Confirm Password</label>
                    <input type="password" formControlName="confirmPassword" class="form-control" placeholder="Enter password" [ngClass]="{ 'is-invalid': submitted && f.confirmPassword.errors }" />
                    <div *ngIf="submitted && f.confirmPassword.errors" class="invalid-feedback">
                        <div *ngIf="f.confirmPassword.errors.required">Confirmed Password is required</div>
                    </div>
                  </div>
                  <div *ngIf="form?.errors?.['mismatch'] && form?.touched">                      
                    <div class="invalid-feedback d-block">
                      ***Password must match***
                    </div>
                  </div>
                
                  <button mat-raised-button type="submit" class="btn btn-danger pull-right">Update Password</button>
                </form>
              </div>
            </div>
            `
})
export class ChangePasswordComponent {
  @Output() documentID = new EventEmitter<boolean>();
  form!: FormGroup;
  submitted: boolean = false;
  newUser: User = new User;
  loading = false;
  changePasswordActive: boolean = true;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    this.authService.getUserAccount()
    this.form = this.formBuilder.group(
      {
        oldPassword: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],        
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(control: AbstractControl){
    var matcher: any = control.get('password')?.value === control.get('confirmPassword')?.value?null:{ mismatch: true };
    return matcher
  };
  
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() { 
    var oldPassword: string = "";
    this.submitted = true;
    
    if (this.form.invalid) {
      return;
    }
    
    this.newUser.password = this.f.password.value;
    oldPassword = this.f.oldPassword.value;
    this.loading = true;
    this.authService.updateUserPassword(this.newUser, oldPassword).pipe(first()).subscribe({
      next: (res: any) => {
          // get return url from query parameters or default to home page
          this.toastr.success(res)
          // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
          // this.router.navigateByUrl(returnUrl);
          this.form.reset();
          this.changePasswordCheck()
          

      },
      error: error => {
          // this.alertService.error(error);
          this.loading = false;
          this.toastr.error(error.error.message)
      }
  });
  }

  changePasswordCheck() { 
    this.changePasswordActive = false;
    this.documentID.emit(this.changePasswordActive);
  }
}

// TODO: Switch this update profile image to dialoge instead
@Component({
  template: ` 
    <mat-dialog-content style="display: flex; text-align: center; margin: auto; width: 450px; height 600px;">
      <mat-dialog-actions align="end">
      <div class="dropzone" appDrag (files)="fileDropped($event)">
        <div class="text-wrapper">
          <div class="centered">
            <mat-icon class="mat-icon">cloud_upload</mat-icon>
            <div>
              Drag & Drop to Upload File
            </div>
            or 
            <a href="javascript:void(0)" (click)="selectFile.click()" class="browse-button">browse</a>
          </div>
        </div>
      </div>
      
      <input 
      type="file" 
      style="display: none;"
      multiple 
      value="select" 
      #selectFile 
      class="file-upload mt-3"
      accept="image/png, image/jpeg"
      name='picture'
      (change)="onFileSelected($event)">

      <div class="mt-5">
        <div class="row">
          <mat-grid-list cols="4" rowHeight="1:1">
            <mat-grid-tile *ngFor="let file of this.currentUser.image; let i = index">
              <div style="position: relative;">
                <span class="btn-remove-image" (click)="removeImages(i)">x</span>
                <img [src]="file.url" width="60px" height="60px">
              </div>
            </mat-grid-tile>
          </mat-grid-list>
        </div>
      </div>
      <div>
        <button mat-button mat-dialog-close [mat-dialog-close]="false">Done</button>
      </div>
      </mat-dialog-actions>
    </mat-dialog-content>
    `,
    styleUrls: ['./user-profile.component.css']
})
export class UpdateProfilePicComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: User,private sanitizer: DomSanitizer,) {}
  currentUser = this.data;


  onFileSelected(event){
    if(event.target.files){
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.currentUser.image.push(fileHandle)
    }
  }

  removeImages(i: number) {
    this.currentUser.image.splice(i, 1)
  }

  fileDropped(fileHandle: FileHandle) {
    this.currentUser.image.push(fileHandle)
  }
}


