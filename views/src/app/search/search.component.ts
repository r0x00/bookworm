import { Component } from '@angular/core';
import { Book } from '../models/book.models';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import moment from 'moment';
import { UserProfileService } from '../services/user-profile.service';
import { User } from '../models/user.models';
import { NgFor, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [ FontAwesomeModule, NgIf, NgFor, RouterLink ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  bookItems: Book[] = [];
  userProfile: User | null = null;
  faImage = faImage;
  searchQuery: string = '';

  constructor(
    private readonly http: HttpClient, 
    private readonly toastr: ToastrService,
    private readonly UserProfileService: UserProfileService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProfile();

    this.route.queryParams.subscribe(params => {
      const searchQuery = params['query'];

      if(this.searchQuery && this.searchQuery != searchQuery) {
        this.searchQuery = searchQuery;

        this.loadBooks();
      };
    });
  };

  ngAfterViewInit () {
    this.searchQuery = this.route.snapshot.queryParams['query'] || '';
    
    this.loadBooks();
    
  };

  loadBooks (): void {
    this.bookItems = [];

    console.log( this.searchQuery )

    this.http.get('/api/book?query=' + this.searchQuery ).subscribe({
      next: (res: any) => {
        this.bookItems = res.map((item: Book) => {
          item.createdAt = moment(item.createdAt).format("DD/MM/YYYY"); 
          item.updatedAt = moment(item.updatedAt).format("DD/MM/YYYY");

          item.isCreatedByUser = !!this.userProfile && this.userProfile?.id == item?.createdBy;
          return item;
        });
      },

      error: (_error) => {
        this.toastr.error("It was not possible to load books","Ops! Something happened!", {
          "closeButton": true,
        });
      }
    })
  };

  loadProfile(): void {
    this.UserProfileService.userProfile$.subscribe(profile => {
      this.userProfile = profile;

      this.loadBooks();
    });
  };
}
