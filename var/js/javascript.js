var by_consults = {};
var all_elements=$('#investors_block table .dt_actual');
var unactive_elements = new Array();

all_elements.each(function(){
    var tds = $(this).find('td');
    if (tds.length > 1) {
        var status = tds[4].innerHTML;
        if (status == 'Закрыт' || status == 'Неактивный') {
            unactive_elements.push({'obj':$(this)});
            $(this).next().addClass('closed_by_extension');
            $(this).addClass('closed_by_extension');
        } else {
            sum_was = parseFloat(tds[5].innerHTML);
            if (sum_was != NaN) {
                var consult = tds[2].children[0].title.substr(13);
                if (consult in by_consults){

                } else {
                    by_consults[consult] = {sum_was:0,sum_now:0};
                }

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
    }
});

for (key in by_consults){
    var sum_was = by_consults[key].sum_was;
    var sum_now = by_consults[key].sum_now;
    var delta   = sum_now - sum_was;
    var percent = sum_now*100/sum_was - 100;
    var string_info = 'Консультант: ' + key;

    if (key.length <= 1) {
        string_info = 'ПАММы'
    }
    $('#investors_block table').append(
        $('<tr/>').append(
                $('<td/>')
        ).append(
                $('<td/>')
        ).append(
            $('<td/>').html(string_info)
        ).append(
            $('<td/>')
        ).append(
            $('<td/>')
        ).append(
            $('<td valign=top align=right/>').
                html(sum_was.toFixed(2))
        ).append(
            $('<td valign=top align=right/>').
                html(sum_now.toFixed(2))
        ).append(
            $('<td valign=top align=right/>').
                html(delta.toFixed(2)+'<font color=green><br>('+percent.toFixed(2)+'%)</font>')
        )
    );
}

$('#investors_block').append($("<button/>").click(
    function(){
        $(".closed_by_extension").each(function(){
            $(this).toggle();
        })
    }
).html('Show/Hide Unactive Elements'));