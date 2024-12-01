import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  systemVersion =  '';
  copyright = "convergint@" + new Date().getFullYear();
  
  constructor(private readonly http: HttpClient) {};

  ngOnInit():void {
    this.version();
  }
  

  version(): void {
    this.http.get('/api/enviroment/version', { responseType: 'json' }).subscribe((res: any) => {
      this.systemVersion = res.version;
    });
  }

}
