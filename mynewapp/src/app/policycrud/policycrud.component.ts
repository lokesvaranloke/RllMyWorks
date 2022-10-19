import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PolicyService } from '../policy.service';
import { ApiService } from '../services/api.service';
import { PolicyCrudData } from './policycrud.model';
import { PolicyDataModel } from './policydata.model';

@Component({
  selector: 'app-policycrud',
  templateUrl: './policycrud.component.html',
  styleUrls: ['./policycrud.component.css']
})
export class PolicycrudComponent implements OnInit {

  isDisabled=true;
  policyModelObj: PolicyDataModel = new PolicyDataModel();
  public policyForm!:FormGroup;
  fetchedPolicy: PolicyCrudData[]=[];
  backendurl="http://localhost:8080/admin/policy";
  
  private routeSub: Subscription;
  

  data: any;
  
  constructor(private route: Router,private actroute:ActivatedRoute,private formBuilder:FormBuilder, private http: HttpClient, private policySer: PolicyService) { }

  ngOnInit(): void {
    this.policyForm=this.formBuilder.group({
      policyId:{value:'', disabled: this.isDisabled},
      userId:[''],
      policyType:[''],
      policyNum:[''],
      approval:{value:'', disabled: this.isDisabled},
    })
    this.fetchPolicy();
  }

  fetchPolicy() {
    this.http.get<any>(this.backendurl).subscribe((result:any)=>{
      this.fetchedPolicy=result;
      console.log("Policies:",this.fetchedPolicy);
    })
  }

  onEdit(policy:any){
    this.policyModelObj.policyId=policy.policyId;
    this.policyForm.controls['policyId'].setValue(policy.policyId);
    this.policyForm.controls['userId'].setValue(policy.userId);
    this.policyForm.controls['policyNum'].setValue(policy.policyNum);
    this.policyForm.controls['policyType'].setValue(policy.policyType);
    this.policyForm.controls['approval'].setValue(policy.approval);
  }

  updatePolicy(){
    this.policyModelObj.userId=this.policyForm.value.userId;
    this.policyModelObj.policyType=this.policyForm.value.policyType;
    this.policyModelObj.policyNum=this.policyForm.value.policyNum;
    this.policyModelObj.approval=this.policyForm.value.approval;

    this.policySer.updatePolicy(this.policyModelObj,this.policyModelObj.policyId)
    .subscribe(res=>{
      alert("Policy Updated Successfully");
      this.policyForm.reset();
      this.fetchPolicy();
    },err=>{
      alert("Something Wrong");
    })
  }

  onDeletePolicy(policyId: number){
    this.http.delete(this.backendurl+"/"+policyId).subscribe(res=>{
      alert("Policy Deleted...Saving data..");
      this.fetchPolicy();
      // this.route.navigate(['createpolicy']);
    },err=>{
      alert("Something Wrong or User is assigned to this");
    })
  }
}