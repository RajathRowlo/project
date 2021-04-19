import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import * as EventEmitter from 'node:events';

import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @Output() closeModalEvent = new EventEmitter<any>();
   @ViewChild('closebutton') closebutton;
  constructor(private us: UserService, private router:Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  // public onSave() {
  //   this.closebutton.nativeElement.click();
  // }
  onSubmit(formRef) {
    let credObj = formRef.value;

    //ifuser
    if (credObj.usertype == "user") {

      delete credObj.usertype;
      this.us.loginUser(credObj).subscribe(
        res => {
         if(res["message"]=="login succuess"){

          //save token and username in browsers memory
          localStorage.setItem("token",res["token"])
          localStorage.setItem("username",res["username"])

          //navigate to userdashboard
          this.router.navigateByUrl("/userdashboard")
         }
         else{
           this.toastr.error(res["message"])
         }
        },
        err => {
          this.toastr.error("something is wrong in user login")
          console.log(err)
        }
      )
    }
    else{
      delete credObj.usertype;
      this.us.loginAdmin(credObj).subscribe(
        res => {
         if(res["message"]=="login succuess"){

          //save token and username in browsers memory
          localStorage.setItem("token",res["token"])
          localStorage.setItem("username",res["username"])

          //navigate to userdashboard
          this.router.navigateByUrl("/admindashboard")
         }
         else{
           this.toastr.error(res["message"])
         }
        },
        err => {
          this.toastr.error("something is wrong in user login")
          console.log(err)
        }
      )
    }
  }


  

  move(){
    this.router.navigateByUrl("/registration")
  }
}
