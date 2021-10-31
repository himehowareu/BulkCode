var passcode = jqXHR.passcode;
if (data.error) {
    if (data.error === "XM object capacity reached.") {
        document.getElementById(passcode).style.color = "orange";
    } else {
        document.getElementById(passcode).style.color = "red";
    }
    
    l = document.createElement("div");
    l.innerText = data.error;
    plugin.himehowareu.FLog(passcode);
    plugin.himehowareu.FLog(l.innerText);
    document.getElementById(passcode+"fs").appendChild(l);
    return;
}
if (!data.rewards) {
    document.getElementById(passcode).style.color = "yellow";
    l = document.createElement("div");
    l.innerText = data.error;
    plugin.himehowareu.FLog(passcode);
    plugin.himehowareu.FLog(l.innerText);
    document.getElementById(passcode+"fs").appendChild(l);
    return;
}
if (data.playerData) {
    window.PLAYER = data.playerData;
    window.setupPlayerStat();
}
temp = 0;
if (data.rewards.other) {
    data.rewards.other.forEach(function (item) {
        temp += 1;
    });
}
if (data.rewards.inventory) {
    data.rewards.inventory.forEach(function (type) {
        type.awards.forEach(function (item) {
            temp += item.count;
        });
    });
}
plugin.himehowareu.items += temp;

plugin.himehowareu.FCount(data.rewards);

document.getElementById("himeTotal").innerText = plugin.himehowareu.items;
document.getElementById(passcode).style.color = "green";
if (plugin.himehowareu.settings.format == "short") {
    l = document.createElement("div");
    l.innerHTML = window.formatPasscodeShort(data.rewards);
    plugin.himehowareu.FLog(passcode);
    plugin.himehowareu.FLog(l.innerText);
    document.getElementById(passcode + "fs").appendChild(l);
} else {
    l = document.createElement("div");
    l.innerHTML = window.formatPasscodeLong(data.rewards);
    plugin.himehowareu.FLog(passcode);
    plugin.himehowareu.FLog(l.innerText);
    document.getElementById(passcode + "fs").appendChild(l);
}
t = document.createElement("div");
t.innerText = "Recived: " + temp + " Items";
plugin.himehowareu.FLog("Recived: " + temp + " Items");
document.getElementById(passcode + "fs").appendChild(t);

himeItem = document.getElementById("himeitems");
if (plugin.himehowareu.settings.format == "short") {
    himeItem.innerHTML = window.formatPasscodeShort(plugin.himehowareu.totalItems);
} else {
    himeItem.innerHTML = window.formatPasscodeLong(plugin.himehowareu.totalItems);
}
