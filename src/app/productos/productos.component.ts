import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
import {NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  closeResult = '';

  p: number = 1;
  collection: any[] = [{Nombre: "Wenas0",Descripcion:"Tardes",Cantidad:"2",Valor: "2000"},
                      {Nombre: "Wenas1",Descripcion:"Tardes",Cantidad:"2",Valor: "2000"},
                      {Nombre: "Wenas2",Descripcion:"Tardes",Cantidad:"2",Valor: "2000"},
                      {Nombre: "Wenas3",Descripcion:"Tardes",Cantidad:"2",Valor: "2000"},
                      {Nombre: "Wenas4",Descripcion:"Tardes",Cantidad:"2",Valor: "2000"},
                      {Nombre: "Wenas5",Descripcion:"Tardes",Cantidad:"2",Valor: "2000"},
                      {Nombre: "Wenas6",Descripcion:"Tardes",Cantidad:"2",Valor: "2000"},
                      {Nombre: "Wenas7",Descripcion:"Tardes",Cantidad:"2",Valor: "2000"}];
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    
  }
 
  public onSave() {
    console.log("hola")
  }


  eliminar(indice:number,pagina:number){
    console.log(indice)
    let p=indice+((pagina-1)*5)
    console.log(p)
    this.collection.splice(p,1)
  }

  editar(indice:number){
    console.log(indice)
  }

  crear(){
    console.log("crear")
  }

  open(content:any,indice:number) {
    this.modalService.open(content, 
      {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log("Hola")
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  

  }
  unirbased(){
    
  }

}