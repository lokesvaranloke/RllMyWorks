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
  

  backendurl="http://localhost:8080/user/history";
  
  data:any;
  routeSub: Subscription;
  userId: any;
  
  constructor(private route: Router,private actroute: ActivatedRoute,private formBuilder:FormBuilder, private http: HttpClient, private api:ApiService) { }

  ngOnInit(): void {
    this.routeSub=this.actroute.params.subscribe(params=>{
      this.userId = this.actroute.snapshot.params['userId'];
      this.fetchHistory(this.userId);
      console.log(this.userId);
    })
    
  }

  fetchHistory(userId:any){
    this.http.get<any>(this.backendurl+"/"+userId).subscribe((res)=>{
      this.data=res;
      console.log(this.data);
    })
  }
}