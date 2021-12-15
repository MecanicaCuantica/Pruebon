import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesAllService {

  constructor(private firestore: AngularFirestore) { }

  agregarCliente(Cliente: any): Promise<any>{
    return this.firestore.collection('clientes').add(Cliente)
  }

  getClientes(): Observable<any>{
    return this.firestore.collection('clientes').snapshotChanges();
  }

  eliminarCliente(id: string){
    return this.firestore.collection('clientes').doc(id).delete();
  }

  getCliente(id:string): Observable<any> {
    return this.firestore.collection('clientes').doc(id).snapshotChanges();
  }

  editarEmpleado(id: string,data:any){
    return this.firestore.collection('clientes').doc(id).update(data);
  }
}
