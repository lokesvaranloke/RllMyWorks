import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApproveserService {

  constructor(private http: HttpClient) { }

  approveStatus(data:any,uid:number,pid:number){
    return this.http.put<any>('http://localhost:8080/admin/uid/policy/pid',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
