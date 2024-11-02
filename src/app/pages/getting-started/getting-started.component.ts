import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemesService } from '../../services/themes.service';

@Component({
  selector: 'app-getting-started',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './getting-started.component.html',
  styleUrl: './getting-started.component.scss',
})
export class GettingStartedComponent implements OnInit {
  theme: string = '';
  isDarkTheme: boolean = false;

  constructor(private themeService: ThemesService) {}

  ngOnInit(): void {
    this.themeService.initTheme();
    this.applyTheme();
  }

  toggleTheme(event: any) {
    this.themeService.toggleTheme();
    this.applyTheme();
  }

  applyTheme() {
    this.theme = this.themeService.currentTheme;
    this.isDarkTheme = this.theme === 'dark' ? true : false;
  }
}
