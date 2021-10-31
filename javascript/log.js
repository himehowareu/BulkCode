if (plugin.himehowareu.settings.logging) {
    tempLog = plugin.himehowareu.settings.log;
    if (plugin.himehowareu.settings.log == "") {
        plugin.himehowareu.FUpdateSetting("log", text);
    } else {
        plugin.himehowareu.FUpdateSetting("log", tempLog + "\n" + text);
    }
}