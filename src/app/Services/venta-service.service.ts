import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaServiceService {

  constructor(private firestore: AngularFirestore) { }

  agregarCliente(Cliente: any): Promise<any>{
    return this.firestore.collection('clientes').add(Cliente)
  }

  getProductos(): Observable<any>{
    return this.firestore.collection('productos').snapshotChanges();
  }

  eliminarCliente(id: string){
    return this.firestore.collection('clientes').doc(id).delete();
  }

  getCliente(id:string): Observable<any> {
    return this.firestore.collection('clientes').doc(id).snapshotChanges();
  }
  
}
