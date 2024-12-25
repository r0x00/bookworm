import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user.models';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../models/book.models';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';
import { Router } from '@angular/router';

enum BookTypes {
  myBooks = 'myBooks',
  savedBooks = 'savedBooks'
};

@Component({
  selector: 'app-me',
  imports: [ FontAwesomeModule, NgIf, ReactiveFormsModule, NgClass, NgFor ],
  templateUrl: './me.component.html',
  styleUrl: './me.component.scss',
})
export class MeComponent {
  me: User | undefined;
  selectedBookTab:BookTypes = BookTypes.myBooks;
  books: Book[] = [];

  faCircleExclamation = faCircleExclamation;
  faImage = faImage;

  meForm = new FormGroup({
    username: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(120)]),
    email: new FormControl('', [ Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(120)]),
    password: new FormControl('', [ Validators.required, Validators.minLength(8), Validators.maxLength(120)]),
    confirmPassword: new FormControl('', [ Validators.required ]),
  });


  constructor(
    private readonly http: HttpClient, 
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {}

  ngAfterViewInit(): void {
    this.showMe();
    this.loadBooks('myBooks');
  };

  showMe(): void {
    this.http.get('/api/me').subscribe({
      next: (res: any) => {
        this.me = res;

        this.meForm.get('username')?.setValue(this.me?.username ?? '');
        this.meForm.get('email')?.setValue(this.me?.email ?? '');
      },
      error: (_error) => {
        this.toastr.error("It was not possible to your profile.","Ops! Something happened!");
        this.router.navigate(['/']);
      }
    });
  };

  update(): void {

  };

  loadBooks(type: string): void {
    this.selectedBookTab = BookTypes[type as BookTypes];

    let url = '/api/me/books';

    if(this.selectedBookTab === 'myBooks') url += '/created';
    else if(this.selectedBookTab === 'savedBooks') url += '/saved';

    this.http.get(url).subscribe({
      next: (res: any) => {
        this.books = res.map((item: Book) => {
          item.createdAt = moment(item.createdAt).format("DD/MM/YYYY"); 
          item.updatedAt = moment(item.updatedAt).format("DD/MM/YYYY");

          return item;
        });
      },
      error: (_error) => {
        this.toastr.error("It was not possible to load books","Ops! Something happened!");
      }
    });
  };
}
