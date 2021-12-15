import { Component, OnInit ,ViewChild} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ClientesAllService } from '../Services/clientes-all.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  p: number = 1;
  closeResult = '';
  
  
  Clientes: any[] = [];
  constructor(private clienteService: ClientesAllService, firestore: AngularFirestore) {
    
  }

  ngOnInit(): void {
    this.getClientes();
  }


  getClientes(){
    this.clienteService.getClientes().subscribe(data => {
      this.Clientes = [];
      data.forEach((element: any) => {
        console.log(element.payload.doc.id);
        this.Clientes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.Clientes);
    })
  }

  eliminarClientes(id:string){
    this.clienteService.eliminarCliente(id).then(() => {
      console.log('Cliente se fue');
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
