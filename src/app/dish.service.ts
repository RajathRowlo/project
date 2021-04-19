import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private hc:HttpClient) { }

  //create dish
  createDish(dishObj): Observable<any>{
    //dishObj["username"]=localStorage.getItem("username")
    
    return this.hc.post("/dish/createdish",dishObj)

  }

  //get admin seperate dish
  getDish(data): Observable<any>{
    return this.hc.post("/dish/getdish",data)
  }

  //get all dish
  getAllDish(): Observable<any>{
    return this.hc.get("/dish/getalldish")
  }

 

  //update dish
  getDishId (dishObj):Observable<any> {
    return this.hc.post('/dish/getdishid',dishObj)
  }

  updateDish(updateDish): Observable<any> {
    return this.hc.put("/dish/updatedish",updateDish)
  }

  deleteDishId(dishObj): Observable<any> {
    return this.hc.post("/dish/deletedish",dishObj)
  }

  //----------------------------------------------------
  getRestaurant(): Observable<any>{
    return this.hc.get("dish/getrestaurant/r")
  }
}
