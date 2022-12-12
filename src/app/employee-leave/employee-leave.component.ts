import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from '../models/register';
import { LeaveStatusServiceService } from '../services/leave-status-service.service';
import { RegisterserviceService } from '../services/registerservice.service';

@Component({
  selector: 'app-employee-leave',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.css']
})
export class EmployeeLeaveComponent implements OnInit {
  members: any=[];
  filter:any;
  department: any;
  name: any;
  designation: any;
  city: any;
  empid: any;
  managerName: any;
  location: string='';
  leftoverApproval: any;
  personDetails= new Register();

  constructor(private teamdetails: RegisterserviceService, private registerDetails: LeaveStatusServiceService,
    private route:Router) { }

  ngOnInit(): void {
    this.empid = sessionStorage.getItem('empid');
this.registerDetails.getMemberDetails(this.empid).subscribe(
      data => {
        this.personDetails = JSON.parse(data);
        this.name=this.personDetails.name;
        this.department=this.personDetails.department;
        this.designation=this.personDetails.designation;
        this.managerName=this.personDetails.managername;
        this.city=this.personDetails.city
      });
    this.teamdetails.getEmpid().subscribe(
      data => {
        this.leftoverApproval =JSON.parse(data)
        for (let team of this.leftoverApproval) {
         if(team.managername==this.name && team.department==this.department && team.city==this.city){
          console.log("same location")
          this.members.push(team);
          console.log(this.members)
  }
        }
      });
      }
      searchname(){

      }
      backHome(){
        this.route.navigate(['/home']);
      }

    }
//   myFunction() {
//     var input, filter, ul, li, a, i, txtValue;
//     input = document.getElementById("myInput");
//     filter = input.value.toUpperCase();
//     ul = document.getElementById("myUL");
//     li = ul.getElementsByTagName("li");
//     for (i = 0; i < li.length; i++) {
//         a = li[i].getElementsByTagName("a")[0];
//         txtValue = a.textContent || a.innerText;
//         if (txtValue.toUpperCase().indexOf(filter) > -1) {
//             li[i].style.display = "";
//         } else {
//             li[i].style.display = "none";
//         }
//     }
// }

