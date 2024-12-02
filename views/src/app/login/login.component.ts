import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewEncapsulation} from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ RouterLink, RouterLinkActive, ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  loginForm = new FormGroup({
    identifier: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(120) ]),
    password: new FormControl('', [ Validators.required, Validators.minLength(8), Validators.maxLength(8) ])
  });

  constructor(private readonly http: HttpClient, private readonly toastr: ToastrService, private readonly el: ElementRef) {};

  ngAfterViewInit() {
    this.focusInput();
  };

  login(): void {
    if(!this.loginForm.valid) return;

    console.log(this.loginForm)
    

  };


  focusInput(): void {
    const element = this.el.nativeElement.querySelector('input[focus]');
    
    element.focus();
  };
}
