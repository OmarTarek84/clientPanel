import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from './auth/auth-data.service';
import * as M from 'materialize-css';
import { SettingsService } from './settings/settings.service';
import { Settings } from './settings/settings.modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'client-panel';
  signedIn = false;
  allowReg = true;
  constructor(private authService: AuthService, private settingsService: SettingsService) {}
  ngOnInit() {
    this.authService.authChange.subscribe(
      (signin) => {
        this.signedIn = signin;
      }
    );
    this.allowReg = this.settingsService.getSettings().allowRegistration;
    this.settingsService.settingChanged.subscribe(
      (settings: Settings) => {
        this.allowReg = settings.allowRegistration;
      }
    );
  }

  ngAfterViewInit(): void {
    document.addEventListener('DOMContentLoaded', function() {
      const elems = document.querySelectorAll('.sidenav');
      const instances = M.Sidenav.init(elems, Option);
    });
  }

  logout() {
    this.authService.logOut();
  }
}
