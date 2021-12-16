import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesAllService } from '../Services/clientes-all.service';
@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent implements OnInit {



 
  CreateCliente: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Cliente';

  constructor(
    private Clienteservice: ClientesAllService,
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute) {
    this.CreateCliente = this.fb.group({
      Nombre: ['', Validators.required],
      Cedula: ['', Validators.required],
      Email: ['', Validators.required],
      Direccion: ['', Validators.required],
      Telefono: ['', Validators.required]

    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }
    

  ngOnInit(): void {
    this.esEditar()
  }

  agregarEditarEmpleado() {
    this.submitted = true;


    if(this.CreateCliente.invalid){
      return;
    }

    if(this.id == null){
      this.agregarEmpleado();
    }
    else{
      this.editarEmpleado(this.id)
    }
    
  }

  agregarEmpleado() {
    const Cliente: any = {
      Nombre: this.CreateCliente.value.Nombre,
      Cedula: this.CreateCliente.value.Cedula,
      Email: this.CreateCliente.value.Email,
      Direccion: this.CreateCliente.value.Direccion,
      Telefono: this.CreateCliente.value.Telefono,
      Compras: 0
    }
    this.Clienteservice.agregarCliente(Cliente).then(() =>{
      console.log("Cliente Llego");
      this.router.navigate(['/ManejoClientes'])
    }).catch(error => {
      console.log(error);
    })
    
  }

  editarEmpleado(id: string) {    
    const Cliente: any = {
      Nombre: (this.CreateCliente.value.Nombre).toString(),
      Cedula: (this.CreateCliente.value.Cedula).toString(),
      Email: (this.CreateCliente.value.Email).toString(),
      Direccion: (this.CreateCliente.value.Direccion).toString(),
      Telefono: (this.CreateCliente.value.Telefono).toString(),
      Compras: 0
    }

    this.Clienteservice.editarEmpleado(id,Cliente).then(() => {
      console.log("Editado con exito");
      this.router.navigate(['/ManejoClientes']);
    })

  }
  
    

  esEditar() {
    
    if(this.id !== null){
      this.titulo = 'Editar Empleado'
      this.Clienteservice.getCliente(this.id).subscribe(data => {
        this.CreateCliente.setValue({
        Nombre: [data.payload.data()['Nombre']],
        Cedula: [data.payload.data()['Cedula']],
        Email: [data.payload.data()['Email']],
        Direccion: [data.payload.data()['Direccion']],
        Telefono: [data.payload.data()['Telefono']]
          


        })
      })
    }

}


  
 }