import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LanguageService } from "./../language.service";
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    PrivacyPolicyComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  contactOrange: string = '';
  contactHello: string = '';
  bText1: string = '';
  bText2: string = '';
  bText3: string = '';
  sendBtn: string = '';

  constructor(
    private http: HttpClient, 
    private languageService: LanguageService, 
    private _snackBar: MatSnackBar,
   ) { }

  ngOnInit(): void {
    this.languageService.getCurrentLanguage().subscribe(lang => {
      this.onLanguageChange(lang);
    })
  }

  sanitizeInput(input: string): string {
    return input.replace(/<script.*?>.*?<\/script>/gi, '');
  }

  // higher position
  openSnackBar(message: string): void {
    const config = new MatSnackBarConfig();
    config.panelClass = ['black-snackbar']; 
    config.duration = 4000;   
    this._snackBar.open(message, 'Close', config );
  }

  onLanguageChange(lang: string): void {
    this.loadText(lang);
  }

  loadText(lang: string): void {
    this.http.get<any>('assets/text-data.json').subscribe(data => {
      this.contactOrange = data[lang]['contactOrange'];
      this.contactHello = data[lang]['contactHello'];
      this.bText1 = data[lang]['bText1'];
      this.bText2 = data[lang]['bText2'];
      this.bText3 = data[lang]['bText3'];
      this.sendBtn = data[lang]['sendBtn'];
    });
  }

  contactData = {
    name: '',
    email: '',
    message: '',
    privacy: false,
  }

  mailTest = false;

  post = {
    endPoint: 'https://www.mensching.online/sendMail.php',
    //payload = contactData 
    body: (payload: any) => JSON.stringify(payload),
    headers: {
      'Content-Type': 'text/plain', //'Content-Type': 'application/json', 
      responseType: 'text',
    }
  }

  //to get a reaction if user didn't touch one of the inputs
  private allTouched(ngForm: NgForm) {
    Object.values(ngForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  isValidEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

  onSubmit(ngForm: NgForm) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // more headers possible
    });

    this.allTouched(ngForm);
    let sanitizedMessage = this.sanitizeInput(this.contactData.message);
    this.contactData.message = sanitizedMessage;  // Update the message in contactData with sanitized version
    if (ngForm.valid && this.contactData.privacy && !this.mailTest) {
      //conversion to JSON works automaticly with HTTPClient, so I take directly contactData
      this.http.post(this.post.endPoint, this.contactData, { headers, responseType: 'text' })
        .subscribe({
          next: (response) => {
            ngForm.resetForm();
            this.openSnackBar('Message has been sent.');
          },
          error: (error) => {
            console.error(error);
            this.openSnackBar('Failed to send message.');
          },
          complete: () => console.info('send post complete'),
        });

    } else if (ngForm && ngForm.submitted && this.mailTest) {
      ngForm.resetForm();
      this.allTouched(ngForm);
      console.log('mailTest works!');
      this.openSnackBar('Message has been sent.');
    }
  }

  @Output() togglePrivacyPolicyEvent = new EventEmitter<void>();
  togglePrivacyPolicy(): void {      
    this.togglePrivacyPolicyEvent.emit();    
  }
}