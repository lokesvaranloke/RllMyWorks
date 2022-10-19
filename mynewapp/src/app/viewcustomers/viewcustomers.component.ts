import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { viewCustomerCrud } from './viewcustomer.model';

@Component({
  selector: 'app-viewcustomers',
  templateUrl: './viewcustomers.component.html',
  styleUrls: ['./viewcustomers.component.css']
})
export class ViewcustomersComponent implements OnInit {

  backendurl="http://localhost:8080/admin/user";

  fetchedCustomer: viewCustomerCrud[] = [];
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
      this.fetchCustomer();
    }   

    fetchCustomer(){
      this.http.get<any>(this.backendurl).subscribe((result:any)=>{
        this.fetchedCustomer=result;
        console.log("Customers:",this.fetchedCustomer);
      })
    }
  }

