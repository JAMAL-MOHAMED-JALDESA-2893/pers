import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';

@Component({
  selector: 'app-update-experience',
  templateUrl: './update-experience.component.html',
  styleUrls: ['./update-experience.component.scss']
})
export class UpdateExperienceComponent implements OnInit {
 educationData: any;
  experienceData: any;

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
    this.getExperience();
  }
  getExperience(){
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.employeeAPI.getEmployeeExperienceId(id).subscribe( data => {
      this.experienceData = data;
      this.workExperienceForm = this._formBuilder.group({
        id: [this.experienceData.id],
        companyName: [this.experienceData.companyName, Validators.required],
        workPosition: [this.experienceData.workPosition, Validators.required],
        timeTaken: [this.experienceData.timeTaken, [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/),Validators.minLength(1),Validators.maxLength(2)]],
      });
    })
  }

  workExperienceForm = this._formBuilder.group({
    id: [''],
    companyName: ['', Validators.required],
    workPosition: ['', Validators.required],
    timeTaken: ['', [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/),Validators.minLength(1),Validators.maxLength(2)]],
  });

  onSubmit(){
    if(this.workExperienceForm.valid){
      const id = this.actRoute.snapshot.paramMap.get('id');
      console.log("hey submit", this.workExperienceForm.value)
        this.employeeAPI.updateEmployeeExperienceId(id, this.workExperienceForm.value).pipe(first())
      .subscribe( result =>{
        this._snackBar.open('Experience Updated Succefully!', 'X', {
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
