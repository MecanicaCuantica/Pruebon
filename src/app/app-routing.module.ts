import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { CrearUsuariosComponent } from './crear-usuarios/crear-usuarios.component';
import { LoginComponent } from './login/login.component';
import { PortadaComponent } from './portada/portada.component';
import { ProductosComponent } from './productos/productos.component';
import { ReportesComponent }from './reportes/reportes.component' 
import { VentasComponent } from './ventas/ventas.component';

const routes: Routes = [{path: 'home', component: PortadaComponent},
{path: 'ManejoClientes', component: ClientesComponent},
{path: 'Reportes', component: ReportesComponent},
{path: '', component: PortadaComponent},
{path: 'Ventas', component: VentasComponent},
{path: 'ManejoProductos', component: ProductosComponent},
{path: 'Login', component: LoginComponent},
{path: 'CrearUsuarios', component: CrearUsuariosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
