import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [ NgFor, NgClass, NgIf ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  items = [];
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

  loadBooks () {
    this.http.get('/api/book').subscribe({
      next: (res) => {
        
        console.log(res)
      },

      error: (_error) => {
        console.log(_error)
      }
    })
  };

  loadShowcase() {
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

  changeShowcase() {
    this.showcaseInterval = setInterval(() => {
      if(this.focusedItem < this.items.length - 1) {
        this.focusedItem++;

        return;
      };

      this.focusedItem = 0;

    }, 1000 * 10); //10 seconds
  };
}
