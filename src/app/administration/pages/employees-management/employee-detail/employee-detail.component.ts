import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DocumentService } from 'src/app/Service/DocumentsService/document.service';
import { EmployeeService } from 'src/app/Service/EmployeeService/employee.service';
import { FileService } from 'src/app/Service/FileService/file.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {

is_Director = false;

  firstName: any;
  middleName: any;
  lastName: any;
  gender: any;
  religion: any;
  nationalId: any;
  nationality: any;
  county: any;
  subCounty: any;
  residentialCountry: any;
  residentialCounty: any;
  residentialSubCounty: any;
  postalAddress: any;
  postalCode: any;
  city: any;
  personalPhone: any;
  alternativePhone: any;
  homeNumber: any;
  personalEmail: any;
  workMail: any;
  alternativeEmail: any;
  highestEducation: any;
  courseProgram: any;
  enrollmentStatus: any;
  institutionLevel: any;
  institutionName: any;
  awardCertificate: any;
  GPA: any;
  enrollOn: any;
  graduatedOn: any;
  companyName: any;
  workPosition: any;
  timeTaken: any;
  firstRefName: any;
  firstRefCompany: any;
  firstRefRelation: any;
  secondRefName: any;
  secondRefCompany: any;
  secondRefRelation: any;
  bankName: any;
  bankAccount: any;
  kraNo: any;
  nssfNo: any;
  nhifNo: any;
  grossPay: any;
  created_at: any;
  updated_at: any;
  dtTrigger: any;
  employeeId: any;
  employeeEducation: any;
  loading: boolean = false;

  title = 'Properties Data Table';
  dtOptions!: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  eduCreatedAt: any;
  eduUpdatedAt: any;
  firstRefPhone: any;
  firstRefEmail: any;
  secondRefPhone: any;
  secondRefEmail: any;
  gpaScore: any;
  user_id: any;
  fileInfos: any;
  employeeWorkExperience: any;
  subscription!: Subscription
  basic_salary: any;
  total_non_cash_benefit: any;
  value_of_quarters: any;
  owner_occupied_interests: any;
  personal_relief: any;
  insurance_relief: any;
  dcrs_actual_e2: any;
  files: any;
  role: any;

  constructor(
    private employeeAPI: EmployeeService,
    private fileService: FileService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private documentsAPI: DocumentService
    ) { }
  ngOnInit(): void {
    this.getData();
    this.getDocuments();
    this.Authorize();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'print', 'pdf',
      ]
    }
  }
  Authorize(){
    let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    this.role = currentUser.roles[0];
    if(this.role == "ROLE_DIRECTOR"){
      this.is_Director = true;
    }
    }
  ngOnDestroy(): void {
    if(this.subscription){
    this.subscription.unsubscribe();
    }else if(this.dtTrigger){
      this.dtTrigger.unsubscribe();
    }
  }
  getData() {
    this.loading = true;
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.subscription = this.employeeAPI.getEmployeeId(id).subscribe(data => {
      console.log(data);
      this.loading = false;
      this.employeeId = data.id;
      this.firstName = data.firstName;
      this.middleName = data.middleName;
      this.lastName = data.lastName;
      this.gender = data.gender;
      this.religion = data.religion;
      this.nationalId = data.nationalId;
      this.nationality = data.nationality;
      this.county = data.county;
      this.subCounty = data.subCounty;
      this.residentialCountry = data.residentialCountry;
      this.residentialCounty = data.residentialCounty
      this.residentialSubCounty = data.residentialSubCounty;
      this.postalAddress = data.postalAddress;
      this.postalCode = data.postalCode;
      this.city = data.city;
      this.personalPhone = data.personalPhone;
      this.alternativePhone = data.alternativePhone;
      this.homeNumber = data.homeNumber;
      this.personalEmail = data.personalEmail;
      this.workMail = data.workMail;
      this.alternativeEmail = data.alternativeEmail;
      this.highestEducation = data.highestEducation;
      this.courseProgram = data.courseProgram;
      this.enrollmentStatus = data.enrollmentStatus;
      this.institutionLevel = data.institutionLevel;
      this.institutionName = data.institutionName;
      this.awardCertificate = data.awardCertificate;
      this.gpaScore = data.gpaScore;
      this.enrollOn = data.enrollOn;
      this.graduatedOn = data.graduatedOn;
      this.companyName = data.companyName;
      this.workPosition = data.workPosition;
      this.timeTaken = data.timeTaken;
      this.firstRefName = data.firstRefName;
      this.firstRefCompany = data.firstRefCompany;
      this.firstRefPhone= data.firstRefPhone;
      this.firstRefEmail= data.firstRefEmail;
      this.secondRefName = data.secondRefCompany;
      this.secondRefCompany = data.secondRefCompany;
      this.secondRefPhone = data.secondRefPhone;
      this.secondRefEmail = data.secondRefEmail;
      this.bankName = data.bankName;
      this.bankAccount = data.bankAccount;
      this.kraNo = data.kraNo;
      this.nssfNo = data.nssfNo;
      this.nhifNo = data.nhifNo;

      this.basic_salary = data.basic_salary;
      this.total_non_cash_benefit = data.total_non_cash_benefit;
      this.value_of_quarters = data.value_of_quarters;
      this.owner_occupied_interests = data.owner_occupied_interests;
      this.personal_relief = data.personal_relief;
      this.insurance_relief = data.insurance_relief;
      this.dcrs_actual_e2 = data.dcrs_actual_e2;

      this.employeeEducation = data.employeeEducation;
      this.employeeWorkExperience = data.employeeWorkExperience;
      this.created_at = data.created_at;
      this.updated_at = data.updated_at;
      this.eduCreatedAt = data.employeeEducation.updated_at;
      this.eduUpdatedAt= data.employeeEducation.updated_at;
    })
  }

  getDocuments(){
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.subscription = this.employeeAPI.getEmployeeId(id).subscribe(data => {
      this.nationalId = data.nationalId;
      this.documentsAPI.getFilesByUserId(this.nationalId).subscribe( res=>{
        this.files = res;
      })
    })
  }
  getEmployeeFile(user_id: any){
  this.fileService.getEmployeeFile(user_id).subscribe(data => {
    let file = new Blob([data], { type: 'application/pdf' });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  });
  }
  onView(id: any){
    this.documentsAPI.getFile(id).subscribe(data => {
      let file = new Blob([data], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }
  // onDownloadFile(user_id: any){
  //   this.id = 1
  //   this.fileService.getFile(this.id).subscribe(data => {
  //     let file = new Blob([data], { type: 'application/pdf' });
  //     var fileURL = URL.createObjectURL(file);
  //     window.open(fileURL);
  //   });
  //   }
}
