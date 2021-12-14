import { Component, OnInit ,ViewChild} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  
  closeResult = '';

  p: number = 1;
  collection: any[] = [{Nombre: "Esteban Quito",Cedula:"43.536.415",Email:"thomashardy@mail.com",Direccion: "89 Chiaroscuro Rd, Portland, USA",Telefono:"(171) 555-2222",Compras:"20.000 COP"},{Nombre: "Esteban Quito",Cedula:"43.536.415",Email:"thomashardy@mail.com",Direccion: "89 Chiaroscuro Rd, Portland, USA",Telefono:"(171) 555-2222",Compras:"20.000 COP"},{Nombre: "Esteban Quito",Cedula:"43.536.415",Email:"thomashardy@mail.com",Direccion: "89 Chiaroscuro Rd, Portland, USA",Telefono:"(171) 555-2222",Compras:"20.000 COP"},{Nombre: "Esteban Quito",Cedula:"43.536.415",Email:"thomashardy@mail.com",Direccion: "89 Chiaroscuro Rd, Portland, USA",Telefono:"(171) 555-2222",Compras:"20.000 COP"},{Nombre: "Esteban Quito",Cedula:"43.536.415",Email:"thomashardy@mail.com",Direccion: "89 Chiaroscuro Rd, Portland, USA",Telefono:"(171) 555-2222",Compras:"20.000 COP"},{Nombre: "Esteban Quito",Cedula:"43.536.415",Email:"thomashardy@mail.com",Direccion: "89 Chiaroscuro Rd, Portland, USA",Telefono:"(171) 555-2222",Compras:"20.000 COP"},{Nombre: "Esteban Quito",Cedula:"43.536.415",Email:"thomashardy@mail.com",Direccion: "89 Chiaroscuro Rd, Portland, USA",Telefono:"(171) 555-2222",Compras:"20.000 COP"},{Nombre: "Esteban Quito",Cedula:"43.536.415",Email:"thomashardy@mail.com",Direccion: "89 Chiaroscuro Rd, Portland, USA",Telefono:"(171) 555-2222",Compras:"20.000 COP"},{Nombre: "Esteban Quito",Cedula:"43.536.415",Email:"thomashardy@mail.com",Direccion: "89 Chiaroscuro Rd, Portland, USA",Telefono:"(171) 555-2222",Compras:"20.000 COP"},{Nombre: "Esteban Quito",Cedula:"43.536.415",Email:"thomashardy@mail.com",Direccion: "89 Chiaroscuro Rd, Portland, USA",Telefono:"(171) 555-2222",Compras:"20.000 COP"},{Nombre: "Esteban Quito",Cedula:"43.536.415",Email:"thomashardy@mail.com",Direccion: "89 Chiaroscuro Rd, Portland, USA",Telefono:"(171) 555-2222",Compras:"20.000 COP"},{Nombre: "Esteban Quito",Cedula:"43.536.415",Email:"thomashardy@mail.com",Direccion: "89 Chiaroscuro Rd, Portland, USA",Telefono:"(171) 555-2222",Compras:"20.000 COP"},{Nombre: "Esteban Quito",Cedula:"43.536.415",Email:"thomashardy@mail.com",Direccion: "89 Chiaroscuro Rd, Portland, USA",Telefono:"(171) 555-2222",Compras:"20.000 COP"}];
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    
  }
 
  public onSave() {
    console.log("hola")
  }

  eliminar(indice:number){
    console.log(indice)
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
