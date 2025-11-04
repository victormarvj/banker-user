import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemesService } from '../../services/themes.service';
import { GoogleTranslateService } from '../../services/google-translate.service';

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

  constructor(
    private themeService: ThemesService,
    private googleTranslate: GoogleTranslateService
  ) {}

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

  @ViewChild('translateParent', { static: true }) translateParent!: ElementRef;
  private translateDivId = 'google_translate_element';

  ngAfterViewInit(): void {
    // Create and insert div
    const div = document.createElement('div');
    div.id = this.translateDivId;
    this.translateParent.nativeElement.appendChild(div);

    this.googleTranslate.loadScript().then(() => {
      this.googleTranslate.createWidget(this.translateDivId);
    });
  }

  ngOnDestroy(): void {
    // Clean up
    const div = document.getElementById(this.translateDivId);
    if (div) {
      div.remove();
    }

    this.googleTranslate.unloadScript();
  }
}
