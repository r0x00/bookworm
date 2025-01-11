import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faPlus, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/user.models';
import { UserProfileService } from '../services/user-profile.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { Book } from '../models/book.models';

@Component({
  selector: 'app-header',
  imports: [ RouterLink, RouterLinkActive, FontAwesomeModule, NgIf, FormsModule, NgFor],
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
  searchQuery = "";
  searchTimeout: any;
  searchItems: Book[] = [];
  searchingDone:boolean = false;
  openSearchResult: boolean = false;

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
        this.toastr.error("It was not possible to log-out", "Ops! Something happened!", {
          "closeButton": true,
        });
      }
    });
  };

  toggleProfileMenu(): void {
    this.openMenuProfile = !this.openMenuProfile
  };

  searchKeydown():void {
    this.searchItems = [];

    this.searchingDone = false;
    this.openSearchResult = true;

    clearTimeout(this.searchTimeout);
  };

  searchKeyup():void {
    if(this.searchQuery === '') {
      this.openSearchResult = false;

      return;
    };

    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      this.search();
      
    }, 1000);
  };

  search(): void {
    this.http.get('/api/search?query=' + this.searchQuery).subscribe({
      next: (res) => {
        this.searchItems = res as Book[];
        this.searchingDone = true;
        
      }, 
      error: (_error) => {
        this.toastr.error("It was not possible to search", "Ops! Something happened!", {
          "closeButton": true,
        });
        this.searchingDone = true;
      }
      
    })
  };

  searchRedirect(): void {
    this.openSearchResult = false;
    
    if(this.searchQuery != '') {
      this.router.navigate(['/search'],  { queryParams: { query: this.searchQuery } });
    };
  };
};
