import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  imports: [  RouterLink, RouterLinkActive, FontAwesomeModule, NgIf ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  faPlus = faPlus;
  isNotLogin = true;
  profile: any;

  constructor(private readonly router: Router) {}

  ngAfterViewInit ():void {
    this.router.events.subscribe((event: any) => {
      if(event.url === '/login' || event.url === '/signup') {
        this.isNotLogin = false;
      } else {
        this.isNotLogin = true;
      }
    });
  }
};
