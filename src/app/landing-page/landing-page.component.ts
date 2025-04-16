import { Component } from '@angular/core';
import { HeaderComponent } from "./../header/header.component";
import { CodingHomeComponent } from "./../coding-home/coding-home.component";
import { AboutMeComponent } from "./../about-me/about-me.component";
import { MySkillsComponent } from "./../my-skills/my-skills.component";
import { PortfolioComponent } from "./../portfolio/portfolio.component";
import { ContactComponent } from "./../contact/contact.component";
import { FooterComponent } from "./../footer/footer.component";
import { PrivacyPolicyComponent } from "./../privacy-policy/privacy-policy.component";
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { LegalNoticeComponent } from '../legal-notice/legal-notice.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { ToggleService } from '../toggle.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    HeaderComponent,
    CodingHomeComponent,
    FooterComponent,
    AboutMeComponent,
    MySkillsComponent,
    PortfolioComponent,
    ContactComponent,
    PrivacyPolicyComponent,
    LegalNoticeComponent,
    CommonModule,
    NavigationComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  constructor(public dialog: MatDialog, private toggleService: ToggleService) { }

  showNavigation: boolean = false;
  showPrivacyPolicy: boolean = false;
  showLegalNotice: boolean = false;


  togglePrivacyPolicy(): void {
    this.showPrivacyPolicy = !this.showPrivacyPolicy;    
  }

  toggleLegalNotice(): void {
    this.showLegalNotice = !this.showLegalNotice;    
  }

  ngOnInit() {
    this.toggleService.onTogglePrivacyPolicy().subscribe(() => {
      this.showPrivacyPolicy = !this.showPrivacyPolicy;
    });

    this.toggleService.onToggleLegalNotice().subscribe(() => {
      this.showLegalNotice = !this.showLegalNotice;
    });

  }

  toggleNavigation() {
    this.showNavigation = !this.showNavigation;
  }
}
