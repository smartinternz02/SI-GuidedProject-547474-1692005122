import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-userbookings',
  templateUrl: './userbookings.component.html',
  styleUrls: ['./userbookings.component.css']
})
export class UserbookingsComponent {
  bookingDetails: any[] = [];
  isuser=false;

  constructor(private http: HttpClient,private route:Router) {
    const userId = localStorage.getItem('userId');

    if (userId) {
      this.fetchBookingDetails(userId);
    }
    const user=localStorage.getItem('jwtToken')
    if (!user){
     this.route.navigate(['/login'])
    }
  }

  fetchBookingDetails(userId: string): void {
    this.http.get<any[]>('http://localhost:3000/booking-details', { params: { userId } }).subscribe(
      (response) => {
        this.bookingDetails = response;
      },
      (error) => {
        console.error('Error fetching booking details:', error);
      }
    );
  }
}
