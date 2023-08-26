import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  ht = "";
  bookingData = {
    userId: "",
    HotelName: "",
    name: "",
    email: "",
    date: "",
    time: "",
    guests: ""
  };

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { 
    const user=localStorage.getItem('jwtToken')
    if (!user){
     this.router.navigate(['/login'])
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const hotelName = params['hotelname'];
      this.ht = hotelName;

      // Use the hotel name as needed
      this.bookingData.HotelName = this.ht;

      // Retrieve the user ID from local storage
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.bookingData.userId = userId;
      }
    });
  }

  submitForm(form: any) {
    // Pass the name to the userbooking page
    this.router.navigate(['/userbooking']);

    // Send the booking data to the server
    this.http.post('http://localhost:3000/book', this.bookingData).subscribe(
      (response) => {
        console.log(response);
        alert('Booking successful');
      },
      (error) => {
        console.log('Error submitting data:', error);
        alert('Booking failed!');
      }
    );
    form.reset();
  }
}

























// import { Component } from '@angular/core';
// import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';



// @Component({
//   selector: 'app-book',
//   templateUrl: './book.component.html',
//   styleUrls: ['./book.component.css']
// })
// export class BookComponent  {
//  ht="";
//  bookingData = {
//  HotelName:"",
//  name:"",
//  email:"",
//  date:"",
//  time:"",
//  guests:""
// };

//   constructor(private route: ActivatedRoute,private http:HttpClient,private router: Router) {}
  


//   ngOnInit() {
//     this.route.queryParams.subscribe(params => {
//       const hotelName = params['hotelname'];
//       this.ht=hotelName;

//       // Use the hotel name as needed
//       this.bookingData.HotelName = this.ht;
//     });
//   }

  

//   submitForm(form: any) {
//     // Pass the name to the userbooking page
//     this.router.navigate(['/userbooking']);

//     // Send the booking data to the server
//     this.http.post('http://localhost:3000/book', this.bookingData).subscribe(
//       (response) => {
//         console.log(response);
//         alert('Booking successful');
//       },
//       (error) => {
//         console.log('Error submitting data:', error);
//         alert('Booking failed!');
//       }
//     );
//     form.reset();
//   }
// }
