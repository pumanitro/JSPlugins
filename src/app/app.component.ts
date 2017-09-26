import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  plugins = [];

  handleFiles(event){

   let fileURL = URL.createObjectURL(event.srcElement.files[0]);

    this.loadJS(fileURL, this.yourCodeToBeCalled, document.body);

    this.yourCodeToBeCalled();

  }

  loadJS = function(url, implementationCode, location){
    //url is URL of external file, implementationCode is the code
    //to be called from the file, location is the location to
    //insert the <script> element

    var scriptTag:any = document.createElement('script');
    scriptTag.src = url;

    scriptTag.onload = implementationCode;
    scriptTag.onreadystatechange = implementationCode;

    location.appendChild(scriptTag);
  };

  yourCodeToBeCalled = function(){
//your code goes here
  };

  getFunctionFromFIle(event){
    let func;
    let fileURL = URL.createObjectURL(event.srcElement.files[0]);
    this.loadJS(fileURL, func, document.body);
    return func;
  }

  ngOnInit(){

    // Check browser support :
    if (typeof(Storage) !== "undefined") {

      // Retrieve
      let pluginFiles = localStorage.getItem("pluginFiles");

      //Fulfill plugins array of funcions :
      for (let file of pluginFiles) {
        this.plugins.push(this.getFunctionFromFIle(file));
      }

    } else {
      console.log('NOT SUPORTED');
    }

  }
}
