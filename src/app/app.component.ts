import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app works!';

  ngOnInit(){

    // Check browser support
    if (typeof(Storage) !== "undefined") {
      // Store
      localStorage.setItem("lastname", "Smith");
      // Retrieve
      console.log(localStorage.getItem("lastname"));
    } else {
      console.log('NOT SUPORTED');
    }

  }
}
