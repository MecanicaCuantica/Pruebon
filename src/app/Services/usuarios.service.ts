import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private firestore: AngularFirestore) { }

  agregarUsuario(Usuario: any): Promise<any>{
    return this.firestore.collection('empleados').add(Usuario)
  }

  getUsuarios(): Observable<any>{
    return this.firestore.collection('empleados').snapshotChanges();
  }

  eliminarUsuario(id: string){
    return this.firestore.collection('empleados').doc(id).delete();
  }

  getUsuario(id:string): Observable<any> {
    return this.firestore.collection('empleados').doc(id).snapshotChanges();
  }

  editarUsuario(id: string,data:any){
    return this.firestore.collection('empleados').doc(id).update(data);
  }
}
