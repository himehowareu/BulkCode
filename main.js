// ==UserScript==
// @id             Bulkcodes
// @name           IITC plugin: Bulk Codes
// @category       Info
// @version        <himehowareu>version.txt</himehowareu>
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
        <himehowareu>javascript/UpdateSetting.js</himehowareu>
    };

    //setting up the needed storge for settings 
    <himehowareu>javascript/setup.js</himehowareu>

    //help msg for the color codes
    plugin.himehowareu.DHelp = function () {
        dialog({
            html: '<himehowareu>html/info.html</himehowareu>',
            title: 'Color Codes',
        });
    };

    //main windows popup
    plugin.himehowareu.DClick = function (ev) {
        dialog({
            html: '<himehowareu>html/popup.html</himehowareu>',
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
            html: '<himehowareu>html/settings.html</himehowareu>',
            title: 'Settings',
        });
    };

    //log popup
    plugin.himehowareu.DLog = function () {
        dialog({
            html: '<himehowareu>html/Log.html</himehowareu>',
            title: 'Settings',
        });
    };

    // function for parsing the codes 
    plugin.himehowareu.FCodes = function () {
        <himehowareu>javascript/codes.js</himehowareu>
    };

    //function to update the redeem funciton built into IITC
    plugin.himehowareu.FRedeem = function (data, textStatus, jqXHR) {
        <himehowareu>javascript/redeem.js</himehowareu>
    };

    plugin.himehowareu.SendRedeem = function (passcode) {
        <himehowareu>javascript/sendRedeem.js</himehowareu>
    };

    plugin.himehowareu.FShowSettings = function () {
        <himehowareu>javascript/showSettings.js</himehowareu>
    };

    plugin.himehowareu.FToggleFormat = function () {
        <himehowareu>javascript/ToggleFormat.js</himehowareu>
    };

    plugin.himehowareu.FToggleLogging = function () {
        <himehowareu>javascript/ToggleLogging.js</himehowareu>
    };

    plugin.himehowareu.FClearLog = function () {
        <himehowareu>javascript/clearLog.js</himehowareu>
    };

    plugin.himehowareu.FLog = function (text) {
        <himehowareu>javascript/log.js</himehowareu>
    };

    plugin.himehowareu.FShowLog = function () {
        <himehowareu>javascript/showLog.js</himehowareu>
    };

    plugin.himehowareu.FCount = function (data) {
        <himehowareu>javascript/countItems.js</himehowareu>
    };

    plugin.himehowareu.FCopyLog = function () {
        <himehowareu>javascript/copylog.js</himehowareu>
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