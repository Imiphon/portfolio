
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from "./../privacy-policy/privacy-policy.component";
import { LanguageService } from "./../language.service";
import { LegalNoticeComponent } from '../legal-notice/legal-notice.component';
import { ToggleService } from '../toggle.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    PrivacyPolicyComponent,
    LegalNoticeComponent,

  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  en: string = 'assets/icons/icon-en.png';
  de: string = 'assets/icons/icon-de.png';
  fr: string = 'assets/icons/icon-fr.png';

  constructor(private languageService: LanguageService, private toggleService: ToggleService) {

  }

  /**
   * Gives the current language click to the languageService
   * And from there to the affected components
   * @param lang 
   */
  changeLang(lang: string): void {
    this.languageService.changeLanguage(lang);
    localStorage.setItem('language', lang);

    // elements wich change language
    let highlightIds = ['aboutMe', 'contact', 'pp', 'portfolio', 'start'];
    let isRunning = false;
    highlightIds.forEach(id => {
      const element = document.getElementById(id);
      if (element && !isRunning) {
        element.classList.add('highlight-orange');
        setTimeout(() => {
          element.classList.remove('highlight-orange');
        }, 2000);
      }
    });
  }


  togglePrivacyPolicy(): void {
    this.toggleService.togglePrivacyPolicy();
    this.close();
  }

  toggleLegalNotice(): void {
    this.toggleService.toggleLegalNotice();
  }

  @Output() closeEvent = new EventEmitter<void>();
  close(): void {
    this.closeEvent.emit();
  }
}
