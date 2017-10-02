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
  notConvertedPlugins: Plugin[] = [];

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

    chrome.storage.local.get(Constants.NAME_OF_PLUGINS_IN_STORAGE, (wholeStorage) => {

      let tempFunctionFiles = wholeStorage[Constants.NAME_OF_PLUGINS_IN_STORAGE];

      console.warn(tempFunctionFiles);

      // Retrieve
      tempFunctionFiles === null ? this.notConvertedPlugins = [] : this.notConvertedPlugins = JSON.parse(tempFunctionFiles);

    })
  }

  ngOnInit(){

    this.loadNotConvertedPluginsFromStorage();

  }
}
