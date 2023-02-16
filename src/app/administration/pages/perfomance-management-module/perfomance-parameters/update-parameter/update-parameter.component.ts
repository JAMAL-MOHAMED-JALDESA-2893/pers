import { HttpParams } from "@angular/common/http";
import { Component, OnInit, NgZone } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from "@angular/material/snack-bar";
import { Router, ActivatedRoute } from "@angular/router";
import { ParametersService } from "src/app/Service/Performance/PerfomanceParams/parameters.service";


@Component({
  selector: 'app-update-parameter',
  templateUrl: './update-parameter.component.html',
  styleUrls: ['./update-parameter.component.scss']
})
export class UpdateParameterComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  error = '';
  loading = false;
  params: HttpParams | undefined;
  requestData: any;
  requestParam: any;
  data: any;


  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private actRoute: ActivatedRoute,
    private parameterAPI: ParametersService,
    ) { }


  formData = this.fb.group({
    parameter_name: ['', [Validators.required]],
    measurement_type: ['', [Validators.required]],
    max_target: [],
    ave_target: [],
    min_target: []
  });

  ngOnInit() {
    this.formInit();

  }
  formInit(){
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.parameterAPI.getParameterId(id).subscribe(res =>{
      this.data = res;
      this.formData = this.fb.group({
        parameter_name: [this.data.parameter_name, [Validators.required]],
        measurement_type: [this.data.measurement_type, [Validators.required]],
        max_target: [this.data.max_target * 100],
        ave_target: [this.data.ave_target * 100],
        min_target: [this.data.min_target * 100]
      });

    },err=>{

    })

  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formData.controls[controlName].hasError(errorName);
  };
  get f() { return this.formData.controls; }



  submitData() {
if(this.formData.valid){
  const id = this.actRoute.snapshot.paramMap.get('id');
  this.parameterAPI.updateParameter(id, this.formData.value).subscribe(
    result => {
        this._snackBar.open("Parameter Successfully Created!", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar','login-snackbar'],
        });
        this.ngZone.run(() => this.router.navigateByUrl('administration/employee/perfomance/management/parameters'));
      },
      err=> {
        console.log("hey error", err)
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
