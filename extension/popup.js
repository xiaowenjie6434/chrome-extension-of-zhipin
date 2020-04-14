const main = (function() {
    var fn = function() {
        var info = chrome.extension.getBackgroundPage().qqmail.getInfo(), s = '';
        console.log($("#append").is(':checked'));
        if (!$("#append").is(':checked')) {
              document.getElementById('items').innerHTML = ` <tr>
                <td>标题</td>
                <td>薪水</td>
                <td>工资</td>
                <td>图片</td>
            </tr>`
        }
      // clear content
        if (info.hasInfo) {
            info.items.forEach(item => {
                var tr = document.createElement('tr');
                var tds = '<td>' + item.title + '</td>' + '<td>' + item.money + '</td>'
                + '<td>' + item.company + "</td>" + "<td class='td_image'>" + item.img + "</td>"
                tr.innerHTML = tds;
                document.getElementById('items').appendChild(tr);
            })
        }

    }
    fn();
});
main();
// export csv 
$(document).on("click", "#downtable", function () {
    var $trs = $("#items").find("tr");
    var str = "";
    for (var i = 0; i < $trs.length; i++) {
        var $tds = $trs.eq(i).find("td,th");
        for (var j = 0; j < $tds.length; j++) {
            str += $tds.eq(j).text() + ",";
        }
        str += "\n";
    }

    var aaaa = "data:text/csv;charset=utf-8,\ufeff" + str;
    var link = document.createElement("a");
    link.setAttribute("href", aaaa);
    let date = new Date();
    let filename = date.getTime();
    link.setAttribute("download", filename + ".csv");
    link.click();
    
});
var count = 0 // 执行计数
var t; // 定时
const requestPage = (auto, msg) => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        if (auto) {
            t = setInterval(function() {
                count++
                var pagecount = parseInt($("#pagecount").val());
                if (count === pagecount) clearInterval(t);
                chrome.tabs.sendMessage(activeTab.id, {'message': 'next'})
            }, 1000)

        } else {
            // 非自动即发送message
            var message = 'next';
            if (msg) message = msg;
            chrome.tabs.sendMessage(activeTab.id, {'message': message})
        }
        
    })
}

$("#pre").click(function () {
    requestPage(false, 'pre')
})

$('#next').click(function() {
    requestPage(false);
})

$("#autopage").click(function() {
    requestPage(true);
})

chrome.tabs.onUpdated.addListener(function() {
    main(); // 重新获取数据
})

