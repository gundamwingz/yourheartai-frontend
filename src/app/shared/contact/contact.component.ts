import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

/**
 * Contact-component
 */
export class ContactComponent implements OnInit {
  // Form
  itemData!: UntypedFormGroup;
  submitted = false;

  constructor(public formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    // Validation
    this.itemData = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      accountType: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      comments: ['', [Validators.required]],
    })
  }

  ValidateFrom() {
    var name = this.itemData.get("name")!.value;
    var email = this.itemData.get("email")!.value;
    var subject = this.itemData.get("subject")!.value;
    var comments = this.itemData.get("comments")!.value;
    var accountType = this.itemData.get("accountType")!.value;

    if (name == "" || name == null) {
      document.getElementById('error-msg')!.innerHTML = "<div class='alert alert-warning error_message'><i data-feather='home' class='icon-sm align-middle me-2'></i>*Please enter a name*</div>";
      return false;
    }
    if (email == "" || email == null) {
      document.getElementById('error-msg')!.innerHTML = "<div class='alert alert-warning error_message'><i data-feather='home' class='icon-sm align-middle me-2'></i>*Please enter a email*</div>";
      return false;
    }
    if (subject == "" || subject == null) {
      document.getElementById('error-msg')!.innerHTML = "<div class='alert alert-warning error_message'><i data-feather='home' class='icon-sm align-middle me-2'></i>*Please enter a subject*</div>";
      return false;
    }
    if (comments == "" || comments == null) {
      document.getElementById('error-msg')!.innerHTML = "<div class='alert alert-warning error_message'><i data-feather='home' class='icon-sm align-middle me-2'></i>*Please enter a comments*</div>";
      return false;
    }
    return true
  }

  sendMsg() {
    if (this.ValidateFrom()) {
      document.getElementById('error-msg')!.innerHTML =""
    }
  }
}
