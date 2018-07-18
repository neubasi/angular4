import { Component, OnInit, ViewChild } from '@angular/core';

import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';

import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    guthaben: 0
  }

  disableBalanceOnAdd: boolean = true;
  @ViewChild('clientForm') form: any;

  constructor(
    private flash: FlashMessagesService,
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}){
    if(this.disableBalanceOnAdd){
      value.guthaben = 0;
    }
    if(!valid){
      // Show Error
      this.flash.show("Bitte fülle die Form korrekt aus",{
        cssClass: 'alert-danger', timeout: 4000
      })
    } else {
      // Add new Client
      this.clientService.newClient(value);
      // Show message
      this.flash.show("Kunde erstellt",{
        cssClass: 'alert-success', timeout: 4000
      });
      // Redirect to Dashboard
      this.router.navigate(['/']);
    }
    console.log(value, valid)
  }
}
