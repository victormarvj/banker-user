import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  private themeKey: any = 'app-theme';
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
    let theme: string = 'light';
    if (this.isBrowser()) {
      theme = localStorage.getItem(this.themeKey) || 'light';
    }

    this.applyTheme(theme);
    return theme;
  }

  private isBrowser() {
    return typeof window !== 'undefined';
  }

  applyTheme(theme: string) {
    if (this.isBrowser()) {
      // document.documentElement.classList.remove('light-theme', 'dark-theme');
      // document.documentElement.classList.add(
      //   `${theme}-theme`,
      //   `${theme}-theme`
      // );
      document.body.classList.remove('light-theme', 'dark-theme');
      document.body.classList.add(`${theme}-theme`, `${theme}-theme`);
    }
  }
}
