import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { arrowRightShort } from 'ngx-bootstrap-icons';
import { GlobalErrorHandlerService } from '../global-error-handler.service';
import { ApplyLeave } from '../models/apply-leave.model';
import { Register } from '../models/register';
import { ApplyleaveService } from '../services/applyleave.service';
import { FileUploadService } from '../services/file-upload.service';
import { HistoryService } from '../services/historyservice.service';
import { LeaveStatusServiceService } from '../services/leave-status-service.service';
import { RegisterserviceService } from '../services/registerservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  managerasadmin: boolean=false;
doSomethingWithCurrentValue($event: number) {
throw new Error('Method not implemented.');
}
 comingsoon:boolean=false;
  superadmin:boolean=false;
  admin:boolean=false;
  blurMode:boolean=false;
  spinner:boolean=false;
  apply:boolean=false;
  holidays:boolean=false;
  lmspage:boolean=true;
  enableTs: boolean = false;
  OpenApplyLeave: boolean = false;
  enableNavBar: boolean = false;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  modeModal: boolean = false;
  hidden: boolean = false;
  empid: any
  notification: number = 0;
  applyLeave = new ApplyLeave();
  tabs = ['Leave Management Systems', 'Time Schedule', 'Relieving Employee Details'];
  selected = new FormControl(0);
  EnableLms: boolean = true;
  selectedItem: any;
  tabName: String = 'Leave Management Systems';
  modalReference: any;
  loading: boolean = false;
  isChecked: boolean = false;
  year: String = '';
  remainingcl: String = '';
  remainingsl: String = '';
  department: any;
  name: String = '';
  personDetails = new Register();
  designation: String = '';
  leavestatus:boolean=false;
  initials: String='';
  managerName: any;
  leftoverApproval:any=[];

  // file upload
  errorMessage: any;
  showErrorMessage: boolean = false;
  fileName: String="";
  fileSize: any;
  file!: any;
  formFile:any;
  fileId:any;
  upload:boolean=false;
  updateFile1:boolean=false;
  update:boolean=false;
  successMsg:boolean=false;
  showErrorMessage1:boolean=false;
  fileUpload:boolean=true;
  cancel:boolean=true;
  fileName1:string='';
  filename1:boolean=false;
  filename2:boolean=true;
  loading1:boolean=false;
  updateButton:boolean=true;
  greet: string="";
  isShow: boolean = false;
  open:boolean=false;
  
  togglecount:number = 0;
  valueBot: string="";
  
  downloadButton:boolean=true;
 
  constructor(private route: Router,
    private statusservice: LeaveStatusServiceService,
    private move: BreakpointObserver,
    private getDetails: ApplyleaveService,
    private modalService: NgbModal,
    private registerDetails: LeaveStatusServiceService,
    private globalErrorHandler: GlobalErrorHandlerService,private fileUploadService:FileUploadService,
    private registerService:RegisterserviceService) { }


  // ngAfterViewInit(): void {
  //   this.move.observe(['(max-width:800px)']).subscribe((data) => {
  //     if (this.selected) {
  //       if (data.matches) {
  //         this.sidenav.mode = 'over';
  //         this.sidenav.close();
  //       } else {
  //         this.sidenav.mode = 'side';
  //         this.sidenav.open();

  //       }
  //     }
  //   }
  //   );
  // }

  leavePolicy = new FormGroup({fileid:new FormControl(),filesize:new FormControl(),filename:new FormControl()})

  // if(tab[0]==selected){
  //   this.EnableLms=true;
  // }

  ngOnInit(): void {
    
    this.lmspage=true;
     
    this.empid = sessionStorage.getItem("empid");
   
    this.registerDetails.getMemberDetails(this.empid).subscribe(
      data => {
        this.personDetails = JSON.parse(data);
        this.name=this.personDetails.name;
        this.department=this.personDetails.department;
        this.designation=this.personDetails.designation;
        this.managerName=this.personDetails.managername;
          
          if(this.designation=='Manager'){
          this.statusservice.getUpdates().subscribe(
            data => {
              let b = [];
              this.leftoverApproval =JSON.parse(data)
              for (let item of this.leftoverApproval) {
               if(item.managername==this.name && item.department==this.department){
                if (item.status == 'pending') {
                  console.log("condition true");
                  b.push(item);
                  this.notification = b.length;
                }
              }
              }
     
            }
          );
        }
        else{
          this.empid = sessionStorage.getItem("empid");
          this.statusservice.separationDetails(this.empid).subscribe(
            data => {
              let c = [];
              for (let item of JSON.parse(data)) {
                if (item.status == 'not submitted' ) {
                  c.push(item);
                  this.notification = c.length;
                }
              }
            }
          );
        }
      })
      
    this.getDetails.leaveTracking(this.empid).subscribe(
      data => {
        let leaveDetails = JSON.parse(data);
        this.year = leaveDetails.year;
        this.remainingcl = leaveDetails.carryForwardLeave;

        // this.
      }
    );
    // this.selectedItem=this.tabs[0];
    // this.getDetails.getInfo(this.empid).subscribe(
    //   data => {
    //     this.applyLeave = JSON.parse(data);

    //   }
    // );
    // this.selectedItem=this.tabs[0];
  
    this.registerDetails.getMemberDetails(this.empid).subscribe(
      data => {
        this.personDetails = JSON.parse(data);
        this.name = this.personDetails.name;
        this.department = this.personDetails.department;
        this.designation = this.personDetails.designation;

       let initials = this.name.charAt(0);
//  let initial=initials.toUpperCase;
       let displayAvatar= 'C'+ initials;
      var a= document.getElementById('avatar');
      a!.innerHTML=displayAvatar;

      if(this.designation=='Manager'){
        this.managerasadmin=true;
       }
       if(this.designation=='HR'){
         this.admin=true;
       }
       if(this.designation=='MD'){
        this.superadmin=true;
       }
      }
    );
  
    // retrive file
    this.registerService.getForm(this.empid).subscribe(data=>{
      if(JSON.parse(data).designation!="HR"){
               this.updateButton=false;
               this.downloadButton=false;
      }
    })
   
   
  }
 
 
 

  // addTab() {
  //   this.tabs.push('New');
  // }
  // removeTab(index: number) {
  //   this.tabs.splice(index, 1);
  // }
  
  OpenModalBox() {
    this.modeModal = true;
  }
  callProfile() {
    this.route.navigate(['/profile']);
  }
  changePassword(){
    this.route.navigate(['/changepassword'])
  }
  callCalculation() {
    this.route.navigate(['/leavestatus']);
  }
  callApplyLeave(){
     this.route.navigate(['/applyleave']);
  }
  callHolidays(){
     this.route.navigate(['/publicholidays']);
  }
  calleditholidays(){
    this.route.navigate(['/holidays'])
  }
  callHistory(){
    this.route.navigate(['/history']);
  }
  callRegister(){
    this.route.navigate(['/register']);
  }

  callEmployeeDetails(){
    this.route.navigate(['/employeedetails'])
  }

  getSelectedindex(event: any) {
    this.tabName = this.tabs[event];

  }
  termsCondition(termsContent: any) {

    this.modalReference = this.modalService.open(termsContent, { size: 'm' })

    this.fileUploadService.retriveFile(34).subscribe(data=>{
      this.f.filename.setValue(JSON.parse(data).fileName);
      this.fileSize = JSON.parse(data).fileSize;
      this.f.fileid.setValue(JSON.parse(data).fileId);
      
     
    },error=>{
      this.showErrorMessage=true;
      this.errorMessage=this.globalErrorHandler.errorMessage;
      setTimeout(() => {
        this.showErrorMessage=false;
       this.ngOnInit();
       this.onCancel();
      }, 3000);
    })
  
  }
  onCancel() {
    this.modalReference.close();
  }
  //   getInitial(name: string){
  //     const canvas= document.createElement('canvas');
  //   canvas.style.display='none';
  //   canvas.width=32;
  //   canvas.height=32;
  //   document.body.appendChild(canvas);
  //   const context=canvas.getContext('2d');
  //   context.fillstyle ='#476ce8';
  //   context.fillRect(0,0,canvas.width,canvas.height);
  // context?.font='16px arial';
  // context?.fillStyle='#fffff';
  // const nameArray=name.split(' ');
  // let initials='';
  // for(let i=0;i<nameArray.length;i++){
  //   if(i<=1){
  //     initials=initials+nameArray[i][0];
  //   }
  //   if(initials.length>1){
  //     context?.fillText(initials.toUpperCase(),7,22);
  //   }
  //   else{
  //     context?.fillText(initials.toLowerCase(),10,22);
  //   }
  //   const data=canvas.toDataURL();
  //   document.body.removeChild(canvas);
  //   return data;
  // }

  //   }
  get f() {
    return this.leavePolicy.controls;
  }


// file upload functions
  onChange(event:any){
    this.file = event.target.files;
   
    this.fileSize = Math.round(this.file[0].size / 1024) + " KB";
    this.fileName1=this.file[0].name;
    if(this.fileName1!=null){
      this.filename1=true;
      this.filename2=false;
    }
  }
  updateFile(event:any){
      if(this.file==null){
        this.showErrorMessage1=true;
        setTimeout(() => {
          this.showErrorMessage1=false
        }, 3000);
      }
    const formData: FormData = new FormData();
    for (let f of this.file) {
      formData.append('file', f, f.name);
    }
  this.fileId=this.f.fileid.value;
    this.formFile = formData;

    this.fileUploadService.updateFile(formData,this.fileId,this.fileSize).subscribe(data=>{
      this.loading1=true;
      this.updateFile1=false;
      
      setTimeout(() => {
           
        this.loading1=false;
        this.successMsg=true;
        setTimeout(() => {
          this.updateFile1=false;
          this.successMsg=false;
          this.fileUpload=true;
          this.cancel=true;
          this.downloadButton=true;
          this.updateButton=true;
          this.ngOnInit();
        }, 2000);
      }, 2000);
    
    },error=>{
      this.showErrorMessage=true;
      this.errorMessage=this.globalErrorHandler.errorMessage;
      setTimeout(() => {
        this.showErrorMessage=false;
      }, 3000);
    })
  
}

  onUpload(){
    const formData: FormData = new FormData();
    for (let f of this.file) {
      formData.append('file', f, f.name);
    }
    
    this.formFile = formData;
            
   this.fileUploadService.fileUploadLms(formData,this.fileSize).subscribe(data=>{
                 
   },
   error=>{
    this.showErrorMessage = true;
    this.errorMessage = this.globalErrorHandler.errorMessage;
    setTimeout(() => {
      this.showErrorMessage = false;
    }, 3000);
   })
  }
  onDownload(){
         this.fileUploadService.fileDownload(this.f.fileid.value);
  }
  updateFileMethod(){
this.updateFile1=true;
this.fileUpload=false;
this.cancel=false;
this.updateButton=false;
this.downloadButton=false;
  }
  back(){
    this.updateFile1=false;
    this.fileUpload=true;
    this.cancel=true;
    this.showErrorMessage1=false;
     // retrive file
     this.registerService.getForm(this.empid).subscribe(data=>{
      if(JSON.parse(data).designation=="HR"){
               this.downloadButton=true;
               this.updateButton=true;
      }
    })
    
  }



  signout(){
    // this.blurMode=true
    this.spinner=true;
    this.blurMode=true;
    sessionStorage.clear();
    setTimeout(() => {  
      this.blurMode=false;
      this.spinner=false;
      this.route.navigate(['/login']);
  }, 3000);
  
  }
  onCancell(){
    this.open =false;
      }
      toggleStatus(){
        this.open=true;
      
      }
 
 
}
