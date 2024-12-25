import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { NgIf } from '@angular/common';
import { Book } from '../models/book.models';

@Component({
  selector: 'app-update-book',
  imports: [ NgIf, FontAwesomeModule, ReactiveFormsModule, RouterLink, RouterLinkActive ],
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.scss'
})
export class UpdateBookComponent {
  bookId:string | null = '';
  
  faCircleExclamation = faCircleExclamation;
    
  bookUpdate = new FormGroup({
    name: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(120) ]),
    description: new FormControl('', [ Validators.minLength(5), Validators.maxLength(300) ]),
    author: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(120) ]),
    types: new FormControl([], [ Validators.required ]),  
    wallpaper: new FormControl(''),
    finished: new FormControl(false, [])
  });
  
  constructor(
    private readonly http: HttpClient, 
    private readonly toastr: ToastrService, 
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {};

  ngAfterViewInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');

    this.showBook();
  };
  

  update(): void {
    if(this.bookUpdate.invalid) return;

    const formData = this.bookUpdate.value;

    this.http.patch("/api/book", {
      id: this.bookId,
      name: formData.name,
      description: formData.description,
      author: formData.author,
      types: [ formData.types ],
      wallpaper: formData.wallpaper,
      finished: formData.finished
    }).subscribe({
      next: (res: any) => {
        this.router.navigate([`/book/${this.bookId}/view`]);


        this.toastr.success(`Book ${res.name} was created with success!`, "Success!");
      },

      error: (_error) => {
        this.toastr.error("An error occurred when creating book.", "Ops! Something happened!");
      }
    })
  };

  showBook(): void {
    this.http.get("/api/book/" + this.bookId).subscribe({
      next: (res: any) => {
        const book: Book = res;

        console.log(book)

        this.bookUpdate.get('name')?.setValue(book.name);
        this.bookUpdate.get('description')?.setValue(book.description);
        this.bookUpdate.get('author')?.setValue(book.author);
        this.bookUpdate.get('types')?.setValue(book.types);


      },

      error: (_error) => {
        this.toastr.error("It was not possible to load book","Ops! Something happened!");

        this.router.navigate(["/"]);
      }
    })
  }

}
