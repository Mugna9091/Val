import {Component} from '@angular/core';
import {Database, onValue, ref} from "@angular/fire/database";
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-classifica',
  templateUrl: './classifica.component.html',
  styleUrls: ['./classifica.component.css'],
  providers: [DatePipe]
})
export class ClassificaComponent {
  para: any;
  data: any;
  map = new Map<string, any>();
  part = new Map<string, any>();
  vinte = new Map<string, any>();
  dict: any = []
  dict1: any = []
  map_week = new Map<string, any>();
  part_week = new Map<string, any>();
  vinte_week = new Map<string, any>();
  dict_week: any = []
  dict1_week: any = []
  date_start: any = ""
  date_start_name: any = ""
  date_finish: any = ""
  date_finish_name: any = ""

  constructor(public database: Database, private datePipe: DatePipe) {
    this.date_start = new Date();
    this.date_finish = new Date();
    this.date_start_name = this.datePipe.transform(this.date_start, 'EEEE');
    this.date_finish_name = this.datePipe.transform(this.date_start, 'EEEE');
    while (this.date_start_name != "Monday") {
      this.date_start.setDate(this.date_start.getDate() - 1);
      this.date_start_name = this.datePipe.transform(this.date_start, 'EEEE');
    }
    while (this.date_finish_name != "Sunday") {
      this.date_finish.setDate(this.date_finish.getDate() + 1);
      this.date_finish_name = this.datePipe.transform(this.date_finish, 'EEEE');
    }
    this.date_start = this.datePipe.transform(this.date_start, 'yyyy-MM-dd');
    this.date_finish = this.datePipe.transform(this.date_finish, 'yyyy-MM-dd');
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
      const starCountRef1 = ref(this.database, "valori");
      onValue(starCountRef1, (snapshot) => {
        this.data = snapshot.val();
        this.setData();
      });
    });
  }

  setData(): void {
    for (let i = 0; i < this.data.length; i++) {
      this.map.set(this.data[i]["nome"], 0);
      this.part.set(this.data[i]["nome"], 0);
      this.vinte.set(this.data[i]["nome"], 0);
    }
    for (let i = 0; i < this.para.length; i++) {
      for (let j = 0; j < this.para[i]["gol1"].length; j++) {
        this.map.set(this.para[i]["gol1"][j], this.map.get(this.para[i]["gol1"][j]) + 1)
      }
      for (let j = 0; j < this.para[i]["gol2"].length; j++) {
        this.map.set(this.para[i]["gol2"][j], this.map.get(this.para[i]["gol2"][j]) + 1)
      }
      if (this.para[i]["gol1"].length > this.para[i]["gol2"].length) {
        for (let j = 0; j < this.para[i]["player1"].length; j++) {
          this.vinte.set(this.para[i]["player1"][j], this.vinte.get(this.para[i]["player1"][j]) + 1)
        }
      } else if (this.para[i]["gol1"].length < this.para[i]["gol2"].length) {
        for (let j = 0; j < this.para[i]["player2"].length; j++) {
          this.vinte.set(this.para[i]["player2"][j], this.vinte.get(this.para[i]["player2"][j]) + 1)
        }
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
        } else if (this.dict[max][1] == this.dict[j][1] && this.part.get(this.dict[max][0]) > this.part.get(this.dict[j][0])) {
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
    for (let i = 0; i < this.dict.length; i++) {
      this.dict1.push([i + 1, this.dict[i][0], this.dict[i][1], this.part.get(this.dict[i][0]), this.vinte.get(this.dict[i][0])])
    }
    this.setDataWeek();
  }

  setDataWeek(): void {
    for (let i = 0; i < this.data.length; i++) {
      this.map_week.set(this.data[i]["nome"], 0);
      this.part_week.set(this.data[i]["nome"], 0);
      this.vinte_week.set(this.data[i]["nome"], 0);
    }
    for (let i = 0; i < this.para.length; i++) {
      if (this.para[i]["myDate"] >= this.date_start && this.para[i]["myDate"] <= this.date_finish) {
        for (let j = 0; j < this.para[i]["gol1"].length; j++) {
          this.map_week.set(this.para[i]["gol1"][j], this.map_week.get(this.para[i]["gol1"][j]) + 1)
        }
        for (let j = 0; j < this.para[i]["gol2"].length; j++) {
          this.map_week.set(this.para[i]["gol2"][j], this.map_week.get(this.para[i]["gol2"][j]) + 1)
        }
        if (this.para[i]["gol1"].length > this.para[i]["gol2"].length) {
          for (let j = 0; j < this.para[i]["player1"].length; j++) {
            this.vinte_week.set(this.para[i]["player1"][j], this.vinte_week.get(this.para[i]["player1"][j]) + 1)
          }
        } else if (this.para[i]["gol1"].length < this.para[i]["gol2"].length) {
          for (let j = 0; j < this.para[i]["player2"].length; j++) {
            this.vinte_week.set(this.para[i]["player2"][j], this.vinte_week.get(this.para[i]["player2"][j]) + 1)
          }
        }
        for (let j = 0; j < this.para[i]["player1"].length; j++) {
          this.part_week.set(this.para[i]["player1"][j], this.part_week.get(this.para[i]["player1"][j]) + 1)
        }
        for (let j = 0; j < this.para[i]["player2"].length; j++) {
          this.part_week.set(this.para[i]["player2"][j], this.part_week.get(this.para[i]["player2"][j]) + 1)
        }
      }
    }
    this.map_week.forEach((value: boolean, key: string) => {
      this.dict_week.push([key, value])
    });
    for (let i = 0; i < this.dict_week.length - 1; i++) {
      let max = i
      for (let j = i + 1; j < this.dict_week.length; j++) {
        if (this.dict_week[max][1] < this.dict_week[j][1]) {
          max = j;
        } else if (this.dict_week[max][1] == this.dict_week[j][1] && this.part_week.get(this.dict_week[max][0]) > this.part_week.get(this.dict_week[j][0])) {
          max = j
        }
      }
      if (max != i) {
        let k = this.dict_week[max];
        this.dict_week[max] = this.dict_week[i];
        this.dict_week[i] = k;
      }
    }
    for (let i = 0; i < this.dict_week.length; i++) {
      if (this.dict_week[i][0] == "Sconosciuto") {
        this.dict_week.splice(i, 1)
      }
    }
    for (let i = 0; i < this.dict_week.length; i++) {
      this.dict1_week.push([i + 1, this.dict_week[i][0], this.dict_week[i][1], this.part_week.get(this.dict_week[i][0]), this.vinte_week.get(this.dict[i][0])])
    }
  }
}
