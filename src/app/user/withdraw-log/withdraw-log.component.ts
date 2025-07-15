import { Component, OnInit } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { UserDetails } from '../sidebar/sidebar.component';
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule,
} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-withdraw-log',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './withdraw-log.component.html',
  styleUrl: './withdraw-log.component.css',
})
export class WithdrawLogComponent implements OnInit {
  allwithdrawDetails: any[] = [];

  withdrawDetails: WithdrawDetails[] | null = null;
  userData: UserDetails | null = null;
  userid: number = 0; // Initial default value to avoid null issues

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.allgetData(); // Fetch profile and trigger withdraw data fetch
  }

  allgetData(): void {
    this.http
      .get<any>(`${environment.baseUrl}/withdraw/all-with-user`)
      .subscribe(
        (data) => {
          this.allwithdrawDetails = data;
          console.log('====================================');
          console.log(data);
          console.log('====================================');
          this.initializeTable();
        },
        (error) => {
          console.error('Error fetching withdrawal details:', error);
        }
      );
  }

  getData(): void {
    this.http
      .get<WithdrawDetails[]>(
        `${environment.baseUrl}/withdraw/users-withdraw/show-all`
      )
      .subscribe(
        (data) => {
          console.log('====================================');
          console.log(data);
          console.log('====================================');
          this.withdrawDetails = data;
          this.initializeTable();
        },
        (error) => {
          console.error('Error fetching withdraw details:', error);
        }
      );
  }

  verify(id: number) {
    const FormData = {
      wid: id,
    };

    console.log('====================================');
    console.log(id);
    console.log('====================================');
    this.http
      .post(`${environment.baseUrl}/withdraw/confirm`, FormData, {
        responseType: 'text',
      }) // Use baseUrl
      .subscribe(
        (response) => {
          if (response == 'Successfully') {
            Swal.fire({
              icon: 'success',
              title: 'Successfully',
              showConfirmButton: false,
              timer: 1500,
            });

            console.log('====================================');
            console.log(response);
            console.log('====================================');
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: error,
            showConfirmButton: false,
            timer: 1500,
          });

          console.log('====================================');
          console.log(error);
          console.log('====================================');
        }
      );
  }

  initializeTable(): void {
    setTimeout(() => {
      let datatable = new DataTable('#search-table');
      console.log('Table initialized');
    }, 100);
  }
}

export interface WithdrawDetails {
  id: number;
  transactionId: string;
  amount: number;
  status: string;
  withdrawalDate: string;
  phoneNumber: string;
  address: string;
}
