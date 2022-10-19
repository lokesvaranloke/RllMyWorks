import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { viewAllCustomer } from './viewallcustomer.model';

@Component({
  selector: 'app-viewallcustomers',
  templateUrl: './viewallcustomers.component.html',
  styleUrls: ['./viewallcustomers.component.css']
})
export class ViewallcustomersComponent implements OnInit {

  backendurl="http://localhost:8080/admin/user";

  fetchedCustomer: viewAllCustomer[]=[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchCustomer();
  }

  fetchCustomer(){
    this.http.get<any>(this.backendurl).subscribe((result)=>{
      this.fetchedCustomer=result;
      console.log("Customer List:",this.fetchedCustomer);
    })
  }

}
