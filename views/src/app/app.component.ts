import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HttpClient } from '@angular/common/http';
import { UserProfileService } from './services/user-profile.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bookworm-frontend';

  constructor(private readonly http: HttpClient, private readonly UserProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.http.get('/api/me').subscribe({
      next: (res: any) => {
        this.UserProfileService.setUserProfile(res);
      }
    });
  };
}
