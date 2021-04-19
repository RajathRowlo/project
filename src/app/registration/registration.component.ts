import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  //inject userService
  constructor(private us: UserService, private router: Router, private toastr: ToastrService ) { }

  ngOnInit(): void {
  }
  form = new FormGroup ({

    //checkbox
    usertype : new FormControl ('', []),
    //username
    username : new FormControl ('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(30)
    ]),

    //password
    password : new FormControl ('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15)
    ]),

    //email
    email : new FormControl ('', [
      Validators.required
    ])
  })

  onsubmit(form) {
    let userObj= form.value
    //let adminObj=form.value
    console.log(userObj)
    if(userObj.usertype=="user"){
      

   
    this.us.createUser(userObj).subscribe(
      res => {
          this.toastr.success("user created sucessfully", 'title')
          //navigate to login
          this.router.navigateByUrl("/login")
          //this.form.reset();
          
          // this.closeModalEvent.emit(false)
          

      },
      err => {
        this.toastr.error("User creation error")
        console.log(err)
      }
    )
    }
    else{
      this.us.createAdmin(userObj).subscribe(
        res => {
            this.toastr.success("Admin created sucessfully")
            //navigate to login
            this.router.navigateByUrl("/login")
  
        },
        err => {
          this.toastr.error("Admin creation error")
          console.log(err)
        }
      )
  
    }
  }

  navigate(){
    this.router.navigateByUrl("/login")
  }

  get usertype () {
    return this.form.get("usertype")
  };
  get username () {
    return this.form.get("username")
  };
  get password () {
    return this.form.get('password')
  };
  get email () {
    return this.form.get('email')
  };
  
 
   
}
