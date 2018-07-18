import { Component, OnInit } from '@angular/core';
import { ClientService} from '../../services/client.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id:string;
  client: Client = {
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    guthaben: 0
  }

  disableBalanceOnEdit: boolean = true;

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
    })
  }

  onSubmit({value,valid}: {value:Client, valid: boolean}){
    if(!valid){
      this.flash.show("Bitte Form richtig ausfüllen", {
      cssClass: 'alert-danger', timeout: 4000})
    }else {
      // add ID to Client
      value.id = this.id;
      // update Client
      this.clientService.updateClient(value);
      this.flash.show("Gut gemacht", {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/client/'+this.id])
    }
  }

}
