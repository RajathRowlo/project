import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DishService } from '../dish.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  username:string
  constructor(private dish: DishService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    //get username from local storage
    this.username=localStorage.getItem("username")
  }

 

  logOut(){
    localStorage.clear();
    //navigate to login
    this.router.navigateByUrl("/login")
  }
 

 
 

}
