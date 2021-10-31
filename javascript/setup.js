jsonSettings = JSON.stringify({ format: "long",logging: true,log: ""});
if (localStorage.getItem("plugin-himehowareu-settings") == null) {
    localStorage.setItem("plugin-himehowareu-settings", jsonSettings);
}
plugin.himehowareu.settings = JSON.parse(localStorage.getItem("plugin-himehowareu-settings"));
if (plugin.himehowareu.settings.logging){
    plugin.himehowareu.FUpdateSetting("logging",true);
}