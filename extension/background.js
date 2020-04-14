var qqmail = new function() {
    var I = this, info = {'hasInfo': 0};

    I.setInfo = function(items) {
        info = {
            items: items
        };
        info.hasInfo = 1;
    },
    I.getInfo = function() {
        return info;
    },
    I.getData = function() {
        return info.items;
    }
};


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var f = qqmail[request.cmd]
    if (request.items !== null) {
        var ret = f(request.items);
    } else {
        f();
    }
    if (typeof sendResponse === 'function')  {
        sendResponse(ret);
     }

     
});


