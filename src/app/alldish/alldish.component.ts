import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { DishService } from '../dish.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-alldish',
  templateUrl: './alldish.component.html',
  styleUrls: ['./alldish.component.css']
})
export class AlldishComponent implements OnInit {

  adishArray=[]
  searchText;
  restaurantArray=[]
  constructor( private dish:DishService, private router:Router, private us:UserService, private cs:CartService) { }

   username:string
  ngOnInit(): void {

    this.username= localStorage.getItem("username")

    this.dish.getAllDish().subscribe(
      res =>{
        
        this.adishArray= res["message"]
      
      },
      err =>{
        alert("error in dish")
        console.log(err)
      }
    )

    // //show the restaurant
    // this.dish.getRestaurant().subscribe(
    //   res =>{
    //     this.restaurantArray=res["message"]
    //     console.log(this.restaurantArray)
    //   },
    //   err =>{
    //     alert("error in restaurant")
    //     console.log("err")
    //   }
    // )
    
  }


  //add to cart
  add(adish) {

    this.username = localStorage.getItem("username")

    let productObj = { "username": this.username, "dishid": adish.dishid, "dishname": adish.dishname, "dishprice": adish.dishprice, "dishtype": adish.dishtype, "restaurantname": adish.restaurantname, "dishdescription": adish.dishdescription,"quantity":adish.quantity, "photo": adish.photo   }
    // console.log(productObj)
    //add product to cart
    this.us.addProducttoCart(productObj).subscribe(
      res => {
        if (res["message"] == "failed") {
          alert(res["reason"])
          //navigate to login
          localStorage.clear()
          this.router.navigateByUrl("/login")
          
        }
        else {
          if (res['message'] == "product added to cart") {
            alert(res['message'])
           // this.us.setCartSize(res["cartsize"])
          }
          else if (res['message'] == "Quantity updated") {
            alert(res['message'])
          }
           else {
             alert(res['message'])
             this.router.navigateByUrl("/login")
            }

            this.us.getCount(productObj.username).subscribe((res) => {
                this.cs.setNum(res['message'] );
               });
        }
      },
      err => {
        console.log(err)
        alert("something went wrong")
      }
      
    )
     
  }

  alldish(){
    this.dish.getAllDish().subscribe(
      res =>{
        
        this.adishArray= res["message"]
        console.log(this.adishArray)
      },
      err =>{
        alert("error in dish")
        console.log(err)
      })
  }
  sidedish(){
    let speciality = "Side dish"
    this.us.showSpeciality(speciality).subscribe(
      res =>{
        this.adishArray = res["message"]
        console.log(this.adishArray)
      },
      err =>{
        console.log(err)
        alert("speciality fetch error")
      }
    )
  }

  starters(){

    let speciality = "Starters"
    this.us.showSpeciality(speciality).subscribe(
      res =>{
        this.adishArray = res["message"]
        console.log(this.adishArray)
      },
      err =>{
        console.log(err)
        alert("speciality fetch error")
      }
    )
  }

  maincourse(){
    
    let speciality = "Main Course"
    this.us.showSpeciality(speciality).subscribe(
      res =>{
        this.adishArray = res["message"]
        console.log(this.adishArray)
      },
      err =>{
        console.log(err)
        alert("speciality fetch error")
      }
    )
  }

  Accompaniment(){
    
    let speciality = "Accompaniment"
    this.us.showSpeciality(speciality).subscribe(
      res =>{
        this.adishArray = res["message"]
        console.log(this.adishArray)
      },
      err =>{
        console.log(err)
        alert("speciality fetch error")
      }
    )
  }
  Desert(){
    
    let speciality = "Desert"
    this.us.showSpeciality(speciality).subscribe(
      res =>{
        this.adishArray = res["message"]
        console.log(this.adishArray)
      },
      err =>{
        console.log(err)
        alert("speciality fetch error")
      }
    )
  }

  Softdrinks(){
    
    let speciality = "Soft Drinks"
    this.us.showSpeciality(speciality).subscribe(
      res =>{
        this.adishArray = res["message"]
        console.log(this.adishArray)
      },
      err =>{
        console.log(err)
        alert("speciality fetch error")
      }
    )
  }

  

}



