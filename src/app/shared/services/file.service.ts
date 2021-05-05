import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class FileService extends BaseService{

  constructor(private httpClient: HttpClient) {
    super(httpClient);
   }

   public uploadFile(file: File): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.post<any>(`/api/files/upload-file`, formData, this.getHeaders());
  }
}
