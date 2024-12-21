import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../models/book.models';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faPenNib, faPlay, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { NgFor, NgIf } from '@angular/common';
import moment from 'moment';
import { Chapter } from '../models/chapter.models';


@Component({
  selector: 'app-book',
  imports: [ FontAwesomeModule, NgFor, NgIf, RouterLink ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  bookId: string | null = '';
  book: Book | null = null;
  chapters: Chapter[] | null = null
  faPlus = faPlus;
  faPenNib = faPenNib;
  faHeartOutline = faHeart;
  faPlay = faPlay;
  faTrash = faTrash;

  constructor(
    private readonly http: HttpClient, 
    private readonly router: Router, 
    private readonly route: ActivatedRoute, 
    private readonly toastr: ToastrService,
  ) {}

  ngAfterViewInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');

    this.showBook();
  };
  

  showBook(): void {  
    this.http.get("/api/book/" + this.bookId).subscribe({
      next: (res: any) => {
        this.book = res;

        if(this.book) {
          this.book.createdAt = moment(this.book?.createdAt).format("DD/MM/YYYY");
          this.book.updatedAt = moment(this.book?.updatedAt).format("DD/MM/YYYY");
        };

        this.loadChapters();
      },
      error: (_error) => {
        this.toastr.error("It was not possible to load book","Ops! Something happened!");
      }
    })
  };

  loadChapters(): void {
    this.http.get("/api/chapter/book/" + this.bookId).subscribe({
      next: (res: any) => {
        this.chapters = res.map((item: Chapter) => {
          item.createdAt = moment(item.createdAt).format("DD/MM/YYYY");
          item.updatedAt = moment(item.updatedAt).format("DD/MM/YYYY"); 

          return item;
        });
      },

      error: (_error) => {
        this.toastr.error("It was not possible to load chapters","Ops! Something happened!");
      }
      
    })
    
  }

  editBook(): void {
    console.log("edit")

  };

  deleteBook(): void {

  };

  changeLikeBook(): void {
    this.http.post("/api/book/like/", { id: this.bookId }).subscribe({
      next: (res: any) => {
        
      },

      error: (_error) => {
        this.toastr.error("It was not possible to like book","Ops! Something happened!");
      }
    });
  };

  playLastChapter(): void {

  };

};
