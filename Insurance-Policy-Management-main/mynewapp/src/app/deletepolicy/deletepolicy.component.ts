import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Policy } from '../policy';
import {FormGroup,FormControl} from '@angular/forms'
import { PolicyService } from '../policy.service';

@Component({
  selector: 'app-deletepolicy',
  templateUrl: './deletepolicy.component.html',
  styleUrls: ['./deletepolicy.component.css']
})
export class DeletepolicyComponent implements OnInit {

  policies:Array<Policy>=[];
  constructor(public router: Router, public ps:PolicyService) { }


  policyRef = new FormGroup({
    policyNum:new FormControl(),
    name:new FormControl(),
    email:new FormControl(),
    phoneNum:new FormControl(),
    address:new FormControl(),
    policytype:new FormControl(),
    status:new FormControl(),
  })
  storeMsg :string =""

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
  status:number=0;
  
  
  findAllPolicy() {
    this.ps.findAllPolicy().subscribe({
      next:(result:any)=>this.policies=result,
      error:(error:any)=>console.log(error),
      complete:()=>console.log("completed")
    })
  }


  deletePolicy(pid:number){
    //console.log(pid)
    this.ps.deletePolicyById(this.policyNum).subscribe({
      next:(result:any)=>console.log(result),
      error:(error:any)=>console.log(error),
      complete:()=>{
          this.findAllPolicy();   
      }
    })
  } 

  updateDataFromDb(){
    let policy = {userId:this.userId,username:this.name,policytype:this.policytype};
    this.ps.updatePolicy(policy).subscribe({
      next:(result:any)=>console.log(result),
      error:(error:any)=>console.log(error),
      complete:()=>{
          this.findAllPolicy();   
      }
    })
    this.flag=false;
  }
}


