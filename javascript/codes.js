plugin.himehowareu.items = 0;
plugin.himehowareu.totalItems = {
    "ap": "0",
    "other": [],
    "inventory": [],
    "xm": "0"
};


document.getElementById("himeCodePopUp1").hidden = true;
lines = document.getElementById("himeCode").value.split("\n");
document.getElementById("himeCodePopUp2").hidden = false;
for (var i = 0; i < lines.length; i++) {
    if (lines[i]==""){continue;}
    pass = lines[i].replace(/[^\x20-\x7E]+/g, "");
    pass = pass.replace(" ","");
    ul = document.getElementById("himeRedeemed");

    li = document.createElement("fieldset");
    li.id = pass+"fs";

    l = document.createElement("legend");
    l.id = pass;
    l.innerText = pass;

    li.appendChild(l);
    ul.appendChild(li);
    
    plugin.himehowareu.SendRedeem(pass);
}