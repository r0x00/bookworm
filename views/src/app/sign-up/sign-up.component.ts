import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightLong, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { matchValuesValidator } from '../validators/value-match.validator';

@Component({
  selector: 'app-sign-up',
  imports: [ RouterLink, RouterLinkActive, ReactiveFormsModule, FontAwesomeModule, CommonModule ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SignUpComponent {
  faCircleCheck = faCircleCheck;
  faArrowRightLong = faArrowRightLong;
  faCircleExclamation = faCircleExclamation;

  registerForm = new FormGroup({
    username: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(120)]),
    email: new FormControl('', [ Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(120)]),
    password: new FormControl('', [ Validators.required, Validators.minLength(8), Validators.maxLength(120)]),
    confirmPassword: new FormControl('', [ Validators.required ]),
  }, {
    validators: [ matchValuesValidator('password', 'confirmPassword')]
  });

  userCreated = false;

  constructor(private readonly http: HttpClient, private readonly toastr:ToastrService, private readonly router: Router, private readonly el: ElementRef) {};

  ngAfterViewInit():void {
    this.focusInput();
  };

  register(): void {
    if(!this.registerForm.valid) return;

    const formData = this.registerForm.value;

    this.http.post('/api/user', {
      username: formData.username, 
      email: formData.email, 
      password: formData.password
    }).subscribe({
      next: (res) => {
        this.toastr.success('User was created.', 'Success!');

        this.userCreated = true;

        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (_error) => {
        this.toastr.error('An error occurred when creating user.', 'Ops! Something happened!');
      }
    });
  };

  focusInput(): void {
    const element = this.el.nativeElement.querySelector('input[focus]');
    
    element.focus();
  };
};
