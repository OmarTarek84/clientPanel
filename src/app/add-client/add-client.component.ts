import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientsService } from '../shared/clients.service';
import { Router } from '@angular/router';
import { Client } from '../clients/clients.modal';
import { SettingsService } from '../settings/settings.service';
import { Settings } from '../settings/settings.modal';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  @ViewChild('f') addForm: NgForm;
  atDisabled = false;
  constructor(private clientsService: ClientsService, private router: Router, private settingService: SettingsService) { }

  ngOnInit() {
    this.atDisabled = this.settingService.getSettings().disableBalanceOnAdd;
    this.settingService.settingChanged.subscribe(
      (settings: Settings) => {
        this.atDisabled = settings.disableBalanceOnAdd;
      }
    );
  }

  onAdded() {
    const newClient: Client = {
      firstname: this.addForm.value.first,
      lastname: this.addForm.value.last,
      email: this.addForm.value.email,
      phone: this.addForm.value.phone,
      balance: this.addForm.value.balance
    };
    this.clientsService.addClient(newClient);
    this.router.navigate(['/clients']);
  }

}
