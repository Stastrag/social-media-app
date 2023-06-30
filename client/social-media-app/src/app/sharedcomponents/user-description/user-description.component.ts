import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getUserIdByJwtToken } from 'src/app/utils';


@Component({
  selector: 'app-user-description',
  templateUrl: './user-description.component.html',
  styleUrls: ['./user-description.component.scss']
})
export class UserDescriptionComponent implements OnInit {
  constructor(private http: HttpClient) {}


  @Input() userId!: string;
  firstName!: string;
  lastName!: string;
  username!: string;
  location!: string;
  profilePicture!: string;

  ngOnInit() {
    this.fetchUserDetails();
  }

  fetchUserDetails() {
    const userId = getUserIdByJwtToken();
    console.log(userId);
    this.http.get<any>(`http://localhost:3001/user/${userId}`)
    .subscribe(  user => {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        // this.profilePicture = user.profilePicture;
      },
      error => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}
