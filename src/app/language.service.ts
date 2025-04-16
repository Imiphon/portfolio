import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject: BehaviorSubject<string>;
  public currentLanguage$: Observable<string>;

  constructor() {
    // Set standard to english
    this.currentLanguageSubject = new BehaviorSubject<string>('en');
    this.currentLanguage$ = this.currentLanguageSubject.asObservable();
  }

  //to change the language
  public changeLanguage(lang: string): void {
    this.currentLanguageSubject.next(lang);
  }

  // to get the current language
  public getCurrentLanguage(): Observable<string> {
    return this.currentLanguage$;
  }
}
