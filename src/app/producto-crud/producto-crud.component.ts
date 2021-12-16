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
    console.log(this.CreateProducto)
    if(this.CreateProducto.invalid){
      return;
    }
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

  agregarEmpleado() {
   
    
  }

  editarEmpleado(id: string) {

 
  }

  esEditar() {
    if(this.id !== null){
      this.titulo = 'Editar Empleado'
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
