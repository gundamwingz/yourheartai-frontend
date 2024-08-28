import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first, take } from 'rxjs';
import { User, PatientChdData } from 'src/app/data/interface/model';
import { NewUser, NewCHDPatient } from 'src/app/data/user.constant';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SelectService } from 'src/app/shared/services/select.services';
import { FileHandle } from 'src/app/data/interface/file-handle.model';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AIModelService } from 'src/app/shared/services/ai.service';

@Component({
  selector: 'app-ai-mlp',
  templateUrl: './ai-mlp.component.html',
  styleUrl: './ai-mlp.component.css',
})
export class AiMlpComponent {
  form!: FormGroup;
  loading = false;
  submitted = false;
  accountRoles: Array<string> = ['Patient', 'Medical Staff'];
  currentUser: User = structuredClone(NewUser);
  currentPatient: PatientChdData = structuredClone(NewCHDPatient);
  private _ngZone: any; 
  aiPrediction: any;

  constructor(
    public selectService: SelectService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private aiService: AIModelService,
    private toastr: ToastrService,
    private alertService: AlertService,
    private sanitizer: DomSanitizer,
    // @Inject(MAT_DIALOG_DATA) public data: any, //TODO: Find provide for this inject Mat_dialog data
    public dialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        patientId: ['', Validators.required],
        age: ['', Validators.required],
        gender: ['', Validators.required],
        chestPain: ['', Validators.required],
        restingBP: ['', Validators.required],
        serumCholestrol: ['', Validators.required],
        fastingBloodSugar: ['', Validators.required],
        restingRElectro: ['', Validators.required],
        maxHeartRate: ['', Validators.required],
        exerciseAngia: ['', Validators.required],
        oldPeak: ['', Validators.required],
        slope: ['', Validators.required],
        noOfMajorVessels: ['', Validators.required],

        chdRiskFeedback: ['', Validators.required],
        chdRiskPercent: ['', Validators.required],
      },
    );
    // this.getPatientData() //TODO: activate when Patient Db implemented
  }

   // convenience getter for easy access to form fields
   get f() { return this.form.controls; }

  
   getPatientData() {
    // throw new Error('Method not implemented.');
    var patientData: PatientChdData = new PatientChdData;
    
    //TODO: Patient database not implemented currently
    this.authService.getUserAccount().subscribe((data)=>{
      // console.log("userData from subscribe: ",data)
      patientData = data
      this.currentPatient = patientData      
      this.form.controls['patientId'].setValue(patientData.id)
      this.form.controls['age'].setValue(patientData.age)
      this.form.controls['gender'].setValue(patientData.gender)
      this.form.controls['chestPain'].setValue(patientData.chestPain)
      this.form.controls['restingBP'].setValue(patientData.restingBP)
      this.form.controls['serumCholestrol'].setValue(patientData.serumCholestrol)
      this.form.controls['fastingBloodSugar'].setValue(patientData.fastingBloodSugar)
      this.form.controls['restingRElectro'].setValue(patientData.restingRElectro)
      this.form.controls['maxHeartRate'].setValue(patientData.maxHeartRate)
      this.form.controls['exerciseAngia'].setValue(patientData.exerciseAngia)
      this.form.controls['oldPeak'].setValue(patientData.oldPeak)
      this.form.controls['slope'].setValue(patientData.slope)
      this.form.controls['noOfMajorVessels'].setValue(patientData.noOfMajorVessels)
    });
    
  }

  onSubmit() { 
    // alert("Form is Working!")
    // this.matchcheck()
    this.submitted = true;
    // if (this.form.invalid) {
    //   return;
    // }
    this.currentPatient.age = this.f.age.value;
    this.currentPatient.gender = this.f.gender.value;
    this.currentPatient.chestPain = this.f.chestPain.value;
    this.currentPatient.restingBP  = this.f.restingBP.value;
    this.currentPatient.serumCholestrol  = this.f.serumCholestrol.value;
    this.currentPatient.fastingBloodSugar  = this.f.fastingBloodSugar.value;
    this.currentPatient.restingRElectro  = this.f.restingRElectro.value;
    this.currentPatient.maxHeartRate  = this.f.maxHeartRate.value;
    this.currentPatient.exerciseAngia  = this.f.exerciseAngia.value;
    this.currentPatient.oldPeak  = this.f.oldPeak.value;
    this.currentPatient.slope  = this.f.slope.value;
    this.currentPatient.noOfMajorVessels  = this.f.noOfMajorVessels.value;

    this.currentUser.isLoggedIn = this.authService.IsAuthenticated();
    this.currentUser.id = ""
    this.currentUser.token = ""
    // this.currentPatient.token = this.f.email.value;

    this.loading = true;
    console.log("this.currentPatient: ",this.currentPatient)
    this.aiService.getCHDPrediction(this.currentPatient).pipe(first()).subscribe({      
        next: (res) => {
          this.toastr.success(res.message)
          this.aiPrediction = res
          console.log("this.aiPrediction: ",this.aiPrediction.chd_probability)
          console.log("this.aiPrediction: ",this.aiPrediction.risk_Category)


          //Compute Risk Percentage - 
          var riskPercent = Math.round((this.aiPrediction.chd_probability*100)*10)/ 10 //round to 1.d.p
          this.form.controls['chdRiskPercent'].setValue(riskPercent+"%")
          this.form.controls['chdRiskFeedback'].setValue(this.aiPrediction.risk_Category)
          // this.form.reset();
          // this.getPatientData();
        },
        error: error => {
          this.loading = false;
          this.toastr.error(error.error)
        }
    });
  }
  matchcheck() {
    throw new Error('Method not implemented.');
  }



}
