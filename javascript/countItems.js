if (data.other) {
    data.other.forEach(function (item) {
        plugin.himehowareu.totalItems.other.push(item);
    });
}
if (0 < data.xm) {
    plugin.himehowareu.totalItems.xm = (parseInt(plugin.himehowareu.totalItems.xm) + parseInt(data.xm)).toString();
}
if (0 < data.ap) {
    plugin.himehowareu.totalItems.ap = (parseInt(plugin.himehowareu.totalItems.ap) + parseInt(data.ap)).toString();
}

if (data.inventory) {
    data.inventory.forEach(function (type) {
        found = false;
        type.awards.forEach(function (item) {
            plugin.himehowareu.totalItems.inventory.forEach(function (thing) {
                if (thing.name == type.name && found != true) {
                    found = true;
                    afound = false;
                    thing.awards.forEach(function (award) {
                        if (afound != true && award.level == item.level) {
                            afound = true;
                            award.count += item.count;
                        }
                    });
                    if (afound == false) {
                        thing.awards.push({ "count": item.count, "level": item.level });
                    }
                }
            });
        });
        if (found == false) {
            plugin.himehowareu.totalItems.inventory.push(type);
        }
    });
}
