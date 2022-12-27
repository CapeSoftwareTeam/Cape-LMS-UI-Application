import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fileDiff } from 'ngx-bootstrap-icons';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const FileSaver = require('file-saver');
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  apiurl=environment.apiurl;
 
  constructor(private http:HttpClient) { }

  public fileUploadLms(formData: FormData,fileSize:any,componentName:any): Observable<HttpEvent<number>> {
    return this.http.post<any>( this.apiurl+ '/upload'+ '/'+fileSize+'/'+componentName,formData, {
      responseType: 'text' as 'json' 
    })
  }

  public fileDownload(fileId:any) {
    return this.http.get(this.apiurl + '/downloadFile'+'/'+fileId, { responseType:'blob'}).subscribe(
      data =>{
        const fileName = data.type;
        FileSaver.saveAs(data,fileName);
      }, 
      ()=>{})
  }

  public retriveFile(fileId:any) {
    return this.http.get<any>(this.apiurl + '/retrieveFile'+'/'+fileId, { responseType:'text' as 'json'})
  }
  
  public retriveFileName(componentName:any){
 return this.http.get<any>(this.apiurl+'/retrieveFileName'+'/'+componentName,{responseType:'text' as 'json'})
  }

  public updateFile(formData:FormData,fileId:any,fileSize:any){
    return this.http.put<any>(this.apiurl+'/updateFile'+'/'+fileId+'/'+fileSize,formData,{responseType:'text' as 'json'})
  }
}
