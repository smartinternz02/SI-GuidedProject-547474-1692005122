import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.css']
})
export class AllBookingsComponent {
  List: any[] = [];
  public isLoading = false

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.isLoading = true
    this.http.get<any[]>('http://localhost:3000/allbookings').subscribe(
      lists => {
        this.List = lists;
        
        this.isLoading = false
      },
      error => {
        console.error(error);
      }
    );
  }

}


