import { Component, OnInit } from '@angular/core';
import { VentaServiceService } from '../Services/venta-service.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { right } from '@popperjs/core';


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
  monto: number = 0;
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
      this.clienteF=resultado;
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

  sumaValor(){
    for(var i=0; i<this.carrito.length;i++){
      this.monto = this.monto + parseInt(this.carrito[i].Valor);
    }
  }

  finalizarCompra(){
    
    if (this.validaId == true && this.carrito.length != 0){
    console.log("validaID",this.validaId);
    const doc = new jsPDF();
    doc.setFontSize(12);
    var img = new Image();
    var img2 = new Image();
    img.src = "assets/Imagenes/topfac.png";
    img2.src = "assets/Imagenes/nota.png"
    doc.text('Articulo', 10, 100);
    doc.text('Cantidad', 70, 100);
    doc.text('Valor', 130, 100);
    doc.text('Total', 180, 100);
    doc.text('Cobrar a:', 10, 50);
    doc.text((this.clienteF.Nombre).toString(), 10, 57);
    doc.text((this.clienteF.Cedula).toString(), 10, 62);
    doc.text('Enviar a:', 55, 50);
    doc.text((this.clienteF.Direccion).toString(), 55, 57);
    doc.text('Tulua', 55, 62);

    
    var y = 100;
    var total = 0;
      this.sumaValor();
      console.log("monto234", this.monto);
      this.fecha = new Date();
      console.log("carrito",this.carrito)
      for(var i=0; i<this.carrito.length; i++){
        total=total+parseInt(this.carrito[i].Valor);
        y=y+10;
        doc.text((this.carrito[i].Nombre).toString(),10,y);
        doc.text((this.carrito[i].Cantidad).toString(),70,y);
        doc.text((this.carrito[i].Valor/this.carrito[i].Cantidad).toString(),130,y);
        doc.text((this.carrito[i].Valor).toString(),180,y);
        doc.text('______________________________________________________________________________',10,y)
      }
      doc.text('Fecha:', 150, 50,{align: "right"});
      doc.text((this.fecha.toDateString()).toString(), 165, 50);
      doc.text('Condiciones de pago:', 150, 60,{align: "right"});
      doc.text('Efectivo', 165, 60);
      doc.text('Fecha de vencimiento:', 150, 70,{align: "right"});
      doc.text((this.fecha.toDateString()).toString(), 165, 70);
      doc.text('Saldo adeudado:', 150, 80,{align: "right"});
      doc.text((total).toString(), 165, 80);


      y=y+10;
      doc.text('Total',165,y+15);
      doc.text((total).toString(),180,y+15);

      console.log("fecha",this.fecha);
      this.agregarVenta();   
      console.log("COMPRA EXITOSA");  
      y=y+50
      doc.addImage(img2,'png',10,y,80,25);
      doc.addImage(img,'png',0,0,200,40);
      doc.save('Factura'); 
      
      
    }
    else{
      if(this.carrito.length == 0 && this.validaId == true){
        this.clienteAux = "CARRITO VACÍO";
      }
      else if (this.validaId != true && this.carrito.length == 0){
        this.clienteAux = "DEBE INGRESAR EL ID DEL CLIENTE Y CARRITO VACÍO";     
      }
      else{
        this.clienteAux = "DEBE INGRESAR EL ID DEL CLIENTE";
      }
      
      
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
    //console.log("this.clienteF.Compras",this.clienteF.Compras);
    var id: any  
      var Clientes: any = {
        Compras: parseInt(this.clienteF.Compras) + this.monto         
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
    //console.log("cantidadAux",cantidadAux)
    //console.log("hola", itemAux)
    //console.log("itemAux indexOf:",this.carrito.indexOf(itemAux))
    const resultado = this.carrito.find(elemento => elemento.id === item.id);
    //console.log("resultado", resultado)

    if (resultado !== undefined){
      //console.log("holaNull")
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
