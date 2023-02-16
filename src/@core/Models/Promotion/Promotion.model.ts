import { Timestamp } from 'rxjs';

export class Promotion {
  id!: String;
  employee_id!: String;
  department_id!: String;
  prev_basic_pay!: String;
  new_basic_pay!: String;
  prev_position!: String;
  new_position!: String;
  reason!: String;
  deleted!: Boolean;
  hrm_approved!: Boolean;
  supervisor_approved!: Boolean;
  director_approved!: Boolean;
  registared_on!: String;
  created_at!: String;
  promoted_at!: String;
  deleted_at!: String;
}

