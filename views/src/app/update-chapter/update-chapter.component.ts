import { NgClass, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import Quill from 'quill';

@Component({
  selector: 'app-update-chapter',
  imports: [ ReactiveFormsModule, FontAwesomeModule, NgIf, RouterLink, NgClass ],
  templateUrl: './update-chapter.component.html',
  styleUrl: './update-chapter.component.scss'
})
export class UpdateChapterComponent {
  faCircleExclamation = faCircleExclamation;
  bookId: string | null = '';
  id: string | null = '';
  quill: Quill |  null = null;
  quillTextLength: number = 0;

  chapterUpdate = new FormGroup({
    title: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(120) ]),
    content: new FormControl('', [ Validators.minLength(10), Validators.maxLength(30000) ]),
  });

  constructor(
    private readonly http: HttpClient, 
    private readonly toastr: ToastrService, 
    private readonly router: Router, 
    private readonly route: ActivatedRoute
  ) {};

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('bookId');
    this.id = this.route.snapshot.paramMap.get('id');
  };

  ngAfterViewInit(): void {
    this.showChapter();
  };
  

  update(): void {
    if(!this.chapterUpdate.valid) return;

    const data = this.chapterUpdate.value;

    this.http.patch('/api/chapter', {
      id: this.id,
      title: data.title,
      content: JSON.stringify(this.quill?.getContents()),
      book: this.bookId,
      summary: this.quill?.getText()
    }).subscribe({
      next: (res: any) => {
        this.router.navigate([`/book/${this.bookId}/view`]);
        this.toastr.success(`Chapter ${res.title} was created with success!`, "Success!", {
          "closeButton": true,
        });
      },
      error: (_error) => {
        this.toastr.error("An error occurred when creating chapter.", "Ops! Something happened!", {
          "closeButton": true,
        });
      }
    })

  };

  showChapter(): void {
    this.http.get("/api/chapter/" + this.id).subscribe({
      next: (res: any) => {
        this.bookId = res.chapter.book;

        this.chapterUpdate.get('title')?.setValue(res.chapter.title);
        this.chapterUpdate.get('content')?.setValue(res.chapter.content);

        this.startQuill()
      },
      error: (_error) => {
        this.router.navigate(["/"]);
        this.toastr.error("It was not possible to load chapter","Ops! Something happened!", {
          "closeButton": true,
        });
      }
    });
  };


  startQuill(): void {
    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      // ['link', 'image', 'video' ],
      [{ 'indent': '-1'}, { 'indent': '+1' }], // outdent/indent
      [{ 'direction': 'rtl' }],  // text direction  
      [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
      [{ 'align': [] }],
      ['clean'] // remove formatting button
    ];
    
    this.quill = new Quill("#quill-editor", {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: "snow",
    });

    try {
      const text = JSON.parse(this.chapterUpdate.get('content')?.value ?? '');
      this.quill.setContents(text);

    } catch (_error) {
      const text = this.chapterUpdate.get('content')?.value ?? '';
      this.quill.setText(text);
    };


    this.quill.on('editor-change', (eventName:string) => {
      if (eventName === 'text-change') {
        const text = this.quill?.getText() ?? '';

        this.chapterUpdate.get('content')?.setValue(text);
      }
    });


    const qlEditorDiv = document.getElementsByClassName("ql-toolbar").item(0);

    if(qlEditorDiv) qlEditorDiv?.setAttribute("style", "border-radius: 16px 16px 0 0 !important;")
  };

}
