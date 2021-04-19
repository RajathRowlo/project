import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-port',
  templateUrl: './port.component.html',
  styleUrls: ['./port.component.css']
})
export class PortComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  create(){
    this.router.navigateByUrl("admindashboard/createdish")
  }
  admindish(){
    
    this.router.navigateByUrl("admindashboard/dish")
  }
}
