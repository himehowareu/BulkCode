// ==UserScript==
// @id             Bulkcodes
// @name           IITC plugin: Bulk Codes
// @category       Info
// @version        1.0.4
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @description    [iitc-2020-05-04-021732] Allow users to enter multiple codes
// @include        https://*.ingress.com/*
// @include        http://*.ingress.com/*
// @match          https://*.ingress.com/*
// @match          http://*.ingress.com/*
// @include        https://*.ingress.com/mission/*
// @include        http://*.ingress.com/mission/*
// @match          https://*.ingress.com/mission/*
// @match          http://*.ingress.com/mission/*
// @grant          none
// @updateURL    https://github.com/himehowareu/BulkCode/raw/master/bulkCodes.user.js
// @downloadURL  https://github.com/himehowareu/BulkCode/raw/master/bulkCodes.user.js
// ==/UserScript==


function wrapper(plugin_info) {
    // ensure plugin framework is there, even if iitc is not yet loaded
    if (typeof window.plugin !== 'function') window.plugin = function () { };

    // PLUGIN START ////////////////////////////////////////////////////////

    // use own namespace for plugin
    plugin.himehowareu = {};
    plugin.himehowareu.items = 0;
    plugin.himehowareu.enterKey = { type: "keypress", keyCode: 13, which: 13, charCode: 13 };

    plugin.himehowareu.FUpdateSetting = function (setting, value) {
        plugin.himehowareu.settings = JSON.parse(localStorage.getItem("plugin-himehowareu-settings"));plugin.himehowareu.settings[setting] = value;jsonSettings = JSON.stringify(plugin.himehowareu.settings);localStorage.setItem("plugin-himehowareu-settings", jsonSettings);
    };

    //setting up the needed storge for settings 
    jsonSettings = JSON.stringify({ format: "long",logging: true,log: ""});if (localStorage.getItem("plugin-himehowareu-settings") == null) {localStorage.setItem("plugin-himehowareu-settings", jsonSettings);}plugin.himehowareu.settings = JSON.parse(localStorage.getItem("plugin-himehowareu-settings"));if (plugin.himehowareu.settings.logging){plugin.himehowareu.FUpdateSetting("logging",true);}

    //help msg for the color codes
    plugin.himehowareu.DHelp = function () {
        dialog({
            html: '<div><div style="color:white">White: Checking </div><div style="color:orange">Orange: Inventory Full</div><div style="color:red">Red :Code Error</div><div style="color:yellow">yellow: Reward Error</div><div style="color:green">Green :Good Code</div></div>',
            title: 'Color Codes',
        });
    };

    //main windows popup
    plugin.himehowareu.DClick = function (ev) {
        dialog({
            html: '<div style="text-align: center" id="himeCodePopUp1" >Please enter your codes<br /><textarea id="himeCode" placeholder="Codes here.."></textarea><br /><div><button onclick="plugin.himehowareu.FCodes();">Enter</button></div></div style="text-align: center"><div style="text-align:left" id="himeCodePopUp2" hidden><div><a onclick="plugin.himehowareu.DHelp();">What do the colors mean?</a></div><fieldset id="himeRedeemed" ><legend>Redeemed</legend></fieldset><div>Total:<span id="himeTotal"></span></div><div style="text-align: center"><spam id="himeitems"></spam></div></div>',
            title: 'Bulk Codes',
            buttons: {
                'Settings': plugin.himehowareu.DSettings,
                'log': plugin.himehowareu.DLog
            }
        });
    };

    // settings popup
    plugin.himehowareu.DSettings = function () {
        dialog({
            html: '<style>.s1 {position: relative; width: 90px;-webkit-user-select:none; -moz-user-select:none; -ms-user-select: none;}.s1-checkbox {display: none;}.s1-label {display: block; overflow: hidden; cursor: pointer;border: 2px solid #999999; border-radius: 20px;}.s1-inner {display: block; width: 200%; margin-left: -100%;transition: margin 0.3s ease-in 0s;}.s1-inner:before, .s1-inner:after {display: block; float: left; width: 50%; height: 30px; padding: 0; line-height: 30px;font-size: 14px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;box-sizing: border-box;}.s1-inner:before {content: "Short";padding-left: 10px;background-color: #34A7C1; color: #FFFFFF;}.s1-inner:after {content: "Long";padding-right: 10px;background-color: #EEEEEE; color: #999999;text-align: right;}.s1-switch {display: block; width: 18px; margin: 6px;background: #FFFFFF;position: absolute; top: 0; bottom: 0;right: 56px;border: 2px solid #999999; border-radius: 20px;transition: all 0.3s ease-in 0s; }.s1-checkbox:checked + .s1-label .s1-inner {margin-left: 0;}.s1-checkbox:checked + .s1-label .s1-switch {right: 0px; }.s2 {position: relative; width: 90px;-webkit-user-select:none; -moz-user-select:none; -ms-user-select: none;}.s2-checkbox {display: none;}.s2-label {display: block; overflow: hidden; cursor: pointer;border: 2px solid #999999; border-radius: 20px;}.s2-inner {display: block; width: 200%; margin-left: -100%;transition: margin 0.3s ease-in 0s;}.s2-inner:before, .s2-inner:after {display: block; float: left; width: 50%; height: 30px; padding: 0; line-height: 30px;font-size: 14px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;box-sizing: border-box;}.s2-inner:before {content: "ON";padding-left: 10px;background-color: #34A7C1; color: #FFFFFF;}.s2-inner:after {content: "OFF";padding-right: 10px;background-color: #EEEEEE; color: #999999;text-align: right;}.s2-switch {display: block; width: 18px; margin: 6px;background: #FFFFFF;position: absolute; top: 0; bottom: 0;right: 56px;border: 2px solid #999999; border-radius: 20px;transition: all 0.3s ease-in 0s; }.s2-checkbox:checked + .s2-label .s2-inner {margin-left: 0;}.s2-checkbox:checked + .s2-label .s2-switch {right: 0px; }</style><div><fieldset><legend>Display Format</legend><div class="s1"><input type="checkbox" onclick="plugin.himehowareu.FToggleFormat()" name="s1" class="s1-checkbox" id="HimeFormat" checked><label class="s1-label" for="HimeFormat"><span class="s1-inner"></span><span class="s1-switch"></span></label></div></fieldset><fieldset><legend>Logging</legend><div class="s2"><input type="checkbox" onclick="plugin.himehowareu.FToggleLogging()" name="s2" class="s2-checkbox" id="HimeLogging" checked><label class="s2-label" for="HimeLogging"><span class="s2-inner"></span><span class="s2-switch"></span></label></div><button id="HimeClearLog" onclick="plugin.himehowareu.FClearLog();">Clear Logs</button></fieldset><script type="text/javascript">plugin.himehowareu.FShowSettings();</script></div>',
            title: 'Settings',
        });
    };

    //log popup
    plugin.himehowareu.DLog = function () {
        dialog({
            html: '<div style="text-align: center" id="himeCodePopUp1" ><label>Log</label><br /><textarea id="himeLog"></textarea><button id="HimeClearLog" onclick="plugin.himehowareu.FCopyLog();">Copy Logs</button><button id="HimeClearLog" onclick="plugin.himehowareu.FClearLog();">Clear Logs</button><script type="text/javascript">plugin.himehowareu.FShowLog();</script></div>',
            title: 'Settings',
        });
    };

    // function for parsing the codes 
    plugin.himehowareu.FCodes = function () {
        plugin.himehowareu.items = 0;plugin.himehowareu.totalItems = {"ap": "0","other": [],"inventory": [],"xm": "0"};document.getElementById("himeCodePopUp1").hidden = true;lines = document.getElementById("himeCode").value.split("\n");document.getElementById("himeCodePopUp2").hidden = false;for (var i = 0; i < lines.length; i++) {if (lines[i]==""){continue;}pass = lines[i].replace(/[^\x20-\x7E]+/g, "");pass = pass.replace(" ","");ul = document.getElementById("himeRedeemed");li = document.createElement("fieldset");li.id = pass+"fs";l = document.createElement("legend");l.id = pass;l.innerText = pass;li.appendChild(l);ul.appendChild(li);plugin.himehowareu.SendRedeem(pass);}
    };

    //function to update the redeem funciton built into IITC
    plugin.himehowareu.FRedeem = function (data, textStatus, jqXHR) {
        var passcode = jqXHR.passcode;if (data.error) {if (data.error === "XM object capacity reached.") {document.getElementById(passcode).style.color = "orange";} else {document.getElementById(passcode).style.color = "red";}l = document.createElement("div");l.innerText = data.error;plugin.himehowareu.FLog(passcode);plugin.himehowareu.FLog(l.innerText);document.getElementById(passcode+"fs").appendChild(l);return;}if (!data.rewards) {document.getElementById(passcode).style.color = "yellow";l = document.createElement("div");l.innerText = data.error;plugin.himehowareu.FLog(passcode);plugin.himehowareu.FLog(l.innerText);document.getElementById(passcode+"fs").appendChild(l);return;}if (data.playerData) {window.PLAYER = data.playerData;window.setupPlayerStat();}temp = 0;if (data.rewards.other) {data.rewards.other.forEach(function (item) {temp += 1;});}if (data.rewards.inventory) {data.rewards.inventory.forEach(function (type) {type.awards.forEach(function (item) {temp += item.count;});});}plugin.himehowareu.items += temp;plugin.himehowareu.FCount(data.rewards);document.getElementById("himeTotal").innerText = plugin.himehowareu.items;document.getElementById(passcode).style.color = "green";if (plugin.himehowareu.settings.format == "short") {l = document.createElement("div");l.innerHTML = window.formatPasscodeShort(data.rewards);plugin.himehowareu.FLog(passcode);plugin.himehowareu.FLog(l.innerText);document.getElementById(passcode + "fs").appendChild(l);} else {l = document.createElement("div");l.innerHTML = window.formatPasscodeLong(data.rewards);plugin.himehowareu.FLog(passcode);plugin.himehowareu.FLog(l.innerText);document.getElementById(passcode + "fs").appendChild(l);}t = document.createElement("div");t.innerText = "Recived: " + temp + " Items";plugin.himehowareu.FLog("Recived: " + temp + " Items");document.getElementById(passcode + "fs").appendChild(t);himeItem = document.getElementById("himeitems");if (plugin.himehowareu.settings.format == "short") {himeItem.innerHTML = window.formatPasscodeShort(plugin.himehowareu.totalItems);} else {himeItem.innerHTML = window.formatPasscodeLong(plugin.himehowareu.totalItems);}
    };

    plugin.himehowareu.SendRedeem = function (passcode) {
        if (!passcode) return;var jqXHR = window.postAjax("redeemReward", { passcode: passcode }, plugin.himehowareu.FRedeem, function (response) {var extra = "";if (response.status) {extra = (window.REDEEM_STATUSES[response.status] || "The server indicated an error.") + " (HTTP " + response.status + ")";} else {extra = "No status code was returned.";}dialog({title: "Request failed: " + data.passcode,html: "<strong>The HTTP request failed.</strong> " + extra});});jqXHR.passcode = passcode;
    };

    plugin.himehowareu.FShowSettings = function () {
        document.getElementById("HimeFormat").checked = (plugin.himehowareu.settings.format == "short");
    };

    plugin.himehowareu.FToggleFormat = function () {
        if (plugin.himehowareu.settings.format == "short"){plugin.himehowareu.FUpdateSetting("format","long");}else{plugin.himehowareu.FUpdateSetting("format","short");}
    };

    plugin.himehowareu.FToggleLogging = function () {
        if (plugin.himehowareu.settings.logging){plugin.himehowareu.FUpdateSetting("logging",false);}else{plugin.himehowareu.FUpdateSetting("logging",true);}
    };

    plugin.himehowareu.FClearLog = function () {
        document.getElementById("HimeClearLog").style.background = "blue";plugin.himehowareu.FUpdateSetting("log","");setTimeout(function() {document.getElementById("HimeClearLog").style.background = "";}, 100);
    };

    plugin.himehowareu.FLog = function (text) {
        if (plugin.himehowareu.settings.logging) {tempLog = plugin.himehowareu.settings.log;if (plugin.himehowareu.settings.log == "") {plugin.himehowareu.FUpdateSetting("log", text);} else {plugin.himehowareu.FUpdateSetting("log", tempLog + "\n" + text);}}
    };

    plugin.himehowareu.FShowLog = function () {
        document.getElementById("himeLog").value=plugin.himehowareu.settings.log;
    };

    plugin.himehowareu.FCount = function (data) {
        if (data.other) {data.other.forEach(function (item) {plugin.himehowareu.totalItems.other.push(item);});}if (0 < data.xm) {plugin.himehowareu.totalItems.xm = (parseInt(plugin.himehowareu.totalItems.xm) + parseInt(data.xm)).toString();}if (0 < data.ap) {plugin.himehowareu.totalItems.ap = (parseInt(plugin.himehowareu.totalItems.ap) + parseInt(data.ap)).toString();}if (data.inventory) {data.inventory.forEach(function (type) {found = false;type.awards.forEach(function (item) {plugin.himehowareu.totalItems.inventory.forEach(function (thing) {if (thing.name == type.name && found != true) {found = true;afound = false;thing.awards.forEach(function (award) {if (afound != true && award.level == item.level) {afound = true;award.count += item.count;}});if (afound == false) {thing.awards.push({ "count": item.count, "level": item.level });}}});});if (found == false) {plugin.himehowareu.totalItems.inventory.push(type);}});}
    };

    plugin.himehowareu.FCopyLog = function () {
        document.getElementById("himeLog").select();document.execCommand("copy");
    };


    plugin.himehowareu.onPaneChanged = function (pane) {
        if (pane == "plugin-himehowareu")
            plugin.himehowareu.DClick();
    };

    //adding the link to the toolbox
    var setup = function () {

        if (window.useAndroidPanes()) {
            android.addPane("plugin-himehowareu", "Bulk Codes", "ic_action_paste");
            addHook("paneChanged", window.plugin.himehowareu.onPaneChanged);
        } else {
            $('#toolbox').append('<a onclick="plugin.himehowareu.DClick();" title="Bulk Code">Bulk Codes</a>');
        }
    };

    // PLUGIN END //////////////////////////////////////////////////////////

    setup.info = plugin_info; //add the script info data to the function as a property
    if (!window.bootPlugins) window.bootPlugins = [];
    window.bootPlugins.push(setup);
    // if IITC has already booted, immediately run the 'setup' function
    if (window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end

// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('(' + wrapper + ')(' + JSON.stringify(info) + ');'));
(document.body || document.head || document.documentElement).appendChild(script);