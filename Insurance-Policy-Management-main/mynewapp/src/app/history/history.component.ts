import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Policy } from '../policy';
import { PolicyService } from '../policy.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  
  policies:Array<Policy>=[];

  constructor(public router: Router,
    public ps:PolicyService) { }

  ngOnInit(): void {
    this.findAllPolicy();
  }
  flag:boolean = false;
  policyNum:number =0;
  userId:number=0;
  email:string="";
  address:string="";
  phoneNum:number=0;
  name:string ="";
  policytype:string ="";
  status:string="";
  
  
  findAllPolicy() {
    this.ps.findAllPolicy().subscribe({
      next:(result:any)=>this.policies=result,
      error:(error:any)=>console.log(error),
      complete:()=>console.log("completed")
    })
  }

}
