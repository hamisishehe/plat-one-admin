import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule,
} from '@angular/common/http';
import { DataTable } from 'simple-datatables';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plans-log',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './plans-log.component.html',
  styleUrl: './plans-log.component.css',
})
export class PlansLogComponent implements OnInit {
  plansDetails: CombinedData[] = [];
  loading: boolean = true;
  userid: number = 0; // Initial default value to avoid null issues

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getData(); // Fetch profile and trigger plans data fetch
  }
  initializeTable(): void {
    setTimeout(() => {
      let datatable = new DataTable('#search-table');
      console.log('Table initialized');
    }, 100);
  }

  getData(): void {
    this.loading = true;
    this.http
      .get<any>(`${environment.baseUrl}/investments/users-investments`) // Adjust based on your actual endpoint
      .subscribe(
        (response) => {
          console.log('Fetched data:', response); // Log the full response

          if (Array.isArray(response) && response.length > 0) {
            const combinedData: CombinedData[] = [];

            // Loop through each array in the response
            for (const item of response) {
              if (item.length === 2) {
                const investment = item[0] as InvestmentDetails; // First element is investment
                const user = item[1] as UserDetails; // Second element is user

                combinedData.push({
                  investment,
                  user,
                });
              }
            }

            this.plansDetails = combinedData; // Assign the combined data to plansDetails
            console.log('Combined Data:', this.plansDetails); // Log the combined data
          } else {
            console.warn('No investment data available in response');
          }
          this.initializeTable();
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching data:', error);
          this.loading = false;
        }
      );
  }

  deleteInvestment(investmentId: number): void {
    this.http
      .delete(`${environment.baseUrl}/investments/delete/${investmentId}`)
      .subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Successfully',
            showConfirmButton: false,
            timer: 1500,
          });

          console.log('====================================');
          console.log(response);
          console.log('====================================');
          console.error('Error deleting investment:', response);
          window.location.reload();
        },
        (error) => {
          Swal.fire({
            icon: 'success',
            title: 'Successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.reload();
          console.error('Error deleting investment:', error);
        }
      );
  }
}

export interface InvestmentDetails {
  id: number;
  amount: number;
  startDate: string;
  maturityDate: string;
  investmentPackage: string;
  status: string;
}

export interface UserDetails {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
}

export interface CombinedData {
  investment: InvestmentDetails;
  user: UserDetails;
}
