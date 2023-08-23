import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  List: any[] = [];
  
  
  public isLoading = false

  constructor(private http:HttpClient,private router: Router) { 
    
  }

  ngOnInit() {
    this.fetchUsers();
   
  }

  fetchUsers() {
    this.isLoading = true
    this.http.get<any[]>('http://localhost:3000/alllist').subscribe(
      lists => {
        this.List = lists;
        
        this.isLoading = false
      },
      error => {
        console.error(error);
      }
    );
  }

  redirectToBooking(lists: any) {
    this.router.navigate(['/book'], { queryParams: { hotelname: lists.HotelName } });
  }

}
