import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
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

}
