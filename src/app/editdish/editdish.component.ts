import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DishService } from '../dish.service';

@Component({
  selector: 'app-editdish',
  templateUrl: './editdish.component.html',
  styleUrls: ['./editdish.component.css']
})
export class EditdishComponent implements OnInit {

  constructor(private ar: ActivatedRoute, private dish: DishService, private toastr: ToastrService, private router: Router) { }
  username: String
  dishid: String
  Dish: any
  ngOnInit(): void {

    this.ar.params.subscribe(
      res => {
        this.username = res.username

        this.dishid = res.dishid

        let dishObj = { username: this.username, dishid: this.dishid }

        this.dish.getDishId(dishObj).subscribe(
          dish => {
            this.Dish = dish['message']

          }
        )
      },

      err => {

      }
    )
  }
  onSubmit(formRef) {

    this.dish.updateDish(formRef.value).subscribe(

      res => {
        if(res["message"] ==  "Dish Updated"){
          this.toastr.success("Dish Updated")
          this.router.navigateByUrl("admindashboard/dish")
          }
      },
      err => {
        this.toastr.error("Error in update")
      }
    )
  }



}
