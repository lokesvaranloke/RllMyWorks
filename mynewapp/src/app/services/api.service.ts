import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  backendurl="http://localhost:8080/user";  
  updatePolicy: any;


  constructor(private http: HttpClient) { }

  updateUser(data:any, UserId:number){
    return this.http.put<any>(this.backendurl,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
