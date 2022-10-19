import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { QueryService } from '../query.service';
import { QueryCrudData } from './querycrud.model';
import { QueryDataModel } from './querydata.model';

@Component({
  selector: 'app-viewqueries',
  templateUrl: './viewqueries.component.html',
  styleUrls: ['./viewqueries.component.css']
})
export class ViewqueriesComponent implements OnInit {

 
  isDisabled=true;
  queryModelObj: QueryDataModel = new QueryDataModel();
  public QueryForm!:FormGroup;
  fetchedQuery: QueryCrudData[]=[];
  backendurl="http://localhost:8080/admin/question";
  
  private routeSub: Subscription;
  

  data: any;
  
  constructor(private querySer:QueryService ,private route: Router,private actroute:ActivatedRoute,private formBuilder:FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.QueryForm=this.formBuilder.group({
      queryId:[''],
      // queryId:{value:'', disabled: this.isDisabled},
      userId:{value:'', disabled: this.isDisabled},
      query:{value:'', disabled: this.isDisabled},
      answer:[''],
    })
    this.fetchQuery();
  }

  fetchQuery() {
    this.http.get<any>(this.backendurl).subscribe((result:any)=>{
      this.fetchedQuery=result;
      console.log("Queries:",this.fetchedQuery);
    })
  }

  onEdit(query:any){
    this.queryModelObj.queryId=query.queryId;
    this.queryModelObj.userId=query.userId;
    this.queryModelObj.query=query.query;
    this.QueryForm.controls['queryId'].setValue(query.queryId);
    this.QueryForm.controls['userId'].setValue(query.userId);
    this.QueryForm.controls['query'].setValue(query.query);
    this.QueryForm.controls['answer'].setValue(query.answer);
  }

  updatePolicy(){
    this.queryModelObj.queryId=this.QueryForm.value.queryId;
    this.queryModelObj.userId=this.QueryForm.value.userId;
    this.queryModelObj.query=this.QueryForm.value.query;
    this.queryModelObj.answer=this.QueryForm.value.answer;

    
    this.querySer.answerQuery(this.queryModelObj,this.queryModelObj.queryId)
    .subscribe(res=>{
      alert("Answer Submitted");
      this.QueryForm.reset();
      this.fetchQuery();
    },err=>{
      alert("Something Wrong");
    })
  }

  // onDeletePolicy(policyId: number){
  //   this.http.delete(this.backendurl+"/"+policyId).subscribe(res=>{
  //     alert("Policy Deleted...Saving data..");
  //     this.fetchPolicy();
  //     // this.route.navigate(['createpolicy']);
  //   },err=>{
  //     alert("Something Wrong or User is assigned to this");
  //   })
  // }
}