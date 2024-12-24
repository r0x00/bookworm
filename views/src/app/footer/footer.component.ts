import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [ NgClass ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  systemVersion =  '';
  copyright = "convergint@" + new Date().getFullYear();
  isNotLogin = true;
  
  constructor(
    private readonly http: HttpClient, 
    private readonly router: Router
  ) {};

  ngOnInit():void {
    this.version();
  };


  ngAfterViewInit ():void {
    this.router.events.subscribe((event: any) => {
      if(event.url === '/login' || event.url === '/signup') {
        this.isNotLogin = false;
      } else {
        this.isNotLogin = true;
      }
    });
  };

  version(): void {
    this.http.get('/api/enviroment/version', { responseType: 'json' }).subscribe((res: any) => {
      this.systemVersion = res.version;
    });
  }

}
