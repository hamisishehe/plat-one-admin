import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetails } from '../sidebar/sidebar.component';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-more',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './user-more.component.html',
  styleUrl: './user-more.component.css',
})
export class UserMoreComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  balanceDetails: BalanceDetails | null = null;

  id: string | null = null;
  username: string = '';
  amount: number = 0;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    console.log('====================================');
    console.log(this.id);
    console.log('====================================');
    this.getData(this.id);
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  makeDeposit() {
    let randomNumber = this.getRandomInt(10000000, 99999999);

    const FormData = {
      userId: this.id,
      amount: this.amount,
    };

    this.http
      .post(`${environment.baseUrl}/deposits/confirm`, FormData, {
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
            window.location.reload();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'error',
              showConfirmButton: false,
              timer: 1500,
            });
          }
          this.amount = 0;
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

  getData(userId: string | null): void {
    this.http
      .get<BalanceDetails>(
        `${environment.baseUrl}/balance/show-balance/${userId}`
      )
      .subscribe(
        (data) => {
          this.balanceDetails = data;
          console.log('====================================');
          console.log(this.balanceDetails.availableBalance);
          console.log('====================================');
        },
        (error) => {
          console.error('Error fetching balance details:', error);
        }
      );
  }

  delete() {
    const FormData = {
      userId: this.id,
    };

    this.http
      .post(`${environment.baseUrl}/deposits/make`, FormData, {
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
          } else {
            Swal.fire({
              icon: 'error',
              title: 'error',
              showConfirmButton: false,
              timer: 1500,
            });
          }

          console.log('====================================');
          console.log(response);
          console.log('====================================');

          this.amount = 0;
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
  activate() {
    const FormData = {
      userId: this.id,
    };
    this.http
      .post(`${environment.baseUrl}/user/lock`, FormData, {
        responseType: 'text',
      }) // Use baseUrl
      .subscribe(
        (response) => {
          if (response == 'User account has been locked.') {
            Swal.fire({
              icon: 'success',
              title: 'Successfully Locked',
              showConfirmButton: false,
              timer: 1500,
            });
          }
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
}

export interface BalanceDetails {
  id: number;
  availableBalance: number;
  lockedBalance: number;
}
