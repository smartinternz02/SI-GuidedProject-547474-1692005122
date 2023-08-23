import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  users: any[] = [];
  public isLoading = false

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.isLoading = true
    this.http.get<any[]>('http://localhost:3000/user').subscribe(
      users => {
        this.users = users;
        
        this.isLoading = false
      },
      error => {
        console.error(error);
      }
    );
  }
  
}
