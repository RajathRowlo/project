import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  //username: String
  Name=""
  

  constructor(private router: Router, private us:UserService, private cs:CartService) { }
  num=0
  ngOnInit(): void {
    //get username from local storage
    this.Name=localStorage.getItem("username")

    let nameOrg = this.Name;
   
    this.Name = this.Name.charAt(0).toUpperCase() + this.Name.slice(1)
 
     this.us.getCount(nameOrg).subscribe(res=>{
       this.num =res['message']
       //this.cs.setNum(res['message'])
     })
     this.cs.getNum().subscribe(numValue=>this.num=numValue);
  }

  logOut(){
    localStorage.clear();
    //navigate to login
    this.router.navigateByUrl("/login")
  }


}
