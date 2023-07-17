import { Component } from '@angular/core';
import valData from './../assets/json/val.json'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  data: any = valData;
  ngOnInit() {
  }
}
