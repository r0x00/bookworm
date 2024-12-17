import { Component } from '@angular/core';


import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-new-book',
  imports: [ RouterLink, RouterLinkActive, ReactiveFormsModule, FontAwesomeModule, CommonModule ],
  templateUrl: './new-book.component.html',
  styleUrl: './new-book.component.scss'
})
export class NewBookComponent {
  faCircleExclamation = faCircleExclamation;

  bookCreate = new FormGroup({
    name: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(120) ]),
    description: new FormControl('', [ Validators.minLength(5), Validators.maxLength(300) ]),
    author: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(120) ]),
    types: new FormControl('', [ Validators.required ]),
    wallpaper: new FormControl(''),
  });
  

  constructor(private readonly http: HttpClient, private readonly toastr: ToastrService, private readonly router: Router) {}

  create(): void {
    if(this.bookCreate.invalid) return;

    const formData = this.bookCreate.value;


    this.http.post("/api/book", {
      name: formData.name,
      description: formData.description,
      author: formData.author,
      types: formData.types,
      wallpaper: formData.wallpaper
    }).subscribe({
      next: (res: any) => {
        this.router.navigate([`/book/${res.id}`]);


        this.toastr.success(`Book ${res.name} was created with success!`, "Success!");
      },

      error: (_error) => {
        this.toastr.error("An error occurred when creating book.", "Ops! Something happened!");
      }
    })
  }
}
