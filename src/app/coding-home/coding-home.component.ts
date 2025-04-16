import { Component } from '@angular/core';
import { IosCheckerService } from "./../ios-checker.service";
@Component({
  selector: 'app-coding-home',
  standalone: true,
  imports: [],
  templateUrl: './coding-home.component.html',
  styleUrl: './coding-home.component.scss'
})
export class CodingHomeComponent {
  isIOS:boolean = false; 

  constructor(private iosChecker: IosCheckerService) {
    this.isIOS = this.iosChecker.isUserIOS();
  }

}
