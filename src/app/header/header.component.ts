import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { PrivacyPolicyComponent } from "./../privacy-policy/privacy-policy.component";
import { LanguageService } from "./../language.service";
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    PrivacyPolicyComponent,
    NavigationComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private languageService: LanguageService) {
  }

  /**
   * Gives the current language click to the languageService
   * And from there to the affected components
   * @param lang 
   */
  changeLang(lang: string): void {
    this.languageService.changeLanguage(lang);
  }

  @Output() toggleNavigationEvent = new EventEmitter<void>();
  
  toggleNavigation(): void {
    this.toggleNavigationEvent.emit();
  }

  @Output() togglePrivacyPolicyEvent = new EventEmitter<void>();
  togglePrivacyPolicy(): void {
    this.togglePrivacyPolicyEvent.emit();
  }


}