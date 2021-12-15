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

}
