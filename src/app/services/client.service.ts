import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';

import { Client } from '../models/Client';



@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;


  constructor(
    private afs: AngularFirestore
    ) {
      this.clientsCollection = afs.collection<Client>('kunde');
     }

  getClients(): Observable<Client[]>{
    // Get clients with id, valueschanges has no id, snapshot has id
    this.clients = this.clientsCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Client;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      return this.clients;
    }

  newClient(client: Client){
    this.clientsCollection.add(client);
  }

  getClient(id:string): Observable<Client>{
    this.clientDoc = this.afs.doc<Client>(`kunde/${id}`);
      this.client = this.clientDoc.snapshotChanges().pipe(
      map(actions => {
          const data = actions.payload.data() as Client;
          const id = actions.payload.id;
          return { id, ...data };
    })
    );
    return this.client;
  }

  updateClient(client: Client){
    this.clientDoc = this.afs.doc(`kunde/${client.id}`);
    this.clientDoc.update(client);
  }

  deleteClient(client: Client){
    this.clientDoc = this.afs.doc(`kunde/${client.id}`);
    this.clientDoc.delete();
  }


}
