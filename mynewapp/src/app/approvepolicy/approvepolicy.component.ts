import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApproveserService } from '../approveser.service';
import { PolicyModel } from './policy.model';
import { PolicyData } from './policydata.model';

@Component({
  selector: 'app-approvepolicy',
  templateUrl: './approvepolicy.component.html',
  styleUrls: ['./approvepolicy.component.css']
})
export class ApprovepolicyComponent implements OnInit {

  backendurl="http://localhost:8080/admin";
  fetchedPolicy: PolicyData[]=[];
  policyObj: PolicyModel = new PolicyModel();
  
  constructor(private http: HttpClient, private approveSer: ApproveserService) { }
  public  approve = "Pending";
  ngOnInit(): void {
    
    this.fetchPolicy();
  }

  fetchPolicy(){
    this.http.get(this.backendurl+"/policy/approval").subscribe((result:any)=>{
      this.fetchedPolicy=result;
      console.log(this.fetchedPolicy);
    })
  }

  // onApprove(){
  //  alert("Policy Approved");
  //   this.approve="Approved";
  //   }

  //   onDisapprove(){
  //     alert("Policy Disapproved");
  //     this.approve="Disapproved";
  //   }

  onApprove(policy:any){
    this.policyObj.userId=policy.userId;
    this.policyObj.policyId=policy.policyId;
    this.policyObj.policyNum=policy.policyNum;
    this.policyObj.policyType=policy.policyType;
    this.policyObj.approval=policy.approval;
    console.log("Before assigning:",this.policyObj.approval);
    this.policyObj.approval=1;
    console.log("User Id:",this.policyObj.userId);
    console.log("Policy Id:",this.policyObj.policyId);
    console.log("After assigning:",this.policyObj.approval);

    this.approveSer.approveStatus(this.policyObj,this.policyObj.userId,this.policyObj.policyId)
    .subscribe(res=>{
      alert("Status Approved");
      this.fetchPolicy();
    },err=>{
      alert("Status Error");
    })
    // this.http.put<any>(this.backendurl+"/uid/policy/pid",uid,pid).subscribe(res=>{
    //   alert("Policy Approved");
    //   this.fetchPolicy();
    //   console.log(policy);
    // },err=>{
    //   alert("Something went wrong");
    // })
  }

  onDisapprove(policy:any){
    this.policyObj.userId=policy.userId;
    this.policyObj.policyId=policy.policyId;
    this.policyObj.policyNum=policy.policyNum;
    this.policyObj.policyType=policy.policyType;
    this.policyObj.approval=policy.approval;
    console.log("Before assigning:",this.policyObj.approval);
    this.policyObj.approval=2;
    console.log("User Id:",this.policyObj.userId);
    console.log("Policy Id:",this.policyObj.policyId);
    console.log("After assigning:",this.policyObj.approval);

    this.approveSer.approveStatus(this.policyObj,this.policyObj.userId,this.policyObj.policyId)
    .subscribe(res=>{
      alert("Status Approved");
      this.fetchPolicy();
    },err=>{
      alert("Status Error");
    })
  }

}
