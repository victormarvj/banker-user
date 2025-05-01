import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  private themeKey: any = 'app-theme';
  private themeLinkElementId: string = 'app-theme'; // ID for the theme link element
  themeSignal = signal(this.initTheme());

  constructor() {}

  toggleTheme() {
    const newTheme = this.themeSignal() === 'light' ? 'dark' : 'light';
    this.themeSignal.set(newTheme);
    if (this.isBrowser()) {
      localStorage.setItem(this.themeKey, newTheme);
      this.applyTheme(newTheme);
    }
  }

  get currentTheme() {
    return this.themeSignal();
  }

  initTheme() {
    let theme: string = 'dark';
    if (this.isBrowser()) {
      theme = localStorage.getItem(this.themeKey) || 'dark';
    }

    this.applyTheme(theme);
    return theme;
  }

  private isBrowser() {
    return typeof window !== 'undefined';
  }

  // Dynamically apply the theme
  applyTheme(theme: string) {
    if (this.isBrowser()) {
      document.body.classList.remove('light-theme', 'dark-theme');
      document.body.classList.add(`${theme}-theme`);

      // Dynamically load the theme file
      this.loadThemeFile(`${theme}-theme.css`);
    }
  }

  // Load the theme file dynamically
  private loadThemeFile(themeFile: string) {
    const head = document.head;
    let themeLinkElement = document.getElementById(
      this.themeLinkElementId
    ) as HTMLLinkElement;

    if (themeLinkElement) {
      // If the link element exists, update the href to the new theme
      themeLinkElement.href = themeFile;
    } else {
      // If it doesn't exist, create and append a new link element
      themeLinkElement = document.createElement('link');
      themeLinkElement.rel = 'stylesheet';
      themeLinkElement.id = this.themeLinkElementId;
      themeLinkElement.href = themeFile;
      head.appendChild(themeLinkElement);
    }
  }
}
