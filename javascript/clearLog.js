document.getElementById("HimeClearLog").style.background = "blue";
plugin.himehowareu.FUpdateSetting("log","");
setTimeout(function() {
    document.getElementById("HimeClearLog").style.background = "";
}, 100);
