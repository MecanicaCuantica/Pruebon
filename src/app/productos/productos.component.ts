import { Component, OnInit ,ViewChild} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ClientesAllService } from '../Services/clientes-all.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

import { ProductosService } from '../Services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  closeResult = '';

  p: number = 1;
  Productos: any[] = [];

  constructor(private productoService: ProductosService, firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getProductos();
  }
 
  public onSave() {
    console.log("hola")
  }

  getProductos(){
    this.productoService.getProductos().subscribe(data => {
      this.Productos = [];
      data.forEach((element: any) => {
        console.log(element.payload.doc.id);
        this.Productos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.Productos);
    })
  }

  eliminarProducto(id:string){
    this.productoService.eliminarProducto(id).then(() => {
      console.log('Cliente se fue');
    }).catch(error => {
      console.log(error);
    })
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