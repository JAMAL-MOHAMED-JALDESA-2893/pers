import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';

@Component({
  selector: 'app-update-education',
  templateUrl: './update-education.component.html',
  styleUrls: ['./update-education.component.scss']
})
export class UpdateEducationComponent implements OnInit {
  educationData: any;

  constructor(
    private _formBuilder: FormBuilder,
    private employeeAPI: EmployeeService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
  ) { }


  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ngOnInit(): void {
    this.getEducation();
  }
  getEducation(){
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.employeeAPI.getEmployeeEducationId(id).subscribe( data => {
      this.educationData = data;
      console.log("hey res data")
      console.log("hey res data", this.educationData)
      this.educationForm = this._formBuilder.group({
        id: [this.educationData.id],
        institutionLevel: [this.educationData.institutionLevel, Validators.required],
        institutionName: [this.educationData.institutionName, Validators.required],
        awardCertificate: [this.educationData.awardCertificate, Validators.required],
        gpaScore: [this.educationData.GPA, Validators.required],
        enrollOn: [this.educationData.enrollOn, [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/),Validators.minLength(3),Validators.maxLength(5)]],
        graduatedOn: [this.educationData.graduatedOn, [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(3),Validators.maxLength(5)]],
      });
    })
  }
  educationForm = this._formBuilder.group({
    id: [''],
    institutionLevel: ['', Validators.required],
    institutionName: ['', Validators.required],
    awardCertificate: ['', Validators.required],
    gpaScore: ['', Validators.required],
    enrollOn: ['', [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/),Validators.minLength(3),Validators.maxLength(5)]],
    graduatedOn: ['', [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(3),Validators.maxLength(5)]],
  });

  onSubmit(){
    if(this.educationForm.valid){
      const id = this.actRoute.snapshot.paramMap.get('id');
      console.log("hey submit", this.educationForm.value)
        this.employeeAPI.updateEmployeeEducationId(id, this.educationForm.value).pipe(first())
      .subscribe( result =>{
        this._snackBar.open('Organization Updated Succefully!', 'X', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar', 'login-snackbar'],
        });
    this.ngZone.run(() => this.router.navigateByUrl('administration/employees/active'));
      });

    } else {
    this._snackBar.open('Invalid Form data', 'Try again!', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: ['red-snackbar', 'login-snackbar'],
    });
  }

  }

}
