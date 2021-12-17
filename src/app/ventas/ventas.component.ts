import { Component, OnInit } from '@angular/core';
import { VentaServiceService } from '../Services/venta-service.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  constructor(private ventasService:  VentaServiceService) { }
  Productos: any[] = [];
  carrito: any[] = [];
  searchText: any;
  clientes: any[] = [];
  id: any = "";
  clienteF: any;
  validaId: any;
  monto: any;
  fecha: any;
  ventas: any[] = [];
  idVentaActual: any;

  ngOnInit(): void {
    this.getProductos();
    this.getClientes();
    this.getVentas();
  }

  getProductos(){
    this.ventasService.getProductos().subscribe(data => {
      this.Productos = [];
      data.forEach((element: any) => {
        console.log(element.payload.doc.id);
        this.Productos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.Productos);
    })
  }

  getVentas(){
    this.ventasService.getVentas().subscribe(data => {
      this.ventas = [];
      data.forEach((element: any) => {
        console.log(element.payload.doc.id);
        this.ventas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.ventas);
      this.idVentaActual = this.ventas[this.ventas.length-1].id;
    })
  }

  getClientes(){
    this.ventasService.getClientes().subscribe(data => {
      this.clientes = [];
      data.forEach((element: any) => {
        console.log(element.payload.doc.id);
        this.clientes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.Productos);
    })
  }

  clienteAux: any;
  verificarCliente(cliente: any){
    this.clienteAux = cliente;
    
    const resultado = this.clientes.find(elemento => elemento.Cedula === this.clienteAux);
    this.clienteF = resultado;
    console.log("resultado:", resultado);
    if (resultado !== undefined){
      console.log("cliente:",resultado);
      this.clienteAux = resultado.Nombre
      this.id = resultado.id
      this.validaId = true
    }
    else{
      this.clienteAux = "CLIENTE NO ENCONTRADO"
      this.validaId = false
    }
  }

  finalizarCompra(){
    if (this.validaId == true){
      if (this.carrito.length == 1){
        this.monto = this.carrito[0].Valor;
      }
      else{
        this.monto = this.carrito.reduce((a, b) => parseInt(a.Valor) + parseInt(b.Valor));
      }  
      console.log("monto", this.monto);
      this.fecha = new Date();
      console.log("fecha",this.fecha);
      this.agregarVenta();   
      console.log("COMPRA EXITOSA");    
    }
    else{
      this.clienteAux = "DEBE INGRESAR EL ID DEL CLIENTE"
    }

  }

  editarProducto() {  
    var id: any  
    for(var i = 0; i < this.Productos.length; i++){
      var Producto: any = {
        Cantidad: (this.Productos[i].Cantidad).toString()          
      }
      id = this.Productos[i].id;
      if (Producto.Cantidad == 0){
        this.ventasService.eliminarProducto(id).then(() => {
          console.log("Eliminado con exito");
        })  
      }
      else{
        this.ventasService.editarProducto(id,Producto).then(() => {
          console.log("Editado con exito");
        })
      }
    }
  }

  editarCliente() {  
    var id: any  
      var Clientes: any = {
        Compras: parseInt(this.clienteF.Compras) + parseInt(this.monto)          
      }
      id = this.clienteF.id;
        this.ventasService.editarCliente(id, Clientes).then(() => {
          console.log("Editado con exito");
        })  
  }

  agregarCarrito(item: any){
   /*  console.log(Object.values()); */
   /* console.log(this.carrito.indexOf(item)) */ 
    var itemAux = Object.assign({},item);
    var cantidadAux = itemAux.Cantidad;
    console.log("cantidadAux",cantidadAux)
    //console.log("hola", itemAux)
    //console.log("itemAux indexOf:",this.carrito.indexOf(itemAux))
    const resultado = this.carrito.find(elemento => elemento.id === item.id);
    console.log("resultado", resultado)

    if (resultado !== undefined){
      console.log("holaNull")
      var index = this.carrito.indexOf(resultado);
      if (cantidadAux != 0){
        this.carrito[index].Cantidad = 1 + parseInt(this.carrito[index].Cantidad);
        this.Productos[this.Productos.indexOf(item)].Cantidad = parseInt(this.Productos[this.Productos.indexOf(item)].Cantidad) - 1;
        //console.log("Cantidad producto original:",)
        this.carrito[index].Valor = parseInt(this.carrito[index].Cantidad)* parseInt(item.Valor);  
      }
      
    }
    else{
      this.carrito.push(itemAux)
      this.carrito[this.carrito.length -1].Cantidad = 1
      this.Productos[this.Productos.indexOf(item)].Cantidad = parseInt(this.Productos[this.Productos.indexOf(item)].Cantidad) - 1;
    } 
    
  }

  eliminar(item: any){
    var index = this.carrito.indexOf(item);
    var id = item.id;
    var cantidadAux = item.Cantidad;
    for(var i=0; i < this.Productos.length; i++){
      if(this.Productos[i].id == id){
        index = i;       
        break; 
      }
    }
    this.Productos[index].Cantidad = parseInt(this.Productos[index].Cantidad) + parseInt(cantidadAux);
    var index2 = this.carrito.indexOf(item);
  
    if (index2 !== -1) {
      this.carrito.splice(index2, 1);
    }
  }

  agregarVenta() {
    const Venta: any = {
      Fecha: this.fecha,
      idCliente: this.id,
      monto: this.monto
    }
    this.ventasService.agregarVenta(Venta).then(() =>{      
      this.getVentas();     
      this.agregarVentaTiene(this.idVentaActual);
      this.editarProducto();
      this.editarCliente();
      console.log("Venta Llego");
    }).catch(error => {
      console.log(error);
    })   
  }

  agregarVentaTiene(id:any) {
    for(var i=0; i < this.carrito.length; i++){
    var VentaTiene: any = {
      idVenta: id,
      idProducto: this.carrito[i].id
    }
    this.ventasService.agregarVentaTiene(VentaTiene).then(() =>{
      this.carrito = []
      this.clienteAux = ""
      console.log("VentaTiene Llego");
    }).catch(error => {
      console.log(error);
    })    
  }
}
}
