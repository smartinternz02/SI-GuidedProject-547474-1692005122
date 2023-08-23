import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-all-list',
  templateUrl: './all-list.component.html',
  styleUrls: ['./all-list.component.css']
})
export class AllListComponent {
  List: any[] = [];
  public isLoading = false

  constructor(private http:HttpClient,private route:Router) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.isLoading = true
    this.http.get<any[]>('http://localhost:3000/alllist').subscribe(
      lists => {
        this.List = lists;
        
        this.isLoading = false
      },
      error => {
        console.error(error);
      }
    );
  }

  del(_id: string) {
    // Send an HTTP DELETE request to delete the item with the given _id
    this.http.delete(`http://localhost:3000/alllist/${_id}`).subscribe(
      response => {
        // Remove the deleted item from the local List array
        this.List = this.List.filter(item => item._id !== _id);
      },
      error => {
        console.error(error);
      }
    );
  }
  update(_id: string) {
    this.route.navigate(['/edit'], { queryParams: { id: _id } });
  }

}
