var by_consults = {};
var all_elements=$('#investors_block table .dt_actual');
var inactive_elements = new Array();
var active_elements = new Array();
var current_path = window.location.pathname;
var pamm = true;
if (current_path == '/my/pamm_investor/accounts/') {
    pamm = 1;
} else if (current_path == '/my/pamm2_investor/accounts/') {
    pamm = 2;
}

all_elements.each(function(){
    var tds = $(this).find('td');
    if (tds.length > 1) {
        var status = tds[4].innerHTML;
        if (status == 'Закрыт' || status == 'Неактивный') {
            inactive_elements.push({'obj':$(this)});
            $(this).next().addClass('closed_by_extension');
            $(this).addClass('closed_by_extension');
        } else {
            active_elements.push({'obj':$(this)});

            if (pamm == 1) {
                sum_now = parseFloat(tds[6].innerHTML);
            } else if (pamm == 2) {
                sum_now = parseFloat(tds[7].innerHTML);
            }

            if (!isNaN(sum_now)) {
                var consult = tds[2].children[0].title.substr(13);
                $(this).children(1)[2].innerHTML += ' <span class="consult_checker '+consult+'"></span>';
                if (consult in by_consults){
                } else {
                    by_consults[consult] = {sum_was:0,sum_now:0};
                }
                sum_was = parseFloat(tds[5].innerHTML);
                if (!isNaN(sum_was)) {
                    by_consults[consult].sum_was += parseFloat(tds[5].innerHTML);
                } else {
                    by_consults[consult].sum_was += 0;
                }

                if (!isNaN(sum_now)) {
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
    $('#investors_block').append(
        $('<table/>').addClass('my_accounts_table')
        .append(
            $('<tr/>')
            .append(
                    $('<td/>').append(
                        $("<button/>")
                            .attr('id', key)
                            .click(
                            function(e){
                                e.preventDefault();
                                var consult_id = $(this).attr('id');
                                $(".consult_checker").parent(2).parent(2).each(function(){$(this).css('background','')});
                                $("." + consult_id).parent(2).parent(2).each(function(){$(this).css('background','#9FC8F0')});
                            }
                    ).html('Select accounts'))
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
        )
    );
}

$('#investors_block').prepend($("<button/>").click(
    function(){
        $(".closed_by_extension").each(function(){
            $(this).toggle();
        })
    }
).html('Show/Hide Inactive Elements'));