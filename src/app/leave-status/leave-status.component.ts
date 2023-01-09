import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalErrorHandlerService } from '../services/global-error-handler.service';
import { ApplyLeave } from '../models/apply-leave.model';
import { FileUploadService } from '../services/file-upload.service';
import { LeaveStatusServiceService } from '../services/leave-status-service.service';

@Component({
  selector: 'app-leave-status',
  templateUrl: './leave-status.component.html',
  styleUrls: ['./leave-status.component.css']
})
export class LeaveStatusComponent implements OnInit {
  showEmptyTable:boolean=false;
  @ViewChild('dataPaginator', { static: false }) dataPaginator!: MatPaginator;
  displayedColumns: string[] = ['createddate', 'name', 'leaveType', 'fromdate', 'todate', 'reasonforapply', 'noofdays', 'status'];
  dataSource1 = new MatTableDataSource<any>;
  dataSource2 = new MatTableDataSource<any>;
  dataSource3=new MatTableDataSource<any>;
  hrAdmin:boolean=false;
  fileisempty:boolean=false;
  admin:boolean=false;
  uploadshow:boolean=true;
  uploadhide:boolean=false;
  showmessage: boolean = false;
  enableApprove: boolean = true;
  enableSubmit: boolean = false;
  leftoverApproval:any=[];
  statusRequest: any=[];
  detailsdata: any=[];
  personDetails: any=[];
  successValue: string = "approved";
  empid: any;
  notification: number = 0;
  empId: any;
  designation: any;
  department: any;
  managerName: any;
  name: any;
  modalReference: any;
  file: any;
  fileSize: any;
  fileName1: any;
  formFile: any;
  showErrorMessage: boolean=false;
  errorMessage: string='';
 
  fileId: any;
  historyIdFor:any;
  fileIdFor: any;
  applyleave=new ApplyLeave();

  constructor(private statusservice: LeaveStatusServiceService,
              private statusagree: LeaveStatusServiceService,
              private route: Router,
              private modalService: NgbModal,
              private registerDetails: LeaveStatusServiceService,
              private fileUploadService:FileUploadService ,private globalErrorHandler:GlobalErrorHandlerService ) { }

ngOnInit(): void {
 
    // to retrieve login member details
      this.empid = sessionStorage.getItem("empid"); //get login employee id from session storage
      this.registerDetails.getMemberDetails(this.empid).subscribe
      (data => {
          this.personDetails = JSON.parse(data);
          this.name=this.personDetails.name;
          this.department=this.personDetails.department;
          this.designation=this.personDetails.designation;
          this.managerName=this.personDetails.managerName;
            if(this.designation=='Manager'){this.admin=true}
              if(this.designation=="HR"){ this.admin=true; this.hrAdmin=true;}
        },error=>{
          this.showErrorMessage = true;
          this.errorMessage = this.globalErrorHandler.errorMessage;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
         }
      );

      // for update call
      this.statusservice.getUpdates().subscribe(
          data => {
            this.getpendingData();
            this.getstatusData();

         },error=>{
          this.showErrorMessage = true;
          this.errorMessage = this.globalErrorHandler.errorMessage;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
         }
      );

      this.fileUploadService.retriveFile(34).subscribe(data=>{})
}

   //Update the status
  approve(historyid: Number, empid:String,status: string) {
    
    this.enableApprove = true;
    this.enableSubmit = false;

    this.statusagree.statusUpdate(historyid,this.empid, status).subscribe(
     
      data => {this.showmessage = true;
        setTimeout(() => { this.showmessage = false; }, 4000);
        this.applyleave.status=status;
        this.ngOnInit();
      }, error=>{
        this.showErrorMessage = true;
        this.errorMessage = this.globalErrorHandler.errorMessage;
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 3000);
       }
    
    );
  
  }

// retrieve all pending data
  getpendingData() {
    this.empid = sessionStorage.getItem("empid");
    this.registerDetails.getMemberDetails(this.empid).subscribe(
      data => {
        this.personDetails = JSON.parse(data);
        this.name=this.personDetails.name;
        this.department=this.personDetails.department;
        this.designation=this.personDetails.designation;
        this.managerName=this.personDetails.managerName
    
        if(this.designation=='Manager'){
          this.statusservice.getUpdates().subscribe(data => {
            let b = [];
            this.leftoverApproval =JSON.parse(data)
              for (let item of this.leftoverApproval) {
                if(this.designation=="Manager"){
                  if(item.managername==this.name && item.department==this.department ){
                    if (item.status == 'pending') {
                      b.push(item);
                      this.notification = b.length;
                    }
                    if(this.leftoverApproval.length==0){
                      this.showEmptyTable = true;
                    
                    }
                  }
                }
              }
            this.dataSource1 = new MatTableDataSource(b);
            this.dataSource1.paginator = this.dataPaginator;
          },error=>{
            this.showErrorMessage = true;
            this.errorMessage = this.globalErrorHandler.errorMessage;
            setTimeout(() => {
              this.showErrorMessage = false;
            }, 3000);
           });
        }
        else if(this.designation=='HR'){
          this.statusservice.getUpdates().subscribe(data => {
          let g = [];
            this.leftoverApproval =JSON.parse(data)
              for (let item of this.leftoverApproval) {
                if(this.designation=="HR"){
                  if(item.managername==this.name || item.designation=="Manager"){
                    if(item.status=="pending"){
                      g.push(item);
                    }
                  }
                }
                this.dataSource1 = new MatTableDataSource(g);
                this.dataSource1.paginator = this.dataPaginator;
              }
          });      
          this.statusservice.getUpdates().subscribe(data => {
          let r = [];
          this.leftoverApproval =JSON.parse(data)
            for (let item of this.leftoverApproval) {
              if(this.designation=="HR"){
                if( item.status=="pending" && item.designation!="Manager"){
                  r.push(item);
                  this.notification = r.length;  
                }
              }
              this.dataSource3 = new MatTableDataSource(r);
              this.dataSource3.paginator = this.dataPaginator;
            }
          });
        }
    })
  }
 
  //retrieve all submitted data from save changes
  getstatusData() {
    this.empid = sessionStorage.getItem("empid");
      this.statusservice.separationDetails(this.empid).subscribe(
        data => {
          let c = [];
          let dhana=[];
            for(let item of JSON.parse(data)) {      
              if(item.status == 'not submitted') {
                c.push(item);
                this.notification = c.length;
              }
            
            }
          this.dataSource2 = new MatTableDataSource(c);
          this.dataSource2.paginator = this.dataPaginator;
          console.log("retrived not submitted successfully")
        }
      );
  }

  back() {
    this.route.navigate(['/home']);
  }

  submit(historyid: Number, empid:string, status: string){
    this.statusagree.statusUpdate(historyid, empid, status).subscribe(
      data=>{ 
        this.showmessage = true;
        setTimeout(() => { this.showmessage = false; }, 4000);
        this.ngOnInit(); 
      }
    )
  }

  delete(historyid:Number){
   this.statusagree.deleteHistory(historyid).subscribe(
    data=>{
      this.ngOnInit();
      console.log("data for delete is passed");
    }
   )
  }

  uploadbackbutton(){
    this.modalReference.close();
  }

  uploadDocument(historyid:Number,uploading:any){
    this.historyIdFor=historyid;
    this.modalReference = this.modalService.open(uploading, { size: 'm' });
  }

  uploadhere(successtoupload:any){
    let componentName:any;
    const formData: FormData = new FormData();
      for (let f of this.file){
        formData.append('file', f, f.name);
      }
      componentName="leaveApply"
      this.formFile = formData;         
      this.fileUploadService.fileUploadLms(formData,this.fileSize,componentName).subscribe(data=>{
       
      this.fileId=data; 
      this.uploadshow=false;
      this.uploadhide=true;

      this.statusagree.fileUpdate(this.historyIdFor,this.fileId).subscribe(data=>{
     
      })
      },
        error=>{
          this.showErrorMessage = true;
          this.errorMessage = this.globalErrorHandler.errorMessage;
            setTimeout(() => {
              this.showErrorMessage = false;
            }, 3000);
        }
      );
      
    
    this.modalReference.close();
    this.modalReference=this.modalService.open(successtoupload,{size:'m'});
  }
  viewpdf(historyId:Number){
    this.statusagree.getHistoryId(historyId).subscribe(data=>{this.fileIdFor=JSON.parse(data).fileid;})
    // this.modalReference= this.modalService.open(showDocument, { size: 'm' }); 
    this.fileUploadService.fileDownload(this.fileIdFor);
  }

  backToleavestatus(){
    this.modalReference.close();
  }
  getfile(event:any){
    this.file = event.target.files;
    this.fileSize = Math.round(this.file[0].size / 1024) + " KB";
    this.fileName1=this.file[0].name; 
  }
  // viewpdffile(){
  //   this.fileUploadService.fileDownload(this.fileIdFor);
  // }
}
