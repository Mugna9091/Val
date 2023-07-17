import {Component} from '@angular/core';
import par from "../assets/json/partita.json";
import valData from './../assets/json/val.json'

@Component({
  selector: 'app-classifica',
  templateUrl: './classifica.component.html',
  styleUrls: ['./classifica.component.css']
})
export class ClassificaComponent {
  para: any = par;
  data: any = valData;
  map = new Map<string, any>();
  part = new Map<string, any>();
  dict: any = []
  dict1: any = []

  constructor() {
    for (let i = 0; i < this.data.length; i++) {
      this.map.set(this.data[i]["nome"], 0);
      this.part.set(this.data[i]["nome"], 0);
    }
    for (let i = 0; i < this.para.length; i++) {
      for (let j = 0; j < this.para[i]["gol1"].length; j++) {
        this.map.set(this.para[i]["gol1"][j], this.map.get(this.para[i]["gol1"][j]) + 1)
      }
      for (let j = 0; j < this.para[i]["gol2"].length; j++) {
        this.map.set(this.para[i]["gol2"][j], this.map.get(this.para[i]["gol2"][j]) + 1)
      }
      for (let j = 0; j < this.para[i]["player1"].length; j++) {
        this.part.set(this.para[i]["player1"][j], this.part.get(this.para[i]["player1"][j]) + 1)
      }
      for (let j = 0; j < this.para[i]["player2"].length; j++) {
        this.part.set(this.para[i]["player2"][j], this.part.get(this.para[i]["player2"][j]) + 1)
      }
    }
    this.map.forEach((value: boolean, key: string) => {
      this.dict.push([key, value])
    });
    for (let i = 0; i < this.dict.length - 1; i++) {
      let max = i
      for (let j = i + 1; j < this.dict.length; j++) {
        if (this.dict[max][1] < this.dict[j][1]) {
          max = j;
        } else if (this.dict[max][1] == this.dict[j][1] && this.part.get(this.dict[max][0]) < this.part.get(this.dict[j][0])) {
          max = j
        }
      }
      if (max != i) {
        let k = this.dict[max];
        this.dict[max] = this.dict[i];
        this.dict[i] = k;
      }
    }
    for (let i = 0; i < this.dict.length; i++) {
      if (this.dict[i][0] == "Sconosciuto") {
        this.dict.splice(i, 1)
      }
    }
    console.log(this.part)
    for (let i = 0; i < this.dict.length; i++) {
      this.dict1.push([i + 1, this.dict[i][0], this.dict[i][1], this.part.get(this.dict[i][0])])
    }
  }

}
