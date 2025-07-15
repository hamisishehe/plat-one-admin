import { Component } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { environment } from '../../../environments/environment';
import { UserDetails } from '../sidebar/sidebar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-referrals-withdraw',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './referrals-withdraw.component.html',
  styleUrl: './referrals-withdraw.component.css',
})
export class ReferralsWithdrawComponent {
  refwithdrawDetails: WithdrawDetails[] | null = null;
  refWithdrawDetails: any[] = [];
  userData: UserDetails | null = null;
  userid: number = 0; // Initial default value to avoid null issues

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getData(); // Fetch profile and trigger withdraw data fetch
  }

  getData(): void {
    this.http
      .get<any>(`${environment.baseUrl}/ref-withdraw/all-with-user`)
      .subscribe(
        (data) => {
          this.refWithdrawDetails = data;
          console.log('====================================');
          console.log(data);
          console.log('====================================');
          this.initializeTable();
        },
        (error) => {
          console.error('Error fetching ref withdraw details:', error);
        }
      );
  }

  verify(id: number) {
    const FormData = {
      wid: id,
    };
    this.http
      .post(`${environment.baseUrl}/ref-withdraw/confirm`, FormData, {
        responseType: 'text',
      }) // Use baseUrl
      .subscribe(
        (response) => {
          if (response == 'Successfully') {
            Swal.fire({
              icon: 'success',
              title: 'Successfully Locked',
              showConfirmButton: false,
              timer: 1500,
            });
          }

          window.location.reload();
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: error,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  }

  initializeTable(): void {
    setTimeout(() => {
      let datatable = new DataTable('#search-table', {
        sortable: false,
        paging: false,
      });
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
