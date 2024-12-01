import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ RouterLink, RouterLinkActive, FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  username = '';
  password = '';
  constructor(private readonly http: HttpClient) {};

  login() {

    

  };

}
