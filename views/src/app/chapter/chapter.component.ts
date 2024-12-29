import { Component } from '@angular/core';
import { Chapter } from '../models/chapter.models';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Book } from '../models/book.models';
import Quill, { Delta } from 'quill';
import { NgIf, NgStyle } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { User } from '../models/user.models';
import { UserProfileService } from '../services/user-profile.service';

@Component({
  selector: 'app-chapter',
  imports: [ RouterLink, RouterLinkActive, NgIf, NgStyle, MenuComponent ],
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
  textTranslation: string = '';
  translatedContet: string = '';
  startTranslation: boolean = false;
  translationTimeout: any;
  userProfile: User | null = null;
  translationCardPosition: {x: number, y: number} = {
    y: 0,
    x: 0
  };

  constructor(
    private readonly http: HttpClient,
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly UserProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.loadProfile();

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

        if(this.chapter) this.chapter.isCreatedByUser = !!this.userProfile && this.userProfile?.id == this.book?.createdBy;

        console.log(this.userProfile, this.book)

        this.startQuill()
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
    if(!this.startTranslation) return;

    this.http.get("/api/dictionary?query=" + text + "&languageFrom=en&languageTo=pt-br").subscribe({
      next: (res: any) => {
        this.translatedContet = res.translation;
      },

      error: (_error) => {
        this.toastr.error("It was not possible to translate","Ops! Something happened!");
      }
    });
  };

  mouseup(event: MouseEvent): void {
    clearTimeout(this.translationTimeout);

    const windowY = window.scrollY ?? window.pageYOffset;
 
    const cardX = 425
    const isCardXOverflow = event.clientX + cardX > window.innerWidth;
    const isCardXOverflowAllSides = event.clientX + cardX > window.innerWidth && event.clientX - cardX < window.innerWidth

    this.translationCardPosition = {
      x: isCardXOverflow ? event.clientX - cardX : event.clientX,
      y: windowY + event.clientY
    };

    if(isCardXOverflowAllSides) this.translationCardPosition.x = 0;

    this.startTranslation = window.getSelection()?.toString() != '';

    this.translatedContet = '';

    const timeout = setTimeout(() => {
      const selectText = window.getSelection()?.toString() ?? '';

      this.textTranslation = selectText;
  
      this.translateSelected(selectText);
    }, 1000 * 2);

    this.translationTimeout = timeout;
  };

  mousedown(event: MouseEvent): void {
    this.translationCardPosition = {
      x: event.clientX,
      y: event.clientY
    };
  };

  startQuill(): void {
    const quill = new Quill("#quill-editor", {
      theme: "",
      modules: {
        toolbar: false
      }
    });

    try {
      const text = JSON.parse(this.chapter?.content ?? '');
      quill.setContents(text);

    } catch (_error) {
      const text = this.chapter?.content ?? '';
      quill.setText(text);
    };

    quill.disable();

    const qlEditorDiv = document.getElementById("quill-editor")?.querySelector(".ql-editor");

    if(qlEditorDiv) qlEditorDiv?.classList.remove("ql-editor");
  };

  menuCallback(): void {
    this.router.navigate(["/book/" + this.bookId + '/view']);

  };

  loadProfile(): void {
    this.UserProfileService.userProfile$.subscribe(profile => {
      this.userProfile = profile;

      if(this.chapter) {
        this.chapter.isCreatedByUser = !!this.userProfile && this.userProfile?.id == this.book?.createdBy;

      }

      console.log(this.chapter)

    });
  };
}
