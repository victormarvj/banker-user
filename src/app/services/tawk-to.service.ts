import { Injectable } from '@angular/core';

declare var Tawk_API: any;
declare var Tawk_LoadStart: any; // Change the declared type to 'any' (correctly removing the '=' sign)

@Injectable({
  providedIn: 'root',
})
export class TawkToService {
  constructor() {
    this.loadTawkTo();
  }

  private loadTawkTo() {
    if (document.getElementById('tawk-script')) {
      return; // Prevent duplicate script loading
    }

    var script = document.createElement('script');
    script.id = 'tawk-script';
    script.src = 'https://embed.tawk.to/67be0ee487b472191189bb1b/1ikv6kbq8';
    script.async = true;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);

    script.onload = () => {
      (Tawk_API = Tawk_API || {}), (Tawk_LoadStart = new Date());
      console.log('Tawk.to chat loaded successfully.');
    };
  }

  hideChat() {
    if (Tawk_API) {
      Tawk_API.hideWidget();
    }
  }

  showChat() {
    if (Tawk_API) {
      Tawk_API.showWidget();
    }
  }
}
