import { Component, EventEmitter, Output } from '@angular/core';
import { LegalNoticeComponent } from '../legal-notice/legal-notice.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    LegalNoticeComponent,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Output() toggleLegalNoticeEvent = new EventEmitter<void>();
  
  toggleLegalNotice(): void {
    this.toggleLegalNoticeEvent.emit();
  }
  
  
}
