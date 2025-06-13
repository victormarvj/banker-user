import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoogleTranslateService {
  constructor() {}

  private scriptLoaded = false;

  loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.scriptLoaded) {
        resolve();
        return;
      }

      (window as any).googleTranslateElementInit = () => {
        this.scriptLoaded = true;
        resolve();
      };

      const script = document.createElement('script');
      script.src =
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  unloadScript(): void {
    // Remove the script tag
    const scripts = document.querySelectorAll(
      'script[src*="translate.google.com/translate_a/element.js"]'
    );
    scripts.forEach((script) => script.remove());

    // Optional: Remove the Google Translate div(s)
    const widgets = document.querySelectorAll(
      '[id^="google_translate_element"]'
    );
    widgets.forEach((widget) => widget.remove());

    // Optional: Clean up global init callback and any window pollution
    delete (window as any).google;
    delete (window as any).googleTranslateElementInit;

    this.scriptLoaded = false;
  }

  createWidget(containerId: string): void {
    const existing = document.getElementById(containerId);
    if (existing) {
      existing.innerHTML = ''; // clean if reusing the div
    }

    if ((window as any).google?.translate?.TranslateElement) {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: 'en' },
        containerId
      );
    }
  }
}
