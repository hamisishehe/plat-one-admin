import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-ref-verify-withdraw',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './ref-verify-withdraw.component.html',
  styleUrl: './ref-verify-withdraw.component.css',
})
export class RefVerifyWithdrawComponent {
  id: number = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });

    this.verify(this.id);

    console.log('====================================');
    console.log(this.id);
    console.log('====================================');
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
              title: 'Successfully ',
              showConfirmButton: false,
              timer: 1500,
            });
          }

          window.location.href = '/referrals-withdraw';
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
