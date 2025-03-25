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
    title: 'Getting Started | ApexIntlTrustCapital.com',
  },
  {
    path: 'signin',
    component: SignInComponent,
    title: 'Sign In | ApexIntlTrustCapital.com',
  },
  {
    path: 'signup',
    component: SignUpComponent,
    title: 'Sign Up | ApexIntlTrustCapital.com',
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    title: 'Forgot Password | ApexIntlTrustCapital.com',
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
    title: 'Verify Email | ApexIntlTrustCapital.com',
  },
  {
    path: 'transaction-pin',
    component: TransactionPinComponent,
    title: 'Transaction Pin | ApexIntlTrustCapital.com',
  },
  {
    path: 'identity-verification',
    component: IdentityVerificationComponent,
    title: 'Identity Verification | ApexIntlTrustCapital.com',
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
        title: 'Dashboard | ApexIntlTrustCapital.com',
      },
      {
        path: 'domestic',
        component: DomesticComponent,
        title: 'Domestic Transfer | ApexIntlTrustCapital.com',
      },
      {
        path: 'international',
        component: InternationalComponent,
        title: 'International | ApexIntlTrustCapital.com',
      },
      {
        path: 'domestic-europe',
        component: DomesticEuropeComponent,
        title: 'Domestic Europe | ApexIntlTrustCapital.com',
      },
      {
        path: 'incomplete-transaction',
        component: IncompleteTransactionComponent,
        title: 'Incomplete Transaction | ApexIntlTrustCapital.com',
      },
      {
        path: 'deposit',
        component: DepositComponent,
        title: 'Deposit | ApexIntlTrustCapital.com',
      },
      {
        path: 'deposit-history',
        component: DepositHistoryComponent,
        title: 'Deposit History | ApexIntlTrustCapital.com',
      },
      {
        path: 'withdrawal',
        component: WithdrawalComponent,
        title: 'Withdrawal | ApexIntlTrustCapital.com',
      },
      {
        path: 'withdrawal-history',
        component: WithdrawalHistoryComponent,
        title: 'Withdrawal History | ApexIntlTrustCapital.com',
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
        title: 'Transactions | ApexIntlTrustCapital.com',
      },
      {
        path: 'investments',
        component: InvestmentsComponent,
        title: 'Investments | ApexIntlTrustCapital.com',
      },
      {
        path: 'credit-cards',
        component: CreditCardsComponent,
        title: 'Credit Cards | ApexIntlTrustCapital.com',
      },
      {
        path: 'loans',
        component: LoansComponent,
        title: 'Loans | ApexIntlTrustCapital.com',
      },
      {
        path: 'support',
        component: SupportComponent,
        title: 'Support | ApexIntlTrustCapital.com',
      },
      {
        path: 'services',
        component: ServicesComponent,
        title: 'Services | ApexIntlTrustCapital.com',
      },
      {
        path: 'privileges',
        component: PrivilegesComponent,
        title: 'Privileges | ApexIntlTrustCapital.com',
      },
      {
        path: 'settings',
        component: SettingsComponent,
        title: 'Settings | ApexIntlTrustCapital.com',
      },
      {
        path: 'success/:transactionId',
        component: SuccessComponent,
        title: 'Transaction Success | ApexIntlTrustCapital.com',
      },
    ],
  },
  {
    path: 'test',
    component: TestComponent,
  },
];
