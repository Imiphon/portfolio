import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {
  private togglePrivacyPolicySubject = new Subject<void>();
  private toggleLegalNoticeSubject = new Subject<void>();
  private closeSubject = new Subject<void>();

  constructor() { }
  
  togglePrivacyPolicy() {
    this.togglePrivacyPolicySubject.next();
    this.close();
  }

  toggleLegalNotice() {
    this.toggleLegalNoticeSubject.next();
    this.close();
  }

  close() {
    this.closeSubject.next();
  }

  onTogglePrivacyPolicy() {
    return this.togglePrivacyPolicySubject.asObservable();
  }

  onToggleLegalNotice() {
    return this.toggleLegalNoticeSubject.asObservable();
  }

  onClose() {
    return this.closeSubject.asObservable();
  }

}