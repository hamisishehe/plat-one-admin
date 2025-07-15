import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SidebarComponent, UserDetails } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DataTable } from 'simple-datatables';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { WithdrawDetails } from '../withdraw-log/withdraw-log.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,
    FooterComponent,
    HttpClientModule,
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  balanceDetails: BalanceDetails[] | null = null;
  enabalanceDetails: ENABalanceDetails[] | null = null;
  enaProfitBalance: ENAProfitBalance[] | null = null;
  adminbalance: Admindeposits[] | null = null;
  userdeposits: UserDeposits[] | null = null;
  allUsers: Users[] | null = [];
  allplans: PlansDetails[] | null = null;
  withdrawDetails: WithdrawDetails[] | null = null;

  payedwithdrawDetails: WithdrawDetails[] | null = null;
  refwithdrawDetails: WithdrawDetails[] | null = null;

  pendingwithdrawDetails: WithdrawDetails[] | null = null;
  pendingrefwithdrawDetails: WithdrawDetails[] | null = null;

  totaldeposit: number = 0;
  totalpendingdeposit: number = 0;
  totalpendingreferralswithdraw: number = 0;
  totalpendingwithdraw: number = 0;
  totalplans: number = 0;
  totalreferralswithdraw: number = 0;
  totalenawithdraw: number = 0;

  userData: UserDetails | null = null;
  userid: number = 0;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getData();
    this.getAdmin();
    this.getAllUsers();
    this.planslog();
    this.getreferralwithdraw();
    this.getallwithdraw();
    this.getPendingDeposits();
    this.getPendingRefWithdraw();
    this.getPendingWithdraw();
  }

  getData(): void {
    this.http
      .get<BalanceDetails[]>(`${environment.baseUrl}/balance/show-all-balance`)
      .subscribe(
        (data) => {
          this.balanceDetails = data;
        },
        (error) => {
          console.error('Error fetching balance details:', error);
        }
      );
  }

  getallwithdraw(): void {
    this.http
      .get<WithdrawDetails[]>(
        `${environment.baseUrl}/withdraw/users-withdraw/show-all`
      )
      .subscribe(
        (data) => {
          this.withdrawDetails = data;

          this.totalenawithdraw = this.withdrawDetails?.reduce(
            (sum, item) => sum + item.amount,
            0
          );
        },
        (error) => {
          console.error('Error fetching withdraw details:', error);
        }
      );
  }

  getreferralwithdraw(): void {
    this.http
      .get<WithdrawDetails[]>(
        `${environment.baseUrl}/ref-withdraw/users-withdraw/show-all`
      )
      .subscribe(
        (data) => {
          console.log('====================================');
          console.log(data);
          console.log('====================================');
          this.refwithdrawDetails = data;
          this.totalreferralswithdraw = this.refwithdrawDetails?.reduce(
            (sum, item) => sum + item.amount,
            0
          );
        },
        (error) => {
          console.error('Error fetching withdraw details:', error);
        }
      );
  }

  planslog(): void {
    this.http
      .get<PlansDetails[]>(
        `${environment.baseUrl}/investments/users-investments`
      ) // Use baseUrl here
      .subscribe(
        (data) => {
          console.log('====================================');
          console.log(data);
          console.log('====================================');
          this.allplans = data;
          this.totalplans = this.allplans?.reduce(
            (sum, item) => sum + item.amount,
            0
          );
        },
        (error) => {
          console.error('Error fetching plans details:', error);
        }
      );
  }

  getAdmin(): void {
    this.http
      .get<Admindeposits[]>(`${environment.baseUrl}/admin-deposits/getall`)
      .subscribe(
        (data) => {
          console.log('====================================');
          console.log('hellllllow');
          console.log('====================================');
          this.adminbalance = data;
          this.totaldeposit = this.adminbalance?.reduce(
            (sum, item) => sum + item.amount,
            0
          );
        },
        (error) => {
          console.error('Error fetching balance details:', error);
        }
      );
  }

  getPendingWithdraw(): void {
    this.http
      .get<WithdrawDetails[]>(`${environment.baseUrl}/withdraw/getallpending`)
      .subscribe(
        (data) => {
          console.log('====================================');
          console.log('PENDING DEPOSITShellllllow');
          console.log('====================================');
          this.pendingwithdrawDetails = data;

          this.totalpendingwithdraw = this.pendingwithdrawDetails?.reduce(
            (sum, item) => sum + item.amount,
            0
          );

          console.log('====================================');
          console.log('PENDING DEPOSITS');
          console.log('====================================');
        },
        (error) => {
          console.error('Error fetching balance details:', error);
        }
      );
  }

  getPendingRefWithdraw(): void {
    this.http
      .get<WithdrawDetails[]>(
        `${environment.baseUrl}/ref-withdraw/getallpending`
      )
      .subscribe(
        (data) => {
          console.log('====================================');
          console.log('PENDING withdraw');
          console.log('====================================');
          this.pendingrefwithdrawDetails = data;

          this.totalpendingreferralswithdraw =
            this.pendingrefwithdrawDetails?.reduce(
              (sum, item) => sum + item.amount,
              0
            );

          console.log('====================================');
          console.log('PENDING withdraw');
          console.log('====================================');
        },
        (error) => {
          console.error('Error fetching balance details:', error);
        }
      );
  }

  getPendingDeposits(): void {
    this.http
      .get<UserDeposits[]>(`${environment.baseUrl}/deposits/getallpending`)
      .subscribe(
        (data) => {
          this.userdeposits = data;

          this.totalpendingdeposit = this.userdeposits?.reduce(
            (sum, item) => sum + item.amount,
            0
          );
        },
        (error) => {
          console.error('Error fetching balance details:', error);
        }
      );
  }

  getEnaData(): void {
    this.http
      .get<ENABalanceDetails[]>(`${environment.baseUrl}/ena/show-all-balance`)
      .subscribe(
        (data) => {
          this.enabalanceDetails = data;
        },
        (error) => {
          console.error('Error fetching ENA balance details:', error);
        }
      );
  }

  getAllUsers() {
    console.log('====================================');
    console.log('inaitwa');
    console.log('====================================');
    this.http.get<Users[]>(`${environment.baseUrl}/user/users`).subscribe(
      (data) => {
        this.allUsers = data;
      },
      (error) => {
        console.error('Error fetching user Data', error);
      }
    );
  }

  // getEnaProfit(userId: number): void {
  //   this.http
  //     .get<ENAProfitBalance>(
  //       `${environment.baseUrl}/profit/show-balance/${userId}`
  //     )
  //     .subscribe(
  //       (data) => {
  //         this.enaProfitBalance = data;
  //       },
  //       (error) => {
  //         console.error('Error fetching ENA profit details:', error);
  //       }
  //     );
  // }
}

export interface BalanceDetails {
  id: number;
  availableBalance: number;
  lockedBalance: number;
}

export interface ENABalanceDetails {
  id: number;
  availableBalance: number;
  lockedBalance: number;
}

export interface ENAProfitBalance {
  id: number;
  totalProfit: number;
  lastUpdated: number;
}

export interface Admindeposits {
  id: number;
  amount: number;
}

export interface UserDeposits {
  id: number;
  amount: number;
}

export interface Users {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  role: string;
  locked: string;
}

export interface PlansDetails {
  id: number;
  amount: number;
  startDate: string;
  maturityDate: string;
  investmentPackage: string;
  status: string;
}
