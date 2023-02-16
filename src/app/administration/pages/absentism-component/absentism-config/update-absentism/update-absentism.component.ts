import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Component, Inject, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AbsentismconfigconfigService } from 'src/app/Service/AbsentismConfig/absentismconfig.service';
import { DepartmentService } from 'src/app/Service/DepartmentService/department.service';
import { TokenStorageService } from 'src/app/Service/token-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-absentism',
  templateUrl: './update-absentism.component.html',
  styleUrls: ['./update-absentism.component.scss']
})
export class UpdateAbsentismComponent implements OnInit, OnDestroy {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  error = '';
  loading = false;
  params: HttpParams | undefined;
  requestData: any;
  requestParam: any;
  results: any;


  constructor(
    private departmentAPI: DepartmentService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private absentismconfigAPI: AbsentismconfigconfigService,
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService
    ) { }

  formData = this.fb.group({
    period: ['', [Validators.required]],
    deduction_rate: ['', [Validators.required]],
  });
  ngOnInit() {
    this.initForm()
  }
  initForm(){
    let id = this.data.id
    this.absentismconfigAPI.getAbsentismconfigId(id).subscribe(res=>{
      this.results = res;
      this.formData = this.fb.group({
        period: [this.results.period],
        deduction_rate: [this.results.deduction_rate],
      });
    },err=>{
    })
  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formData.controls[controlName].hasError(errorName);
  };
  get f() { return this.formData.controls; }

  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }
  submitData() {
if(this.formData.valid){
  
  let id = this.data.id
  this.absentismconfigAPI.updateAbsentismconfig(id, this.formData.value).pipe(first())
  .subscribe(
    result => {
        this._snackBar.open("Updated Successfully!", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar','login-snackbar'],
        });
        this.dialog.closeAll();
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
        });
      },
      err=> {
          this.error = err;
          this._snackBar.open(this.error, "Try again!", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar','login-snackbar'],
          });
      });

    }else{
this._snackBar.open("Invalid Form data", "Try again!", {
  horizontalPosition: this.horizontalPosition,
  verticalPosition: this.verticalPosition,
  duration: 3000,
  panelClass: ['red-snackbar','login-snackbar'],
});
    }
  }
}
