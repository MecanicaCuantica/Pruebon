import { Component, OnInit ,ViewChild} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ReportesService } from '../Services/reportes.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  closeResult = '';
  p: number = 1;
  ventas: any[] = [];
  ventaTiene: any[] = [];
  clientesMonto: any[] = [];
  clientes: any[] = [];
  Productos: any[] = [];
  productosVentaTiene: any[] = [];
  mejorCliente: any;
  mayor: any;
  mayorID: any;
  productoMasVendidoID: any;
  productoMasVendido: any;

  constructor(private reportesService:  ReportesService) { }

  ngOnInit(): void {
    this.getVentas();
    this.getVentasTiene();
    this.getClientes();
    this.getProductos();
  }
  
  getProductos(){
    this.reportesService.getProductos().subscribe(data => {
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

  getClientes(){
    this.reportesService.getClientes().subscribe(data => {
      this.clientes = [];
      data.forEach((element: any) => {
        console.log(element.payload.doc.id);
        this.clientes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.clientes);
    })
  }

  getVentas(){
    this.reportesService.getVentas().subscribe(data => {
      this.ventas = [];
      data.forEach((element: any) => {
        console.log(element.payload.doc.id);
        this.ventas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log("reportes",this.ventas);
    })
  }

  getVentasTiene(){
    this.reportesService.getVentaTiene().subscribe(data => {
      this.ventaTiene = [];
      data.forEach((element: any) => {
        console.log(element.payload.doc.id);
        this.ventaTiene.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log("ventaTiene",this.ventaTiene);
    })
  }

  verificarSiesta(elemento: any, lista: any[]){
    for(var i=0; i<lista.length; i++){
      if (elemento == lista[i][0]){
        return true;
      }
    }
    return false;
  }

  obtenerListadoClientesMonto(valor: any){
    valor = valor.target.value
    console.log("ventas",this.ventas)
    if (valor == "1"){
      var monto: any
      var aux = 0
      for(var i=0; i<this.ventas.length; i++){
        monto = 0
        if (this.verificarSiesta(this.ventas[i].idCliente, this.clientesMonto)){
          aux = 1;
        }
        else{
          for(var j=0; j<this.ventas.length; j++){
            if(this.ventas[i].idCliente == this.ventas[j].idCliente){
              //console.log("this.ventas[j].idCliente",this.ventas[j].idCliente) 
              //console.log("this.ventas[j].monto",this.ventas[j].monto)            
              monto = parseInt(monto) + parseInt(this.ventas[j].monto);              
              //console.log("monto",monto)
            }                    
          } 
          //console.log("finaliza j")    
        }
        if (aux == 0){
          this.clientesMonto.push([this.ventas[i].idCliente, monto]);
        }
        aux = 0;      
      }
      console.log("clientesMonto",this.clientesMonto);
      this.elegirMayor();
      //return this.elegirMayor();
    }
    else if (valor == "2"){
      console.log("entra reporte 2", this.ventaTiene)
      this.setProductosMasVendidos();
      this.obtenerProductoMasVendido();


    }
  }

  elegirMayor(){
    this.mayor = this.clientesMonto[0][1];
    this.mayorID = this.clientesMonto[0][0];
    for(var i = 0; i < this.clientesMonto.length; i++){
      if (this.clientesMonto[i][1] > this.mayor)
      {
        this.mayorID = this.clientesMonto[i][0]; // OJO, CAMBIAR SI SE DAÑA EL REPORTE 1
        this.mayor = this.clientesMonto[i][1];
      }
  }
  console.log("mayorID:",this.mayorID)
  console.log("mayor:",this.mayor)
  }

  obtenerClienteMayor(valor: any){
    this.obtenerListadoClientesMonto(valor);
    for(var i=0;i<this.clientes.length;i++){
      if(this.clientes[i].id == this.mayorID){
        this.mejorCliente = this.clientes[i];
        console.log(this.clientes[i]); // Acomodar para mostrar en la interfaz
        break
      }
    }
  }

  setProductosMasVendidos(){
    var acc = 0;
    for(var i=0; i<this.ventaTiene.length;i++){
      if (this.verificarSiesta(this.ventaTiene[i].idProducto, this.productosVentaTiene) != true){
        for(var j=0; j<this.ventaTiene.length;j++){
          if(this.ventaTiene[i].idProducto == this.ventaTiene[j].idProducto){
            acc = acc + 1;
          }    
        }
        this.productosVentaTiene.push([this.ventaTiene[i].idProducto, acc]);
        acc = 0;     
      }   
    }
    console.log("productosVentaTiene",this.productosVentaTiene);
    this.elegirProductoMasVendido();
    console.log("productoMasVendidoID",this.productoMasVendidoID);

  }

  elegirProductoMasVendido(){
    this.productoMasVendidoID = this.productosVentaTiene[0][0];
    var cantidadProductoMasVendido = this.productosVentaTiene[0][1];
    for(var i = 0; i < this.productosVentaTiene.length; i++){
      if (this.productosVentaTiene[i][1] > parseInt(cantidadProductoMasVendido))
      {
        this.productoMasVendidoID = this.productosVentaTiene[i][0];
        cantidadProductoMasVendido = this.productosVentaTiene[i][1];
      }
  }
  }

  obtenerProductoMasVendido(){
    for(var i=0;i<this.Productos.length;i++){
      if(this.Productos[i].id == this.productoMasVendidoID){
        this.productoMasVendido = this.Productos[i];
        console.log("Producto más vendido:",this.productoMasVendido); // Acomodar para mostrar en la interfaz
        break
      }
    }
  }


}
