import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DishService } from '../dish.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
   productsArray=[]
   username:string
   sum:any
   adish:any
  constructor(private dish:DishService, private router:Router, private us:UserService, private toastr:ToastrService, private cs:CartService) { }

  ngOnInit(): void {
    this.totalSum()
    this.username= localStorage.getItem("username")

    this.us.cartDish({"username":this.username}).subscribe(
      res =>{
        if(res['message'] == "failed"){
          alert(res['reason'])
          localStorage.clear()
          //navigate to login
          this.router.navigateByUrl("/login")
        }
        else{
          //this.totalSum();
          this.productsArray = res['message']
        }
        this.totalSum()
      },
      err =>{
        alert("error in dish")
        console.log(err)
      }
    )
  }


  deleteitem(product){
    let id = product.dishid
    let cartObj = {"username":this.username,"dishid":id}
    this.us.deleteCartItem(cartObj).subscribe(
      res=>{    
          if(res['message'] == "failed"){
            alert(res['reason'])
            localStorage.clear()
            //navigate to login
            this.router.navigateByUrl("/login")
          }
          else{
           // this.productsArray.splice(product,1)
           
            let x=this.productsArray.splice(this.productsArray.findIndex(x => x.dishid ==product.dishid),1)
            alert(res['message'])
          }
          this.totalSum();
          this.us.getCount(this.username).subscribe((res) => {
            this.cs.setNum(res['message'] );
          });
        },
        
        err=>{
          alert("something went wrong")
          console.log(err)
        }
         
    )
    
  }
    
    

    onAddQuantity(product){

      product.quantity=product.quantity+1
      this.totalSum()
      this.add(product)
      
    }

    onRemoveQuantity(product){
      product.quantity=product.quantity-1
      this.totalSum()
      
      this.reduceCartItem(product.dishid)
      
    }
    totalSum(){
      this.sum=0;
      for(let x of this.productsArray){
        this.sum += x.dishprice * x.quantity;
        //console.log(this.sum)
      }
    }

  logout(){
    localStorage.clear()
    this.router.navigateByUrl("/login")
  }

  add(product) {

    this.username = localStorage.getItem("username")

    let productObj = { "username": this.username, "dishid": product.dishid, "dishname": product.dishname, "dishprice": product.dishprice, "dishtype": product.dishtype, "restaurantname": product.restaurantname, "dishdescription": product.dishdescription, "photo": product.photo   }
    
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

            this.us.getCount(product.username).subscribe((res) => {
                this.cs.setNum(res['message']  );
               });
        }
      },
      err => {
        console.log(err)
        alert("something went wrong")
      }
      
    )
     
  }

  reduceCartItem(id)
  {
    
    this.us.reducequantity(this.username,id).subscribe((res)=>{
      if(res['message']=='quantity reduced') {
        this.toastr.success('reduced quantity')
      }
      else if (res['message']=="product removed from cart")
      {
        this.toastr.success('product deleted')
        let x=this.productsArray.splice(this.productsArray.findIndex(x => x.dishid ==id),1)
      }
      else {
        this.toastr.warning('something went wrong')
        console.log(res['err'])
      }
      this.totalSum()
      }
    );
    this.us.getCount(this.username).subscribe((res) => {
      this.cs.setNum(res['message']-1 );
    });

    
  }


  //checkout
  check(){
    this.router.navigateByUrl("userdashboard/checkout")
  }
}
