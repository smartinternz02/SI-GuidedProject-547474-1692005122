import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent {
  user = {
    HotelName: "",
    password: ""
  };

  constructor(private http: HttpClient, private route: Router) {}

  submitForm(): void {
    this.http.post('http://localhost:3000/admin/register', this.user)
      .subscribe(
        (res: any) => {
          if (res.message === 'Successfully Registered') {
            window.alert('Registration Successful!');
            this.route.navigate(['/admin/login']);
          } else {
            window.alert('Registration Failed!');
          }
        },
        (error) => {
          console.error(error);
          window.alert('Registration Failed!');
        }
      );
  }
}
