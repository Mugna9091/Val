import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {Database, set, ref, update, onValue} from "@angular/fire/database";

@Component({
  selector: 'app-partite',
  templateUrl: './partite.component.html',
  styleUrls: ['./partite.component.css'],
  providers: [DatePipe]
})
export class PartiteComponent {
  log = true;
  para: any;
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
  data: any;
  myDate: any = ""

  player1: Array<any> = []
  gol1: Array<any> = []
  player2: Array<any> = []
  gol2: Array<any> = []

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe, public database: Database) {
    const starCountRef = ref(this.database, "partite");
    onValue(starCountRef, (snapshot) => {
      this.para = snapshot.val();
    });
    const starCountRef1 = ref(this.database, "valori");
    onValue(starCountRef1, (snapshot) => {
      this.data = snapshot.val();
    });
    this.myDate = new Date();
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
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
    const id = this.para.length;
    set(ref(this.database, "partite/" + id.toString()), {
      player1: this.player1,
      player2: this.player2,
      gol1: this.gol1,
      gol2: this.gol2,
      myDate: this.myDate
    });
    alert("partita aggiunta")
  }
  elimina(){
    console.log("ELimina")
  }
}
