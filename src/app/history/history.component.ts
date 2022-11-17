import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { filter } from 'ngx-bootstrap-icons';
;
import { RegisterserviceService } from '../services/registerservice.service';
import { FormGroup } from '@angular/forms';
import { HistoryService } from '../services/historyservice.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
  
})
export class HistoryComponent implements OnInit {
    approved:boolean=false;
    pending:boolean=false;
    cancelled:boolean=false;
    enableDelete: boolean =false;
    empid:any;
   displayedColumns = ['empId','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','department','leavetype','reasonForApply','location','delete'];
 // displayedColumns: any=[];
  Color!:'pink';
  dataSource!: MatTableDataSource<any>; 
  @ViewChild('historySort',{static:false}) historySort!:MatSort;
  element:Element[]=[];
  loading=false;

  @ViewChild('historyPaginator', { static: false }) historyPaginator!: MatPaginator;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  adminView: boolean=true;
  destignation: string="";
  department: string="";
  // hide:boolean=true;


   applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selection = new SelectionModel<Element>(true,[]);
  



  constructor(private historyService: HistoryService,private registerService: RegisterserviceService
            ) { 
              this.destignation="softwaremanager";
              this.department="software";
              //  this.displayedColumns = ['empId','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','reasonForApply'];
        this.dataSource=new MatTableDataSource<any>();
  }
 

  ngOnInit(): void {

sessionStorage.setItem("empId","123456");

    this.historyService.getHistory().subscribe(data=>{
      this.dataSource=new MatTableDataSource(JSON.parse(data))
      this.dataSource.sort=this.historySort;
      this.dataSource.paginator=this.historyPaginator;
      // this.enableDelete=false;  
      // data.array.forEach(let i of this.dataSource => {
        
      // });
      let i=this.dataSource;
       for( i of [this.dataSource]){
       if(JSON.parse(data)[0].department=="hi"){

       }
       }

      if(JSON.parse(data)[0].designation=="SOFTWARE_MANAGER"){
        this.enableDelete=true;
        this.displayedColumns = ['empId','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','department','leavetype','reasonForApply','location','delete'];
      }

      else if(JSON.parse(data).designation=="SOFTWARE_TRAINEE" &&JSON.parse(data).managername=="SATHISH"){
        this.displayedColumns = ['empId','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','reasonForApply',];

      }

      else if(JSON.parse(data).designation=="DESIGNING_MANAGER"){
        this.displayedColumns = ['empId','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','department','leavetype','reasonForApply','location','delete'];
        
      }

      else if(JSON.parse(data).designation=="DESIGNING" && JSON.parse(data).managername=="MANOJ"){
        this.displayedColumns = ['empIthisd','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','reasonForApply',];

      }

    else if(JSON.parse(data).designation=="TESTING_MANAGER"){
      this.displayedColumns = ['empId','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','department','leavetype','reasonForApply','location','delete'];

    }

    else if(JSON.parse(data).designation=="TESTING" &&JSON.parse(data).managername=="VINOTH"){
      this.displayedColumns = ['empId','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','reasonForApply',];

    }
    else if(JSON.parse(data).designation=="SALES_MANAGER"){
      this.displayedColumns = ['empId','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','department','leavetype','reasonForApply','location','delete'];

    }
    else if(JSON.parse(data).designation=="SALES" &&JSON.parse(data).managername=="AZHAGESAN"){
      this.displayedColumns = ['empId','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','reasonForApply',];

    }
    else if(JSON.parse(data).designation=="MARKETING_MANAGER"){
      this.displayedColumns = ['empId','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','department','leavetype','reasonForApply','location','delete'];
    }
    else if(JSON.parse(data).designation=="MARKETING" &&JSON.parse(data).managername=="AZHAGESAN"){
      this.displayedColumns = ['empId','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','reasonForApply',];


    }
      // if(this.destignation=="User"){
      //   this.displayedColumns = ['empId','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','reasonForApply',];
      // }
      // else if(this.destignation=="softwareManager" && this.department=="software"){
       
      // }
      // else{
      //   this.displayedColumns = ['empId','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','reasonForApply'];
      //   this.dataSource=new MatTableDataSource<any>();
      // }
    }
    
    )
    // this.registerService.getForm().subscribe(data=>{
      
    // })
    // this.destignation= this.displayedColumns.value.status;
    // console.log(this.destignation)

  }

   onSelectToggled(element:Element){
     this.selection.toggle(element);
    if(this.selection.toggle['length'] && this.dataSource.filteredData.findIndex['length']){
      this.enableDelete=true;
    }
    // else if(this.selection.deselect(...this.dataSource.filteredData)&& this.dataSource.filteredData.findIndex['length']){
    //   this.enableDelete=false;
    // }
  }

  // selectAll(){
  //   this.selection.selected
  // }

   isAllSelected(){
     return this.selection.selected.length == this.dataSource.filteredData.length;

  }

   toggleAll(){
    if(this.isAllSelected()){
      this.selection.clear();
     }
      else{
      this.selection.select(...this.dataSource.filteredData);
    }
  }



  deleteHistory(historyid:number) {  
   
     this.historyService.deleteHistory(historyid).subscribe(
      data => {
        this.ngOnInit();
        setTimeout(() => {
         
          }, 2000);
      }

  
     )
  }
  

}

