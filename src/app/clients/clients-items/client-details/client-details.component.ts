import { Component, OnInit, ViewChild } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../clients.modal';
import { ClientsService } from 'src/app/shared/clients.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  @ViewChild('f') updateBalanceForm: NgForm;
  id;
  client: Client;
  balanceNow;
  updateDisplayed = false;
  hasBalance = false;

  constructor(private route: ActivatedRoute,
              private clientsService: ClientsService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.client = this.clientsService.getClient(this.id);
        this.balanceNow = this.client.balance;
      }
    );

    if (this.client.balance > 0) {
      this.hasBalance = true;
    } else {
      this.hasBalance = false;
    }
  }

  display() {
    this.updateDisplayed = !this.updateDisplayed;
  }

  onUpdated() {
    const newBalance: Client = {
      id: this.client.id,
      firstname: this.client.firstname,
      lastname: this.client.lastname,
      email: this.client.email,
      phone: this.client.phone,
      balance: this.updateBalanceForm.value.balance
    };
    this.clientsService.updateClient(newBalance);
    this.router.navigate(['/clients']);
    if (this.client.balance > 0) {
      this.hasBalance = true;
    } else {
      this.hasBalance = false;
    }
  }

  onDelete() {
    this.clientsService.deleteClient(this.client.id);
    this.router.navigate(['/clients']);
  }
}
