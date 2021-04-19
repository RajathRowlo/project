import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  Banks= ["SBI","HDFC Bank", "ICICI Bank", "Union Bank", "Canara Bank"]
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form){

  }

  form = new FormGroup({
    username : new FormControl ('',[]),
    emailid : new FormControl ('',[]),
    country : new FormControl ('',[]),
    address : new FormControl ('',[]),
    zip : new FormControl ('',[]),
  })

  payment = new FormGroup({
    name : new FormControl ('',[]),
    cnum : new FormControl ('',[]),
    exp : new FormControl ('',[]),
    cvv : new FormControl ('',[]),
  })
}
