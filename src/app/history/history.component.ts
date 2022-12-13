import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { clipboardCheck, filter } from 'ngx-bootstrap-icons';
;
import { RegisterserviceService } from '../services/registerservice.service';
import {FormGroup, FormControl} from '@angular/forms';
import { HistoryService } from '../services/historyservice.service';
import { Router } from '@angular/router';
import { start } from '@popperjs/core';
import { ApplyLeave } from '../models/apply-leave.model';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
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
  displayedColumns = ['empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'toDate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'department', 'leavetype', 'reasonForApply', 'location', 'delete'];
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
  // hide:boolean=true;
  displayedColumnsForUser: any;
  displayedColumnsForAdmin: any;
  delShow: boolean = false;
  state: any=[];
  country: any=[];
  city: any=[];
  tempStateName :any=[];
  tempCityName :any=[];
  employeeData :any=[];

    listChildChanged :any= [];
    departmentList=["software","sales","Designing","Marketing","Testing"]
    arr = [
      {
        id: "group_1",
        name: "Filter",
        items: [
          {
            id: "group_1.abc",
            name: "Department",
            checked: false,
            expand: true,
            childs: [
              {
                id: "group_1.abc.action_See_List",
                name: "software",
                checked: false
              },
              {
                id: "group_1.abc.action_Edit",
                name: "sales",
                checked: false
              },
              {
                id: "group_1.abc.action_See_List",
                name: "Designing",
                checked: false
              },
              {
                id: "group_1.abc.action_See_List",
                name: "Marketing",
                checked: false
              },
              {
                id: "group_1.abc.action_See_List",
                name: "Testing",
                checked: false
              },
              
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
                checked: false
              },
              {
                id: "group_1.def.action_See_List",
                name: "State",
                checked: false
              },
              {
                id: "group_1.def.action_Edit",
                name: "City",
                checked: false
              },
            ]
          },
          
        ]
      }
    ]
  stateList: any=[];
  basicStart: any;
  fromDate!: string;
  toDate!: string;

  historypdf: any=[];

  
  

  //    checkMinusSquare(item:any):any {
  //   const count = item.childs.filter((x: { checked: boolean; }) => x.checked == true).length;
  //   if (count > 0 && count < item.childs.length) {
     
      
  //     //  this.dataSource2.filter = item.child.value.trim().toLowerCase();
  //     return true;
  //   } else if (count == 0) {
  //     return false;
  //   }
  // }

  // checkParent(group_i:any, i:any) {
  //   this.arr[group_i].items[i].checked = !this.arr[group_i].items[i].checked;
  //   if (this.arr[group_i].items[i].checked) {
  //     this.arr[group_i].items[i].childs.map(x => (x.checked = true));
  //   } else {
  //     this.arr[group_i].items[i].childs.map(x => (x.checked = false));
  //   }
  //   this.arr[group_i].items[i].childs.forEach(x => {
  //     // if (this.listChildChanged.findIndex(el => el.id == x.id) == -1) {
  //     //   this.listChildChanged.push(x);
  //     // }
  //   });
  // }

  // w(group_i :any, parent_i:any, i:any) {
  //   let temparr:any;
  //   temparr=this.arr[group_i].items[parent_i].childs[i];
    

  //   this.arr[group_i].items[parent_i].childs[i].checked = !this.arr[group_i]
  //     .items[parent_i].childs[i].checked;
  //   const count = this.arr[group_i].items[parent_i].childs.filter(
  //     el => el.checked == true
     
      

  //   ).length;


//     var $filterCheckboxes = $('input[type="checkbox"]');
// var filterFunc = function() {   
  
//   var selectedFilters = [];

//   $filterCheckboxes.filter(':checked').each(function() {

//     if (!selectedFilters.hasOwnProperty(this.name)) {
//       selectedFilters[] = [];
//     }

//     selectedFilters[this.name].push(this.value);
//   });

//   // create a collection containing all of the filterable elements
//   var $filteredResults = $('.flower');

//   // loop over the selected filter name -> (array) values pairs
//   $.each(selectedFilters, function(name, filterValues) {

//     // filter each .flower element
//     $filteredResults = $filteredResults.filter(function() {

//       var matched = false,
//         currentFilterValues = $(this).data('category').split(' ');

//       // loop over each category value in the current .flower's data-category
//       $.each(currentFilterValues, function(_, currentFilterValue) {

//         // if the current category exists in the selected filters array
//         // set matched to true, and stop looping. as we're ORing in each
//         // set of filters, we only need to match once

//         if ($.inArray(currentFilterValue, filterValues) != -1) {
//           matched = true;
//           return false;
//         }
//       });

//       // if matched is true the current .flower element is returned
//       return matched;

//     });
//   });

//   $('.flower').hide().filter($filteredResults).show();
// }

// $filterCheckboxes.on('change', filterFunc);  


    
   
    // if (count == this.arr[group_i].items[parent_i].childs.length) {
    //   this.arr[group_i].items[parent_i].checked = true;
    
      
        
    //     this.dataSource1.filter = temparr.name.trim().toLowerCase();
    //     this.dataSource2.filter=temparr.name.trim().toLowerCase();
      
    
    // } else  {
    //   this.arr[group_i].items[parent_i].checked = false;
    //   if(count<=1){
    //     this.dataSource1.filter = temparr.name.trim().toLowerCase();
    //     this.dataSource2.filter=temparr.name.trim().toLowerCase();
    //   }
    //   else{
       
    //       this.dataSource1.filter = temparr.name.trim().toLowerCase();
    //       this.dataSource2.filter=temparr.name.trim().toLowerCase();
        
    //   }
      
      
    // }
    // if (this.listChildChanged.findIndex(el => el.id == this.arr[group_i].items[parent_i].childs[i].id) == -1) {
    //   this.listChildChanged.push(this.arr[group_i].items[parent_i].childs[i]);
    // }
  // }

  // getListChildChanged() {
  //   console.log(this.listChildChanged);
  // }
  
   

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

  HistoryDetails=new FormGroup({
    empid :new FormControl(''),

  })
    

//     datePickerFilter(event:Event){
//       this.campaignOne.value
//       this.campaignOne.value.start
//       const filterValue = (event.target as HTMLInputElement).value;
//       this.dataSource1.filter = filterValue.trim().toLowerCase();
//       this.dataSource2.filter = filterValue.trim().toLowerCase();
  
      
//       console.log("datePicker")
//  }

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
    private route: Router
    // private registerService: RegisterserviceService,
  ) {
    // this.designation="softwaremanager";
    // this.department="software";
    //  this.displayedColumns = ['empId','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','reasonForApply'];
    this.dataSource1 = new MatTableDataSource<any>();
    this.dataSource2 = new MatTableDataSource<any>();
  }
 

  ngOnInit(): void {

    

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
    // // Fetching city details
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
        //user
        if (designation == "software trainee" || designation == "Designing" || designation == "Software Devloper" ||
          designation == "Testing" || designation == "Sales" || designation == "Marketing") {
          this.displayedColumns = ['empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'todate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'leavetype', 'reasonForApply'];

          this.historyService.getHistoryBasedOnUser(this.empid).subscribe(
            data => {
              this.displayedColumnsForUser = ['empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'todate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'department', 'leavetype', 'reasonForApply', 'location'];
              this.dataSource1 = new MatTableDataSource(JSON.parse(data));
              this.dataSource1.sort = this.historySort;
              this.dataSource1.paginator = this.historyPaginatorAdmin;

            });



        }
        else if (designation == "HR") {

          this.enableDelete = true;

          //this.display = false;
          this.displayedColumns = ['empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'todate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'department', 'leavetype', 'reasonForApply', 'location', 'delete'];

          this.enable = true;
          this.historyService.getHistory().subscribe(
            data => {

              // this.delShow = true;
              this.displayedColumnsForAdmin = ['empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'todate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'department', 'leavetype', 'reasonForApply', 'location', 'delete'];
              this.employeeData = [];
              for (let value of JSON.parse(data)) {  
                if (this.empid != value.empid) {
                   this.employeeData.push(value);
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
              this.displayedColumnsForUser = ['empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'todate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'department', 'leavetype', 'reasonForApply', 'location'];
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

              this.displayedColumnsForAdmin = ['empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'todate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'department', 'leavetype', 'reasonForApply', 'location', 'delete'];
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


              this.displayedColumnsForUser = ['empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'toDate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'department', 'leavetype', 'reasonForApply', 'location'];

              this.dataSource1 = new MatTableDataSource(JSON.parse(data));
              this.dataSource1.sort = this.historySort;
              this.dataSource1.paginator = this.historyPaginatorAdmin;
            });
        }
      });

    // this.registerService.getMemberDetails(this.empid).subscribe(data => {
    //   let details = JSON.parse(data);
    //   this.role = this.details.designation();


    // }) 
  }

  selectedtab(event: any) {
    if (event.target.innerText == 'My History') {
      this.delShow = false;
    }
    else {
      this.delShow = true;
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

  downloadPdf() {
    this.enable = true;
    // this.historyService.getHistory().subscribe(
    //   data => {
    //   let downloadDetails=JSON.parse(data);


        // this.delShow = true;
        // this.displayedColumnsForAdmin = ['empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'toDate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'department', 'leavetype', 'reasonForApply', 'location', 'delete'];
        // this.employeeData = [];
        // for (let value of JSON.parse(data)) {  
          // if (this.empid != value.empid) {
            //  this.employeeData.push(value);
            // if((value.fromDate == this.campaignTwo.controls.start) && (value.toDate == this.campaignTwo.controls.end)){
            //   employeeData.push(value);
            // }
          
    //  this.empid= sessionStorage.getItem("empid");
    // this.filterHistory.empid = downloadDetails.value.empid;
    //  this.filterHistory.department =downloadDetails.value.department;
    // this.filterHistory.createddate= downloadDetails.value.createddate;
    // this.filterHistory.createddate= downloadDetails.value.fromDate;
    // this.filterHistory.createddate= downloadDetails.value.toDate;
    // this.filterHistory.createddate= downloadDetails.value.lopdays;
    // this.filterHistory.createddate= downloadDetails.value.reasonForApply;
    // this.filterHistory.createddate= downloadDetails.value.noOfDays;
    // this.filterHistory.createddate= downloadDetails.value.createdby;
    // this.filterHistory.createddate= downloadDetails.value.name;
    // this.filterHistory.createddate= downloadDetails.value.leavetype;
    // this.filterHistory.createddate= downloadDetails.value.approvedBy;
    // this.filterHistory.createddate= downloadDetails.value.approvedDate;
    // this.filterHistory.createddate= downloadDetails.value.location;
    this. historyService.putHistory().subscribe(
      data=>{
     this.historypdf.push(this.dataSource2)
    });


    this.spinner = true;
    this.blurMode = true;
    setTimeout(() => {
      this.spinner = false;
      this.blurMode = false;
    }, 2000);
  }



  deleteHistory(historyid: number) {

    this.historyService.deleteHistory(historyid).subscribe(
      data => {
        this.ngOnInit();
        setTimeout(() => {

        }, 2000);
      }


    )
  }
}

function applyFilter(event: Event | undefined, Event: { new(type: string, eventInitDict?: EventInit | undefined): Event; prototype: Event; readonly AT_TARGET: number; readonly BUBBLING_PHASE: number; readonly CAPTURING_PHASE: number; readonly NONE: number; }) {
  throw new Error('Function not implemented.');
}

