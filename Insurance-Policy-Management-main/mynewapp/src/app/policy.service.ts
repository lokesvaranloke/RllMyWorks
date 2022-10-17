import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Policy } from './policy';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  baseUrl:string ="http://localhost:8080/"
  constructor(public http:HttpClient) { }

  storePolicy(policy:any):Observable<string> {
    return this.http.post(this.baseUrl+"/storePolicy",policy,{responseType:"text"});
  }

  updatePolicy(policy:any):Observable<string> {
    return this.http.patch(this.baseUrl+"/updatePolicy",policy,{responseType:"text"});
  }

  applyPolicy(policy:any):Observable<string> {
    return this.http.patch(this.baseUrl+"/updatePolicy",policy,{responseType:"text"});
  }

  findAllPolicy():Observable<Policy[]> {
    return this.http.get<Policy[]>(this.baseUrl+"/findAllPolicy");
  }

  findAllPolicyByStatus(status:any):Observable<Policy[]> {
    return this.http.get<Policy[]>(this.baseUrl+"/findPolicyByStatus/"+status);
  }

  findAllPolicyById(policyNum:number):Observable<string> {
    return this.http.get(this.baseUrl+"/findAllPolicy/"+policyNum,{responseType:"text"});
  }
  deletePolicyById(policyNum:number):Observable<string> {
    return this.http.delete(this.baseUrl+"/deletePolicy/"+policyNum,{responseType:"text"});
  }

}
