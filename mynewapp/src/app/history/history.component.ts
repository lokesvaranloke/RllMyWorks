import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';
import { PolicyDataModel } from '../policycrud/policydata.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  
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
}