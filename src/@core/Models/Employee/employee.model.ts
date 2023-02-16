import { Timestamp } from 'rxjs';

export class Employee {
  id!: String;

  fullName!: String;

  gender!: String;
  religion!: String;
  nationalId!: String;
  // Home address form

  nationality!: String;
  county!: String;
  subCounty!: String;

  residentialCountry!: String;
  residentialCounty!: String;
  residentialSubCounty!: String;

  postalAddress!: String;
  postalCode!: String;
  city!: String;

  // third form

  personalPhone!: String;
  alternativePhone!: String;
  homeNumber!: String;

  personalEmail!: String;
  workMail!: String;
  alternativeEmail!: String;

  // Education form

  highestEducation!: String;
  courseProgram!: String;
  enrollmentStatus!: String;
  employeeEducation!: Array<string>;

  /*############### Add Dynamic Elements ###############*/

  institutionLevel!: String;
  institutionName!: String;
  awardCertificate!: String;
  gpaScore!: String;
  enrollOn!: String;
  graduatedOn!: String;

  // Experience form

  companyName!: String;
  workPosition!: String;
  timeTaken!: String;

  // Reference form

  firstRefName!: String;
  firstRefCompany!: String;
  firstRefRelation!: String;

  secondRefName!: String;
  secondRefCompany!: String;
  secondRefRelation!: String;

  // salary form

  bankName!: String;
  bankAccount!: String;
  confirmBankAccount!: String;
  kraNo!: String;
  nssfNo!: String;

  nhifNo!: String;

  basic_salary!: String;
  reportingTo!: String;

  created_at!: Date;
  updated_at!: String;
  deleted_at!: String;
  departmentId!: String;


  department!: String;
  occupation!: String;
  jobGroup!: String;
}
