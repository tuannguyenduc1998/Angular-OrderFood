import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MustMatch } from 'src/app/shared/helpers/must-match.validator';
import ValidationHelper from 'src/app/shared/helpers/validation.helper';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-change-password-popup',
  templateUrl: './change-password-popup.component.html',
  styleUrls: ['./change-password-popup.component.scss'],
})
export class ChangePasswordPopupComponent implements OnInit {
  @Input() accountId: string;
  changePasswordForm: FormGroup;
  isSubmit: boolean;
  passwordVisible = false;
  invalidMessages: string[] = [];
  formErrors = {
    password: '',
    newPassword: '',
    confirmPassword: '',
    mustMatch: '',
  };
  constructor(
    private formBuilder: FormBuilder,
    private modal: NzModalRef,
    private accountService: AccountService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.changePasswordForm.valueChanges.subscribe((_) => {
      if (this.isSubmit){
        this.validatorForm();
      }
    });
  }

  createForm(): void {
    this.changePasswordForm = this.formBuilder.group(
      {
        password: [null, Validators.required],
        newPassword: [null, Validators.required],
        confirmPassword: [null, Validators.required],
      },
      {
        validator: MustMatch('newPassword', 'confirmPassword'),
      }
    );
  }

  validatorForm(): boolean {
    this.invalidMessages = ValidationHelper.getInvalidMessages(
      this.changePasswordForm,
      this.formErrors
    );
    return this.invalidMessages.length === 0;
  }

  mappingData(form): any {
    return {
      accountId: this.accountId,
      currentPassword: form.password,
      newPassword: form.newPassword,
      confirmNewPassword: form.confirmPassword,
    };
  }

  onSubmit(): void {
    this.isSubmit = true;
    if (this.validatorForm()) {
      this.accountService
        .changePassword(this.mappingData(this.changePasswordForm.value))
        .subscribe((_) => {
            this.modal.destroy({isSuccess: true});
            this.notificationService.success(
              'Thông báo',
              'Thay đổi mật khẩu thành công. Vui lòng đăng nhập lại!',
              {nzPlacement: 'bottomRight'}
            );
        });
    }
  }

  closePopup(): void {
    this.modal.destroy();
  }
}
