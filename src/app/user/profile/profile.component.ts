import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserDetails } from '../sidebar/sidebar.component';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profileDetails: ProfileDetails | null = null;
  first_name: string = '';
  second_name: string = '';
  last_name: string = '';
  zip_code: string = '';
  city: string = '';
  email: string = '';
  username: string = '';
  phonenumber: string = '';

  userData: UserDetails | null = null;
  userid: number = 0; // Initial default value to avoid null issues

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getProfile(); // Fetch profile and trigger deposit fetch
  }

  // Get profile data based on user ID
  getData(userId: number): void {
    this.http
      .get<ProfileDetails>(
        `${environment.baseUrl}/profile/show-profile/${userId}`
      ) // Use baseUrl here
      .subscribe(
        (data) => {
          console.log('====================================');
          console.log(data);
          console.log('====================================');
          this.profileDetails = data;
          this.first_name = this.profileDetails.fistName;
          this.second_name = this.profileDetails.secondname; // Corrected from fistName to secondname
          this.last_name = this.profileDetails.lastName;
          this.city = this.profileDetails.city;
          this.zip_code = this.profileDetails.zipCode; // Corrected from fistName to zipCode
        },
        (error) => {
          console.error('Error fetching profile details:', error);
        }
      );
  }

  getProfile(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      this.http
        .get<UserDetails>(`${environment.baseUrl}/user/profile`, { headers }) // Use baseUrl here
        .subscribe(
          (data) => {
            this.userData = data;
            this.userid = this.userData.id;
            this.username = this.userData.username;
            this.email = this.userData.email;
            this.phonenumber = this.userData.phonenumber;

            this.getData(this.userid); // Fetch profile details after user data
          },
          (error) => {
            console.error('Error fetching user profile:', error);
          }
        );
    } else {
      console.error('No token found');
    }
  }

  updateProfile() {
    const profileForm = {
      userId: this.userData?.id,
      first_name: this.first_name,
      second_name: this.second_name,
      last_name: this.last_name,
      city: this.city,
      zip_code: this.zip_code,
    };

    this.http
      .post(`${environment.baseUrl}/profile/update`, profileForm, {
        responseType: 'text',
      }) // Use baseUrl here
      .subscribe(
        (response) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Successfully Profile Updated',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: error.error || 'Error updating profile', // Display a more generic error message if not specified
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  }
}

export interface ProfileDetails {
  id: number;
  fistName: string;
  secondname: string; // Corrected from second_name to secondname
  lastName: string;
  city: string;
  zipCode: string; // Corrected from zip_code to zipCode
}
