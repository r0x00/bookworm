import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [ NgFor ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  items = [];
  showcaseItems = [];

  constructor(private readonly http: HttpClient) {};

  ngAfterViewInit () {
    this.loadBooks();
    this.loadShowcase()
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
}
