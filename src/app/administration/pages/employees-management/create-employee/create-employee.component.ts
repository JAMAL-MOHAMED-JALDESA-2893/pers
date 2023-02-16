import { DepartmentService } from '../../../../Service/DepartmentService/department.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { DocumentService } from 'src/app/Service/DocumentsService/document.service';
import { StepperOrientation } from '@angular/cdk/stepper';
import { countriesApiData } from './countriesApi';
import { counties } from './counties';
import { banks } from './banks';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';
  imgBase64Path: any;
  selectedFiles: any;
  selectedDegree: any;
  currentFile: any;
  progress = 0;
  message = '';
  countriesData = countriesApiData;
  county: any;
  bank: any;
  branch: any;
  subCountiesHome: any;
  subCountiesCurrent: any;
  department: any;
  occupation: any;
  progressInfos = [];
  confirmBankAccount: boolean = false;
  fileInfos!: Observable<any>;

  genderArray: any = [
    'Male','Female'
  ];
  religionArray: any = [
    'Christian', 'Islam', 'Irreligion', 'Hindu', 'Other'
  ];
  enrollmentStatusArray: any = [
   'Full-Time', 'Part-Time', 'Graduated', 'Enrolled', 'Differed'
  ];
  jobOccupationArray: any = [
    'Executive Position', 'Lead Position', 'Technical Engineer', 'Technical Assistant', 'Intermediate Position', 'Entry Level', 'Internship Level', 'Attachment Level'
  ];
  educationLevelArray: any = [
    'Research Doctorate', 'Advanced Intermediate Doctorate','First Professional Doctorate','Bachelors', 'Associate','Diploma', 'Certificate', 'Other'
  ]
  curentEducationLevelArray: any = [
    'Phd', 'Masters', 'Bachelors', 'Diploma', 'Certificate', 'Other'
  ];
  gpaScoreArray: any = [
    'First Class Honours', 'Second Class (Upper division)','Second Class (Lower Division)', "Pass" , 'Other'
  ]
  experienceTimeTakenArray: any = [
    'At least 6 months ', 'At least 1 Year', 'At least 2 Years', 'At least 3 Years', 'At least 4 Years', 'At least 5 years', 'Over 6 Years'
  ];

  // Basic information form
  firstFormGroup = this._formBuilder.group({
    emp_no: ['', Validators.required],
    firstName: ['', Validators.required],
    middleName: [''],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    religion: ['', Validators.required],
    nationalId: ['', Validators.required],
    countyDemo: [''],
    subcountyDemo: []
  });
  // Home address form
  secondFormGroup = this._formBuilder.group({
    nationality: ['', Validators.required],
    county: ['', Validators.required],
    subCounty: ['', Validators.required],
    residentialCountry: ['', Validators.required],
    residentialCounty: ['', Validators.required],
    residentialSubCounty: ['',Validators.required],
    postalAddress: ['', Validators.required],
    postalCode: ['', Validators.required],
    city: ['',Validators.required],
  });
  // third form
  thirdFormGroup = this._formBuilder.group({
    personalPhone: ['', Validators.required],
    alternativePhone: [''],
    homeNumber: [''],
    personalEmail: ['', Validators.required],
    workMail: [''],
    alternativeEmail: [''],
  });
  // Education form
  fourthFormGroup = this._formBuilder.group({
    highestEducation: ['', Validators.required],
    courseProgram: ['', Validators.required],
    enrollmentStatus: ['', Validators.required],
    employeeEducation: new FormArray([]),
  });
  departmentArray: any;
  get e() {
    return this.fourthFormGroup.controls;
  }
  
  get m() {
    return this.e.employeeEducation as FormArray;
  }
    onAddField() {
      this.m.push(this._formBuilder.group({
        institutionLevel: [''],
        institutionName: [''],
        awardCertificate: [''],
        gpaScore: [''],
        enrollOn: [''],
        graduatedOn: [''],
        fileAttr: [this.imgBase64Path],
    }));
    }
    onRemoveField(i:any){
      this.m.removeAt(i);
    }
  // Experience form
  fifthFormGroup = this._formBuilder.group({
    employeeWorkExperience: new FormArray([]),
  });
  get ex() {
    return this.fifthFormGroup.controls;
  }
  get exm() {
    return this.ex.employeeWorkExperience as FormArray;
  }
  onAddExperienceField() {
    this.exm.push(this._formBuilder.group({
    companyName: [''],
    workPosition: [''],
    timeTaken: [''],
  }));
  }
  onRemoveExperienceField(i:any){
    this.exm.removeAt(i);
  }
  // Reference form
  sixthFormGroup = this._formBuilder.group({
    firstRefName: [],
    firstRefCompany: [],
    firstRefPhone: [],
    firstRefEmail: [],
    secondRefName: [],
    secondRefCompany: [],
    secondRefPhone: [],
    secondRefEmail: [],
  });
  // Job Designation
  seventhFormGroup = this._formBuilder.group({
    departmentId: ['', Validators.required],
    occupation: ['', Validators.required],
    jobGroup: ['', Validators.required],
  });
  // salary form
  eighthFormGroup = this._formBuilder.group({
    bankName: ['', Validators.required],
    branch_code: ['', Validators.required],
    bankAccount: ['', Validators.required],
    confirmBankAccount: ['', Validators.required],
    kraNo: ['', Validators.required],
    nssfNo: ['', Validators.required],
    nhifNo: ['', Validators.required],
    basic_salary: ['', [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    total_non_cash_benefit: ['0', [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    value_of_quarters: ['0', [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    owner_occupied_interests: ['0', [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    personal_relief: ['2400', [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    insurance_relief: ['0', [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    dcrs_actual_e2: ['0', [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
  },
    {
      validator: this.checkIfMatchingBankAccount('bankAccount', 'confirmBankAccount')
    }
  );
 checkIfMatchingBankAccount(bankAccount: string, confirmBankAccount: string){
    return (group: FormGroup) => {
      let bankInput = group.controls[bankAccount],
          bankAccountConfirmationInput = group.controls[confirmBankAccount];
      if (bankInput.value !== bankAccountConfirmationInput.value) {
        return bankAccountConfirmationInput.setErrors({
          notEquivalent: true
        })
      }
      else {
          return bankAccountConfirmationInput.setErrors(null);
      }
    }
  }
  stepperOrientation: Observable<StepperOrientation>;
  ngZone: any;
  router: any;
  currentUserSubject: any;
  error: any;
  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private _snackBar: MatSnackBar,
    private employeeAPI: EmployeeService,
    private fileService: DocumentService,
    private departmentAPI: DepartmentService,
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }
  ngOnInit(): void {
    this.fetchDepartments();
    this.fetchCounties();
    this.fetchbanks();
  }
  fetchCounties() {
    this.county = counties
  }
  onSelectedHome(event: any) {
    // this.subCounties = this.county.filter(e=> e.sub_counties == event.value)
    this.subCountiesHome = this.county.filter((e: { name: any; }) => e.name == event.value)[0].sub_counties;
  }
  onSelectedCurrent(event: any) {
    this.subCountiesCurrent = this.county.filter((e: { name: any; }) => e.name == event.value)[0].sub_counties;
  }
  
  fetchbanks() {
    this.bank = banks;
  }
  onSelectedBank(event: any) {
    this.branch = this.bank.filter((e: { name: any; }) => e.name == event.value)[0].branches;
    
  }
  fetchDepartments(){
    this.departmentAPI.read().subscribe(res => {
      this.department = res;
    })
  }
  get f() { return this.firstFormGroup.controls; }
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar() {
    this._snackBar.open('Cannonball!!', 'Splash', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  selectFiles(event: any) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }
  selectDegree(event: any) {
    this.progressInfos = [];
    this.selectedDegree = event.target.files;
  }
  uploadDegree(){
    this.upload(this.selectedDegree);
  }
  uploadFiles() {
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(this.selectedFiles[i]);
    }
  }
  get firstF() { return this.firstFormGroup.controls; }

  upload( file: any) {
    const formData: FormData = new FormData();
    // let UserId = this.f.nationalId.value;
    formData.append('files', file);
    formData.append('group_by', 'Onboarding');
    formData.append('user_id', this.firstF.nationalId.value);
    // formData.append('UserId', UserId);
    this.fileService.onUpload(formData).subscribe(
      event => {
        this._snackBar.open('Uploaded Succefully!', 'X', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 1000,
          panelClass: ['green-snackbar', 'login-snackbar'],
        });
      },
      err => {
        this.error = err;
        this._snackBar.open('Failed to upload'+ this.error, 'Try again!', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar', 'login-snackbar'],
        });
      });
  }
  ///Files
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name + ' - ';
      });
      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          this.imgBase64Path = e.target.result;
          //console.log("base 64", this.imgBase64Path);  
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Choose File';
    }
  }

  Submit() {
    if (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.thirdFormGroup.valid &&
      this.sixthFormGroup.valid &&
      this.seventhFormGroup.valid &&
      this.eighthFormGroup.valid
    ) {
      // if(this.selectedFiles.length>0){
      //   for (let i = 0; i < this.selectedFiles.length; i++) {
      //     this.upload(this.selectedFiles[i]);
      //   }
      // }
      // this.uploadDegree();
      const result = Object.assign(
        this.firstFormGroup.value,
        this.secondFormGroup.value,
        this.thirdFormGroup.value,
        this.sixthFormGroup.value,
        this.seventhFormGroup.value,
        this.eighthFormGroup.value
      );
      console.log('Form Data', result); //consoling the formdata
      this.employeeAPI
        .createEmployee(result)
        .pipe(first())
        .subscribe(
          result => {
            this._snackBar.open('Succesful!', 'X', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['green-snackbar', 'login-snackbar'],
            });
           this.ngZone.run(() => this.router.navigateByUrl('administration/unapproved/employees'));
          },
          (error) => {
            this.error = error;
            this._snackBar.open('Failed to upload', 'Try again!', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar', 'login-snackbar'],
            });
          }
        );
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