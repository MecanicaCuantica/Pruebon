import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService) { }

  usuario = {
    email: '',
    password: ''
  }

  ingresar(){
    console.log(this.usuario);
    const {email,password} = this.usuario
    this.authService.login(email,password).then(res =>{
      console.log("Inicio de sesión exitoso",res)
    })
  }

  registrarse(){
    console.log(this.usuario);
    const {email,password} = this.usuario
    this.authService.register(email,password).then(res =>{
      console.log("Registro exitoso",res)
    })
  }

  obtenerUserLogueado(){
    this.authService.getUserLogged().subscribe(res => {
      console.log(res?.email);
    });

  }

  logout(){
    this.authService.logout();
  }


  ngOnInit(): void {
  }

}
