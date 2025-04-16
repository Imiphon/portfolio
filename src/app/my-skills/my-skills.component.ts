import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-skills.component.html',
  styleUrl: './my-skills.component.scss'
})
export class MySkillsComponent implements OnInit {
  images = [
    { name: 'angular', src: 'assets/icons/angular.png' },
    { name: 'typescript', src: 'assets/icons/typescript.png' },
    { name: 'javascript', src: 'assets/icons/javascript.png' },
    { name: 'html5', src: 'assets/icons/html.png' },
    { name: 'css', src: 'assets/icons/css.png' },
    { name: 'firebase', src: 'assets/icons/firebase.png' },
    { name: 'git', src: 'assets/icons/git.png' },
    { name: 'scrum', src: 'assets/icons/scrum.png' },
    { name: 'api', src: 'assets/icons/api.png' },
    { name: 'materialDesign', src: 'assets/icons/materialDesign.png' },
    { name: 'scss', src: 'assets/icons/scss-logo.png' },
    { name: 'react', src: 'assets/icons/react-logo.png' },
    { name: 'logic', src: 'assets/icons/logic-black.png' },
    { name: 'protools', src: 'assets/icons/protools-black.png' }
  ];

  growingIndex: number | null = null;

  isSoundLoaded: boolean = false;
  //describes an array with strings as keys and booleans as value
  isOpen: { [key: string]: boolean } = {};


  popups: Array<{
    content: string;
    positionX: string;
    positionY: string;
  }> = [];

  constructor() {
    this.isOpen = {};
  }

  ngOnInit(): void {
    this.growingIntervall();
    this.loadSound();
    this.images.forEach(image => {
      this.isOpen[image.name] = false;
    });
  }

  growingIntervall() {
    setInterval(() => {
      this.growingIndex = Math.floor(Math.random() * this.images.length);
      setTimeout(() => {
        this.growingIndex = null;
      }, 1000);
    }, 2000);
  }

  isGrowing(index: number): boolean {
    return this.growingIndex === index;
  }

  loadSound() {
    let audio = new Audio('assets/sounds/plopp.mp3');
    audio.addEventListener('canplaythrough', () => {
      this.isSoundLoaded = true;
    });
    audio.load();
  }

  openPopup(name: string, event: MouseEvent): void {
    const clickX = event.clientX;
    const clickY = event.clientY;

    if (!this.isOpen[name]) {
      if (this.isSoundLoaded) {
        let currDrop = new Audio('assets/sounds/plopp.mp3');
        currDrop.play();
        currDrop.volume = 0.2;
        currDrop.onended = () => {
          currDrop.remove();
        }
      }

      this.popups.push({
        content: name,
        positionX: clickX + 'px',
        positionY: clickY + 'px',
      });

      this.isOpen[name] = true;

      setTimeout(() => {
        this.popups.shift();
        this.isOpen[name] = false;
      }, 3000);
    }
  }
}