import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';
import { UserDataModel } from './userdata.model';

@Component({
  selector: 'app-useraccount',
  templateUrl: './useraccount.component.html',
  styleUrls: ['./useraccount.component.css']
})
export class UseraccountComponent implements OnInit {

  isDisabled=true;
  userModelObj: UserDataModel = new UserDataModel();

  backendurl="http://localhost:8080/user";
  
  private routeSub!: Subscription;
  public loginForm!:FormGroup;

  data: any;
  userId: any;
  
  constructor(private route: Router,private actroute:ActivatedRoute,private formBuilder:FormBuilder, private http: HttpClient, private api:ApiService) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      userId:{value:'', disabled: this.isDisabled},
      name:[''],
      email:{value:'', disabled: this.isDisabled},
      phoneNum:[''],
      address:[''],
      policyNum:{value:'', disabled: this.isDisabled},
      password:['']
    })

    this.routeSub=this.actroute.params.subscribe(params=>{
      this.userId = this.actroute.snapshot.params['userId'];
      this.fetchUserById(this.userId);
      console.log(this.userId);
    })
  }

  fetchUserById(userId:any){
    this.http.get(this.backendurl+"/"+this.userId).subscribe(res=>{
      this.data=res;
      console.log(this.data);
    })
  }

  onEdit(data:any){
    this.userModelObj.userId=this.data.userId;
    this.userModelObj.email=this.data.email;
    this.userModelObj.policyNum=this.data.policyNum;
    this.loginForm.controls['userId'].setValue(data.userId);
    this.loginForm.controls['name'].setValue(data.name);
    this.loginForm.controls['email'].setValue(data.email);
    this.loginForm.controls['phoneNum'].setValue(data.phoneNum);
    this.loginForm.controls['policyNum'].setValue(data.policyNum);
    this.loginForm.controls['address'].setValue(data.address);
    this.loginForm.controls['password'].setValue(data.password);
  }

  updateUser(){
    this.userModelObj.name=this.loginForm.value.name;
    this.userModelObj.phoneNum=this.loginForm.value.phoneNum;
    this.userModelObj.address=this.loginForm.value.address;
    this.userModelObj.password=this.loginForm.value.password;

    this.api.updateUser(this.userModelObj, this.userModelObj.userId)
    .subscribe(res=>{
      alert("User Update Success");
      this.loginForm.reset();
      this.fetchUserById(this.userId);
    },err=>{
      alert("Something Went Wrong...")
    })
  }

  onDeleteUser(userId: number){
    this.http.delete(this.backendurl+"/"+userId).subscribe(res=>{
      alert("User Deleted...Logging Out..");
      this.route.navigate(['login']);
    })
  }
}
