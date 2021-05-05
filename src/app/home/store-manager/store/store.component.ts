import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { forkJoin } from 'rxjs';
import ValidationHelper from 'src/app/shared/helpers/validation.helper';
import { AuthenticationModel } from 'src/app/shared/models/auth/authentication.model';
import { StoreModel, StoreSummaryModel } from 'src/app/shared/models/store/store.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { FileService } from 'src/app/shared/services/file.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  storeForm: FormGroup;
  userLogin: AuthenticationModel;
  store: StoreSummaryModel = new StoreSummaryModel();
  invalidMessages: string[] = [];
  formErrors = {
    storeName: '',
    storeOwner: '',
    storeAvatar: '',
    storeAddress: '',
    storeState: ''
  };
  isSubmit: boolean;
  url = environment.API_ENDPOINT_LOCAL;
  constructor(
    private storeService: StoreService,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private fileService: FileService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.userLogin = this.authenticationService.getAuthenticationModel();
    this.storeService.getStoreByUserId(this.userLogin.userId).subscribe(res => {
      if (res)
      {
        this.store = res;
      }
      else{
        this.store = this.mappingStore();
      }
      this.createForm();
    });
  }

  createForm(): void {
      this.storeForm = this.formBuilder.group({
        storeName: [this.store.storeName, Validators.required],
        storeOwner: [this.userLogin.fullName , Validators.required],
        storeAvatar: [this.store.storeAvatar, Validators.required],
        storeAddress: [this.store.storeAddress, Validators.required],
        storeState: [this.store.storeState ? 'Kích hoạt' : 'Chưa đăng kí', Validators.required]
      });
  }

  mappingStore(): StoreSummaryModel{
    return {
      id: '',
      storeName: '',
      storeOwner: this.userLogin.userId,
      storeAvatar: '',
      storeAddress: '',
      storeState: false
    };
  }

  mappingModel(form): any{
    if (this.store.id)
    {
      return {
        storeId: this.store.id,
        storeName: form.storeName,
        storeAvatar: form.storeAvatar,
        storeAddress: form.storeAddress
      };
    }
    else{
      return {
        storeName: form.storeName,
        storeOwner: this.userLogin.userId,
        storeAvatar: form.storeAvatar,
        storeAddress: form.storeAddress
      };
    }
  }

  validateForm(): boolean {
    this.invalidMessages = ValidationHelper.getInvalidMessages(
      this.storeForm,
      this.formErrors
    );
    return this.invalidMessages.length === 0;
  }

  onSubmit(): void{
    if (this.validateForm())
    {
      this.storeService.createOrUpdate(this.mappingModel(this.storeForm.value)).subscribe(res => {
        if (res)
        {
          this.router.navigate([`/home/store-manager/store`]);
        }
      });
    }
  }

  onSelectFile(event): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.fileService.uploadFile(file).subscribe((res) => {
        this.store.storeAvatar = res.data;
      });
    }
  }

  removeImg(): void{
    this.store.storeAvatar = '';
  }
}
