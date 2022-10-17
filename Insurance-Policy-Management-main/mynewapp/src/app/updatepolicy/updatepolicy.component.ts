import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Policy } from '../policy';
import {FormGroup,FormControl} from '@angular/forms'
import { PolicyService } from '../policy.service';
@Component({
  selector: 'app-updatepolicy',
  templateUrl: './updatepolicy.component.html',
  styleUrls: ['./updatepolicy.component.css']
})
export class UpdatepolicyComponent implements OnInit {

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
  storeMsg :string ="";

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

