import { Injectable } from '@angular/core';

// declare let Tawk_API: any;
// declare let Tawk_LoadStart: any; // Change the declared type to 'any' (correctly removing the '=' sign)

@Injectable({
  providedIn: 'root',
})
export class TawkToService {
  Tawk_API: any;
  Tawk_LoadStart: any;
  constructor() {
    this.loadTawkTo();
  }

  private loadTawkTo() {
    if (document.getElementById('tawk-script')) {
      return; // Prevent duplicate script loading
    }

    let script = document.createElement('script');
    script.id = 'tawk-script';
    script.src = 'https://embed.tawk.to/6872d8c75d2f93190ecc672f/1j009tk5n';
    script.async = true;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);

    script.onload = () => {
      this.Tawk_API = this.Tawk_API || {};
      this.Tawk_LoadStart = new Date();
      console.log('Tawk.to chat loaded successfully.');
    };
  }

  hideChat() {
    if (this.Tawk_API) {
      this.Tawk_API.hideWidget();
    }
  }

  showChat() {
    if (this.Tawk_API) {
      this.Tawk_API.showWidget();
    }
  }
}
