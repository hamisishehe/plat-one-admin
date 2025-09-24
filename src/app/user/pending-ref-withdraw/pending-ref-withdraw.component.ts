import { Component } from '@angular/core';
import { UserDetails } from '../sidebar/sidebar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { DataTable } from 'simple-datatables';

@Component({
  selector: 'app-pending-ref-withdraw',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './pending-ref-withdraw.component.html',
  styleUrl: './pending-ref-withdraw.component.css'
})
export class PendingRefWithdrawComponent {
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
  phone_number: string;
  address: string;
}
