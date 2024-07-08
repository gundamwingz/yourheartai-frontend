import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
/**
 * Footer component
 */
export class FooterComponent implements OnInit {

  isVisible = false;
  cur_year = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Onclick color change
   * @param theme theme color
   */
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
}
