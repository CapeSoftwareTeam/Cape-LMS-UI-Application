import { Element } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { elementAt } from 'rxjs';
import { ApplyLeave } from '../models/apply-leave.model';
import { ApplyleaveService } from '../services/applyleave.service';
import { FileUploadService } from '../services/file-upload.service';
import { HistoryService } from '../services/historyservice.service';
import { LeaveStatusServiceService } from '../services/leave-status-service.service';

@Component({
  selector: 'app-leave-status',
  templateUrl: './leave-status.component.html',
  styleUrls: ['./leave-status.component.css']
})
export class LeaveStatusComponent implements OnInit {
  hrAdmin:boolean=false;
  @ViewChild('dataPaginator', { static: false }) dataPaginator!: MatPaginator;
  empid: any
  notification: number = 0;
  admin:boolean=false;
  showmessage: boolean = false;
  enableApprove: boolean = true;
  enableSubmit: boolean = false;
  successValue: string = "approved";
  displayedColumns: string[] = ['createddate', 'name', 'leaveType', 'fromdate', 'todate', 'reasonforapply', 'noofdays', 'status'];
  dataSource1 = new MatTableDataSource<any>;
  dataSource2 = new MatTableDataSource<any>;
  dataSource3=new MatTableDataSource<any>;
  empId: any;
  applyleave=new ApplyLeave();
  leftoverApproval:any=[];
  statusRequest: any=[];
  detailsdata: any=[];
  personDetails: any=[];
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
  errorMessage: any;
  globalErrorHandler: any;
  fileId: any;
 historyIdFor:any;
  fileIdFor: any;
  constructor(private statusservice: LeaveStatusServiceService,
    private statusagree: LeaveStatusServiceService,
    private route: Router,
     private modalService: NgbModal,
    private registerDetails: LeaveStatusServiceService,
    private fileUploadService:FileUploadService,
    ) { }

  ngOnInit(): void {
 
    this.empid = sessionStorage.getItem("empid");
    this.registerDetails.getMemberDetails(this.empid).subscribe(
      data => {
        this.personDetails = JSON.parse(data);
        this.name=this.personDetails.name;
        this.department=this.personDetails.department;
        this.designation=this.personDetails.designation;
        this.managerName=this.personDetails.managerName;
        if(this.designation=='Manager'){
          this.admin=true;
        }
        if(this.designation=="HR"){
          this.admin=true;
          this.hrAdmin=true;
        }
      });

      
    this.statusservice.getUpdates().subscribe(
      data => {
       
        this.getpendingData();
        this.getstatusData();
       
      }
    );
    this.fileUploadService.retriveFile(34).subscribe(data=>{
      // this.f.filename.setValue(JSON.parse(data).fileName);
      // this.fileSize = JSON.parse(data).fileSize;
      // this.f.fileid.setValue(JSON.parse(data).fileId);
      
     
    })
  // if(Element.l)
 
//  for(let i of JSON.parse(data)){
//   this.department!=i.department;
//   details.push(i);
//  }

    // let empId : sessionStorage.getItem("empid");

  }

  approve(historyid: Number, empid:String,status: string) {
    this.showmessage = true;
    setTimeout(() => { this.showmessage = false; }, 4000);
    this.enableApprove = true;
    this.enableSubmit = false;

    this.statusagree.statusUpdate(historyid,this.empid, status).subscribe(
      data => {this.applyleave.status=status;
        this.ngOnInit();
      }
    
    );
  
  }

  getpendingData() {
    // this.name==this.managername
    this.empid = sessionStorage.getItem("empid");
    this.registerDetails.getMemberDetails(this.empid).subscribe(
      data => {
        this.personDetails = JSON.parse(data);
        this.name=this.personDetails.name;
        this.department=this.personDetails.department;
        this.designation=this.personDetails.designation;
        this.managerName=this.personDetails.managerName
    
    if(this.designation=='Manager'){
    this.statusservice.getUpdates().subscribe(
      data => {
        let b = [];
        this.leftoverApproval =JSON.parse(data)
        for (let item of this.leftoverApproval) {
          if(this.designation=="Manager"){
         if(item.managername==this.name && item.department==this.department ){
          if (item.status == 'pending') {
            console.log("condition true");
            b.push(item);
            this.notification = b.length;
          }
        }
      }
         
        }
        this.dataSource1 = new MatTableDataSource(b);
        this.dataSource1.paginator = this.dataPaginator;
        console.log("retrived pending successfully")
      }
    );
  }
  else if(this.designation=='HR'){
    this.statusservice.getUpdates().subscribe(
      data => {
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
        console.log("retrived pending successfully")
      }
     } );
     this.statusservice.getUpdates().subscribe(
      data => {
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
        console.log("retrived pending successfully")
      }
     } );
  }
  
})
}
 
  getstatusData() {
    this.empid = sessionStorage.getItem("empid");
        this.statusservice.separationDetails(this.empid).subscribe(
          data => {
            let c = [];
            let dhana=[];
            for (let item of JSON.parse(data)) {

           
              if (item.status == 'not submitted' ) {
                c.push(item);
                // dhana.push(item.leaveType);
                // if((item.leaveType)==='sick'){
                //   this.showifsick=true;
                // }
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
       
        
      this.ngOnInit(); 
    }
    )


    // this.applyLeave.leaveType = this.postleave.value.leaveType;
    // this.applyLeave.noofdays = this.countinNumber;
    // this.applyLeave.fromdate = this.postleave.value.fromdate;
    // this.applyLeave.todate = this.postleave.value.todate;
    // this.applyLeave.reasonforapply = this.postleave.value.reasonforapply;
    // this.applyLeave.status = 'not submitted';
    // this.apply.leaveRegister(this.applyLeave).subscribe(
    //   data => { this.leave.push(this.postleave) }
    // )
  }
  delete(historyid:Number){
this.statusagree.deleteHistory(historyid).subscribe(
  data=>{
    this.ngOnInit();
    console.log("data for delete is passed");
  
  }
  
)

  }
  // selectFile(event) {
  //   this.selectedFiles = event.target.files;
  // }
  uploadbackbutton(){
    //   this.currentFile = this.selectedFiles.item(0);
  //   this.fileUploadService.fileUploadLms(formData,fileSize).subscribe(response => {
	// 	this.selectedFiles.value = '';
  //    if (response instanceof HttpResponse) {
	// 	 this.msg = response.body;
  //       console.log(response.body);
  //     }	  
  //   });    
  // }
    this.modalReference.close();

  }
  uploadDocument(historyid:Number,uploading:any){
    this.historyIdFor=historyid;
    this.modalReference = this.modalService.open(uploading, { size: 'm' });
  
  }
  uploadhere(){
    const formData: FormData = new FormData();
    for (let f of this.file) {
      formData.append('file', f, f.name);
    }
    
    this.formFile = formData;
            
   this.fileUploadService.fileUploadLms(formData,this.fileSize).subscribe(data=>{
   this.fileId=data;
   this.statusagree.fileUpdate(this.historyIdFor,this.fileId).subscribe(data=>{
    
   })

 
   },
   error=>{
    this.showErrorMessage = true;
    this.errorMessage = this.globalErrorHandler.errorMessage;
    setTimeout(() => {
      this.showErrorMessage = false;
    }, 3000);
   });
  
    this.modalReference.close();
  }
  viewpdf(historyId:Number,showDocument:any){
    this.statusagree.getHistoryId(historyId).subscribe(data=>{
           this.fileIdFor=JSON.parse(data).fileid;
    })
    this.modalReference= this.modalService.open(showDocument, { size: 'xl' });
  }
  
  backToleavestatus(){
    this.modalReference.close();
  }
  getfile(event:any){
    this.file = event.target.files;
   
    this.fileSize = Math.round(this.file[0].size / 1024) + " KB";
    this.fileName1=this.file[0].name;

  }
  viewpdffile(){
  this.fileUploadService.fileDownload(this.fileIdFor);
}

}

