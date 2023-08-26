import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dash2',
  templateUrl: './admin-dash2.component.html',
  styleUrls: ['./admin-dash2.component.css']
})
export class AdminDash2Component {
  constructor(private route:Router){}

  onlogout(){

    localStorage.clear()
  
    this.route.navigate(['/login'])
    alert('logout sucessful')
   }
}
