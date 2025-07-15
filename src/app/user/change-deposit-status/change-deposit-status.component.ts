import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-deposit-status',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './change-deposit-status.component.html',
  styleUrl: './change-deposit-status.component.css',
})
export class ChangeDepositStatusComponent {
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
      .put(`${environment.baseUrl}/deposits/change_status/${depositId}`, null, {
        responseType: 'text',
      })
      .subscribe(
        (response) => {
          console.log('====================================');
          console.log(response);
          console.log('====================================');
          if (response == 'Deposit Confirmed') {
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
            icon: 'success',
            title: 'Successfully',
            showConfirmButton: false,
            timer: 1500,
          });

          window.location.href = '/deposit-log';
        }
      );
  }
}
