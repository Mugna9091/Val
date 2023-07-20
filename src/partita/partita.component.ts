import { Component } from '@angular/core';
import valData from "../assets/json/val.json";
import {FormBuilder} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {Database, set, ref, update, onValue} from "@angular/fire/database";

@Component({
  selector: 'app-partita',
  templateUrl: './partita.component.html',
  styleUrls: ['./partita.component.css']
})
export class PartitaComponent {
  para: any;
  constructor(public database: Database) {
    // for (let i=0; i<this.para.length; i++){
    //   console.log(this.para[i]['player1'])
    // }
    // console.log(this.para)
    const starCountRef = ref(this.database, "partite");
    onValue(starCountRef, (snapshot) => {
      this.para = snapshot.val();
      for(let i=0; i<this.para.length; i++){
        if(this.para[i]["gol1"]==undefined){
          this.para[i]["gol1"] = []
        }
        if(this.para[i]["gol2"]==undefined){
          this.para[i]["gol2"] = []
        }
      }
    });
  }


  protected readonly valData = valData;
}
