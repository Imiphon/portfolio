import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogModule } from "@angular/material/dialog";
import { LanguageService } from "./../language.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
  ],

  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements OnInit {

  privacyPolicy: string = '';

  constructor(private languageService: LanguageService, private http: HttpClient) { }

  ngOnInit(): void {
    this.languageService.getCurrentLanguage().subscribe(lang => {
      this.onLanguageChange(lang);
    })
  }
  //maby necassary if it used again in btns directly in this component.
  onLanguageChange(lang: string): void {
    this.loadText(lang);
  }

  loadText(lang: string): void {
    this.http.get<any>('assets/text-data.json').subscribe(data => {
      this.privacyPolicy = data[lang]['privacyPolicy'];
    });
  }

  @Output() closeEvent = new EventEmitter<void>();

  close(): void {
    this.closeEvent.emit();
  }
}
