import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IosCheckerService {


  constructor() { 
    this.isUserIOS();
  }

  isUserIOS(): boolean {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }
}
