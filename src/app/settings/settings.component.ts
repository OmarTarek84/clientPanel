import { Component, OnInit, ViewChild } from '@angular/core';
import { Settings } from './settings.modal';
import { SettingsService } from './settings.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @ViewChild('f') settingsForm: NgForm;
  settings: Settings;

  constructor(private settingsService: SettingsService, private router: Router) { }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
    this.settingsService.settingChanged.subscribe(
      (setting: Settings) => {
        this.settings = setting;
      }
    );
  }

  onChanged() {
    const newSetting: Settings = {
      allowRegistration: this.settingsForm.value.registration,
      disableBalanceOnAdd: this.settingsForm.value.balanceadd,
      disableBalanceOnEdit: this.settingsForm.value.balanceedit
    };
    this.settingsService.changeSettings(newSetting);
    this.router.navigate(['/clients']);
  }
}
