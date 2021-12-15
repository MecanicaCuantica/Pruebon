import { Component, OnInit ,ViewChild} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from '../Services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  p: number = 1;
  closeResult = '';
  Usuarios: any[] = [];

  constructor(private usuarioService: UsuariosService, firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(){
    this.usuarioService.getUsuarios().subscribe(data => {
      this.Usuarios = [];
      data.forEach((element: any) => {
        console.log(element.payload.doc.id);
        this.Usuarios.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.Usuarios);
    })
  }

  eliminarUsuarios(id:string){
    this.usuarioService.eliminarUsuario(id).then(() => {
      console.log('Usuario eliminado');
    }).catch(error => {
      console.log(error);
    })
  }

  public onSave() {
    console.log("hola")
  }

  eliminar(indice:number){
    console.log(indice)
  }

  editar(indice:number){
    console.log(indice)
  }

  crear(){
    console.log("crear")
  }


  
  unirbased(){
    
  }

}
