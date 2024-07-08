import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SelectService } from 'src/app/shared/services/select.services';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { User } from 'src/app/data/interface/model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
/**
 * Signup component
 */
export class SignupComponent implements OnInit {
  isVisible = false;

  form!: FormGroup;
  loading = false;
  submitted = false;
  accountRoles: Array<string> = ['Patient', 'Medical Staff'];
  newUser: User = new User;

  constructor(
    public selectService: SelectService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
    // private alertService: AlertServic
  ) { }
  
  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        role: ['', Validators.required]
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

  setTheme(theme) {
    document.getElementById('color-opt').setAttribute('href', 'assets/css/colors/' + theme + '.css');
  }

  toggleSwitcher() {
    this.isVisible = !this.isVisible;
  }

  onChangeMode() {
    let theme = localStorage.getItem("theme");
    if (theme == "light" || theme == "") {
      document.body.setAttribute("data-bs-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.removeAttribute("data-bs-theme");
      localStorage.setItem("theme", "light");
    }
  }
  
  onSubmit() { 
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.newUser.id = "";

    this.newUser.username = this.f.username.value;
    this.newUser.firstName = "";
    this.newUser.lastName = "";

    if (this.f.role.value == 'Patient'){
      this.newUser.role = "patient"
    } else if(this.f.role.value == 'Medical Staff'){
      this.newUser.role = "medicalStaff"
    }
    // this.newUser.role = this.f.role.value;
    
    // new default fields to add
    this.newUser.company = "";
    this.newUser.address = "";
    this.newUser.city = "";
    this.newUser.country = "";
    this.newUser.postCode = "";
    this.newUser.aboutMe = "";    
    this.newUser.image = [];    
    // new default fields to add

    this.newUser.email = this.f.email.value;
    this.newUser.password = this.f.password.value;
    this.newUser.isLoggedIn = false;
    this.newUser.token = ""; 
    
    this.loading = true;
    this.authService.register(this.newUser).pipe(first()).subscribe({
            next: (res) => {
                // get return url from query parameters or default to home page
                this.toastr.success(res)
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigateByUrl(returnUrl);

            },
            error: error => {
                // this.alertService.error(error);
                this.loading = false;
                this.toastr.error(error.error)
            }
        });
  }

}
