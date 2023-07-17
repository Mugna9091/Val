import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import valData from './../assets/json/val.json'
import {DatePipe} from '@angular/common';
import par from "../assets/json/partita.json";
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-partite',
  templateUrl: './partite.component.html',
  styleUrls: ['./partite.component.css'],
  providers: [DatePipe]
})
export class PartiteComponent {
  log = false;
  para: any = par;
  pswForm = this.formBuilder.group({
    psw: ''
  });
  team1 = this.formBuilder.group({
    player: ''
  });
  gol1f = this.formBuilder.group({
    player: ''
  });
  team2 = this.formBuilder.group({
    player: ''
  });
  gol2f = this.formBuilder.group({
    player: ''
  });
  data: any = valData;
  myDate: any = ""

  player1: Array<any> = []
  gol1: Array<any> = []
  player2: Array<any> = []
  gol2: Array<any> = []

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe) {
  }

  onSubmit(): void {
    if (this.pswForm.value.psw == "9091") {
      this.log = true;
    }
  }

  add_1(): void {
    this.player1.push(this.team1.value.player)
  }

  add_g1(): void {
    this.gol1.push(this.gol1f.value.player)
  }

  add_2(): void {
    this.player2.push(this.team2.value.player)
  }

  add_g2(): void {
    this.gol2.push(this.gol2f.value.player)
  }

  add(): void {
    const filePath = './assets/json/partite.csv';
    this.myDate = new Date();
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    var data = {
      "player1": this.player1,
      "player2": this.player2,
      "gol1": this.gol1,
      "gol2": this.gol2,
      "myDate": this.myDate
    }
    // par = data;
    this.para.push(data)
    const jsonData = JSON.stringify(this.para);
    const blob = new Blob([jsonData], {type: 'application/json'});
    saveAs(blob, "partita.json");
  }
}
