import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewcustomers',
  templateUrl: './viewcustomers.component.html',
  styleUrls: ['./viewcustomers.component.css']
})
export class ViewcustomersComponent implements OnInit {

  backendurl="http://localhost:8080/admin/user";
  
  data:any;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
      this.fetchUser();
    }   

    fetchUser(){
      this.http.get(this.backendurl)
      .subscribe((res)=>{
        this.data=res;
        console.log(this.data);
      })
    }
  }

