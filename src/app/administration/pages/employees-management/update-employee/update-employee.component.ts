import { DepartmentService } from '../../../../Service/DepartmentService/department.service';
import { Component, OnInit } from '@angular/core';
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
import { FileService } from 'src/app/Service/FileService/file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { StepperOrientation } from '@angular/cdk/stepper';
import { counties } from '../create-employee/counties';
import { countriesApiData } from '../create-employee/countriesApi';
import { banks } from '../create-employee/banks';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
  countriesData = countriesApiData;
  county: any;
  bank: any;
  branch: any;
  subCountiesHome: any;
  subCountiesCurrent: any;
  selectedFiles: any;
  currentFile: any;
  progress = 0;
  message = '';
  progressInfos = [];
  fileInfos!: Observable<any>;
  genderArray: any = [
    'Male', 'Female'
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
    'Research Doctorate', 'Advanced Intermediate Doctorate', 'First Professional Doctorate', 'Bachelors', 'Associate', 'Diploma', 'Certificate', 'Other'
  ]
  curentEducationLevelArray: any = [
    'Phd', 'Masters', 'Bachelors', 'Diploma', 'Certificate', 'Other'
  ];
  gpaScoreArray: any = [
    'First Class Honours', 'Second Class (Upper division)', 'Second Class (Lower Division)', "Pass", 'Other'
  ]
  experienceTimeTakenArray: any = [
    'At least 6 months ', 'At least 1 Year', 'At least 2 Years', 'At least 3 Years', 'At least 4 Years', 'At least 5 years', 'Over 6 Years'
  ];

  stepperOrientation: Observable<StepperOrientation>;
  ngZone: any;
  router: any;
  currentUserSubject: any;
  error: any;
  employeeData: any;
  employeeEducationData: any;
  employeeWorkExperienceData: any;
  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private _snackBar: MatSnackBar,
    private employeeAPI: EmployeeService,
    private fileService: FileService,
    private departmentAPI: DepartmentService,
    private actRoute: ActivatedRoute,
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    const id = this.actRoute.snapshot.paramMap.get('id');
    this.employeeData = this.employeeAPI.getEmployeeId(id).subscribe();
  }

  ngOnInit(): void {
    this.fileInfos = this.fileService.getFiles();
    this.getDepartment();
    this.getDetailedata();
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
  getDepartment() {
    this.departmentAPI.getDepartments().subscribe(data => {
      this.departmentArray = data;
    });
  }
  // public employeeData: any;
  getDetailedata() {
    const id = this.actRoute.snapshot.paramMap.get('id');
    return this.employeeAPI.getEmployeeId(id).subscribe(data => {
      this.employeeEducationData = data.employeeEducation
      this.employeeWorkExperienceData = data.employeeWorkExperience
      this.firstFormGroup = this._formBuilder.group({
        id: [data.id],
        emp_no: [data.emp_no],
        firstName: [data.firstName],
        middleName: [data.middleName],
        lastName: [data.lastName],
        gender: [data.gender],
        religion: [data.religion],
        nationalId: [data.nationalId, [Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.minLength(4), Validators.maxLength(20)]],
      });
      // Home address form
      this.secondFormGroup = this._formBuilder.group({
        nationality: [data.nationality],
        county: [data.county],
        subCounty: [data.subCounty],
        residentialCountry: [data.residentialCountry],
        residentialCounty: [data.residentialCounty],
        residentialSubCounty: [data.residentialSubCounty],
        postalAddress: [data.postalAddress],
        postalCode: [data.postalCode, [Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.minLength(1), Validators.maxLength(100)]],
        city: [data.city],
      });
      // third form
      this.thirdFormGroup = this._formBuilder.group({
        personalPhone: [data.personalPhone],
        alternativePhone: [data.alternativePhone],
        homeNumber: [data.homeNumber],
        personalEmail: [data.personalEmail],
        workMail: [data.workMail, [Validators.email]],
        alternativeEmail: [data.alternativeEmail, [Validators.email]],
      });
      // education
      this.fourthFormGroup = this._formBuilder.group({
        highestEducation: [data.highestEducation],
        courseProgram: [data.courseProgram],
        enrollmentStatus: [data.enrollmentStatus],
        employeeEducation: this._formBuilder.array([]),
      });
      // Reference form
      this.sixthFormGroup = this._formBuilder.group({
        firstRefName: [data.firstRefName],
        firstRefCompany: [data.firstRefCompany],
        firstRefPhone: [data.firstRefPhone],
        firstRefEmail: [data.firstRefEmail],
        secondRefName: [data.secondRefName],
        secondRefCompany: [data.secondRefCompany],
        secondRefPhone: [data.secondRefPhone],
        secondRefEmail: [data.secondRefEmail]
      });
      // Job Designation
      this.seventhFormGroup = this._formBuilder.group({
        departmentId: [data.departmentId],
        occupation: [data.occupation],
        jobGroup: [data.jobGroup],
      });
      // salary form 
      this.eighthFormGroup = this._formBuilder.group({
        bankName: [data.bankName],
        bankbranchCode: [data.bankbranchCode],
        bankAccount: [data.bankAccount],
        confirmBankAccount: [data.bankAccount],
        kraNo: [data.kraNo],
        nssfNo: [data.nssfNo],
        nhifNo: [data.nhifNo],
        gross_salary: [data.gross_salary],
        total_non_cash_benefit: [data.total_non_cash_benefit],
        value_of_quarters: [data.value_of_quarters],
        owner_occupied_interests: [data.owner_occupied_interests],
        personal_relief: [data.personal_relief],
        insurance_relief: [data.insurance_relief],
        dcrs_actual_e2: [data.dcrs_actual_e2],
      }, { validator: this.checkIfMatchingBankAccount('bankAccount', 'confirmBankAccount') });
      this.educationForm = this._formBuilder.group({
        institutionLevel: [data.institutionLevel],
        institutionName: [data.institutionName],
        awardCertificate: [data.awardCertificate],
        gpaScore: [data.gpaScore],
        enrollOn: [data.enrollOn, [Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(3), Validators.maxLength(5)]],
        graduatedOn: [data.graduatedOn, [Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(3), Validators.maxLength(5)]],
      });
    });
  }
// Basic information form
  firstFormGroup = this._formBuilder.group({
    id: [''],
    emp_no: [''],
    firstName: [''],
    middleName: [''],
    lastName: [''],
    gender: [''],
    religion: [''],
    nationalId: ['', [Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.minLength(4), Validators.maxLength(20)]],
  });
  // Home address form
  secondFormGroup = this._formBuilder.group({
    nationality: [''],
    county: [''],
    subCounty: [''],
    residentialCountry: [''],
    residentialCounty: [''],
    residentialSubCounty: [''],
    postalAddress: [''],
    postalCode: ['', [Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.minLength(1), Validators.maxLength(100)]],
    city: [''],
  });
  // third form
  thirdFormGroup = this._formBuilder.group({
    personalPhone: [''],
    alternativePhone: [''],
    homeNumber: [''],
    personalEmail: [''],
    workMail: ['', [Validators.email]],
    alternativeEmail: ['', [Validators.email]],
  });
  // Education form
  fourthFormGroup = this._formBuilder.group({
    highestEducation: [''],
    courseProgram: [''],
    enrollmentStatus: [''],
    employeeEducation: this._formBuilder.array([]),
  });
  departmentArray: any;
  /*############### Add Dynamic Elements ###############*/
  get employeeEducation() {
    return this.fourthFormGroup.get('employeeEducation') as FormArray;
  }
  educationForm = this._formBuilder.group({
    institutionLevel: [''],
    institutionName: [''],
    awardCertificate: [''],
    gpaScore: [''],
    enrollOn: ['', [Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(3), Validators.maxLength(5)]],
    graduatedOn: ['', [Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(3), Validators.maxLength(5)]],
  });
  addItems() {
    this.employeeEducation.push(this.educationForm);
  }
  // Experience form
  fifthFormGroup = this._formBuilder.group({
    employeeWorkExperience: this._formBuilder.array([]),
  });
  /*############### Add Dynamic Elements ###############*/
  get employeeWorkExperience() {
    return this.fifthFormGroup.get('employeeWorkExperience') as FormArray;
  }
  workExperienceForm = this._formBuilder.group({
    companyName: [''],
    workPosition: [''],
    timeTaken: [''],
  });
  addWork() {
    this.employeeWorkExperience.push(this.workExperienceForm);
  }
  // Reference form
  sixthFormGroup = this._formBuilder.group({
    firstRefName: [''],
    firstRefCompany: [''],
    firstRefPhone: [''],
    firstRefEmail: [''],
    secondRefName: [''],
    secondRefCompany: [''],
    secondRefPhone: [''],
    secondRefEmail: ['']
  });
  // Job Designation
  seventhFormGroup = this._formBuilder.group({
    departmentId: [''],
    occupation: [''],
    jobGroup: [''],
  });
  // salary form
  eighthFormGroup = this._formBuilder.group({
    bankName: [''],
    bankbranchCode: [''],
    bankAccount: [''],
    confirmBankAccount: [''],
    kraNo: [''],
    nssfNo: [''],
    nhifNo: [''],
    gross_salary: [''],
    total_non_cash_benefit: [''],
    value_of_quarters: [''],
    owner_occupied_interests: [''],
    personal_relief: [''],
    insurance_relief: [''],
    dcrs_actual_e2: [''],
  }, { validator: this.checkIfMatchingBankAccount('bankAccount', 'confirmBankAccount') });

  checkIfMatchingBankAccount(bankAccount: string, confirmBankAccount: string) {
    return (group: FormGroup) => {
      let bankInput = group.controls[bankAccount],
        bankAccountConfirmationInput = group.controls[confirmBankAccount];
      if (bankInput.value !== bankAccountConfirmationInput.value) {
        return bankAccountConfirmationInput.setErrors({ notEquivalent: true })
      }
      else {
        return bankAccountConfirmationInput.setErrors(null);
      }
    }
  }
  // ninethFormGroup = this._formBuilder.group({
  //   basicfile: [''],
  // });
  get f() { return this.firstFormGroup.controls; }
  // get form data into a variable
  // form a dictionary
  // append the data

  // submit the dictionary if at all all the fields are

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar() {
    this._snackBar.open('Cannonball!!', 'Splash', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  // this.fourthFormGroup.valid && this.fifthFormGroup.valid &&
  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }
  selectFiles(event: any) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }
  uploadFiles() {
    this.message = '';

    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }
  upload(idx: any, file: any) {
    const formData: FormData = new FormData();
    let UserId = this.f.nationalId.value;
    formData.append('file', file);
    formData.append('UserId', UserId);

    this.fileService.upload(formData).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.fileService.getFiles();
        }
      },
      err => {
        this.message = 'Could not upload the file:' + file.name;
      });
  }
  Submit() {
    const id = this.actRoute.snapshot.paramMap.get('id');
    const result = Object.assign(
      this.firstFormGroup.value,
      this.secondFormGroup.value,
      this.thirdFormGroup.value,
      this.fourthFormGroup.value,
      this.fifthFormGroup.value,
      this.sixthFormGroup.value,
      this.seventhFormGroup.value,
      this.eighthFormGroup.value
    );
    if (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.sixthFormGroup.valid &&
      this.seventhFormGroup.valid &&
      this.eighthFormGroup.valid
    ) {
      // for (let i = 0; i < this.selectedFiles.length; i++) {
      //   this.upload(i, this.selectedFiles[i]);
      // }
      const result = Object.assign(
        this.firstFormGroup.value,
        this.secondFormGroup.value,
        this.thirdFormGroup.value,
        this.fourthFormGroup.value,
        this.fifthFormGroup.value,
        this.sixthFormGroup.value,
        this.seventhFormGroup.value,
        this.eighthFormGroup.value
      );
      console.log('Form Data', result);
      this.employeeAPI.updateEmployee(result)
        .pipe(first())
        .subscribe(
          result => {
            this._snackBar.open('Succesful!', 'X', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['green-snackbar', 'login-snackbar'],
            });
            this.ngZone.run(() => this.router.navigateByUrl('administration/employees/active'));
          },
          (error) => {
            this.error = error;
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
