import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../models/book.models';
import { Showcase } from '../models/showcase.models';
import moment from 'moment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisVertical, faPenNib, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserProfileService } from '../services/user-profile.service';
import { User } from '../models/user.models';
import { MenuComponent } from '../menu/menu.component';


@Component({
  selector: 'app-dashboard',
  imports: [ NgFor, NgClass, NgIf, RouterLink, NgStyle, FontAwesomeModule, MenuComponent ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  bookItems: Book[] = [];
  focusedItem = 0;
  showcaseItems: Showcase[] = [];
  showcaseInterval: any;
  lastReadItems: Book[] = [];
  userProfile: User | null = null;  

  faImage = faImage;
  faEllipsisVertical = faEllipsisVertical;
  faPlus = faPlus;
  faPenNib = faPenNib;
  faTrash = faTrash;

  constructor(
    private readonly http: HttpClient, 
    private readonly toastr:ToastrService,
    private readonly UserProfileService: UserProfileService
  ) {};

  ngAfterViewInit () {
    this.loadBooks();
    this.loadShowcase();
    this.changeShowcase();
    this.loadLastRead();
    this.loadProfile();
  };

  loadBooks (): void {
    this.bookItems = [];

    this.http.get('/api/book').subscribe({
      next: (res: any) => {
        this.bookItems = res.map((item: Book) => {
          item.createdAt = moment(item.createdAt).format("DD/MM/YYYY"); 
          item.updatedAt = moment(item.updatedAt).format("DD/MM/YYYY");

          item.isCreatedByUser = !!this.userProfile && this.userProfile?.id == item?.createdBy;
          return item;
        });
      },

      error: (_error) => {
        this.toastr.error("It was not possible to load books","Ops! Something happened!");
      }
    })
  };

  loadLastRead (): void {
    this.lastReadItems = [];

    this.http.get('/api/me/books/read').subscribe({
      next: (res: any) => {
        if(res) {
          this.lastReadItems = res.map((item: Book) => {
            item.createdAt = moment(item.createdAt).format("DD/MM/YYYY"); 
            item.updatedAt = moment(item.updatedAt).format("DD/MM/YYYY");


            item.isCreatedByUser = !!this.userProfile && this.userProfile?.id == item?.createdBy;
  
            return item;
          });
        };
      }, 
      
      error: (_error) => {
        // this.toastr.error("It was not possible to load last read books","Ops! Something happened!");
      }
    });
    
  };

  loadShowcase(): void {
    this.http.get('/api/showcase').subscribe({
      next: (res: any) => {
        this.showcaseItems = res;
      },

      error: (_error) => {
        this.toastr.error("It was not possible to load showcase","Ops! Something happened!");
      }
    })
  };

  changeShowcase(): void{
    this.showcaseInterval = setInterval(() => {
      if(this.focusedItem < this.showcaseItems.length - 1) {
        this.focusedItem++;

        return;
      };

      this.focusedItem = 0;

    }, 1000 * 10); //10 seconds
  };

  loadProfile(): void {
    this.UserProfileService.userProfile$.subscribe(profile => {
      this.userProfile = profile;

      this.loadBooks();
      this.loadLastRead();
    });
  };

  menuCallback(): void {
    this.loadBooks();
    this.loadLastRead();
  };
}
