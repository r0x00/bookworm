import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrService } from 'ngx-toastr';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-new-chapter',
  imports: [ ReactiveFormsModule, FontAwesomeModule, NgIf, RouterLink],
  templateUrl: './new-chapter.component.html',
  styleUrl: './new-chapter.component.scss'
})
export class NewChapterComponent {
  faCircleExclamation = faCircleExclamation;
  bookId: string | null = '';

  chapterCreate = new FormGroup({
    title: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(120) ]),
    content: new FormControl('', [ Validators.minLength(300), Validators.maxLength(10000) ]),
  });

  constructor(
    private readonly http: HttpClient, 
    private readonly toastr: ToastrService, 
    private readonly router: Router, 
    private readonly route: ActivatedRoute
  ) {}
  
  ngAfterViewInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('bookId');

    this.checkBook();
  };
  

  create(): void {
    if(!this.chapterCreate.valid) return;

    const data = this.chapterCreate.value;

    this.http.post('/api/chapter', {
      title: data.title,
      content: data.content,
      book: this.bookId
    }).subscribe({
      next: (res: any) => {
        this.router.navigate([`/book/${this.bookId}/view`]);
        this.toastr.success(`Chapter ${res.title} was created with success!`, "Success!");
      },
      error: (_error) => {
        this.toastr.error("An error occurred when creating chapter.", "Ops! Something happened!");
      }
    })
  };

  checkBook(): void {
    this.http.get(`/api/book/${this.bookId}`).subscribe({
      error: (_error) => {
        this.toastr.error("Book was not found, please use a valid book.","Ops! Something happened!");
        this.router.navigate(['/']);
      }
    })
  };
}
