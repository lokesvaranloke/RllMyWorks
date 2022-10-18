import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  backendurl="http://localhost:8080/user"; 

  constructor(private http: HttpClient) { }

  updateUser(data:any, user_id:number){
    return this.http.put<any>(this.backendurl,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updatePolicy(data:any, policy_id:number){
    return this.http.put<any>(this.backendurl,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createPolicy(data:any, policy_id:number){
    return this.http.put<any>(this.backendurl,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}