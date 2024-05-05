import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { LoginService } from './login.service';
import { AuthService } from "../../auth/services/auth.service";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    providers: [LoginService]
})

export class LoginComponent {
    showError = false;
    errorMsg = '';
    loginObj = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });
    loader = false;

    constructor(private router: Router, private loginService: LoginService, private authService: AuthService) {
        if (this.router.getCurrentNavigation()?.extras?.state?.['message']) {
            this.displayErrorMessage(this.router.getCurrentNavigation()?.extras?.state?.['message']);
            this.router.navigateByUrl('/login');
        }
    }
    /**
     *   Making API call and getting the token in response. 
     */
    onSubmit() {
        const { username, password } = this.loginObj.value;
        this.loader = true;
        this.loginService.doLogin({ username: username, password: password })
            .subscribe({
                next: (res: any) => {
                    this.loader = false;
                    if (res && res.token) {
                        this.authService.setLogin(res.token);
                        this.router.navigateByUrl('/home');
                    }
                },
                error: (e) => {
                    this.loader = false;
                    if (e?.error?.message) this.displayErrorMessage(e.error.message);
                }
            })
    }
    displayErrorMessage(msg: string) {
        this.showError = true;
        this.errorMsg = msg;
        setTimeout(() => this.showError = false, 4000);
    }
}