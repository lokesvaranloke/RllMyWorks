import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApplypolicyService } from '../applypolicy.service';
import { ApiService } from '../services/api.service';
import { ApplyPolicyCrudData } from './applypolicycrud.model';
import { ApplyPolicyDataModel } from './applypolicydata.model';
@Component({
  selector: 'app-applypolicy',
  templateUrl: './applypolicy.component.html',
  styleUrls: ['./applypolicy.component.css']
})
export class ApplypolicyComponent implements OnInit {

  isDisabled=true;

  applyPolicyModelObj: ApplyPolicyDataModel = new ApplyPolicyDataModel();
  public policyForm!:FormGroup;
  fetchedPolicy: ApplyPolicyCrudData[]=[];

  backendurl="http://localhost:8080/user";
  routeSub: Subscription;
  userId: any;

  constructor(private route: Router, private applyser: ApplypolicyService,private actroute:ActivatedRoute,private formBuilder:FormBuilder, private http: HttpClient){}

  ngOnInit(): void {

    this.policyForm=this.formBuilder.group({
      policyId:{value:'', disabled: this.isDisabled},
      userId:[''],
      policyType:[''],
      policyNum:[''],
      approval:[''],
    })

    this.routeSub=this.actroute.params.subscribe(params=>{
      this.userId = this.actroute.snapshot.params['userId'];
      console.log(this.userId);
    })

    this.fetchPolicy();
  }

  fetchPolicy(){
    this.http.get<any>(this.backendurl+"/policy").subscribe((result:any)=>{
      this.fetchedPolicy=result;
      console.log("Available Policies :",this.fetchedPolicy);
    })
  }

  onApplyPolicy(policy:any){
    this.applyPolicyModelObj.policyId=policy.policyId;
    this.policyForm.controls['policyId'].setValue(policy.policyId);
    this.policyForm.controls['userId'].setValue(this.userId);
    this.policyForm.controls['policyNum'].setValue(policy.policyNum);
    this.policyForm.controls['policyType'].setValue(policy.policyType);
    this.policyForm.controls['approval'].setValue(policy.approval);
  }

  apply(){
    this.applyPolicyModelObj.userId=this.policyForm.value.userId;
    this.applyPolicyModelObj.policyType=this.policyForm.value.policyType;
    this.applyPolicyModelObj.policyNum=this.policyForm.value.policyNum;
    this.applyPolicyModelObj.approval=this.policyForm.value.approval;

    console.log(this.applyPolicyModelObj);
    this.applyser.applyPolicy(this.applyPolicyModelObj,this.applyPolicyModelObj.userId,this.applyPolicyModelObj.policyId)
    .subscribe(res=>{
      alert("Policy Applied");
      this.policyForm.reset();
      this.fetchPolicy();
    },err=>{
      alert("Something Wrong");
    })
  }

  // onApplyPolicy(data:any){
  //   console.log("User id:",this.userId);
  //   console.log("Policy id:",data.policyId);
  //   console.log("Policies:",this.fetchedPolicy);
  //   this.http.put<any>(this.backendurl+"/"+this.userId+"/policy/"+data.policyId,this.userId,data.policyId)    
  //   .subscribe((res)=>{
  //     alert("Policy Applied");
  //   },err=>{
  //     alert("Something Wrong");
  //   })
  // }

  applyPolicy(){

  }
  
  }