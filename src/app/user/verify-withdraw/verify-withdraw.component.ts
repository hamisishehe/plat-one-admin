import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-verify-withdraw',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './verify-withdraw.component.html',
  styleUrl: './verify-withdraw.component.css',
})
export class VerifyWithdrawComponent implements OnInit {
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

            window.location.href = '/withdraw-log';
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
}
