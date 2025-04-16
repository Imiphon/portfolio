import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from "./../language.service";
import { CommonModule } from '@angular/common';
import { IosCheckerService } from "./../ios-checker.service";

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit {
  portfolioJoin: string = '';
  portfolioPollo: string = '';
  portfolioUsePopcorn: string = '';
  portfolioCardgame: string = '';
  showColored: boolean = false;
  isIOS:boolean = false; 
  constructor(private languageService: LanguageService, private http: HttpClient, private iosChecker: IosCheckerService) {
    this.isIOS = this.iosChecker.isUserIOS();
   }
   
  ngOnInit(): void {
    this.languageService.getCurrentLanguage().subscribe(lang => {
      this.onLanguageChange(lang);
    })
  }

  onLanguageChange(lang: string): void {
    this.loadText(lang);
  }

  loadText(lang: string): void {
    this.http.get<any>('assets/text-data.json').subscribe(data => {
      this.portfolioJoin = data[lang]['portfolioJoin'];
      this.portfolioPollo = data[lang]['portfolioPollo'];
      this.portfolioUsePopcorn = data[lang]['portfolioUsePopcorn'];      
      this.portfolioCardgame = data[lang]['portfolioCardgame'];
    });
  }
}
