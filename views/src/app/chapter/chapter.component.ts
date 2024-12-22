import { Component } from '@angular/core';
import { Chapter } from '../models/chapter.models';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Book } from '../models/book.models';

@Component({
  selector: 'app-chapter',
  imports: [ RouterLink, RouterLinkActive ],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.scss'
})
export class ChapterComponent {
  chapterId: string | null = '';
  bookId: string | null = ''; 
  chapter: Chapter | null = null;
  book: Book | null = null;
  nextChapterId: string = '';
  prevChapterId: string = '';

  constructor(
    private readonly http: HttpClient,
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const chapterId = params.get('id');

      if(this.chapterId && this.chapterId != chapterId) {
        this.chapterId = params.get('id');
  
        this.showChapter(); 
      };
    });
  };

  ngAfterViewInit(): void {
    this.chapterId = this.route.snapshot.paramMap.get('id');
    this.bookId = this.route.snapshot.paramMap.get('bookId');
    this.showChapter();
  };


  showChapter(): void {
    this.http.get("/api/chapter/" + this.chapterId).subscribe({
      next: (res: any) => {
        this.chapter = res.chapter;
        this.book = res.chapter.Book;
        this.nextChapterId = res.nearChapterInfo.next?.id;
        this.prevChapterId = res.nearChapterInfo.prev?.id;

        console.log(res.nearChapterInfo)
      },
      error: (_error) => {
        this.router.navigate(["/book/" + this.bookId + '/view']);
        this.toastr.error("It was not possible to load chapter","Ops! Something happened!");
      }
    });
  };

  nextChapter(): void {
    if(!this.nextChapterId || this.nextChapterId == '') return;

    this.router.navigate(["/book/" + this.bookId + '/chapter/' + this.nextChapterId]);
  };

  prevChapter(): void {
    if(!this.prevChapterId || this.prevChapterId == '') return;
    
    this.router.navigate(["/book/" + this.bookId + '/chapter/' + this.prevChapterId]);
  };


  translateSelected(text: string): void {
    if(text == '' || text.replace(/\s/g, "") == '') return;

    this.http.get("/api/dictionary?query=" + text + "&languageFrom=en&languageTo=pt-br").subscribe({
      next: (res: any) => {
        console.log(res)
      },

      error: (_error) => {
        this.toastr.error("It was not possible to translate","Ops! Something happened!");
      }
    });
  };

  mouseup(): void {
    const selectText = window.getSelection()?.toString() ?? '';

    this.translateSelected(selectText);
  }
}
