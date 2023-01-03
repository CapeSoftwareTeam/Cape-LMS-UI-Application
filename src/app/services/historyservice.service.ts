
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { download } from 'ngx-bootstrap-icons';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const FileSaver = require('file-saver');
@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  
  apiurl=environment.apiurl_history;
  constructor(private http: HttpClient) { }

  getHistory():Observable<any> {
    return this.http.get<any>(this.apiurl+'/getHistory',{responseType: 'text' as 'json'});
  }

  deleteHistory(historyId:any):Observable<any>{
    return this.http.delete<any>(this.apiurl+'/history3'+'/' + historyId, {responseType: 'text' as 'json'});

  }
  getHistory1(empid:any):Observable<any>{
    return this.http.get<any>(this.apiurl+'/history2'+'/' + empid, {responseType: 'text' as 'json'});
  }

  getHistoryBasedOnUser(empid:any):Observable<any>{
    return this.http.get<any>(this.apiurl+'/getHistoryBasedOnUser'+'/' + empid, {responseType: 'text' as 'json'});
  }

  getHistoryBasedOnRole(role:any):Observable<any>{
    return this.http.get<any>(this.apiurl+'/getHistoryBasedOnRole'+'/' + role, {responseType: 'text' as 'json'});
  }
  selectedDeleteAllHistory(historyData:any):Observable<any>{
    return this.http.put<any>(this.apiurl+'/deleteAllHistory',historyData, {responseType: 'text' as 'json'});
  }
  putHistory(historyData:any) {
     this.http.put<any>(this.apiurl+'/downloadHistory',historyData,{responseType: 'text' as 'json'}).subscribe(
    
             data =>{
             this.downloadPDF();
             },
             error=>{
              
             }
           );
  }
 
   revertcalculation(historyId:any,status:any,empid:any) {   
     return this.http.put<any>(this.apiurl+'/updateHistory'+'/' + historyId+"/"+status+"/"+empid, {responseType: 'text' as 'json'});
   }
  // downloadPDF(){
  //   this.http.put<any>(this.apiurl+'/pdfDownload',{responseType: 'blob'}).subscribe(
  //     data => {
  //       debugger
  //       const fileName = "projectName"+'.pdf';
  //       FileSaver.saveAs(data, fileName);
  //     },
  //     error=>{
  //   console.log("his");
    
  //     }
  //   );
  // }
  
   public downloadPDF() {
    
   return   this.http.get(this.apiurl + '/pdfDownload', { responseType: 'blob' }).subscribe(
        data =>{
         
         const fileName = +'.pdf';
          FileSaver.saveAs(data, fileName);
       },
        error=>{
        
       }
      )
 }
}
																	   
	
																																				
				  
		 
												
											 
			
				  
		
		   
		 
	
