import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';
import { PolicyDataModel } from './policydata.model';

@Component({
  selector: 'app-policycrud',
  templateUrl: './policycrud.component.html',
  styleUrls: ['./policycrud.component.css']
})
export class PolicycrudComponent implements OnInit {

  isDisabled=true;
  policyModelObj: PolicyDataModel = new PolicyDataModel();

  backendurl="http://localhost:8080/insurance/policy";

  // backendurl="http://localhost:8000/user";
  
  private routeSub: Subscription;
  public loginForm!:FormGroup;

  data: any;
  userId: any;
  policyId:any;
  policyType: any;
  policyNum: any;
  approval:any;
  userModelObj: any;
  policyForm: any;
  
  constructor(private route: Router,private actroute:ActivatedRoute,private formBuilder:FormBuilder, private http: HttpClient, private api:ApiService) { }

  ngOnInit(): void {
    this.routeSub=this.actroute.params.subscribe(params=>{
      this.policyId = this.actroute.snapshot.params['policyId'];
      this.fetchPolicyById(this.policyId);
      console.log(this.policyId);
    })
  }

  fetchPolicyById(policyId:any){
    this.http.get(this.backendurl+"/"+this.policyId).subscribe(res=>{
      this.data=res;
      console.log(this.data);
    })
  }

  onEdit(data:any){
    this.userModelObj.userId=this.data.userId;
    this.userModelObj.policyNum=this.data.policyNum;
    this.policyForm.controls['userId'].setValue(data.userId);
    this.policyForm.controls['policyId'].setValue(data.policyId);
    this.policyForm.controls['policyNum'].setValue(data.policyNum);
    this.policyForm.controls['policyType'].setValue(data.policyType);
    this.policyForm.controls['approval'].setValue(data.approval);
    
  }

  updatePolicy(){
    this.policyModelObj.userId=this.policyForm.value.userId;
    this.policyModelObj.approval=this.policyForm.value.approval;
    this.policyModelObj.policyType=this.policyForm.value.policyType;
    this.policyModelObj.policyNum=this.policyForm.value.policyNum;
    this.api.updatePolicy(this.policyModelObj, this.policyModelObj.policyId)
    .subscribe(()=>{
      alert("Policy Update Success");
      this.policyForm.reset();
      this.fetchPolicyById(this.policyId);
    },()=>{
      alert("Something Went Wrong...")
    })
  }

  onDeletePolicy(policyId: number){
    this.http.delete(this.backendurl+"/"+this.policyId).subscribe(res=>{
      alert("Policy Deleted...Saving data..");
      this.route.navigate(['createpolicy']);
    })
  }
}