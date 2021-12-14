import { Component, OnInit ,ViewChild} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  closeResult = '';

  p: number = 1;
  collection: any[] = [{Reporte1: "Reporte 1"}, {Reporte2: "Reporte 2"}]

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

}
