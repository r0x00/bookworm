import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewEncapsulation} from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ RouterLink, RouterLinkActive, ReactiveFormsModule, FontAwesomeModule, CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  faCircleExclamation = faCircleExclamation;

  loginForm = new FormGroup({
    identifier: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(120) ]),
    password: new FormControl('', [ Validators.required, Validators.minLength(8), Validators.maxLength(120) ])
  });

  constructor(private readonly http: HttpClient, private readonly toastr: ToastrService, private readonly el: ElementRef, private readonly router: Router) {};

  ngAfterViewInit() {
    this.focusInput();
  };

  login(): void {
    if(this.loginForm.invalid) return;

    const formData = this.loginForm.value;


    this.http.post('/api/auth/login', {
      identifier: formData.identifier,
      password: formData.password
    }).subscribe({
      next: (res: any) => {
        this.router.navigate([res.redirect]);
      },

      error: (_error) => {
        this.toastr.error("Its was not possible log-in", "Ops! Something happened!");
      }
    });    
  };

  focusInput(): void {
    const element = this.el.nativeElement.querySelector('input[focus]');
    
    element.focus();
  };
}
