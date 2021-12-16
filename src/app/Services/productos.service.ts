import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private firestore: AngularFirestore) { }

  agregarProducto(Cliente: any): Promise<any>{
    return this.firestore.collection('productos').add(Cliente)
  }

  getProductos(): Observable<any>{
    return this.firestore.collection('productos').snapshotChanges();
  }

  eliminarProducto(id: string){
    return this.firestore.collection('productos').doc(id).delete();
  }

  getProducto(id:string): Observable<any> {
    return this.firestore.collection('productos').doc(id).snapshotChanges();
  }

  editarProducto(id: string,data:any){
    return this.firestore.collection('productos').doc(id).update(data);
  }
}
