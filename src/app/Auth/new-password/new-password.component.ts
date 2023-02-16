import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService  } from 'src/app/Service/AuthService/auth.service';


@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
    myForm!: FormGroup;
    loading = false;
    submitted = false;
    returnUrl!: string;
    error = '';
    public token = '';
    success!: '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) {
        // redirect to home if already logged in

    }

    ngOnInit() {
        // get token from snapshot

        const token = this.route.snapshot.paramMap.get('{token}');
        this.myForm = this.formBuilder.group({
            token: [this.token],
            password:    ['', Validators.required],
            confirmPassword: ['', Validators.required]
        });


    }

    // convenience getter for easy access to form fields
    get f() { return this.myForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.loading = true;

        // stop here if form is invalid
        if (this.myForm.invalid) {
            return;
        }

        this.loading = true;
        this.authService.resetPassword(this.f.token.value, this.f.password.value, this.f.confirmPassword.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.success = data.message;
                    console.log(this.success);
                    this.loading = false;
                },
                error => {
                    this.error = error;
                    console.log(this.error);
                    this.loading = false;
                });
    }
}
