import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {
 title="T-Booking"
 user=false
 admin=false
constructor( private route:Router){
  const usertoken=localStorage.getItem('adminJwtToken')
  if (usertoken){
    this.admin=true
  }
  const user=localStorage.getItem('jwtToken')
    if (user){
     this.user=true
    }
}

 onlogout(){

  localStorage.clear()

  this.route.navigate(['/login'])
  alert('logout sucessful')
 }




}


