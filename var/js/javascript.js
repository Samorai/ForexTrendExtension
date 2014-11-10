var by_consults = {};
var s_percent = 0;
var all_elements=$('#investors_block table .dt_actual');
var unactive_elements = new Array();

all_elements.each(function(){
    var tds = $(this).find('td');
    if (tds.length > 1) {
        var status = tds[4].innerHTML;
        if (status == 'Закрыт' || status == 'Неактивный') {
            unactive_elements.push({'obj':$(this)});
            $(this).toggle();
            $(this).addClass('closed_by_extension');
        } else {
            var consult = tds[2].children[0].title.substr(13);
            if (consult in by_consults){

            } else {
                by_consults[consult] = {sum_was:0,sum_now:0};
            }
            sum_was = parseFloat(tds[5].innerHTML);
            if (sum_was != NaN) {
                by_consults[consult].sum_was += parseFloat(tds[5].innerHTML);
            } else {
                by_consults[consult].sum_was += 0;
            }
            sum_now= parseFloat(tds[6].innerHTML);
            if (sum_now != NaN) {
                by_consults[consult].sum_now += parseFloat(tds[6].innerHTML);
            } else {
                by_consults[consult].sum_now += 0;
            }
        }
    }
});

for (key in by_consults){
    var sum_was = by_consults[key].sum_was;
    var sum_now = by_consults[key].sum_now;
    $('#investors_block table').append('<tr><td></td><td></td><td>Консультант: '+key+'</td><td></td><td></td><td valign=top align=right>'+Math.round((sum_was)*100)/100+'</td><td valign=top align=right>'+sum_now+'<font color=green><br>('+Math.round((sum_now-sum_was)*100)/100+')</td><td valign=top align=right>'+(sum_now-sum_was).toFixed(2)+'<font color=green><br>('+(sum_now/sum_was*100/100).toFixed(2)+'%)</td></tr>');
}

$('#investors_block').append($("<button/>").click(function(){$(".closed_by_extension").each(function(){$(this).toggle()})}).html('Show/Hide Unactive Elements'));