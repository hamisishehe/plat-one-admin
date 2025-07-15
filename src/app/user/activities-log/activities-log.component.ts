import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-activities-log',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './activities-log.component.html',
  styleUrl: './activities-log.component.css'
})
export class ActivitiesLogComponent implements OnInit{

  task_products: TaskProduct [] = [];
  loading: boolean = true;
  userid: number = 0; // Initial default value to avoid null issues

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getData(); // Fetch profile and trigger plans data fetch
  }
  initializeTable(): void {
    setTimeout(() => {
      let datatable = new DataTable('#search-table');
      console.log('Table initialized');
    }, 100);
  }

    getData(): void {
      this.loading = true;
      this.http
        .get<TaskProduct[]>(`${environment.baseUrl}/get-tasks`) // Adjust based on your actual endpoint
        .subscribe(
          (response) => {
            console.log('Fetched data:', response); // Log the full response

            this.task_products = response;

            this.initializeTable();
            this.loading = false;
          },
          (error) => {
            console.error('Error fetching data:', error);
            this.loading = false;
          }
        );
    }

}



// task-product.model.ts
export interface TaskProduct {
  id: number;
  count_product: number;
  start_time: string;
  finish_time: string;
  status: 'PENDING' | 'COMPLETE' | string;
  total_amount: number;
}

