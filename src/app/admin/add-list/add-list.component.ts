import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent {
  
  hotel = {
    HotelName: "",
    Address: "",
    City: "",
    Postalcode: "",
    image:"",
    rating:""
  };

  constructor(private http: HttpClient,private route:Router) {}

  submitForm(form: any) {
    this.http.post('http://localhost:3000/addlist', this.hotel).subscribe(
      (response) => {
        console.log('hotel data submitted successfully:', response);
        alert("hotel added sucessfully")
        
      },
      (error) => {
        console.log('Error submitting hotel data:', error);
        alert("hotel added unsuccessfully")
      }
    );
    form.reset();
  }


}