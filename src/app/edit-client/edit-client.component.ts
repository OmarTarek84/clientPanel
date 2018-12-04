import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../clients/clients.modal';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClientsService } from '../shared/clients.service';
import { NgForm } from '@angular/forms';
import { SettingsService } from '../settings/settings.service';
import { Settings } from '../settings/settings.modal';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  @ViewChild('f') editForm: NgForm;
  id;
  firstName1;
  lastName1;
  email;
  phone;
  balance;
  client: Client;
  atdisabled: boolean;

  constructor(private route: ActivatedRoute,
              private clientsService: ClientsService,
              private router: Router,
              private settingService: SettingsService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.client = this.clientsService.getClient(this.id);
        this.firstName1 = this.client.firstname;
        this.lastName1 = this.client.lastname;
        this.email = this.client.email;
        this.phone = this.client.phone;
        this.balance = this.client.balance;
      }
    );
    this.atdisabled = this.settingService.getSettings().disableBalanceOnEdit;
    this.settingService.settingChanged.subscribe(
      (settings: Settings) => {
        this.atdisabled = settings.disableBalanceOnEdit;
      }
    );
  }

  onEdited() {
    if (this.atdisabled === false) {
      const newClient: Client = {
        firstname: this.editForm.value.first,
        lastname: this.editForm.value.last,
        email: this.editForm.value.email,
        phone: this.editForm.value.phone,
        balance: this.editForm.value.balance,
        id: this.client.id
      };
      this.clientsService.updateClient(newClient);
      this.router.navigate(['/clients']);
    } else {
      const newClient: Client = {
        firstname: this.editForm.value.first,
        lastname: this.editForm.value.last,
        email: this.editForm.value.email,
        phone: this.editForm.value.phone,
        balance: this.balance,
        id: this.client.id
      };
      this.clientsService.updateClient(newClient);
      this.router.navigate(['/clients']);
    }
  }

}
