import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  plugins: {name: string, func: any}[] = [];
  functionFiles: {name: string, func: any}[] = [];

  handleFiles(event){

    let file = event.srcElement.files[0];

    let fr = new FileReader();
    fr.onload = () => {
      // Use `fr.result` here, it's a string containing the text

      this.plugins.push({name: file.name, func: () => { eval(fr.result) }});

      this.functionFiles.push({name: file.name, func: fr.result});
      localStorage.setItem("functionFiles", JSON.stringify(this.functionFiles));
    };
    fr.readAsText(file);

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

  loadPluginsFromLocalStorage() {
    // Check browser support :
    if (typeof(Storage) !== "undefined") {

      let tempFunctionFiles = localStorage.getItem("functionFiles");

      // Retrieve
      tempFunctionFiles === null ? this.functionFiles = [] : this.functionFiles = JSON.parse(tempFunctionFiles);

      //Fulfill plugins array of funcions :
      for (let functionFile of this.functionFiles) {
        this.plugins.push({name: functionFile.name, func: () => { eval(functionFile.func) }});
      }

    } else {
      console.log('NOT SUPORTED');
    }
  }

  ngOnInit(){

    this.loadPluginsFromLocalStorage();

  }
}
