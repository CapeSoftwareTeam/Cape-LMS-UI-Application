import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { clipboardCheck, filter } from 'ngx-bootstrap-icons';
import { DatePipe } from '@angular/common'
;
import { RegisterserviceService } from '../services/registerservice.service';
import {FormGroup, FormControl, NgModel} from '@angular/forms';
import { HistoryService } from '../services/historyservice.service';
import { Router } from '@angular/router';
import { start, State } from '@popperjs/core';
import { ApplyLeave } from '../models/apply-leave.model';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { state } from '@angular/animations';
import { CscService } from '../csc.service';
const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();




@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']

})
export class HistoryComponent implements OnInit {
 
filterHistory= new ApplyLeave();
filterdate:any;
  spinner: boolean = false;
  blurMode: boolean = false;
  display: boolean = true;
  enable: boolean = false;
  approved: boolean = false;
  pending: boolean = false;
  cancelled: boolean = false;
  enableDelete: boolean = false;
  empid: any;
  displayedColumns = ['empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'toDate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'department', 'leaveType', 'reasonForApply', 'location', 'delete'];
  // displayedColumns: any=[];
  Color!: 'pink';
  dataSource1!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;
  matDatepickerFilter!: MatTableDataSource<any>;
  @ViewChild('historySort', { static: false }) historySort!: MatSort;
  element: Element[] = [];
  loading = false;
  formGroup:any;

  @ViewChild('historyPaginatorUser', { static: false }) historyPaginatorUser!: MatPaginator;
  @ViewChild('historyPaginatorAdmin', { static: false }) historyPaginatorAdmin!: MatPaginator;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  adminView: boolean = true;
  designation: string = "";
  department: string = "";
  role: any;
  details: any;
  selectedRow: any = [];
  modalReference : any;

  // hide:boolean=true;
  displayedColumnsForUser: any;
  displayedColumnsForAdmin: any;
  delShow: boolean = false;
  hideShow:boolean = false;
  state: any=[];
  country: any=[];
  city: any=[];
  tempStateName :any=[];
  tempCityName :any=[];
  employeeData :any=[];
  stateList: any=[];
  basicStart: any;
  fromDate!: string;
  toDate!: string;

  historypdf: any=[];
  empArr: any;
  HRdata: any=[];
  countryList: any;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

  HistoryDetails=new FormGroup({
    empid :new FormControl(''),

  })
    

//   

range!:any;
 
    // campaignOne = new FormGroup({
    //   start: new FormControl(new Date(year, month, 10)),
    //   end: new FormControl(new Date(year, month, 12)),
    // });
    // campaignTwo = new FormGroup({
    //   start: new FormControl(new Date(year, month, 15)),
    //   end: new FormControl(new Date(year, month, 19)),
    // });
    // campaignOne = new FormGroup({
    //     start: new FormControl(new Date(year, month, day).getDate()),
    //     end: new FormControl(new Date(year, month, day).getDate()),
    //   });
      campaignTwo = new FormGroup({
        start: new FormControl(new Date(year, month, 15)),
        end: new FormControl(new Date(year, month, 19)),
      });
  
 
  selection = new SelectionModel<Element>(true, []);
  constructor(private historyService: HistoryService, private registerService: RegisterserviceService,
    private route: Router , private modalService : NgbModal , private  siteService: CscService
    // private registerService: RegisterserviceService,
  ) {
    // this.designation="softwaremanager";
    // this.department="software";
    //  this.displayedColumns = ['empId','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','reasonForApply'];
    this.dataSource1 = new MatTableDataSource<any>();
    this.dataSource2 = new MatTableDataSource<any>();
  }
  
  

   
    listChildChanged :any = [];
    arr = [
    {
      id: "group_1",
      name: "Using Filter",
      items: [
        {
          id: "group_1.abc",
          name: "Department",
          checked: false,
          expand: true,
          childs: [
            {
              id: "group_1.abc.action_See_List",
              name: "Software",
              checked: false,
              expand:false
            },
            {
              id: "group_1.abc.action_Edit",
              name: "Sales",
              checked: false,
              expand:false
            },
            {
              id: "group_1.abc.action_Delete",
              name: "Designing",
              checked: false,
              expand:false
            },
            {
              id: "group_1.abc.action_Print",
              name: "Marketing",
              checked: false,expand:false
            },
            {
              id: "group_1.abc.action_Print",
              name: "Testing",
              checked: false,
              expand:false
            }
          ]
        },
        {
          id: "group_1.def",
          name: "Location",
          checked: false,
          expand: true,
          childs: [
            {
              id: "group_1.def.action_See_List",
              name: "country",
              checked: false,
              expand:true
            },
            {
              id: "group_1.def.action_Edit",
              name: "State",
              checked: false,
              expand:true
            },
            {
              id: "group_1.def.action_Delete",
              name: "City",
              checked: false,
              expand:true
            }
           
          ]
        }
      ]
    }
  ]

  checkMinusSquare(item:any) {
    const count = item.childs.filter((x: { checked: boolean; }) => x.checked == true).length;
    if (count > 0 && count < item.childs.length) {
      return true;
    } else if (count == 0) {
      return false;
    }
    return null;
  }

  checkParent(group_i:any, i:any) {
    this.arr[group_i].items[i].checked = !this.arr[group_i].items[i].checked;
    if (this.arr[group_i].items[i].checked) {
      this.arr[group_i].items[i].childs.map(x => (x.checked = true));
    } else {
      this.arr[group_i].items[i].childs.map(x => (x.checked = false));
    }
    this.arr[group_i].items[i].childs.forEach(x => {
      if (this.listChildChanged.findIndex((el: { [x: string]: string; }) => el['id'] == x.id) == -1) {
        console.log("issue need check");
          // this.listChildChanged.arr.push(x);
      }
    });
  }

  checkChild(group_i:any, parent_i:any, i:any) {

    let tempDepartment:any=[]
    this.arr[group_i].items[parent_i].childs[i].checked = !this.arr[group_i]
      .items[parent_i].childs[i].checked;
    const count = this.arr[group_i].items[parent_i].childs.filter(
      el => el.checked == true
    ).length;
    if (count == this.arr[group_i].items[parent_i].childs.length) {
      this.arr[group_i].items[parent_i].checked = true;
    } else {
      this.arr[group_i].items[parent_i].checked = false;
    }
    if (this.listChildChanged.findIndex((el: { [x: string]: string; }) => el['id'] == this.arr[group_i].items[parent_i].childs[i].id) == -1) {
      console.log(this.arr[group_i].items[parent_i].childs[i]);
      if(this.arr[group_i].items[parent_i].childs[i].checked==true){
        this.listChildChanged.push(this.arr[group_i].items[parent_i].childs[i])

      }
      
      
      // this.listChildChanged.push(this.arr.push(this.arr[group_i].items[parent_i].childs[i]));
    }
    for(let z of this.employeeData){
      for(let y of this.listChildChanged){
        if(y.checked){
          if(y.name==z.department){
            tempDepartment.push(z)
          }
        }
      }
    }
    this.dataSource2 = new MatTableDataSource(tempDepartment);
    this.dataSource2.sort = this.historySort;
    this.dataSource2.paginator = this.historyPaginatorUser;
  }

  getListChildChanged() {
    console.log(this.listChildChanged);
  }


   

 

  ngOnInit(): void {
    this.siteService.retrieveCountry().subscribe(
      data => {
        this.countryList = JSON.parse(data);
        console.log( this.countryList)
      }
    )

    

    this.range = new FormGroup({
      start: new FormControl(''),
      end: new FormControl(''),
    });
    //   let Country = require('country-state-city').Country;
    //  let State = require('country-state-city').State;
    //  let City = require('country-state-city').City;

    //  console.log(Country.getAllCountries())
    //  console.log(State.getAllStates())
    //  console.log(City.getAllCities())

    //  this.state=State.getAllStates();
    //  this.country=Country.getAllCountries();
    //  this.city=City.getAllCities();

     this.empid = sessionStorage.getItem('empid');
    // // // Fetching city details
    // for(let i of State.getAllStates()){
    //   if(i.countryCode=="IN"){
    //    this.tempStateName.push(i.name);
    //   }
    //   else if(i.country=="NP"){
    //   this.tempStateName.push(i.name);
    //   }
    // };
    // for (let k of City.getAllCities()){
    //   if(k.countryCode && k.isoCode=="TN" && k.name=="Tamil Nadu"){
    //     this.tempCityName.push(k.name);

    //   }
    // };
    // this.stateList=this.tempStateName;
    let designation = '';
    this.registerService.getForm(this.empid).subscribe(
      data => {
        designation = JSON.parse(data).designation;
       let emailId = JSON.parse(data).emailId;
       if(emailId=="gk@capeindia.net"){
                  
        this.historyService.getHistory().subscribe(
          data => {
            this.displayedColumnsForAdmin = ['empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'todate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'department', 'leaveType', 'reasonForApply', 'location', 'delete'];
            // this.HRdata;
              for (let value of JSON.parse(data)) {  
                if (designation=="HR") {
                  this.HRdata.push(value);
                }  
          }
        }
        )};
      
        //user
        if (designation == "software trainee" || designation == "Designing" || designation == "Software Devloper" ||
          designation == "Testing" || designation == "Sales" || designation == "Marketing") {
          this.displayedColumns = ['empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'todate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'leaveType', 'reasonForApply'];

          this.historyService.getHistoryBasedOnUser(this.empid).subscribe(
            data => {
              this.displayedColumnsForUser = ['empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'todate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'department', 'leaveType', 'reasonForApply', 'location'];
              this.dataSource1 = new MatTableDataSource(JSON.parse(data));
              this.dataSource1.sort = this.historySort;
              this.dataSource1.paginator = this.historyPaginatorAdmin;

            });



        }


              
              

            
          
        
        else if (designation == "HR") {

          this.enableDelete = true;
          

          //this.display = false;
          this.displayedColumns = ['empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'todate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'department', 'leaveType', 'reasonForApply', 'location', 'delete'];

          this.enable = true;
          
          this.historyService.getHistory().subscribe(
            data => {


              // this.delShow = true;
              this.displayedColumnsForAdmin = ['empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'todate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'department', 'leaveType', 'reasonForApply', 'location', 'delete'];
              this.employeeData = [];
              for (let value of JSON.parse(data)) {  
                if (this.empid != value.empid) {
                   this.employeeData.push(value);
                   this.empArr=this.employeeData
                  // if((value.fromDate == this.campaignTwo.controls.start) && (value.toDate == this.campaignTwo.controls.end)){
                  //   employeeData.push(value);
                  // }
                }
              }
              this.dataSource2 = new MatTableDataSource(this.employeeData);
              this.dataSource2.sort = this.historySort;
              this.dataSource2.paginator = this.historyPaginatorUser;
            });
            

          this.historyService.getHistoryBasedOnUser(this.empid).subscribe(
            data => {
              // this.delShow = true;
              this.displayedColumnsForUser = ['empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'todate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'department', 'leaveType', 'reasonForApply', 'location'];
              this.dataSource1 = new MatTableDataSource(JSON.parse(data));
              this.dataSource1.sort = this.historySort;
              this.dataSource1.paginator = this.historyPaginatorAdmin;
            });

        }

        //Admin
        else {
          this.enableDelete = true;

          //this.display = false;

          this.enable = true;
          this.historyService.getHistoryBasedOnRole(JSON.parse(data).department).subscribe(
            data => {
              // this.delShow = true;

              this.displayedColumnsForAdmin = ['empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'todate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'department', 'leaveType', 'reasonForApply', 'location', 'delete'];
              let employeeData = [];
              for (let value of JSON.parse(data)) {
                if (this.empid != value.empid) {
                  employeeData.push(value);
                }
              }
              this.dataSource2 = new MatTableDataSource(employeeData);
              this.dataSource2.sort = this.historySort;
              this.dataSource2.paginator = this.historyPaginatorUser;
            });

          this.historyService.getHistoryBasedOnUser(this.empid).subscribe(
            data => {


              this.displayedColumnsForUser = ['empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'toDate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'department', 'leaveType', 'reasonForApply', 'location'];

              this.dataSource1 = new MatTableDataSource(JSON.parse(data));
              this.dataSource1.sort = this.historySort;
              this.dataSource1.paginator = this.historyPaginatorAdmin;
            });
        }
      });

   
  }

  selectedtab(event: any) {
    if (event.target.innerText == 'My History') {
      this.delShow = false;
    }
    else {
      this.delShow = true;
    }
    if (event.target.innerText == 'My History') {
      this.hideShow = false;
    }
    else {
      this.hideShow = true;
    }


  }

  back() {
    this.route.navigate(['/home'])
  }

  Admin() {

  }
  date(){
    console.log(this.employeeData+" "+this.fromDate+" "+ this.toDate)
    let tempdata:any = []
   
    for(let i of this.employeeData){
      let tempFromDate =new Date(i.fromdate)
      let tempEndDate =new Date(i.todate)
      if(tempFromDate>=this.range.value.start && tempEndDate <=this.range.value.end){
        tempdata.push(i);
      }
    }
    this.dataSource2 = new MatTableDataSource(tempdata);
              this.dataSource2.sort = this.historySort;
              this.dataSource2.paginator = this.historyPaginatorUser;
 
   }
   datechanger(){
     if(this.range.value.start==null &&this.range.value.end==null){
               this.ngOnInit();
     }
   }


  downloadPdf() {
    this.enable = true;
    let listOfHistoryData = [];
    for(let historyData of this.dataSource2.filteredData){
        historyData.toDate = new Date(historyData.todate).toLocaleDateString(); 
        historyData.todate = null; 
        historyData.fromDate = new Date(historyData.fromdate).toLocaleDateString();
        historyData.fromdate = null;
        listOfHistoryData.push(historyData);
    }
    this. historyService.putHistory(listOfHistoryData)
    //.subscribe(
    //   data=>{
    //     console.log("done");
        
    // //  this.historypdf.push(this.dataSource2)
    // });


    this.spinner = true;
    this.blurMode = true;
    setTimeout(() => {
      this.spinner = false;
      this.blurMode = false;
    }, 2000);
  }

  deleteAllHistory(DeleteTemplate : any){
    this.modalReference = this.modalService.open(DeleteTemplate ,{centered:true,size: "md"})
  }
  
  deleteTempl(ChangetheStatus :any){
    this.modalReference = this.modalService.open(ChangetheStatus,{centered:true,size: "md"})
  }
  closeTemp(){
    this,this.modalReference.close();
  }
  ///state country city code
//   designer1changeCountry(e: any) {

//     let changedValue;
  
//     if(e.target != undefined) {
  
//       changedValue = e.target.value;
  
//     }
  
//     else{
  
//       changedValue = e;
  
//     }
  
//     this.stateList1 = [];
  
//       for(let arr of this.countryList) {
  
//         if( arr.name == changedValue) {
  
//           this.siteService.retrieveState(arr.code).subscribe(
  
//             data => {
  
//               this.stateList1 = JSON.parse(data)
  
//             }
  
//           )};
  
//       }
//       <option value="" selected>Select State Name</option>

//     <option *ngFor="let state of stateList1">

// {{state.name}}</option>

                                                             

                                                     

//   </select>
  
  

  selectedDeleterows(){
  
    this.historyService.selectedDeleteAllHistory(this.selectedRow).subscribe(
      data => {
        this.ngOnInit();
        this.closeTemp(); 
        setTimeout(() => {

        }, 2000);
      }
    )
  }
  deleteHistory(historyid: number) {

    this.historyService.deleteHistory(historyid).subscribe(
      data => {
        this.ngOnInit();
        this.closeTemp();
        setTimeout(() => {

        }, 2000);
      }


    )
  }
}


function applyFilter(event: Event | undefined, Event: { new(type: string, eventInitDict?: EventInit | undefined): Event; prototype: Event; readonly AT_TARGET: number; readonly BUBBLING_PHASE: number; readonly CAPTURING_PHASE: number; readonly NONE: number; }) {
  throw new Error('Function not implemented.');
}

