plugin.himehowareu.settings = JSON.parse(localStorage.getItem("plugin-himehowareu-settings"));
plugin.himehowareu.settings[setting] = value;
jsonSettings = JSON.stringify(plugin.himehowareu.settings);
localStorage.setItem("plugin-himehowareu-settings", jsonSettings);