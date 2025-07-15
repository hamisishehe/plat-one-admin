import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UserDetails } from '../sidebar/sidebar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deposit-view-more',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './deposit-view-more.component.html',
  styleUrl: './deposit-view-more.component.css',
})
export class DepositViewMoreComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  depositId: number = 0;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.depositId = +params['id']; // Use '+' to convert string to number
    });
    this.getData(this.depositId);
  }

  walletDetails: WalletDetails | null = null;
  address: string = '';

  userData: UserDetails | null = null;
  userid: number = 0; // Initial default value to avoid null issues

  // Get wallet data based on user ID
  getData(depositId: number): void {
    console.log('====================================');
    console.log('inaitwa');
    console.log('====================================');
    this.http
      .get<WalletDetails>(
        `${environment.baseUrl}/deposits/wallet/${this.depositId}`
      ) // Use baseUrl here
      .subscribe(
        (data) => {
          console.log('====================================');
          console.log(data);
          console.log('====================================');
          this.walletDetails = data;
          this.address = this.walletDetails.wallet;
        },
        (error) => {
          console.error('Error fetching deposit details:', error);
        }
      );
  }

  verifyDeposit() {
    console.log('====================================');
    console.log('inafika');
    console.log('====================================');

    const FormData = {
      depositId: this.depositId,
    };

    this.http
      .post(`${environment.baseUrl}/deposits/confirm`, FormData, {
        responseType: 'text',
      })
      .subscribe(
        (response) => {
          if (response == 'Deposit is already confirmed') {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Deposit is already confirmed',
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Successfully Address Added',
              showConfirmButton: false,
              timer: 1500,
            });
          }
          console.log('====================================');
          console.log(response);
          console.log('====================================');

          this.address = '';
        },
        (error) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: error,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  }

  rejectDeposit() {
    // Show confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to reject this deposit?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, reject it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const FormData = {
          depositId: this.depositId,
        };

        this.http
          .post(`${environment.baseUrl}/deposits/reject`, FormData, {
            responseType: 'text',
          })
          .subscribe(
            (response) => {
              if (response == 'Deposit is already rejected') {
                Swal.fire({
                  icon: 'error',
                  title: 'Deposit is already rejected',
                  showConfirmButton: false,
                  timer: 1500,
                });
              } else {
                Swal.fire({
                  icon: 'success',
                  title: 'Successfully deposit Rejected',
                  showConfirmButton: false,
                  timer: 1500,
                });
              }

              console.log('====================================');
              console.log(response);
              console.log('====================================');

              this.address = '';
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
    });
  }
  deleteDeposit() {
    // Show confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to Delete this deposit?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const FormData = {
          depositId: this.depositId,
        };

        this.http
          .post(`${environment.baseUrl}/deposits/delete`, FormData, {
            responseType: 'text',
          })
          .subscribe(
            (response) => {
              if (response == 'Deposit deleted successfully') {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Deposit deleted successfully',
                  showConfirmButton: false,
                  timer: 1500,
                });

                window.location.href = '/deposit-log';
              } else {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Deposit deleted successfully ',
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            },
            (error) => {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: error,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          );
      }
    });
  }
}

export interface WalletDetails {
  id: number;
  wallet: string;
}
