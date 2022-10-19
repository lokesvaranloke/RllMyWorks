import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { __values } from 'tslib';

@Component({
  selector: 'app-sendquery',
  templateUrl: './sendquery.component.html',
  styleUrls: ['./sendquery.component.css']
})
export class SendqueryComponent implements OnInit {

  public queryForm!: FormGroup;

  backendurl="http://localhost:8080/user/question";
  routeSub: any;
  userId: any;
  isDisabled=true;

  constructor(private formBuilder: FormBuilder,private http: HttpClient, private actroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.queryForm=this.formBuilder.group({
      // userId:{value:'', disabled: this.isDisabled},
      userId:['', Validators.required],
      query:['', Validators.required]
    })

    this.routeSub=this.actroute.params.subscribe(params=>{
      this.userId = this.actroute.snapshot.params['userId'];
      // console.log(this.userId);
    })
    }

  onSubmit(){
    this.sendQuery(this.userId);
  }

  sendQuery(userId:any){
    this.http.post<any>(this.backendurl+"/"+this.userId,this.queryForm.value)
    .subscribe(res=>{
      console.log(this.userId);
      console.log(this.queryForm.value);
      
      alert("Query Sent Successfully");
      this.queryForm.reset();

    },err=>{
      alert("Something Wrong");
    })
  }
}
