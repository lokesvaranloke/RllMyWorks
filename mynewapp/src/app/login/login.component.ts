import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: Router) { }

  backendurl="http://localhost:8080/user";

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })
  }

  
  onSubmit(){
    this.login();
  }

  login(){
    this.http.get<any>(this.backendurl)
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
        alert("Login Success");
        this.loginForm.reset;
        console.log(user);
        this.route.navigate(['/userdashboard',user.userId])
      } else{
        alert("User Not Found !!");
      }
    },err=>{
      alert("Something Went Wrong !!");
    })
  }

}