import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faPlus, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/user.models';
import { UserProfileService } from '../services/user-profile.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  imports: [  RouterLink, RouterLinkActive, FontAwesomeModule, NgIf ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  faRightFromBracket = faRightFromBracket;
  faPlus = faPlus;
  faUser = faUser;
  isNotLogin = true;
  userProfile: User | null = null;
  openMenuProfile:boolean = false;

  constructor(
    private readonly router: Router, 
    private readonly UserProfileService: UserProfileService,
    private readonly http: HttpClient,
    private readonly toastr: ToastrService
  ) {}
  
  ngOnInit(): void {
    this.loadProfile();
  };

  ngAfterViewInit(): void {
    this.checkRouter();
  };

  checkRouter(): void {
    this.router.events.subscribe((event: any) => {
      if(event.url === '/login' || event.url === '/signup') {
        this.isNotLogin = false;

      } else {
        this.isNotLogin = true;

      };
    });
  };

  loadProfile(): void {
    this.UserProfileService.userProfile$.subscribe(profile => {
      this.userProfile = profile;
    });
  };

  logout(): void {
    this.http.post('/api/auth/logout', {}).subscribe({
      next: (res) => {
        this.toggleProfileMenu();
        this.UserProfileService.clearUserProfile();
        this.router.navigate(['/']);

      }, error: (_error) => {
        this.toastr.error("It was not possible to log-out", "Ops! Something happened!");
      }
    });
  };

  toggleProfileMenu(): void {
    this.openMenuProfile = !this.openMenuProfile
  }
};
