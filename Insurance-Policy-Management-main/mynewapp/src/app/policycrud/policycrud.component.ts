import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Policy } from '../policy';
import {FormGroup,FormControl} from '@angular/forms'
import { PolicyService } from '../policy.service';

@Component({
  selector: 'app-policycrud',
  templateUrl: './policycrud.component.html',
  styleUrls: ['./policycrud.component.css']
})
export class PolicycrudComponent implements OnInit {

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
  

  storePolicy() {
    let product = this.policyRef.value;
    this.ps.storePolicy(product).subscribe({
      next:(result:any)=>this.storeMsg=result,
      error:(error:any)=>console.log(error),
      complete:()=>console.log("completed")
    })

    this.policyRef.reset();
  }
  
  findAllPolicy() {
    this.ps.findAllPolicy().subscribe({
      next:(result:any)=>this.policies=result,
      error:(error:any)=>console.log(error),
      complete:()=>console.log("completed")
    })
  }

  applyPolicy(policy:any){
    this.flag= true;
    this.userId=policy.userId;
    this.name=policy.name;
    this.policytype=policy.policytype;
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


  updatePolicy(policy:any){
      this.flag= true;
      this.userId=policy.userId;
      this.name=policy.username;
      this.policytype=policy.policytype;
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

