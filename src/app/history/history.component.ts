import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { clipboardCheck, filter, valentine } from 'ngx-bootstrap-icons';
import { DatePipe } from '@angular/common'
  ;
import { RegisterserviceService } from '../services/registerservice.service';
import { FormGroup, FormControl, NgModel, Validators } from '@angular/forms';
import { HistoryService } from '../services/historyservice.service';
import { Router } from '@angular/router';
import { start, State } from '@popperjs/core';
import { ApplyLeave } from '../models/apply-leave.model';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { state, trigger } from '@angular/animations';
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

  filterHistory = new ApplyLeave();
  filterdate: any;
  spinner: boolean = false;
  blurMode: boolean = false;
  display: boolean = true;
  enable: boolean = false;
  approved: boolean = false;
  pending: boolean = false;
  cancelled: boolean = false;
  enableDelete: boolean = false;
  viewer: boolean = false;
  viewerFlag: boolean = false;
  emptyMessage: boolean = false;
  userEmptyMessage: boolean = false;
  myHistory: boolean = true;
  showSubmenu: boolean = false;
  empid: any;
  displayedColumns = ['empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'toDate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'department', 'leaveType', 'reasonForApply', 'location', 'delete'];
  // displayedColumns: any=[];
  Color!: 'pink';
  dataSource1!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;
  matDatepickerFilter!: MatTableDataSource<any>;
  matDatepickerFilter1!: MatTableDataSource<any>;
  @ViewChild('historySort', { static: false }) historySort!: MatSort;
  element: Element[] = [];
  loading = false;
  formGroup: any;

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
  deleteRow: any = [];
  modalReference: any;
  displayedColumnsForUser: any;
  displayedColumnsForAdmin: any;
  delShow: boolean = false;
  hideShow: boolean = false;
  showTIC: boolean = false;
  state: any = [];
  country: any = [];
  city: any = [];
  tempStateName: any = [];
  tempCityName: any = [];
  employeeData: any = [];
  stateList: any = [];
  basicStart: any;
  fromDate!: string;
  toDate!: string;
  historypdf: any = [];
  empArr: any;
  HRdata: any = [];
  countryList: any;
  tempCountry: any = [];
  tempState: any = [];
  Selection: any;
  isExpanded: any;
  isShowing: boolean = false;
  autosize: boolean = false;
  selectedRowIndex: any;
  selectedRowIndexType: any;
  selectedRowIndexSub: any;
  filterFromDate:any;
  filterToDate:any;
  submitted: boolean = false;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
  HistoryDetails = new FormGroup({
    empid: new FormControl(''),

  })
  range!: any;
  dateRange = new FormGroup({
    startDate: new FormControl('',Validators.required),
    endDate: new FormControl('',Validators.required)
  })
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
    private route: Router, private modalService: NgbModal, private siteService: CscService
    // private registerService: RegisterserviceService,
  ) {
    // this.designation="softwaremanager";
    // this.department="software";
    //  this.displayedColumns = ['empId','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','reasonForApply'];
    this.dataSource1 = new MatTableDataSource<any>();
    this.dataSource2 = new MatTableDataSource<any>();

  }
  listChildChanged: any = [];
  arr = [
    {
      id: "group_1",
      name: "",
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
              expand: false,
              childs: []
            },
            {
              id: "group_1.abc.action_Edit",
              name: "Sales",
              checked: false,
              expand: false,
              childs: []
            },
            {
              id: "group_1.abc.action_Delete",
              name: "Designing",
              checked: false,
              expand: false,
              childs: []
            },
            {
              id: "group_1.abc.action_Print",
              name: "Marketing",
              checked: false, expand: false,
              childs: []
            },
            {
              id: "group_1.abc.action_Print",
              name: "Testing",
              checked: false,
              expand: false,
              childs: []
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
              expand: true,
              childs: this.tempCountry
            }
            // {
            //   id: "group_1.def.action_Edit",
            //   name: "State",
            //   checked: false,
            //   expand:true
            // },
            // {
            //   id: "group_1.def.action_Delete",
            //   name: "City",
            //   checked: false,
            //   expand:true
            // }

          ]
        }
      ]
    }
  ]

  // dataSource = new MatTableDataSource<Element>();


  checkMinusSquare(item: any) {
    const count = item.childs.filter((x: { checked: boolean; }) => x.checked == true).length;
    if (count > 0 && count < item.childs.length) {
      return true;
    } else if (count == 0) {
      return false;
    }
    return null;
  }

  checkParent(group_i: any, i: any) {
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

  checkChild(group_i: any, parent_i: any, i: any) {

    let tempDepartment: any = []
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
      if (this.arr[group_i].items[parent_i].childs[i].checked == true) {
        this.listChildChanged.push(this.arr[group_i].items[parent_i].childs[i])

      }
      // this.listChildChanged.push(this.arr.push(this.arr[group_i].items[parent_i].childs[i]));
    }
    for (let z of this.employeeData) {
      for (let y of this.listChildChanged) {
        if (y.checked) {
          if (y.name == z.department) {
            tempDepartment.push(z)
          }
        }
      }
    }
    this.dataSource2 = new MatTableDataSource(tempDepartment);
    this.dataSource2.sort = this.historySort;
    this.dataSource2.paginator = this.historyPaginatorUser;
  }
  checkChild2(group_i: any, parent_i: any, i: any, l: any) {

    let tempDepartment: any = []
    this.arr[group_i].items[parent_i].childs[i].childs[l].checked = !this.arr[group_i]
      .items[parent_i].childs[i].childs[l].checked;
    const count = this.arr[group_i].items[parent_i].childs[i].childs.filter(
      (el: { checked: boolean; }) => el.checked == true
    ).length;
    if (count == this.arr[group_i].items[parent_i].childs[i].childs.length) {
      this.arr[group_i].items[parent_i].childs[i].checked = true;
    } else {
      this.arr[group_i].items[parent_i].childs[i].checked = false;
    }
    if (this.listChildChanged.findIndex((el: { [x: string]: string; }) => el['id'] == this.arr[group_i].items[parent_i].childs[i].childs[l].id) == -1) {
      console.log(this.arr[group_i].items[parent_i].childs[i]);
      if (this.arr[group_i].items[parent_i].childs[i].childs[l].checked == true) {
        this.listChildChanged.push(this.arr[group_i].items[parent_i].childs[i].childs[l])

      }
      // this.listChildChanged.push(this.arr.push(this.arr[group_i].items[parent_i].childs[i]));
    }
    //   for(let z of this.employeeData){
    //     for(let y of this.listChildChanged){
    //       if(y.checked){
    //         if(y.name==z.department){
    //           tempDepartment.push(z)
    //         }
    //       }
    //     }
    //   }
    //   this.dataSource2 = new MatTableDataSource(tempDepartment);
    //   this.dataSource2.sort = this.historySort;
    //   this.dataSource2.paginator = this.historyPaginatorUser;
  }
  checkChild3(group_i: any, parent_i: any, i: any, l: any, m: any) {

    let tempDepartment: any = []
    this.arr[group_i].items[parent_i].childs[i].childs[l].stateList[m].checked = !this.arr[group_i]
      .items[parent_i].childs[i].childs[l].stateList[m].checked;
    const count = this.arr[group_i].items[parent_i].childs.filter(
      (      el: { checked: boolean; }) => el.checked == true
    ).length;
    if (count == this.arr[group_i].items[parent_i].childs.length) {
      this.arr[group_i].items[parent_i].checked = true;
    } else {
      this.arr[group_i].items[parent_i].checked = false;
    }
    if (this.listChildChanged.findIndex((el: { [x: string]: string; }) => el['id'] == this.arr[group_i].items[parent_i].childs[i].childs[l].stateList[m].id) == -1) {
      console.log(this.arr[group_i].items[parent_i].childs[i]);
      if (this.arr[group_i].items[parent_i].childs[i].checked == true) {
        this.listChildChanged.push(this.arr[group_i].items[parent_i].childs[i].childs[l].stateList[m])

      }
      // this.listChildChanged.push(this.arr.push(this.arr[group_i].items[parent_i].childs[i]));
    }
    // for(let z of this.employeeData){
    //   for(let y of this.listChildChanged){
    //     if(y.checked){
    //       if(y.name==z.department){
    //         tempDepartment.push(z)
    //       }
    //     }
    //   }
    // }
    // this.dataSource2 = new MatTableDataSource(tempDepartment);
    // this.dataSource2.sort = this.historySort;
    // this.dataSource2.paginator = this.historyPaginatorUser;
  }
  checkChild4(group_i: any, parent_i: any, i: any, l: any, m: any, n: any) {

    let tempDepartment: any = []
    this.arr[group_i].items[parent_i].childs[i].childs[l].stateList[m].cityList[n].checked = !this.arr[group_i]
      .items[parent_i].childs[i].childs[l].stateList[m].cityList[n].checked;
    const count = this.arr[group_i].items[parent_i].childs[i].childs[l].stateList[m].cityList.filter(
      (el: { checked: boolean; }) => el.checked == true
    ).length;
    if (count == this.arr[group_i].items[parent_i].childs[i].childs[l].stateList[m].cityList.length) {
      this.arr[group_i].items[parent_i].childs[i].childs[l].stateList[m].checked = true;
    } else {
      this.arr[group_i].items[parent_i].childs[i].childs[l].stateList[m].checked = false;
    }
    if (this.listChildChanged.findIndex((el: { [x: string]: string; }) => el['id'] == this.arr[group_i].items[parent_i].childs[i].childs[l].stateList[m].id) == -1) {
      console.log(this.arr[group_i].items[parent_i].childs[i]);
      if (this.arr[group_i].items[parent_i].childs[i].childs[l].stateList[m].cityList[n].checked == true) {
        this.listChildChanged.push(this.arr[group_i].items[parent_i].childs[i].childs[l].stateList[m].cityList[n])

      }
      // this.listChildChanged.push(this.arr.push(this.arr[group_i].items[parent_i].childs[i]));
    }
    for (let z of this.employeeData) {
      for (let y of this.listChildChanged) {
        if (y.checked) {
          if (y.name == z.location) {
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

    this.dateRange.reset();
    this.submitted = false;
    this.siteService.retrieveCountry().subscribe(
      data => {
        this.countryList = JSON.parse(data);
        console.log(this.countryList)
        for (let i of this.countryList) {
          this.appendAdditional(i)
        }
      }
    )
    this.range = new FormGroup({
      start: new FormControl(''),
      end: new FormControl(''),
    });

    this.empid = sessionStorage.getItem('empid');
    let designation = '';
    this.registerService.getForm(this.empid).subscribe(
      data => {
        designation = JSON.parse(data).designation;
        let emailId = JSON.parse(data).emailId;
        if (emailId == "gk@capeindia.net") { 
          this.historyService.getHistoryDetails().subscribe(
            data => {
              this.displayedColumnsForAdmin = ['select', 'empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'todate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'department', 'leaveType', 'reasonForApply', 'location', 'delete'];
              // this.HRdata;
              for (let value of JSON.parse(data)) {
                if (designation == "HR") {
                  if (value.status != "not submitted") 
                    this.HRdata.push(value);
                }
              }
            }
          )
        };

        //user
        if (designation == "Software Engineer trainee" || designation == "Designing" || designation == "Software Devloper" ||
          designation == "Testing" || designation == "Sales" || designation == "Marketing") {
          this.getHistoryBasedOnUser("user");
          this.viewer = true;
          this.viewerFlag = true;
        }
        else if (designation == "HR") {
          this.enableDelete = true; 
          this.displayedColumns = ['empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'todate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'department', 'leaveType', 'reasonForApply', 'location', 'delete'];
          this.enable = true;
          this.historyService.getHistoryDetails().subscribe(
            data => {
              if (data !=null && JSON.parse(data).length!=0) {
                let flag = true;
                this.displayedColumnsForAdmin = ['select', 'empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'todate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'department', 'leaveType', 'reasonForApply', 'location', 'delete'];
                this.employeeData = [];
                for (let value of JSON.parse(data)) {
                  if (this.empid != value.empid && value.status != "not submitted") {
                    this.employeeData.push(value);
                    this.empArr = this.employeeData;
                    flag = false;
                  }
                }
                if(flag){ 
                  this.userEmptyMessage = true;
                }
                this.dataSource2 = new MatTableDataSource(this.employeeData);
                this.dataSource2.sort = this.historySort;
                this.dataSource2.paginator = this.historyPaginatorUser;
              }
            }); 
          this.getHistoryBasedOnUser("HR");
        }
        //Admin
        else {
          this.enableDelete = true; 
          this.enable = true;
          this.historyService.getHistoryBasedOnRole(JSON.parse(data).department).subscribe(
            data => {
              let flag = true;
              if ( data !=null && JSON.parse(data).length != 0) {
                this.displayedColumnsForAdmin = ['select','empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'todate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'department', 'leaveType', 'reasonForApply', 'location', 'delete'];
                let employeeData = [];
                for (let value of JSON.parse(data)) {
                  if (this.empid != value.empid) {
                    if (value.status != "not submitted")
                      employeeData.push(value);
                      flag = false;
                  }
                  if (flag) {
                    this.userEmptyMessage = true;
                  }
                  this.dataSource2 = new MatTableDataSource(employeeData);
                  this.dataSource2.sort = this.historySort;
                  this.dataSource2.paginator = this.historyPaginatorUser;
                }
              }
            }); 
            this.getHistoryBasedOnUser("Admin");
        }
      });
  }

  getHistoryBasedOnUser(user:any) {
    this.historyService.getHistoryBasedOnUser(this.empid).subscribe(
      data => {
        let flag = true;
        let notsubmitData = [];
        if (JSON.parse(data).length != 0) {
          this.displayedColumnsForUser = ['empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'todate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'department', 'leaveType', 'reasonForApply', 'location'];
          for (let value of JSON.parse(data)) {
            if (value.status != "not submitted") {
              notsubmitData.push(value);
              flag = false;
            }
          }
        }
        if (flag) {
          if(user != 'user'){
            this.emptyMessage = true;
          }
          else{
            this.userEmptyMessage = true;
          } 
        }
        this.dataSource1 = new MatTableDataSource(notsubmitData);
        this.dataSource1.sort = this.historySort;
        this.dataSource1.paginator = this.historyPaginatorAdmin;
      });
  }


  tabClick(tab: any) {
    if (tab.index == 1) {
      this.hideShow = true;
      this.delShow = true;
    }
    else if (tab.index == 0) {
      this.hideShow = false;
      this.delShow = false;
    }
  }
  historyData() {
    this.basicStart
  }
  back() {
    this.route.navigate(['/home'])
  }
  Admin() {

  }
  //   highlight(type:any){
  //     this.selectedRowIndex = type;
  //     this.selectedRowIndexType="";
  //     this.selectedRowIndexSub ="";
  //  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;

    const numRows = this.dataSource2.data.length;


    return numSelected === numRows;


  }


  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource2.data.forEach(row => this.selection.select(row));
    this.deleteRow.push(this.selection.selected);
  }

  historyName() {
    this.delShow = false;

  }
  appendAdditional(value: any) {
    this.tempState = []
    let tempObj: any = {
      countryid: value.countryid, name: value.name, code: value.code, checked: false,
      expand: true,
      stateList:
        this.appendAdditionalState(value.stateList)
    }
    this.tempCountry.push(tempObj)
  }
  appendAdditionalState(value: any) {
    for (let i of value) {
      if (i.name == "Tamil Nadu") {
        this.tempState.push({
          stateid: i.stateid, countryid: i.countryid, code: i.code, name: i.name, checked: false,
          expand: true,
          cityList: [
            {
              cityid: 1, stateid: i.stateid, code: "CHN", name: "Chennai", checked: false,
              expand: true
            },
            {
              cityid: 2, stateid: i.stateid, code: "NGR", name: "Nagarkovil", checked: false,
              expand: true
            }

          ]
        })
      }
      else {
        this.tempState.push({
          stateid: i.stateid, countryid: i.countryid, code: i.code, name: i.name, checked: false,
          expand: true, cityList: []
        })
      }
    }
    return this.tempState
  }
  reset(){
    this.ngOnInit();
  }
  date() {
    this.submitted = true;
    if(this.dateRange.invalid){
      return
    }
    console.log(this.employeeData + " " + this.filterFromDate + " " + this.filterToDate)
    let tempdata: any = []

    for (let i of this.employeeData) {
      let tempFromDate = new Date(i.fromdate)
      let tempEndDate = new Date(i.todate)
      if (tempFromDate >=  new Date(this.range.value.start) && tempEndDate <= new Date(this.range.value.end)) {
        tempdata.push(i);
      }
    }
    this.dataSource2 = new MatTableDataSource(tempdata);
    this.dataSource2.sort = this.historySort;
    this.dataSource2.paginator = this.historyPaginatorUser;
  }
  FromDate(event:any){
    debugger
    this.filterFromDate = event.target.value;
console.log(event);

  }
  filterToDates(event:any){
    debugger
    this.filterToDate = event.target.value;
  }
  datechanger() {
    if (this.range.value.start == null && this.range.value.end == null) {
      this.ngOnInit();
    }
  }
  downloadPdf() {
    this.enable = true;
    let listOfHistoryData = [];
    for (let historyData of this.dataSource2.filteredData) {
      historyData.toDate = new Date(historyData.todate).toLocaleDateString();
      historyData.todate = null;
      historyData.fromDate = new Date(historyData.fromdate).toLocaleDateString();
      historyData.fromdate = null;
      listOfHistoryData.push(historyData);
    }
    this.historyService.putHistory(listOfHistoryData)
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
  deleteAllHistory(DeleteTemplate: any) {
    this.modalReference = this.modalService.open(DeleteTemplate, { centered: true, size: "md" })
  }
  deleteTempl(ChangetheStatus: any) {
    this.modalReference = this.modalService.open(ChangetheStatus, { centered: true, size: "md" })
  }
  closeTemp() {
    console.log(this.selection.selected)
    this, this.modalReference.close();
  }
  mouseleave(event: any) {
    if (!this.isExpanded) {
      this.isShowing = false;
      //this.sidenavWidth = 4;
      this.autosize = true;
      //setTimeout(() => this.autosize = false, 1);
    }
  }
  detectFun() {
    if (this.isExpanded) {
      this.isShowing = false;
      //this.sidenavWidth = 4;
      this.autosize = true;
      //setTimeout(() => this.autosize = false, 1);
    }
  }
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
      //this.sidenavWidth = 4;
      this.autosize = false;
      // setTimeout(() => this.autosize = false, 1);
    }
  }
  updatecalculation(historyid: any, empid: String, status: any) {
    if (status == "Approved") {
      let changeStatus = "cancelled";
      this.historyService.revertcalculation(historyid, empid, changeStatus).subscribe(
        data => {
          this.modalReference.close();
          this.ngOnInit();
          console.log(changeStatus);
        }

      )
    }

  }

get f():any{
  return this.dateRange.controls;
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
  selectedDeleterows() {
    this.deleteRow = this.selection.selected;
    this.historyService.selectedDeleteAllHistory(this.deleteRow).subscribe(
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

