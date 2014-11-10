var bg = chrome.extension.getBackgroundPage();
$("#test").click(function(){
    var all_elements=$('#investors_block table .dt_actual');
    all_elements.each(function(){
        if (tds.length > 1) {
            var status = tds[4].innerHTML;
            if (status == 'Закрыт' || status == 'Неактивный') {
                //unactive_elements.push({'obj':$(this)});
                $(this).toggle();
            }
        }
    });
});