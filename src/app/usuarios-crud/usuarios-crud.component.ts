import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../Services/usuarios.service';

@Component({
  selector: 'app-usuarios-crud',
  templateUrl: './usuarios-crud.component.html',
  styleUrls: ['./usuarios-crud.component.css']
})
export class UsuariosCRUDComponent implements OnInit {

  CreateUsuario: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Empleado';

  constructor(
    private Usuarioservice: UsuariosService,
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute) {
    this.CreateUsuario = this.fb.group({
      Nombre: ['', Validators.required],
      Cedula: ['', Validators.required],
      Email: ['', Validators.required],
      Direccion: ['', Validators.required],
      Telefono: ['', Validators.required],
      Apellido: ['', Validators.required],
      Ocupacion: ['', Validators.required],
      Usuario: ['', Validators.required],
      Contrasena: ['', Validators.required]

    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)


  }

  ngOnInit(): void {
  }

  agregarEditarUsuario() {
    this.submitted = true;
    console.log(this.CreateUsuario)
    if(this.CreateUsuario.invalid){
      return;
    }
    const Usuario: any = {
      Nombre: this.CreateUsuario.value.Nombre,
      Cedula: this.CreateUsuario.value.Cedula,
      Email: this.CreateUsuario.value.Email,
      Direccion: this.CreateUsuario.value.Direccion,
      Telefono: this.CreateUsuario.value.Telefono,
      Apellido: this.CreateUsuario.value.Apellido,
      Ocupacion: this.CreateUsuario.value.Ocupacion,
      Usuario: this.CreateUsuario.value.Usuario,
      Contrasena: this.CreateUsuario.value.Contrasena,
    }
    this.Usuarioservice.agregarUsuario(Usuario).then(() =>{
      console.log("Usuario Llego");
      this.router.navigate(['/Usuarios'])
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
      this.titulo = 'Editar Usuario'
      this.Usuarioservice.getUsuario(this.id).subscribe(data => {
        this.CreateUsuario.setValue({
        Nombre: [data.payload.data()['Nombre']],
        Cedula: [data.payload.data()['Cedula']],
        Email: [data.payload.data()['Email']],
        Direccion: [data.payload.data()['Direccion']],
        Telefono: [data.payload.data()['Telefono']],
        Apellido: [data.payload.data()['Apellido']],
        Ocupacion: [data.payload.data()['Ocupacion']],
        Usuario: [data.payload.data()['Usuario']],
        Contrasena: [data.payload.data()['Contrasena']]  

        })
      })
    }

  }
}

