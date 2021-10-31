if (!passcode) return;

var jqXHR = window.postAjax('redeemReward', { passcode: passcode }, plugin.himehowareu.FRedeem, function (response) {
    var extra = '';
    if (response.status) {
        extra = (window.REDEEM_STATUSES[response.status] || 'The server indicated an error.') + ' (HTTP ' + response.status + ')';
    } else {
        extra = 'No status code was returned.';
    }
    dialog({
        title: 'Request failed: ' + data.passcode,
        html: '<strong>The HTTP request failed.</strong> ' + extra
    });
});
jqXHR.passcode = passcode;  