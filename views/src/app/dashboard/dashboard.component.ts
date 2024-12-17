import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';

interface Book {
  id: string,
  name: string, 
  description: string,
  author: string,
  type: JSON,
  views: number,
  finished: boolean,
  wallpaper: Blob,
  chapters: number,
  updatedAt: string
};


@Component({
  selector: 'app-dashboard',
  imports: [ NgFor, NgClass, NgIf ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  bookItems: Book[] = [];
  focusedItem = 0;
  showcaseItems = [];
  showcaseInterval: any;
  lastReadItems = [];

  constructor(private readonly http: HttpClient) {};
  

  ngAfterViewInit () {
    this.loadBooks();
    this.loadShowcase();
    this.changeShowcase();
  };

  loadBooks (): void {
    this.http.get('/api/book').subscribe({
      next: (res: any) => {
        this.bookItems = res;

        console.log(res)
      },

      error: (_error) => {
        console.log(_error)
      }
    })
  };

  loadShowcase(): void {
    this.http.get('/api/showcase').subscribe({
      next: (res: any) => {
        this.showcaseItems = res;

        console.log(res)
      },

      error: (_error) => {
        console.log(_error)
      }
    })
  };

  changeShowcase(): void{
    this.showcaseInterval = setInterval(() => {
      if(this.focusedItem < this.showcaseItems.length - 1) {
        this.focusedItem++;

        return;
      };

      this.focusedItem = 0;

    }, 1000 * 10); //10 seconds
  };
}
