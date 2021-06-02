import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MustMatch } from 'src/app/shared/helpers/must-match.validator';
import ValidationHelper from 'src/app/shared/helpers/validation.helper';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  isSubmit: boolean;
  passwordVisible = false;
  invalidMessages: string[] = [];
  token: string;
  formErrors = {
    password: '',
    confirmPassword: '',
    mustMatch: '',
  };
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private notificationService: NzNotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.paramMap.get('token');
    this.createForm();
    this.resetPasswordForm.valueChanges.subscribe((_) => {
      if (this.isSubmit){
        this.validatorForm();
      }
    });
  }

  createForm(): void {
    this.resetPasswordForm = this.formBuilder.group(
      {
        password: [null, Validators.required],
        confirmPassword: [null, Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  validatorForm(): boolean {
    this.invalidMessages = ValidationHelper.getInvalidMessages(
      this.resetPasswordForm,
      this.formErrors
    );
    return this.invalidMessages.length === 0;
  }

  mappingData(form): any {
    return {
      token: this.token,
      password: form.password,
      confirmPassword: form.confirmPassword,
    };
  }

  onSubmit(): void {
    this.isSubmit = true;
    if (this.validatorForm()) {
      this.accountService
        .resetPassword(this.mappingData(this.resetPasswordForm.value))
        .subscribe((_) => {
          this.router.navigate([`/auth/sign-in`]);
          this.notificationService.success(
              'Thông báo',
              'Thay đổi mật khẩu thành công. Vui lòng đăng nhập lại!',
              {nzPlacement: 'bottomRight'}
          );
        });
    }
  }
}
