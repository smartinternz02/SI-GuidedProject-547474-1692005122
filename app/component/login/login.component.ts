import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  istoken = false

  regForm: FormGroup;

  constructor(private http: HttpClient, private route: Router) {
    this.regForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    })


    const jwtToken = localStorage.getItem('adminJwtToken')
    if (jwtToken){
      this.route.navigate(['/admin/dashboard'])
    }

    const token = localStorage.getItem("jwtToken")
    console.log(token)
    if (token) {
      this.istoken = true
      this.route.navigate(['/dash']);
    }
  }

  onSubmit(details: { email: string, password: string }): void {
    console.log(details);
    this.http.post('http://localhost:3000/login', details).subscribe(
      (response: any) => {
        
      
        if (response && response.user._id) {
      
          localStorage.setItem('userId', response.user._id);
         
        }
        if (response && response.token) {
          window.alert('User Login Successfully!');
          this.route.navigate(['/dash']);
          localStorage.setItem('jwtToken', response.token);
        } else {
          this.route.navigate(['/admin/dashboard']);
          localStorage.setItem('adminJwtToken', response.jwtToken);
          window.alert('Admin Login Successfully!');
        }
      
      },
      (error) => {
        console.error(error);
        window.alert('Login failed! Email or Password is wrong');
      }
    );
  }
  
}

