import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit(): void {
    
  }

   logout(){
    this.authService.logout();
    this.router.navigate(['/Login'])
  } 

}
