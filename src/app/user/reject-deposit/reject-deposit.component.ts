import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DepositDetails } from '../deposit-log/deposit-log.component';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reject-deposit',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './reject-deposit.component.html',
  styleUrl: './reject-deposit.component.css'
})
export class RejectDepositComponent {

  depositDetails: DepositDetails[] | null = null;
  id: number = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });

    this.changestatus(this.id);

    console.log('====================================');
    console.log(this.id);
    console.log('====================================');
  }

  changestatus(depositId: number): void {

    this.http
      .put(`${environment.baseUrl}/deposits/reject/${depositId}`, null, {
        responseType: 'text',
      })
      .subscribe(
        (response) => {
          console.log('====================================');
          console.log(response);
          console.log('====================================');
          if (response == 'rejected') {
            Swal.fire({
              icon: 'success',
              title: 'Successfully',
              showConfirmButton: false,
              timer: 1500,
            });

            window.location.href = '/deposit-log';
          }
        },
        (error) => {
          console.log('====================================');
          console.log(error);
          console.log('====================================');
          Swal.fire({
            icon: 'error',
            title: error,
            showConfirmButton: false,
            timer: 1500,
          });

          window.location.href = '/deposit-log';
        }
      );
  }
}
