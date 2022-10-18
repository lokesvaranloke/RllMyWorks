import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-createpolicy',
  templateUrl: './createpolicy.component.html',
  styleUrls: ['./createpolicy.component.css']
})
export class CreatepolicyComponent implements OnInit {

  isDisabled=true;
  public createPolicyForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: Router) { }

  backendurl="http://localhost:8080/admin/policy";

  // backendurl="http://localhost:8000/user";

  ngOnInit(): void {
    this.createPolicyForm=this.formBuilder.group({
      userId:['', Validators.required],
      policyNum:['',Validators.required],
      policyType:['',[Validators.required]],
      approval:['',Validators.required],
    })
  }

  onSubmit(){
    this.create();
  }

  create(){
    this.http.post<any>(this.backendurl,this.createPolicyForm.value)
      .subscribe(res=>{
        alert("Policy creation Successfull");
        console.log(this.createPolicyForm.value);
        this.createPolicyForm.reset;
        this.route.navigate(['policycrud']);
      },err=>{
        alert("Something Went Wrong");
      })
    }

}