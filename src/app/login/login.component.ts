import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService,private router: Router) { }

  ingreso: boolean = false;
  usuario = {
    email: '',
    password: ''
  }

  ingresar(){
    console.log(this.usuario);
    const {email,password} = this.usuario
    this.authService.login(email,password).then(res =>{
      console.log("Inicio de sesión exitoso",res)
      
      if(res !== null){
        this.router.navigate(['/Portada'])
      }
      
    })
  }

  registrarse(){
    console.log(this.usuario);
    const {email,password} = this.usuario
    this.authService.register(email,password).then(res =>{
      console.log("Registro exitoso",res)
      this.router.navigate(['/Portada'])
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
