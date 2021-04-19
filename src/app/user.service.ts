import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  
  constructor(private hc: HttpClient) { }
  
  //create user
  createUser(userObj):Observable<any>{
    return this.hc.post("/user/createuser",userObj)
  }

  //login user
  loginUser (credObj): Observable<any>{
    return this.hc.post("/user/login",credObj)
  }

  //login admin
  loginAdmin (credObj): Observable<any>{
    return this.hc.post("/admin/login",credObj)
  }

  //create admin
  createAdmin(userObj):Observable<any>{
    return this.hc.post("/admin/createadmin",userObj)
  }

  addProducttoCart(productObj):Observable<any>{
    return this.hc.post("/user/addtocart",productObj)
  }

  getCount(username):Observable<any>{
    // console.log("from service",userObj)
    return this.hc.get(`/user/getcount/${username}`)
  }
  

   //get admin seperate dish
  cartDish(data): Observable<any>{
    return this.hc.post("/user/getcart",data)
  }

  deleteCartItem(cartObj):Observable<any>{
    return this.hc.post(`/user/deleteproduct`,cartObj)
 }

 reducequantity(username,id):Observable<any>{
  return this.hc.post(`/user/reducequantity/${username}/${id}`,"")
  }

  showSpeciality(speciality): Observable<any>{
    return this.hc.get(`/user/getspeciality/${speciality}`)
  }
 
}