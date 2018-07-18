import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client [];
  totalBalance: number;

  constructor(
    private clientService: ClientService
  ) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.getTotalBalance();
    })
  }

  getTotalBalance(){
    this.totalBalance = this.clients.reduce((total, client ) => {
      return total + parseFloat(client.guthaben.toString());
    },0);
  }

}
