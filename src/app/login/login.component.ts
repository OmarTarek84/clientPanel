import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth-data.service';
import { Router } from '@angular/router';
import { UIService } from '../auth/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;

  logInError = false;
  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit() {
    this.uiService.logError.subscribe(
      (result) => {
        if (result) {
          this.logInError = true;
        } else {
          this.logInError = false;
        }
      }
    );
  }

  onSubmitted() {
    this.authService.loginUser({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

}
