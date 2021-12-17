import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
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
    private authService:AuthService,
    private Usuarioservice: UsuariosService,
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute) {
    this.CreateUsuario = this.fb.group({
      Nombre: ['', Validators.required],
      Cedula: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Direccion: ['', Validators.required],
      Telefono: ['', Validators.required],
      Apellido: ['', Validators.required],
      Ocupacion: ['', Validators.required],
      // Usuario: ['', Validators.required],
      Contrasena: ['', [Validators.required, Validators.minLength(6)]]

    })
    
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)

    

  }

  ngOnInit(): void {
    this.esEditar()
  }

  agregarEditarUsuario() {
    this.submitted = true;
    if(this.CreateUsuario.invalid){
      return;
    }
    if(this.id == null){
      this.agregarUsuario();
    }
    else{
      this.editarUsuario(this.id)
    }
  }

  agregarUsuario() {
    const Usuario: any = {
      Nombre: this.CreateUsuario.value.Nombre,
      Cedula: this.CreateUsuario.value.Cedula,
      Email: this.CreateUsuario.value.Email,
      Direccion: this.CreateUsuario.value.Direccion,
      Telefono: this.CreateUsuario.value.Telefono,
      Apellido: this.CreateUsuario.value.Apellido,
      Ocupacion: this.CreateUsuario.value.Ocupacion,
      // Usuario: this.CreateUsuario.value.Usuario,
      Contrasena: this.CreateUsuario.value.Contrasena,
    }
    this.Usuarioservice.agregarUsuario(Usuario).then(() =>{
      console.log("Usuario Llego");
      this.router.navigate(['/Usuarios'])
    }).catch(error => {
      console.log(error);
    })
    this.authService.register(Usuario.Email,Usuario.Contrasena).then(res =>{
      console.log("Registro exitoso",res)
      
      
    })
    
  }

  editarUsuario(id: string) {
    const Usuario: any = {
      Nombre: (this.CreateUsuario.value.Nombre).toString(),
      Cedula: (this.CreateUsuario.value.Cedula).toString(),
      Email: (this.CreateUsuario.value.Email).toString(),
      Direccion: (this.CreateUsuario.value.Direccion).toString(),
      Telefono: (this.CreateUsuario.value.Telefono).toString(),
      Apellido: (this.CreateUsuario.value.Apellido).toString(),
      Ocupacion: (this.CreateUsuario.value.Ocupacion).toString(),
      // Usuario: (this.CreateUsuario.value.Usuario).toString(),
      Contrasena: (this.CreateUsuario.value.Contrasena).toString(),
    }
    this.Usuarioservice.editarUsuario(id,Usuario).then(() => {
      console.log("Editado con exito");
      this.router.navigate(['/Usuarios']);
    })

  }

  esEditar() {
    if(this.id !== null){
      this.titulo = 'Editar Empleado'
      this.Usuarioservice.getUsuario(this.id).subscribe(data => {
        this.CreateUsuario.setValue({
        Nombre: [data.payload.data()['Nombre']],
        Cedula: [data.payload.data()['Cedula']],
        Email: [data.payload.data()['Email']],
        Direccion: [data.payload.data()['Direccion']],
        Telefono: [data.payload.data()['Telefono']],
        Apellido: [data.payload.data()['Apellido']],
        Ocupacion: [data.payload.data()['Ocupacion']],
        // Usuario: [data.payload.data()['Usuario']],
        Contrasena: [data.payload.data()['Contrasena']]  

        })
      })
    }

  }
}

