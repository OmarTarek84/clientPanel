import { Client } from '../clients/clients.modal';
import { EventEmitter, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable()
export class ClientsService {

    constructor(private db: AngularFirestore) {
        this.toDoCollectionRef = this.db.collection<Client>('clients');
    }
    toDoCollectionRef: AngularFirestoreCollection;
    clientsChanged = new EventEmitter<Client[]>();
    private clients: Client[] = [];
    private subscription: Subscription[] = [];

    getClients() {
        this.subscription.push(this.db.collection('clients').snapshotChanges()
        .pipe(map(docArray => {
            return docArray.map(doc => {
                const data = doc.payload.doc.data() as Client;
                const id = doc.payload.doc.id;
                return {id, ...data};
            });
        }))
        .subscribe(
            (clients: Client[]) => {
                this.clients = clients;
                this.clientsChanged.emit([...this.clients]);
            }
        ));

    }

    cancelSubscriptions() {
        this.subscription.forEach(sub => sub.unsubscribe());
    }

    addClient(client: Client) {
        this.toDoCollectionRef.add(client);
        this.clientsChanged.emit(this.clients.slice());
    }

    updateBalance(newBalance: Client) {
        this.toDoCollectionRef.doc(newBalance.id).update({...newBalance});
        this.clientsChanged.emit(this.clients.slice());
    }

    getClient(id) {
        return this.clients[id];
    }

    updateClient(newClient: Client) {
        this.toDoCollectionRef.doc(newClient.id).update({...newClient});
        this.clientsChanged.emit(this.clients.slice());
    }

    deleteClient(id) {
        this.toDoCollectionRef.doc(id).delete();
        this.clientsChanged.emit(this.clients.slice());
    }
}
