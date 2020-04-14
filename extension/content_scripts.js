
(function() {
    var init = function() {

        window.onload = function() {
            
            try {
                var items = get_items();
                // console.log
                chrome.runtime.sendMessage({cmd: 'setInfo', items: items});
            } catch (e) {
                console.log(e);
            }

        }
    };
    init();

    function get_items() {
        var titles = [];
        var hrefs = [];
        var money = [];
        var company = [];
        var img = [];

        document.querySelectorAll('.job-name').forEach(job =>{
            titles.push(job.firstElementChild.innerText);
        })
        document.querySelectorAll('.job-name').forEach(job => {
            hrefs.push(job.firstElementChild.getAttribute('href'))
        })
        document.querySelectorAll('.job-limit').forEach(job => {
            money.push(job.firstElementChild.innerText);
        })
        document.querySelectorAll('.company-text').forEach(job => {
            company.push(job.firstElementChild.firstElementChild.innerText);
        })
        document.querySelectorAll('.company-logo').forEach(job => {
            img.push(job.getAttribute('src'))
        })


        var items = [];
        titles.forEach((arg, idx) => {
            items.push( {
                title: arg, 
                href: hrefs[idx],
                money: money[idx],
                company: company[idx],
                img: img[idx],
            })
        })
        return items;
    }

})();



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.message === "getData"){
        chrome.runtime.sendMessage({cmd: 'getData', items: null});
    }
    if (request.message === 'next') {
        document.querySelector('.next').click();
    }
    if (request.message === 'pre') {
        document.querySelector('.prev').click();
    }

})