import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DishService } from '../dish.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {

  constructor(private dish: DishService, private router: Router, private ar: ActivatedRoute, private toastr: ToastrService) { }

  dishid: String
  Dish: any
  dishArray = []
  username: string
  ngOnInit(): void {

    this.username = localStorage.getItem("username")

    this.dish.getDish({ "username": this.username }).subscribe(
      res => {
        if (res["message"] == "failed") {
          alert(res["reason"])
          //navigate to login
          localStorage.clear()
          this.router.navigateByUrl("/login")
          
        }
        else{
          this.dishArray = res["message"]
        }
        
      },
      err => {
        alert("error in dish")
        console.log(err)
      }
    )


  }

  edit(dishid) {
    this.username = localStorage.getItem("username")
    this.router.navigateByUrl(`admindashboard/editdish/${this.username}/${dishid}`)
    //this.router.navigateByUrl("/editdish")
  }

  delete(dishid, ind) {
    let dishObj = { username: this.username, dishid: dishid }
    
    this.dish.deleteDishId(dishObj).subscribe(
      dish => {
        if (dish["message"] == "Deleted Succusfully") {
          this.toastr.success(dish["message"])
          this.dishArray.splice(ind, 1)
          
        }
        else {

        }
      }
    )
  }

}
