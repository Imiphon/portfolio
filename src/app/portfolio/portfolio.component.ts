import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class PortfolioComponent implements OnInit, AfterViewInit, OnDestroy {
  portfolioJoin: string = '';
  portfolioPollo: string = '';
  portfolioUsePopcorn: string = '';
  portfolioCardgame: string = '';
  portfolioMelopoiia: string = '';
  portfolioLearningProjectsLead: string = '';
  portfolioLearningProjectsBody: string = '';
  portfolioOpenProject: string = '';
  learningProjects: { count: string; url: string; description: string }[] = [];
  showLearningProjectsLeadAccent: boolean = false;
  showColored: boolean = false;
  isIOS:boolean = false; 
  private leadObserver?: IntersectionObserver;

  @ViewChild('learningProjectsLead') learningProjectsLeadRef?: ElementRef<HTMLElement>;

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

  ngAfterViewInit(): void {
    this.initLeadObserver();
  }

  ngOnDestroy(): void {
    this.leadObserver?.disconnect();
  }

  loadText(lang: string): void {
    this.http.get<any>('assets/text-data.json').subscribe(data => {
      this.portfolioJoin = data[lang]['portfolioJoin'];
      this.portfolioPollo = data[lang]['portfolioPollo'];
      this.portfolioUsePopcorn = data[lang]['portfolioUsePopcorn'];      
      this.portfolioCardgame = data[lang]['portfolioCardgame'];
      this.portfolioMelopoiia = data[lang]['portfolioMelopoiia'];
      this.portfolioLearningProjectsLead = data[lang]['portfolioLearningProjectsLead'];
      this.portfolioLearningProjectsBody = data[lang]['portfolioLearningProjectsBody'];
      this.portfolioOpenProject = data[lang]['portfolioOpenProject'];
      this.learningProjects = [
        {
          count: '01/05',
          url: 'https://www.mensching.online/coding/join/index.html',
          description: this.portfolioJoin
        },
        {
          count: '02/05',
          url: 'https://www.mensching.online/coding/pollo/index.html',
          description: this.portfolioPollo
        },
        {
          count: '03/05',
          url: 'https://www.mensching.online/coding/usePopcorn/index.html',
          description: this.portfolioUsePopcorn
        },
        {
          count: '04/05',
          url: 'https://www.mensching.online/coding/cardgame/index.html',
          description: this.portfolioCardgame
        }
      ];
    });
  }

  private initLeadObserver(): void {
    if (!this.learningProjectsLeadRef?.nativeElement) {
      return;
    }

    this.leadObserver?.disconnect();
    this.leadObserver = new IntersectionObserver(([entry]) => {
      this.showLearningProjectsLeadAccent = entry.isIntersecting;
    }, {
      threshold: 0.6
    });

    this.leadObserver.observe(this.learningProjectsLeadRef.nativeElement);
  }
}
