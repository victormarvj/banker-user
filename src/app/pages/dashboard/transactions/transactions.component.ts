import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';

import { Config } from 'datatables.net';
import { AngularDatatablesModule } from '../../../shared/angular-datatables/angular-datatables.module';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [AngularMaterialModule, AngularDatatablesModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  dtOptions: Config = {};

  isBrowser: boolean = false;

  ngOnInit(): void {
    // Only execute jQuery code in the browser
    if (this.isBrowser) {
      this.dtOptions = {
        pagingType: 'full_numbers',
      };
    }
  }
}
