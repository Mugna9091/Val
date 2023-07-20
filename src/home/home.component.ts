import {Component} from '@angular/core';
import {Database, onValue, ref} from "@angular/fire/database";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  data: any;

  constructor(public database: Database) {
    const starCountRef = ref(this.database, "valori");
    onValue(starCountRef, (snapshot) => {
      this.data = snapshot.val();
    });
  }
}
