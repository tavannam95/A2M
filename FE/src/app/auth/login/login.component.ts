import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../shared/service/auth/auth.service';
import {Router} from '@angular/router';
import {StorageService} from '../../shared/service/storage.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    hide: boolean = true;

    formGroup = this.fb.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]
    })

    constructor(private readonly fb: FormBuilder,
                private readonly authService: AuthService,
                private readonly storageService: StorageService,
                private readonly toastService: ToastrService,
                private readonly router: Router) {
    }

    ngOnInit(): void {
        if (this.storageService.isLoggedIn()) {
            void this.router.navigate(['/dashboard']);
            return;
        }
    }

    onLogin() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.invalid) {
            return;
        }

        this.authService.login(this.formGroup.getRawValue().email, this.formGroup.getRawValue().password)
            .subscribe({
                next: (res) => {
                    this.storageService.saveUserToken(res);
                    if(this.storageService.getRoleFromToken() === 'ROLE_ADMIN'){
                        this.router.navigate(['/selling'])
                    }else{
                        this.router.navigate(['/dashboard'])
                            .then(() => this.authService.reloadPage())
                    }
                },
                error: (err) => {
                    if (err.error.code == 'LOGIN_INVALID') {
                        this.toastService.error(err.error.message);
                        return;
                    }
                    this.toastService.error('Đăng nhập thất bại !');
                }
            })
    }
}
