import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

    //read token from localstorage
    let token=localStorage.getItem("token");

    //if token is not existed
    if(token==undefined){
     return next.handle(req);
    }
    else{
      //add token to header of reqObj
     let modifiedReqObj= req.clone({
        headers:req.headers.set("Authorization","Bearer "+token)
      })
      //forward reqObj to next
      return next.handle(modifiedReqObj)
    }
    
  }
}
