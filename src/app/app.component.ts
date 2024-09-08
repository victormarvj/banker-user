import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ThemesService } from './services/themes.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'bankerSSRscss';

  theme: string = '';

  constructor(private themeService: ThemesService) {}

  ngOnInit(): void {
    this.themeService.initTheme();
    this.applyTheme();
  }

  // toggleTheme(event: any) {
  //   this.themeService.toggleTheme();
  //   this.applyTheme();
  // }

  applyTheme() {
    this.theme = this.themeService.currentTheme;
  }
}
