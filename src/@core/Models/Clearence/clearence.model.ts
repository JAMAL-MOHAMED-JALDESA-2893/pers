export class Clearence {
  id!: String;
  employee_id!: String;
  department_id!: String;
  reason!: String;
  supervisor_approved!: String;
  hr_approved!: String;
  director_approved!: String;
  clearence_status!: String;
  rejection_reason!: String;
  exit_date!: Date;
  //*****************Timestamps *********************
  created_at!: Date;
  updated_at!: Date;
  deleted_at!: Date;
}
