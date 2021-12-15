import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private firestore: AngularFirestore) { }

  agregarUsuario(Usuario: any): Promise<any>{
    return this.firestore.collection('usuario').add(Usuario)
  }

  getUsuarios(): Observable<any>{
    return this.firestore.collection('usuarios').snapshotChanges();
  }

  eliminarUsuario(id: string){
    return this.firestore.collection('usuario').doc(id).delete();
  }

  getUsuario(id:string): Observable<any> {
    return this.firestore.collection('usuario').doc(id).snapshotChanges();
  }


}
