import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';
import { UserDataModel } from '../useraccount/userdata.model';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  isDisabled=true;
  userModelObj: UserDataModel = new UserDataModel();

  private routeSub!: Subscription;
  public loginForm!:FormGroup;

  userId: any;
  
  constructor(private route: Router,private actroute:ActivatedRoute,private formBuilder:FormBuilder, private http: HttpClient, private api:ApiService) { }

  ngOnInit(): void {

    this.routeSub=this.actroute.params.subscribe(params=>{
      this.userId = this.actroute.snapshot.params['userId'];
      console.log(this.userId);
    })
  }

  viewProfile(){
    this.route.navigate(['/useraccount',this.userId]);
  }

  viewHistory(){
    this.route.navigate(['/history',this.userId]);
  }

  applyPolicy(){
    this.route.navigate(['/applypolicy',this.userId]);
  }

  sendQuery(){
    this.route.navigate(['/sendquery',this.userId]);
  }

  viewQuery(){
    this.route.navigate(['/viewquery',this.userId]);
  }
}
