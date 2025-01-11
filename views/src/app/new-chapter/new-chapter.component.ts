import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrService } from 'ngx-toastr';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { NgClass, NgIf } from '@angular/common';
import Quill from 'quill';


@Component({
  selector: 'app-new-chapter',
  imports: [ ReactiveFormsModule, FontAwesomeModule, NgIf, RouterLink, NgClass ],
  templateUrl: './new-chapter.component.html',
  styleUrl: './new-chapter.component.scss'
})
export class NewChapterComponent {
  faCircleExclamation = faCircleExclamation;
  bookId: string | null = '';
  quill: Quill |  null = null;
  quillTextLength: number = 0;


  chapterCreate = new FormGroup({
    title: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(120) ]),
    content: new FormControl('', [ Validators.minLength(10), Validators.maxLength(30000) ]),
  });

  constructor(
    private readonly http: HttpClient, 
    private readonly toastr: ToastrService, 
    private readonly router: Router, 
    private readonly route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('bookId');
  };
  
  ngAfterViewInit(): void {
    this.checkBook();
    this.startQuill();
  };
  

  create(): void {
    if(!this.chapterCreate.valid) return;

    const data = this.chapterCreate.value;

    this.http.post('/api/chapter', {
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

  checkBook(): void {
    this.http.get(`/api/book/${this.bookId}`).subscribe({
      error: (_error) => {
        this.toastr.error("Book was not found, please use a valid book.","Ops! Something happened!", {
          "closeButton": true,
        });
        this.router.navigate(['/']);
      }
    })
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

    this.quill.on('editor-change', (eventName:string) => {
      if (eventName === 'text-change') {
        const text = this.quill?.getText() ?? '';

        this.chapterCreate.get('content')?.setValue(text);
      }
    });


    const qlEditorDiv = document.getElementsByClassName("ql-toolbar").item(0);

    if(qlEditorDiv) qlEditorDiv?.setAttribute("style", "border-radius: 16px 16px 0 0 !important;")
  };
};
