import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogModule } from "@angular/material/dialog";
import { LanguageService } from "./../language.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
  ],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})

export class LegalNoticeComponent implements OnInit {

  legalNotice: string = '';

  constructor(private languageService: LanguageService, private http: HttpClient) { }

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
      this.legalNotice = data[lang]['legalNotice'];
    });
  }

  @Output() closeEvent = new EventEmitter<void>();

  close(): void {
    this.closeEvent.emit();
  }
}
