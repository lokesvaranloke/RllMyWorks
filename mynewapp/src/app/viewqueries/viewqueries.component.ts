import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';
import { QueryDataModel } from './policydata.model';

@Component({
  selector: 'app-viewqueries',
  templateUrl: './viewqueries.component.html',
  styleUrls: ['./viewqueries.component.css']
})
export class ViewqueriesComponent implements OnInit {

 
  isDisabled=true;
  queryModelObj: QueryDataModel = new QueryDataModel();

  backendurl="http://localhost:8080/insurance/policy";

  // backendurl="http://localhost:8000/user";
  
  private routeSub: Subscription;
  public loginForm!:FormGroup;

  data: any;
  userId: any;
 query: any;
 queryId: any;
  userModelObj: any;
  policyForm: any;
  
  constructor(private route: Router,private actroute:ActivatedRoute,private formBuilder:FormBuilder, private http: HttpClient, private api:ApiService) { }

  ngOnInit(): void {
    this.routeSub=this.actroute.params.subscribe(params=>{
      this.userId = this.actroute.snapshot.params['userId'];
      this.fetchPolicyById(this.userId);
      console.log(this.userId);
    })
  }

  fetchPolicyById(policyId:any){
    this.http.get(this.backendurl+"/"+this.userId).subscribe(res=>{
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

  updateQuery(){
    this.queryModelObj.userId=this.policyForm.value.userId;
    this.api.updatePolicy(this.queryModelObj, this.queryModelObj.queryId)
    .subscribe(()=>{
      alert("Policy Update Success");
      this.policyForm.reset();
      this.fetchPolicyById(this.queryId);
    },()=>{
      alert("Something Went Wrong...")
    })
  }

  onDeletePolicy(policyId: number){
    this.http.delete(this.backendurl+"/"+this.queryId).subscribe(res=>{
      alert("Policy Deleted...Saving data..");
      this.route.navigate(['createpolicy']);
    })
  }
}