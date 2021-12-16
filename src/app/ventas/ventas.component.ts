import { Component, OnInit } from '@angular/core';
import { VentaServiceService } from '../Services/venta-service.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  constructor(private ventasService:  VentaServiceService) { }
  Productos: any[] = []
  carrito: any[] = []
  searchText: any;

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(){
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

  


  agregarCarrito(item: any){
   /*  console.log(Object.values()); */
   /* console.log(this.carrito.indexOf(item)) */ 
    var itemAux = Object.assign({},item)
    
    console.log("hola", itemAux)
    console.log("itemAux indexOf:",this.carrito.indexOf(itemAux))
    const resultado = this.carrito.find(elemento => elemento.id === item.id);
    console.log("resultado", resultado)

    if (resultado !== undefined){
      console.log("holaNull")
      var index = this.carrito.indexOf(resultado);
      this.carrito[index].Cantidad = 1 + parseInt(this.carrito[index].Cantidad);
      this.carrito[index].Valor = parseInt(this.carrito[index].Cantidad)* parseInt(item.Valor);  
    }
    else{
      this.carrito.push(itemAux)
      this.carrito[this.carrito.length -1].Cantidad = 1
    } 
    
  }

  eliminar(item: any){
    var index = this.carrito.indexOf(item)

    if (index !== -1) {
      this.carrito.splice(index, 1);
    }

  }

}
