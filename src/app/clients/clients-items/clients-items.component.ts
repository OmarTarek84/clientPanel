import { Component, OnInit } from '@angular/core';
import { Client } from '../clients.modal';
import { ClientsService } from 'src/app/shared/clients.service';

@Component({
  selector: 'app-clients-items',
  templateUrl: './clients-items.component.html',
  styleUrls: ['./clients-items.component.css']
})
export class ClientsItemsComponent implements OnInit {

  clients: Client[];
  total: number;

  constructor(private clientsService: ClientsService) { }

  ngOnInit() {
    this.clientsService.getClients();
    this.clientsService.clientsChanged.subscribe(
      (clients) => {
        this.clients = clients;
        this.getOwedTotal();
      }
    );
  }

  getOwedTotal() {
    let sum = 0;
    for (let i = 0; i < this.clients.length; i++) {
      sum += Number(this.clients[i].balance);
    }
    this.total = sum;
  }

}
