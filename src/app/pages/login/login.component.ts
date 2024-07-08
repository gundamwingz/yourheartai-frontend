import { Component, OnInit } from '@angular/core';
import { SelectService } from 'src/app/shared/services/select.services';
import { ToastrService } from 'ngx-toastr';

import { 
  // RouteConfig, 
  Router, 
  ActivatedRoute 
} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService,} from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {
  data: Object = {};
  private _router: Router;
  isVisible = false; 

  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    public selectService: SelectService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
    // private alertService: AlertService
  ) { }

  // ngOnInit(): void {
  ngOnInit() {
    this.form = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

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
    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this.authService.login(this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe({
            next: (res) => {
                // get return url from query parameters or default to home page
                this.toastr.success("Login Successful")
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
                this.router.navigateByUrl(returnUrl);

            },
            error: error => {
                // this.alertService.error(error);
                this.loading = false;
                this.toastr.error(error.error.message)
            }
        });
  }
 
  // loginUser(){
  //   var useremail: string = "mkaansah@gmail.com";
  //   var password: string = "hola";
  //   this.selectService.getLoginUser(useremail, password).subscribe((loggedIn: string) => {
  //     console.log(loggedIn)
  //    })   
  // }
}
