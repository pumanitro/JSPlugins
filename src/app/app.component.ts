import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  plugins = [];
  pluginInputFileEvents = [];

  handleFiles(event){

    this.plugins.push(this.getFunctionFromInputFileEvent(event));

    this.pluginInputFileEvents.push(event);
    localStorage.setItem("pluginInputFileEvents", this.pluginInputFileEvents.toString());

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

  getFunctionFromInputFileEvent(event){
    let func;
    let fileURL = URL.createObjectURL(event.srcElement.files[0]);
    this.loadJS(fileURL, func, document.body);
    return func;
  }

  ngOnInit(){

    // Check browser support :
    if (typeof(Storage) !== "undefined") {

      // Retrieve
      this.pluginInputFileEvents = localStorage.getItem("pluginInputFileEvents").split(",");

      //Fulfill plugins array of funcions :
      for (let inputFileEvent of this.pluginInputFileEvents) {
        this.plugins.push(this.getFunctionFromInputFileEvent(inputFileEvent));
      }

    } else {
      console.log('NOT SUPORTED');
    }

  }
}
