import {Component, OnInit} from '@angular/core';

export const Constants = {
  NAME_OF_PLUGINS_IN_STORAGE : "notConvertedPlugins"
};

export interface Plugin {
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
  notConvertedPlugins: Plugin[] = [
    {name: 'xD', func: () => {} , isEnabled: true}
  ];

  testAlert = (test) => {
    console.warn('----');
    console.warn(test);
    console.warn('----');
  };

  handleFiles(event){

    let file = event.srcElement.files[0];

    let fr = new FileReader();
    fr.onload = () => {
      // Use `fr.result` here, it's a string containing the text

      this.notConvertedPlugins.push({name: file.name, func: fr.result, isEnabled: false});
      this.loadNotConvertedPluginsToStorage();
    };
    fr.readAsText(file);

  }

  loadNotConvertedPluginsToStorage(){
    chrome.storage.local.set({"notConvertedPlugins" : JSON.stringify(this.notConvertedPlugins)});
  }

  togglePlugin(plugin){
    plugin.isEnabled = !plugin.isEnabled;

    this.loadNotConvertedPluginsToStorage();
  }

  loadNotConvertedPluginsFromStorage() {

    let self = this;

    this.testAlert(this.notConvertedPlugins);

    chrome.storage.local.get(Constants.NAME_OF_PLUGINS_IN_STORAGE, (wholeStorage) => {

      let tempFunctionFiles = wholeStorage[Constants.NAME_OF_PLUGINS_IN_STORAGE];

      /*console.warn('Not converted plugins: ');
      console.warn(self.notConvertedPlugins);

      console.warn('Temp Function Files: ');
      console.warn(tempFunctionFiles);*/

      let parsedObject = JSON.parse(tempFunctionFiles);

      if(tempFunctionFiles !== null)
      {
        for(let key in Object.keys(parsedObject)){
          self.notConvertedPlugins[key] = parsedObject[key];
        }
      }

      /*console.warn('Not converted plugins: ');
      console.warn(self.notConvertedPlugins);

      console.warn('Temp Function Files: ');
      console.warn(tempFunctionFiles);*/

    })
  }

  ngOnInit(){

    this.loadNotConvertedPluginsFromStorage();

  }
}
