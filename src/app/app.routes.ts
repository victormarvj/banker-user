import { Routes } from '@angular/router';
import { SettingsComponent } from './pages/dashboard/settings/settings.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IdentityVerificationComponent } from './pages/identity-verification/identity-verification.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { GettingStartedComponent } from './pages/getting-started/getting-started.component';
import { TransactionsComponent } from './pages/dashboard/transactions/transactions.component';
import { CreditCardsComponent } from './pages/dashboard/credit-cards/credit-cards.component';
import { InvestmentsComponent } from './pages/dashboard/investments/investments.component';
import { ServicesComponent } from './pages/dashboard/services/services.component';
import { LoansComponent } from './pages/dashboard/loans/loans.component';
import { PrivilegesComponent } from './pages/dashboard/privileges/privileges.component';
import { DomesticComponent } from './pages/dashboard/domestic/domestic.component';
import { InternationalComponent } from './pages/dashboard/international/international.component';
import { SupportComponent } from './pages/dashboard/support/support.component';
import { TransactionPinComponent } from './pages/transaction-pin/transaction-pin.component';
import { TestComponent } from './pages/test/test.component';
import { SuccessComponent } from './pages/dashboard/success/success.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { DomesticEuropeComponent } from './pages/dashboard/domestic-europe/domestic-europe.component';
import { IncompleteTransactionComponent } from './pages/dashboard/incomplete-transaction/incomplete-transaction.component';
import { DepositComponent } from './pages/dashboard/deposit/deposit.component';
import { DepositHistoryComponent } from './pages/dashboard/deposit-history/deposit-history.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/getting-started',
    pathMatch: 'full',
  },
  {
    path: 'getting-started',
    component: GettingStartedComponent,
    title: 'Getting Started | Pulsebyteciti.com',
  },
  {
    path: 'signin',
    component: SignInComponent,
    title: 'Sign In | Pulsebyteciti.com',
  },
  {
    path: 'signup',
    component: SignUpComponent,
    title: 'Sign Up | Pulsebyteciti.com',
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    title: 'Forgot Password | Pulsebyteciti.com',
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
    title: 'Verify Email | Pulsebyteciti.com',
  },
  {
    path: 'transaction-pin',
    component: TransactionPinComponent,
    title: 'Transaction Pin | Pulsebyteciti.com',
  },
  {
    path: 'identity-verification',
    component: IdentityVerificationComponent,
    title: 'Identity Verification | Pulsebyteciti.com',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
        title: 'Dashboard | Pulsebyteciti.com',
      },
      {
        path: 'domestic',
        component: DomesticComponent,
        title: 'Domestic Transfer | Pulsebyteciti.com',
      },
      {
        path: 'international',
        component: InternationalComponent,
        title: 'International | Pulsebyteciti.com',
      },
      {
        path: 'domestic-europe',
        component: DomesticEuropeComponent,
        title: 'Domestic Europe | Pulsebyteciti.com',
      },
      {
        path: 'incomplete-transaction',
        component: IncompleteTransactionComponent,
        title: 'Incomplete Transaction | Pulsebyteciti.com',
      },
      {
        path: 'deposit',
        component: DepositComponent,
        title: 'Deposit | Pulsebyteciti.com',
      },
      {
        path: 'deposit-history',
        component: DepositHistoryComponent,
        title: 'Deposit History | Pulsebyteciti.com',
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
        title: 'Transactions | Pulsebyteciti.com',
      },
      {
        path: 'investments',
        component: InvestmentsComponent,
        title: 'Investments | Pulsebyteciti.com',
      },
      {
        path: 'credit-cards',
        component: CreditCardsComponent,
        title: 'Credit Cards | Pulsebyteciti.com',
      },
      {
        path: 'loans',
        component: LoansComponent,
        title: 'Loans | Pulsebyteciti.com',
      },
      {
        path: 'support',
        component: SupportComponent,
        title: 'Support | Pulsebyteciti.com',
      },
      {
        path: 'services',
        component: ServicesComponent,
        title: 'Services | Pulsebyteciti.com',
      },
      {
        path: 'privileges',
        component: PrivilegesComponent,
        title: 'Privileges | Pulsebyteciti.com',
      },
      {
        path: 'settings',
        component: SettingsComponent,
        title: 'Settings | Pulsebyteciti.com',
      },
      {
        path: 'success/:transactionId',
        component: SuccessComponent,
        title: 'Transaction Success | Pulsebyteciti.com',
      },
    ],
  },
  {
    path: 'test',
    component: TestComponent,
  },
];
