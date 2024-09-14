import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { AngularFontawesomeModule } from '../../shared/angular-fontawesome/angular-fontawesome.module';

import { faBell, faCog, faBars } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    AngularFontawesomeModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  faBars = faBars;
  faCog = faCog;
  faBell = faBell;

  @Input() theme: string = '';
  @Input() title: string = '';

  userData: any;

  constructor(
    private userService: UserService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.userData = this.userService.getAuthenticatedUserStorage;
  }

  logOut() {
    this.userService.logOut().subscribe((res) => {
      this.snackBarService.success(res.message);
    });
    this.userService.revokeAuthStorage();
  }
}
