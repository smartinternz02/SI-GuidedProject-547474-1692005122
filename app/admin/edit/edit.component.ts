import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  user: any = {
    HotelName: "",
    Address: "",
    City: "",
    Postalcode: "",
    image:"",
    rating:""
  };
id:String="";
  constructor(private http: HttpClient, private route: ActivatedRoute,private router:Router) {}

  ngOnInit() {
    // Retrieve the '_id' parameter from the query params
    this.route.queryParamMap.subscribe(params => {
      const _id = params.get('id');
    
      console.log(_id);
      if (_id) {
        this.fetchUserDetails(_id);
      }
    });
  }

  fetchUserDetails(_id: string) {
    this.http.get<any>(`http://localhost:3000/listall/${_id}`).subscribe(
      (response: any) => {
        console.log(response);
        this.user.HotelName  = response.HotelName;
        this.user.Address = response.Address;
        this.user.City = response.City;
        this.user.Postalcode = response.Postalcode;
        this.user.image = response.image;
        this.user.rating = response.rating;
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  update() {
    this.route.queryParamMap.subscribe(params => {
      const _id = params.get('id');
  
      this.http.put(`http://localhost:3000/listall/${_id}`, this.user).subscribe(
        () => {
          window.alert('Updated');
          console.log('updated successfully');
          // Perform any additional actions after successful update
        },
        (error) => {
          if (error.status === 200) {
            window.alert('Updated');
            console.log(' updated successfully');
            this.router.navigate(['/all-list'])
          } else {
            window.alert('Update failed');
            console.error('Error updating :', error);
          }
        }
      );
    });
  }
  
  
  }



