import { Router } from '@angular/router';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { UserDetails } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-deposit-log',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './deposit-log.component.html',
  styleUrl: './deposit-log.component.css',
})
export class DepositLogComponent implements OnInit {
  depositDetails: DepositDetails[] | null = null;
  userData: UserDetails | null = null;
  userid: number = 0; // Initial default value to avoid null issues
  deposiId: number = 0;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getProfile(); // Fetch profile and trigger deposit fetch
  }

  // Get deposit data based on user ID
  getData(userId: number): void {
    this.http
      .get<DepositDetails[]>(`${environment.baseUrl}/deposits/users-deposits`) // Use baseUrl here
      .subscribe(
        (data) => {
          this.depositDetails = data;
          console.log('====================================');
          console.log(data);
          console.log('====================================');

          this.initializeTable();
        },
        (error) => {
          console.error('Error fetching deposit details:', error);
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

            this.getData(this.userid);
          },
          (error) => {
            console.error('Error fetching user profile:', error);
          }
        );
    } else {
      console.error('No token found');
    }
  }
  viewmore(depositId: number) {
    this.router.navigate(['/deposit-view-more', depositId]);
  }

  initializeTable(): void {
    setTimeout(() => {
      let datatable = new DataTable('#search-table');
      console.log('Table initialized');
    }, 100);
  }
}

export interface DepositDetails {
  id: number;
  transactionId: string;
  amount: number;
  address: string;
  phoneNumber: string;
  gateAway: string;
  status: string;
  createdAt: string;
  updated_at: string;
  username: string;
}
