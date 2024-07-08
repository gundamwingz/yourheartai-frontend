import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recoverpwd',
  templateUrl: './recoverpwd.component.html',
  styleUrls: ['./recoverpwd.component.css']
})
/**
 * Recoverpwd component
 */
export class RecoverpwdComponent implements OnInit {
  emailControl = new FormControl<string>('');
  
  isVisible = false;
  
  constructor(private authService: AuthService,private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  setTheme(theme) {
    document.getElementById('color-opt').setAttribute('href', 'assets/css/colors/' + theme + '.css');
  }

  ResetRequest(){
    this.emailControl.value
    this.authService.getResetRequest(this.emailControl.value).subscribe({
      next: (res) => {
          // const returnUrl = '/';
          // this.router.navigateByUrl(returnUrl);
          this.toastr.success(res)
          console.log("error?")
      },
      error: error => {
          // this.alertService.error(error);
          console.log("error?")
          this.toastr.error(error.error)
      }
  });

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

}
