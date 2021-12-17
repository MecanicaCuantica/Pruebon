import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { VarService } from '../Services/var.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private authService:AuthService,private router: Router,private variabelP:VarService) { }

  mostrarCrearU: boolean = false
  ngOnInit(): void {
    if(localStorage.getItem('admin') == "niche@hola.com"){
      
      this.mostrarCrearU = true
    }
  }

   logout(){
    this.authService.logout();
    this.router.navigate(['/Login'])
    localStorage.setItem('admin',"")
  } 

}
