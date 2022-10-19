import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplypolicyService {

  backendurl="http://localhost:8080/user"
  constructor(public http:HttpClient) { }

  applyPolicy(data:any,uid:number,pid:number){
    return this.http.put<any>(this.backendurl+"/"+uid+"/policy/"+pid,data)
    .pipe(map((res)=>{
      return res;
    }))
  }
}
