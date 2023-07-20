import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Database, set, ref, update, onValue} from "@angular/fire/database";

@Component({
  selector: 'app-statistiche',
  templateUrl: './statistiche.component.html',
  styleUrls: ['./statistiche.component.css']
})
export class StatisticheComponent implements OnInit {
  data: any;
  name: string | null = ""
  foto = ""
  valutazione = ""
  velocita = ""
  dribbling = ""
  tiro = ""
  difesa = ""
  passaggio=""
  fisico=""

  constructor(private route: ActivatedRoute, public database: Database) {
    const starCountRef = ref(this.database, "valori");
    onValue(starCountRef, (snapshot) => {
      this.data = snapshot.val();
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.name = params.get('name');
      for (let i = 0; i < this.data.length; i++) {
        if (this.name == this.data[i].nome) {
          console.log(this.data[i]);
          this.foto = this.data[i].foto;
          this.valutazione = this.data[i].valutazione;
          this.velocita = this.data[i].velocita;
          this.dribbling = this.data[i].dribbling;
          this.tiro = this.data[i].tiro;
          this.difesa = this.data[i].difesa;
          this.passaggio = this.data[i].passaggio;
          this.fisico = this.data[i].fisico;
        }
      }
    });
  }
}
