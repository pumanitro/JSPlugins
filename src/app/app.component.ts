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
    chrome.storage.sync.set("notConvertedPlugins", JSON.stringify(this.notConvertedPlugins));
  }

  togglePlugin(plugin){
    plugin.isEnabled = !plugin.isEnabled;

    this.loadNotConvertedPluginsToStorage();
  }

  loadNotConvertedPluginsFromStorage() {

    chrome.storage.sync.get(Constants.NAME_OF_PLUGINS_IN_STORAGE, (tempFunctionFiles) => {
      let notConvertedPlugins;

      // Retrieve
      tempFunctionFiles === null ? notConvertedPlugins = [] : notConvertedPlugins = JSON.parse(tempFunctionFiles);

    })
  }

  ngOnInit(){

    this.loadNotConvertedPluginsFromStorage();

  }
}
