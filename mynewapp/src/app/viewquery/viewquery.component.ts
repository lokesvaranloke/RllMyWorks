import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { viewUserQuery } from './viewquery.model';

@Component({
  selector: 'app-viewquery',
  templateUrl: './viewquery.component.html',
  styleUrls: ['./viewquery.component.css']
})
export class ViewqueryComponent implements OnInit {

  backendurl="http://localhost:8080/user/question";

  fetchedQuery: viewUserQuery[]=[];
  routeSub: any;
  userId: any;
  data: any;

  constructor(private http: HttpClient, private actroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub=this.actroute.params.subscribe(params=>{
      this.userId = this.actroute.snapshot.params['userId'];
      this.fetchQueryById(this.userId);
      console.log(this.userId);
    })
    
  }

  fetchQueryById(userId:any){
    console.log(this.userId);
    this.http.get<any>(this.backendurl+"/"+this.userId).subscribe(res=>{
      this.fetchedQuery=res;
      console.log(this.fetchedQuery);
      
    })
  }

}
