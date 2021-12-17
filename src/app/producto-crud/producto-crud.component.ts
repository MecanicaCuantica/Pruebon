import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesAllService } from '../Services/clientes-all.service';
import { ProductosService } from '../Services/productos.service';


@Component({
  selector: 'app-producto-crud',
  templateUrl: './producto-crud.component.html',
  styleUrls: ['./producto-crud.component.css']
})
export class ProductoCRUDComponent implements OnInit {

  CreateProducto: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Producto';


  constructor(
    private Productoservice: ProductosService,
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute) { 
      this.CreateProducto = this.fb.group({
        Nombre: ['', Validators.required],
        Descripcion: ['', Validators.required],
        Cantidad: ['', Validators.required],
        Valor: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    this.esEditar()
  }

  agregarEditarProducto() {
    this.submitted = true;


    if(this.CreateProducto.invalid){
      return;
    }

    if(this.id == null){
      this.agregarProducto();
    }
    else{
      this.editarProducto(this.id)
    }

  }

  agregarProducto() {
    const Producto: any = {
      Nombre: this.CreateProducto.value.Nombre,
      Descripcion: this.CreateProducto.value.Descripcion,
      Cantidad: this.CreateProducto.value.Cantidad,
      Valor: this.CreateProducto.value.Valor


    }
    this.Productoservice.agregarProducto(Producto).then(() =>{
      console.log("Producto Llego");
      this.router.navigate(['/ManejoProductos'])
    }).catch(error => {
      console.log(error);
    })
    
  }

  editarProducto(id: string) {
    const Producto: any = {
      Nombre: (this.CreateProducto.value.Nombre).toString(),
      Descripcion: (this.CreateProducto.value.Descripcion).toString(),
      Cantidad: (this.CreateProducto.value.Cantidad).toString(),
      Valor: (this.CreateProducto.value.Valor).toString()


    }
    this.Productoservice.editarProducto(id,Producto).then(() => {
      console.log("Editado con exito");
      this.router.navigate(['/ManejoProductos']);
    })   
  }

  esEditar() {
    if(this.id !== null){
      this.titulo = 'Editar Producto'
      this.Productoservice.getProducto(this.id).subscribe(data => {
        this.CreateProducto.setValue({
        Nombre: [data.payload.data()['Nombre']],
        Descripcion: [data.payload.data()['Descripcion']],
        Cantidad: [data.payload.data()['Cantidad']],
        Valor: [data.payload.data()['Valor']],

        })
      })
    }
}

}
