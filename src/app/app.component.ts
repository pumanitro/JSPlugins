import {Component, OnInit} from '@angular/core';

interface  Plugin {
  name: string;
  func: any;
  isEnabled: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  plugins: Plugin[] = [];
  notConvertedPlugins: Plugin[] = [];

  handleFiles(event){

    let file = event.srcElement.files[0];

    let fr = new FileReader();
    fr.onload = () => {
      // Use `fr.result` here, it's a string containing the text

      this.plugins.push({name: file.name, func: fr.result, isEnabled: false});

      this.notConvertedPlugins.push({name: file.name, func: fr.result, isEnabled: false});
      localStorage.setItem("notConvertedPlugins", JSON.stringify(this.notConvertedPlugins));
    };
    fr.readAsText(file);

  }

  putPluginsTo(){
    localStorage.setItem("notConvertedPlugins", JSON.stringify(this.notConvertedPlugins));
  }

  enablePlugin(plugin){
    plugin.isEnabled = true;
    localStorage.setItem("notConvertedPlugins", JSON.stringify(this.notConvertedPlugins));
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
      tempFunctionFiles === null ? this.notConvertedPlugins = [] : this.notConvertedPlugins = JSON.parse(tempFunctionFiles);

      //Fulfill plugins array of funcions :
      for (let notConvertedPlugin of this.notConvertedPlugins) {
        this.plugins.push({name: notConvertedPlugin.name, func: () => { eval(notConvertedPlugin.func)}, isEnabled: notConvertedPlugin.isEnabled});
      }

    } else {
      console.log('NOT SUPORTED');
    }
  }

  ngOnInit(){

    this.loadPluginsFromLocalStorage();

  }
}
