import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// Auth Components
import { LoginComponent } from './auth/login/login.component';
import { authGuardGuard } from './auth/auth-guard.guard';

// User Components
import { LayoutComponent } from './user/layout/layout.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { DepositLogComponent } from './user/deposit-log/deposit-log.component';
import { PlansLogComponent } from './user/plans-log/plans-log.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ReferralComponent } from './user/referral/referral.component';
import { WithdrawLogComponent } from './user/withdraw-log/withdraw-log.component';

// Layout Components
import { SidebarComponent } from './user/sidebar/sidebar.component';
import { FooterComponent } from './user/footer/footer.component';
import { UsersComponent } from './user/users/users.component';
import { DepositViewMoreComponent } from './user/deposit-view-more/deposit-view-more.component';
import { UserMoreComponent } from './user/user-more/user-more.component';
import { AdminDepositsComponent } from './user/admin-deposits/admin-deposits.component';
import { ReferralsWithdrawComponent } from './user/referrals-withdraw/referrals-withdraw.component';
import { VerifyWithdrawComponent } from './user/verify-withdraw/verify-withdraw.component';
import { RefVerifyWithdrawComponent } from './user/ref-verify-withdraw/ref-verify-withdraw.component';
import { DeletePlanComponent } from './user/delete-plan/delete-plan.component';
import { ChangeDepositStatusComponent } from './user/change-deposit-status/change-deposit-status.component';
import { ActivitiesLogComponent } from './user/activities-log/activities-log.component';
import { PendingDepositsComponent } from './user/pending-deposits/pending-deposits.component';
import { PendingRefWithdrawComponent } from './user/pending-ref-withdraw/pending-ref-withdraw.component';
import { PendingAssetWithdrawComponent } from './user/pending-asset-withdraw/pending-asset-withdraw.component';

export const routes: Routes = [
  // Public routes
  { path: 'login', component: LoginComponent },

  // Authenticated routes under layout
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuardGuard], // Main layout protected by AuthGuard
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuardGuard],
      }, // No need to add AuthGuard again
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'activity-log',
        component: ActivitiesLogComponent,
        canActivate: [authGuardGuard],
      },

      {
        path: 'deposit-log',
        component: DepositLogComponent,
        canActivate: [authGuardGuard],
      },

      {
        path: 'pending-log',
        component: PendingDepositsComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'admin-deposits',
        component: AdminDepositsComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'deposit-view-more/:id',
        component: DepositViewMoreComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'user-more/:id',
        component: UserMoreComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'referral',
        component: ReferralComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'withdraw-log',
        component: WithdrawLogComponent,
        canActivate: [authGuardGuard],
      },
       {
        path: 'pending-withdraw',
        component: PendingAssetWithdrawComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'referrals-withdraw',
        component: ReferralsWithdrawComponent,
        canActivate: [authGuardGuard],
      },

       {
        path: 'pending-ref-withdraw',
        component: PendingRefWithdrawComponent,
        canActivate: [authGuardGuard],
      },

      {
        path: 'verify-withdraw/:id',
        component: VerifyWithdrawComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'ref-verify-withdraw/:id',
        component: RefVerifyWithdrawComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'delete-plans/:id',
        component: DeletePlanComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'change-deposit-status/:id',
        component: ChangeDepositStatusComponent,
        canActivate: [authGuardGuard],
      },
      { path: '', component: SidebarComponent, canActivate: [authGuardGuard] }, // Sidebar can be loaded as part of the layout
      { path: '', component: FooterComponent, canActivate: [authGuardGuard] }, // Footer as part of the layout
    ],
  },

  // Default redirect for empty path
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Wildcard route for 404
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
