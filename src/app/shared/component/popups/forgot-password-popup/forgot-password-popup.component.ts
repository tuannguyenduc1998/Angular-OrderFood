import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-forgot-password-popup',
  templateUrl: './forgot-password-popup.component.html',
  styleUrls: ['./forgot-password-popup.component.scss'],
})
export class ForgotPasswordPopupComponent implements OnInit {
  email: string;
  constructor(
    private accountService: AccountService,
    private modal: NzModalRef
  ) {}

  ngOnInit(): void {
    this.email = null;
  }

  onSubmit(): void {
    this.accountService.forgotPassword(this.email).subscribe((res) => {
      if (res) {
        this.modal.destroy({ isSuccess: true });
      }
    });
  }

  closePopup(): void {
    this.modal.destroy();
  }
}
