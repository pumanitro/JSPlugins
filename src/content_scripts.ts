/// <reference path="./../node_modules/@types/chrome/chrome-app.d.ts"/>

export const Constants = {
  NAME_OF_PLUGINS_IN_STORAGE : "notConvertedPlugins"
};

interface Plugin {
  name: string;
  func: any;
  isEnabled: boolean;
}

let plugins: Plugin[] = [];

let runAllEnabledPlugins = () => {
  for (let plugin of plugins) {
    if(plugin.isEnabled)
      plugin.func();
  }
};

let loadPluginsFromStorage = () => {

  chrome.storage.sync.get(Constants.NAME_OF_PLUGINS_IN_STORAGE, (tempFunctionFiles) => {
    let notConvertedPlugins;

    // Retrieve
    tempFunctionFiles === null ? notConvertedPlugins = [] : notConvertedPlugins = JSON.parse(tempFunctionFiles.toString());

    //Fulfill plugins array of funcions :
    for (let notConvertedPlugin of notConvertedPlugins) {
      plugins.push({name: notConvertedPlugin.name, func: () => { eval(notConvertedPlugin.func)}, isEnabled: notConvertedPlugin.isEnabled});
    }

    runAllEnabledPlugins();
  });
};

document.onload = () => {

  loadPluginsFromStorage();

  chrome.storage.onChanged.addListener(function(changes, namespace) {
    //Goes through all chagnes :
    for (let key in changes) {
      // let storageChange = changes[key];
      // console.log('Storage key "%s" in namespace "%s" changed. ' +
      //   'Old value was "%s", new value is "%s".',
      //   key,
      //   namespace,
      //   storageChange.oldValue,
      //   storageChange.newValue);
      //
      // let oldNotConvertedPlugins = JSON.parse(storageChange.oldValue);

      loadPluginsFromStorage();

    }
  })

};

