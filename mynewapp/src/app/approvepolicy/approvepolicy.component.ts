import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApproveService } from '../approve.service';
import { ApproveserService } from '../approveser.service';
import { PolicyModel } from './policy.model';
import { PolicyModel1 } from './policy.model1';
import { PolicyData } from './policydata.model';

@Component({
  selector: 'app-approvepolicy',
  templateUrl: './approvepolicy.component.html',
  styleUrls: ['./approvepolicy.component.css']
})
export class ApprovepolicyComponent implements OnInit {

  isDisabled=true;
  backendurl="http://localhost:8080/admin";
  public policyForm!:FormGroup;
  fetchedPolicy: PolicyData[]=[];
  policyObj: PolicyModel = new PolicyModel();
  
  constructor(private http: HttpClient,private formBuilder:FormBuilder, private approveSer: ApproveService) { }
  ngOnInit(): void {
    this.policyForm=this.formBuilder.group({
      policyId:[''],
      userId:[''],
      policyType:{value:'', disabled: this.isDisabled},
      policyNum:{value:'', disabled: this.isDisabled},
      approval:[''],
    })
    
    this.fetchPolicy();
  }

  fetchPolicy(){
    this.http.get(this.backendurl+"/policy/approval").subscribe((result:any)=>{
      this.fetchedPolicy=result;
      console.log(this.fetchedPolicy);
    })
  }

    onApprove(policy:any){
      this.policyObj.policyId=policy.policyId;
      policy.approval=1;
      this.policyForm.controls['policyId'].setValue(policy.policyId);
      this.policyForm.controls['userId'].setValue(policy.userId);
      this.policyForm.controls['policyNum'].setValue(policy.policyNum);
      this.policyForm.controls['policyType'].setValue(policy.policyType);
      this.policyForm.controls['approval'].setValue(policy.approval);
      console.log("Approve Status:",policy.approval);
    }

    approve(){
      this.policyObj.userId=this.policyForm.value.userId;
      this.policyObj.policyType=this.policyForm.value.policyType;
      this.policyObj.policyNum=this.policyForm.value.policyNum;
      this.policyObj.approval=1;

      this.approveSer.approvePolicy(this.policyObj,this.policyObj.userId,this.policyObj.policyId)
      .subscribe(res=>{
        alert("User Policy Approved");
        this.policyForm.reset();
        this.fetchPolicy();
      },err=>{
        alert("Something Wrong");
      })
    }

    onDisapprove(policy:any){
      this.policyObj.policyId=policy.policyId;
      policy.approval=2;
      this.policyForm.controls['policyId'].setValue(policy.policyId);
      this.policyForm.controls['userId'].setValue(policy.userId);
      this.policyForm.controls['policyNum'].setValue(policy.policyNum);
      this.policyForm.controls['policyType'].setValue(policy.policyType);
      this.policyForm.controls['approval'].setValue(policy.approval);
      console.log("Disapprove Status:",policy.approval);
      console.log("PID1",this.policyObj.policyId);
    }

    disApprove(){
      this.policyObj.policyId=this.policyForm.value.policyId;
      this.policyObj.userId=this.policyForm.value.userId;
      this.policyObj.policyType=this.policyForm.value.policyType;
      this.policyObj.policyNum=this.policyForm.value.policyNum;
      this.policyObj.approval=2;
      console.log("PID1",this.policyObj.policyId);

      this.approveSer.approvePolicy(this.policyObj,this.policyObj.userId,this.policyObj.policyId)
      .subscribe(res=>{
        alert("User Policy Disapproved");
        this.policyForm.reset();
        this.fetchPolicy();
      },err=>{
        console.log("PID1",this.policyObj.policyId);
        alert("Something Wrong");
        console.log("PID1",this.policyObj.policyId);
      })
    }
}
