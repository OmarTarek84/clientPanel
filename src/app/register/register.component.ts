import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onRegistered() {
    this.authService.registerUser({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
}
