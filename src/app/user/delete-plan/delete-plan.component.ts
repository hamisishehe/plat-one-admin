import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-plan',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './delete-plan.component.html',
  styleUrl: './delete-plan.component.css',
})
export class DeletePlanComponent implements OnInit {
  id: number = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });

    this.deleteInvestment(this.id);

    console.log('====================================');
    console.log(this.id);
    console.log('====================================');
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

          window.location.href = '/plans-log';
        },
        (error) => {
          Swal.fire({
            icon: 'success',
            title: 'Successfully',
            showConfirmButton: false,
            timer: 1500,
          });

          window.location.href = '/plans-log';
        }
      );
  }
}
