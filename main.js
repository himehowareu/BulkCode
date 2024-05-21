// ==UserScript==
// @id             Bulkcodes
// @name           IITC plugin: Bulk Codes
// @category       Info
// @version        <import>version.txt</import>
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
        <import>javascript/UpdateSetting.js</import>
    };

    //setting up the needed storge for settings 
    <import>javascript/setup.js</import>

    //help msg for the color codes
    plugin.himehowareu.DHelp = function () {
        dialog({
            html: '<import>html/info.html</import>',
            title: 'Color Codes',
        });
    };

    //main windows popup
    plugin.himehowareu.DClick = function (ev) {
        dialog({
            html: '<import>html/popup.html</import>',
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
            html: '<import>html/settings.html</import>',
            title: 'Settings',
        });
    };

    //log popup
    plugin.himehowareu.DLog = function () {
        dialog({
            html: '<import>html/Log.html</import>',
            title: 'Settings',
        });
    };

    // function for parsing the codes 
    plugin.himehowareu.FCodes = function () {
        <import>javascript/codes.js</import>
    };

    //function to update the redeem funciton built into IITC
    plugin.himehowareu.FRedeem = function (data, textStatus, jqXHR) {
        <import>javascript/redeem.js</import>
    };

    plugin.himehowareu.SendRedeem = function (passcode) {
        <import>javascript/sendRedeem.js</import>
    };

    plugin.himehowareu.FShowSettings = function () {
        <import>javascript/showSettings.js</import>
    };

    plugin.himehowareu.FToggleFormat = function () {
        <import>javascript/ToggleFormat.js</import>
    };

    plugin.himehowareu.FToggleLogging = function () {
        <import>javascript/ToggleLogging.js</import>
    };

    plugin.himehowareu.FClearLog = function () {
        <import>javascript/clearLog.js</import>
    };

    plugin.himehowareu.FLog = function (text) {
        <import>javascript/log.js</import>
    };

    plugin.himehowareu.FShowLog = function () {
        <import>javascript/showLog.js</import>
    };

    plugin.himehowareu.FCount = function (data) {
        <import>javascript/countItems.js</import>
    };

    plugin.himehowareu.FCopyLog = function () {
        <import>javascript/copylog.js</import>
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