import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VarService {
  Prueba: string = "";
  constructor() { }

  Modificar(admin:string){
    this.Prueba = admin
  }





}
