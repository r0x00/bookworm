import { HttpClient } from '@angular/common/http';
import { afterNextRender, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../models/book.models';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faPenNib, faPlay, faTrash, faHeart as faHeartFull } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faImage } from '@fortawesome/free-regular-svg-icons';
import { NgClass, NgFor, NgIf } from '@angular/common';
import moment from 'moment';
import { Chapter } from '../models/chapter.models';
import { Pagination } from '../models/pagination.models';


@Component({
  selector: 'app-book',
  imports: [ FontAwesomeModule, NgFor, NgIf, RouterLink, NgClass ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  bookId: string | null = '';
  book: Book | null = null;
  chapters: Chapter[] | null = null;
  chaptersPagination: Pagination | null = null;

  faPlus = faPlus;
  faPenNib = faPenNib;
  faHeartOutline = faHeart;
  faHeartFull = faHeartFull;
  faPlay = faPlay;
  faTrash = faTrash;
  faImage = faImage;

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

        this.router.navigate(["/"]);
      }
    })
  };

  loadChapters(page: number = 0): void {
    this.http.get("/api/chapter/book/" + this.bookId + "?page=" + page + "&limit=100").subscribe({
      next: (res: any) => {
        this.chapters = res.chapters.map((item: Chapter) => {
          item.createdAt = moment(item.createdAt).format("DD/MM/YYYY");
          item.updatedAt = moment(item.updatedAt).format("DD/MM/YYYY"); 

          return item;
        });
        
        this.chaptersPagination = res.pagination;

        const maxPagesArray = Array.from(String(res.pagination.maxPages), Number);

        if(this.chaptersPagination) this.chaptersPagination.maxPagesArray = maxPagesArray;
      },

      error: (_error) => {
        this.toastr.error("It was not possible to load chapters","Ops! Something happened!");
      }
    })
  };

  changePage(pageType: number | string): void {
    if(!this.chaptersPagination) return;

    const pageValues = {
      prev: this.chaptersPagination?.page - 1,
      next: this.chaptersPagination?.page + 1,
      first: 1,
      last: this.chaptersPagination?.maxPages,
      default: +pageType + 1
    };

    const page: number = pageValues[pageType as keyof typeof pageValues] ?? pageValues["default"];

    this.loadChapters(page);
  };

  editBook(): void {
    console.log("edit")

  };

  deleteBook(): void {
    this.http.delete("/api/book", { body: { id: this.bookId } }).subscribe({
      next: () => {
        this.toastr.success("Book was deleted with success!","Success!");
        this.router.navigate(["/"]);
      },

      error: (_error) => {
        this.toastr.error("It was not possible to delete book","Ops! Something happened!");
      }
    });
  };

  changeLikeBook(): void {
    if(!this.book) return;

    const liked_temp = this.book.liked;

    this.book.liked = !this.book.liked;
    
    this.http.post("/api/book/like/", { id: this.bookId }).subscribe({
      error: (_error) => {
        if(this.book) this.book.liked = liked_temp;

        this.toastr.error("It was not possible to like book","Ops! Something happened!");
      }
    });
  };

  playLastChapter(): void {

  };

};
