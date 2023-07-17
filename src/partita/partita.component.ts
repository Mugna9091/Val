import { Component } from '@angular/core';
import par from "../assets/json/partita.json";
import valData from "../assets/json/val.json";
import {FormBuilder} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-partita',
  templateUrl: './partita.component.html',
  styleUrls: ['./partita.component.css']
})
export class PartitaComponent {
  para: any = par;
  constructor() {
    for (let i=0; i<this.para.length; i++){
      console.log(this.para[i]['player1'])
    }
    console.log(this.para)
  }


  protected readonly valData = valData;
}
