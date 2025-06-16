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
    title: 'Getting Started | AgnitudeHorizons.com',
  },
  {
    path: 'signin',
    component: SignInComponent,
    title: 'Sign In | AgnitudeHorizons.com',
  },
  {
    path: 'signup',
    component: SignUpComponent,
    title: 'Sign Up | AgnitudeHorizons.com',
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    title: 'Forgot Password | AgnitudeHorizons.com',
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
    title: 'Verify Email | AgnitudeHorizons.com',
  },
  {
    path: 'transaction-pin',
    component: TransactionPinComponent,
    title: 'Transaction Pin | AgnitudeHorizons.com',
  },
  {
    path: 'identity-verification',
    component: IdentityVerificationComponent,
    title: 'Identity Verification | AgnitudeHorizons.com',
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
        title: 'Dashboard | AgnitudeHorizons.com',
      },
      {
        path: 'domestic',
        component: DomesticComponent,
        title: 'Domestic Transfer | AgnitudeHorizons.com',
      },
      {
        path: 'international',
        component: InternationalComponent,
        title: 'International | AgnitudeHorizons.com',
      },
      {
        path: 'domestic-europe',
        component: DomesticEuropeComponent,
        title: 'Domestic Europe | AgnitudeHorizons.com',
      },
      {
        path: 'incomplete-transaction',
        component: IncompleteTransactionComponent,
        title: 'Incomplete Transaction | AgnitudeHorizons.com',
      },
      {
        path: 'deposit',
        component: DepositComponent,
        title: 'Deposit | AgnitudeHorizons.com',
      },
      {
        path: 'deposit-history',
        component: DepositHistoryComponent,
        title: 'Deposit History | AgnitudeHorizons.com',
      },
      {
        path: 'withdrawal',
        component: WithdrawalComponent,
        title: 'Withdrawal | AgnitudeHorizons.com',
      },
      {
        path: 'withdrawal-history',
        component: WithdrawalHistoryComponent,
        title: 'Withdrawal History | AgnitudeHorizons.com',
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
        title: 'Transactions | AgnitudeHorizons.com',
      },
      {
        path: 'investments',
        component: InvestmentsComponent,
        title: 'Investments | AgnitudeHorizons.com',
      },
      {
        path: 'credit-cards',
        component: CreditCardsComponent,
        title: 'Credit Cards | AgnitudeHorizons.com',
      },
      {
        path: 'loans',
        component: LoansComponent,
        title: 'Loans | AgnitudeHorizons.com',
      },
      {
        path: 'support',
        component: SupportComponent,
        title: 'Support | AgnitudeHorizons.com',
      },
      {
        path: 'services',
        component: ServicesComponent,
        title: 'Services | AgnitudeHorizons.com',
      },
      {
        path: 'privileges',
        component: PrivilegesComponent,
        title: 'Privileges | AgnitudeHorizons.com',
      },
      {
        path: 'settings',
        component: SettingsComponent,
        title: 'Settings | AgnitudeHorizons.com',
      },
      {
        path: 'success/:transactionId',
        component: SuccessComponent,
        title: 'Transaction Success | AgnitudeHorizons.com',
      },
    ],
  },
  {
    path: 'test',
    component: TestComponent,
  },
];
