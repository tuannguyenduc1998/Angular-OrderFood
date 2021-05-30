import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import ValidationHelper from 'src/app/shared/helpers/validation.helper';
import { AuthenticationModel } from 'src/app/shared/models/auth/authentication.model';
import { UserData } from 'src/app/shared/models/user/user-data.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { FileService } from 'src/app/shared/services/file.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-manager-form',
  templateUrl: './profile-manager-form.component.html',
  styleUrls: ['./profile-manager-form.component.scss'],
})
export class ProfileManagerFormComponent implements OnInit {
  userForm: FormGroup;
  userLogin: AuthenticationModel;
  user: UserData = new UserData();
  url = environment.API_ENDPOINT_LOCAL;
  invalidMessages: string[] = [];
  genders: any[] = [];
  formErrors = {
    fullName: '',
    gender: '',
    userName: '',
    phoneNumber: '',
    dateOfBirth: '',
    avatar: ''
  };
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private fileService: FileService,
    private nzNotificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.userLogin = this.authenticationService.getAuthenticationModel();
    this.userService.getUserById(this.userLogin.userId).subscribe((result) => {
      this.user = result;
      this.listGender();
      this.createForm();
    });
  }

  createForm(): void {
    this.userForm = this.formBuilder.group({
      fullName: [this.user.fullName, Validators.required],
      gender: [this.user.gender, Validators.required],
      userName: [this.user.userName, Validators.required],
      phoneNumber: [this.user.phoneNumber, Validators.required],
      dateOfBirth: [this.user.dateOfBirth, Validators.required],
      avatar: [this.user.avatar, Validators.required],
      email: [this.user.email, Validators.required]
    });
  }

  listGender(): void{
    this.genders = [
      {
        id: 0,
        genderName: 'Nam'
      },
      {
        id: 1,
        genderName: 'Nữ'
      },
      {
        id: 2,
        genderName: 'Khác'
      }
    ];
  }

  validateForm(): boolean {
    this.invalidMessages = ValidationHelper.getInvalidMessages(
      this.userForm,
      this.formErrors
    );
    return this.invalidMessages.length === 0;
  }

  mappingData(form): any{
    return {
      userId: this.user.id,
      email: form.email,
      phoneNumber: form.phoneNumber,
      avatar: form.avatar,
      dateOfBirth: form.dateOfBirth,
      fullName: form.fullName,
      gender: form.gender
    };
  }

  onSubmit(): void {
    this.userService.updateProfile(this.userForm.value).subscribe((result) => {
      if (result){
        this.nzNotificationService.success('Thông báo', 'Cập nhật thông tin cá nhân thành công!');
      }
    });
  }

  onSelectFile(event): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.fileService.uploadFile(file).subscribe((res) => {
        this.user.avatar = res.data;
      });
    }
  }

  removeImg(): void {
    this.user.avatar = '';
  }

  compareData(o1, o2): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
}
