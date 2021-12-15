import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ClientesComponent } from './clientes/clientes.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PortadaComponent } from './portada/portada.component';
import { ReportesComponent } from './reportes/reportes.component';
import { VentasComponent } from './ventas/ventas.component';
import { ProductosComponent } from './productos/productos.component';
import { CrearUsuariosComponent } from './crear-usuarios/crear-usuarios.component';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosCRUDComponent } from './usuarios-crud/usuarios-crud.component';
import { ProductoCRUDComponent } from './producto-crud/producto-crud.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClientesComponent,
    NavBarComponent,
    PortadaComponent,
    ReportesComponent,
    VentasComponent,
    ProductosComponent,
    CrearUsuariosComponent,
    UsuariosComponent,
    UsuariosCRUDComponent,
    ProductoCRUDComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    NgxPaginationModule,
    FormsModule, ReactiveFormsModule, NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
