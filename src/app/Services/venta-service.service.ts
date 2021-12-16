import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaServiceService {

  constructor(private firestore: AngularFirestore) { }

  agregarVenta(venta: any): Promise<any>{
    return this.firestore.collection('ventas').add(venta)
  }

  agregarVentaTiene(venta: any): Promise<any>{
    return this.firestore.collection('ventaTiene').add(venta)
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

  getClientes(): Observable<any> {
    return this.firestore.collection('clientes').snapshotChanges();
  }

  getVentas(): Observable<any> {
    return this.firestore.collection('ventas', ref => ref.orderBy("Fecha", "asc")).snapshotChanges();
  }
  
}
