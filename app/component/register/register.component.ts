import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  };

  constructor(private http: HttpClient,private route:Router) {}



  submitForm(): void {
    this.http.post('http://localhost:3000/register', this.user)
      .subscribe(
        (res: any) => {
          if (res.message === 'Successfully Registered') {
            window.alert('Registration Successful!');
            this.route.navigate(['/login']);
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
