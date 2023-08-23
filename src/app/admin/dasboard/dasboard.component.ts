import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent {
  constructor(private route:Router){}

  onlogout(){

    localStorage.clear()
  
    this.route.navigate(['/login'])
    alert('logout sucessful')
   }

}
