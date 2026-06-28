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
import { WithdrawalComponent } from './pages/dashboard/withdrawal/withdrawal.component';
import { WithdrawalHistoryComponent } from './pages/dashboard/withdrawal-history/withdrawal-history.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/getting-started',
    pathMatch: 'full',
  },
  {
    path: 'getting-started',
    component: GettingStartedComponent,
    title: 'Getting Started | NurtaureCrest.com',
  },
  {
    path: 'signin',
    component: SignInComponent,
    title: 'Sign In | NurtaureCrest.com',
  },
  {
    path: 'signup',
    component: SignUpComponent,
    title: 'Sign Up | NurtaureCrest.com',
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    title: 'Forgot Password | NurtaureCrest.com',
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
    title: 'Verify Email | NurtaureCrest.com',
  },
  {
    path: 'transaction-pin',
    component: TransactionPinComponent,
    title: 'Transaction Pin | NurtaureCrest.com',
  },
  {
    path: 'identity-verification',
    component: IdentityVerificationComponent,
    title: 'Identity Verification | NurtaureCrest.com',
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
        title: 'Dashboard | NurtaureCrest.com',
      },
      {
        path: 'domestic',
        component: DomesticComponent,
        title: 'Domestic Transfer | NurtaureCrest.com',
      },
      {
        path: 'international',
        component: InternationalComponent,
        title: 'International | NurtaureCrest.com',
      },
      {
        path: 'domestic-europe',
        component: DomesticEuropeComponent,
        title: 'Domestic Europe | NurtaureCrest.com',
      },
      {
        path: 'incomplete-transaction',
        component: IncompleteTransactionComponent,
        title: 'Incomplete Transaction | NurtaureCrest.com',
      },
      {
        path: 'deposit',
        component: DepositComponent,
        title: 'Deposit | NurtaureCrest.com',
      },
      {
        path: 'deposit-history',
        component: DepositHistoryComponent,
        title: 'Deposit History | NurtaureCrest.com',
      },
      {
        path: 'withdrawal',
        component: WithdrawalComponent,
        title: 'Withdrawal | NurtaureCrest.com',
      },
      {
        path: 'withdrawal-history',
        component: WithdrawalHistoryComponent,
        title: 'Withdrawal History | NurtaureCrest.com',
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
        title: 'Transactions | NurtaureCrest.com',
      },
      {
        path: 'investments',
        component: InvestmentsComponent,
        title: 'Investments | NurtaureCrest.com',
      },
      {
        path: 'credit-cards',
        component: CreditCardsComponent,
        title: 'Credit Cards | NurtaureCrest.com',
      },
      {
        path: 'loans',
        component: LoansComponent,
        title: 'Loans | NurtaureCrest.com',
      },
      {
        path: 'support',
        component: SupportComponent,
        title: 'Support | NurtaureCrest.com',
      },
      {
        path: 'services',
        component: ServicesComponent,
        title: 'Services | NurtaureCrest.com',
      },
      {
        path: 'privileges',
        component: PrivilegesComponent,
        title: 'Privileges | NurtaureCrest.com',
      },
      {
        path: 'settings',
        component: SettingsComponent,
        title: 'Settings | NurtaureCrest.com',
      },
      {
        path: 'success/:transactionId',
        component: SuccessComponent,
        title: 'Transaction Success | NurtaureCrest.com',
      },
    ],
  },
  {
    path: 'test',
    component: TestComponent,
  },
];
