import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isDisabled=true;
  public signupForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: Router) { }

  backendurl="http://localhost:8080/user";

  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      name:['', Validators.required],
      email:['',[Validators.required, Validators.email]],
      phoneNum:['',Validators.required],
      address:['', Validators.required],
      policyNum:{value:'', disabled: this.isDisabled},
      password:['', Validators.required]
    })
  }

  onSubmit(){
    this.register();
  }

  register(){
    this.http.post<any>(this.backendurl,this.signupForm.value)
      .subscribe(res=>{
        alert("Registration Successfull");
        this.signupForm.reset;
        this.route.navigate(['login']);
      },err=>{
        alert("Something Went Wrong");
      })
    }

}
