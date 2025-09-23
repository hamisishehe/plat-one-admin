import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserDetails } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { DataTable } from 'simple-datatables';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pending-deposits',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './pending-deposits.component.html',
  styleUrl: './pending-deposits.component.css'
})
export class PendingDepositsComponent {
depositDetails: DepositDetails[] | null = null;
  userData: UserDetails | null = null;
  userid: number = 0; // Initial default value to avoid null issues
  deposiId: number = 0;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getData() {
    this.http
      .get<DepositDetails[]>(`${environment.baseUrl}/deposits/users-pending-deposits`) // Use baseUrl here
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

            this.getData();
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
