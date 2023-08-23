import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  regForm: FormGroup;

  constructor(private http: HttpClient, private router: Router) {
    this.regForm = new FormGroup({
      HotelName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit(details: { HotelName: string, password: string }): void {
    this.http.post('http://localhost:3000/adminlogin', details).subscribe(
      (response: any) => {
        if (response && response.jwtToken) {
          

          window.alert('Admin Login Successfully!');
          this.router.navigate(['/admin-bookings']);
          localStorage.setItem('adminJwtToken', response.jwtToken);
         
          localStorage.setItem('HotelName', response.HotelName);
         
          
        } else {
          window.alert('Invalid email or password');
        }
      },
      (error) => {
        console.error(error);
        window.alert('Login failed! Server Error');
      }
    );
  }

 
}
