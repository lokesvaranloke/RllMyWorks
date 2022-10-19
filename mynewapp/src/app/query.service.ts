import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  backendurl="http://localhost:8080/admin/question";
  constructor(public http:HttpClient) { }

  answerQuery(data:any,id:number){
    console.log(id);
    
    return this.http.put<any>(this.backendurl+"/"+id,data)
    .pipe(map((res)=>{
      return res;
    }))
  }
}
