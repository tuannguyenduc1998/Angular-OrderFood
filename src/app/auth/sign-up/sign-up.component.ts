import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/shared/helpers/must-match.validator';
import ValidationHelper from 'src/app/shared/helpers/validation.helper';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  invalidMessages: string[] = [];
  formErrors = {
    userName: '',
    fullName: '',
    email: '',
    password: '',
    verifyPassword: '',
    mustMatch: ''
    };
  isSubmit: boolean;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.signUpForm = this.formBuilder.group({
      userName: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
      verifyPassword: ['', [Validators.required, Validators.minLength(6)]]
    },
    {
      validator: MustMatch('password', 'verifyPassword')
  }
    );
  }

  validateForm(): boolean {
    this.invalidMessages = ValidationHelper.getInvalidMessages(
      this.signUpForm,
      this.formErrors
    );
    return this.invalidMessages.length === 0;
  }

  onSubmit(): void{
    this.isSubmit = true;
    if (this.validateForm()) {
      this.userService.registerUser(this.signUpForm.value).subscribe(res => {
        if (res)
        {
          alert('Đăng ký thành công');
          this.router.navigateByUrl(`/auth/sign-in`);
        }
      },
      err => {alert('Có lỗi xảy ra!'); });
    }
  }
}

