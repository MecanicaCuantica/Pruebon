import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private firestore: AngularFirestore) { }

  getVentas(): Observable<any> {
    return this.firestore.collection('ventas', ref => ref.orderBy("Fecha", "asc")).snapshotChanges();
  }

  getClientes(): Observable<any> {
    return this.firestore.collection('clientes').snapshotChanges();
  }


  
}
