import {
  HttpClient,
  HttpHeaders,
  HttpClientModule,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DataTable } from 'simple-datatables';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  allUsers: Users[] = [];
  userid: number = 0;
  loading: boolean = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    console.log('====================================');
    console.log('inaitwa');
    console.log('====================================');
    this.http.get<Users[]>(`${environment.baseUrl}/user/users`).subscribe(
      (data) => {
        this.allUsers = data;
        console.log('====================================');
        console.log(this.allUsers);
        console.log('====================================');

        this.initializeTable();
      },
      (error) => {
        console.error('Error fetching user Data', error);
      }
    );
  }

  initializeTable(): void {
    setTimeout(() => {
      let datatable = new DataTable('#default-table', {
        sortable: true,
        paging: true,
      });
      console.log('Table initialized');
    }, 100);
  }

  viewusermore(user_id: number) {
    console.log('====================================');
    console.log(user_id);
    console.log('====================================');
  }
}

export interface Users {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  role: string;
  locked: string;
}
