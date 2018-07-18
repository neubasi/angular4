import { Component, OnInit } from '@angular/core';
import { ClientService} from '../../services/client.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-clients-details',
  templateUrl: './clients-details.component.html',
  styleUrls: ['./clients-details.component.css']
})
export class ClientsDetailsComponent implements OnInit {

  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flash: FlashMessagesService
  ) { }

  ngOnInit() {
    // Get id from url
    this.id = this.route.snapshot.params['id'];
   
    // get client
    this.clientService.getClient(this.id).subscribe(client => {

      this.client = client;
      console.log(this.client)
    })
  }

  updateBalance(){
    this.clientService.updateClient(this.client);
    this.flash.show("Guthaben aktualisiert",{
    cssClass: 'alert-success',timeout:4000
  });
}

onDeleteClick(){
  console.log("Delete")
  if(confirm('Bist du sicher?')){
    this.clientService.deleteClient(this.client);
    this.flash.show("Kunde wurde gelöscht",{
      cssClass: 'alert-success',timeout:4000
    });
    this.router.navigate(['/'])
  }
}

}
