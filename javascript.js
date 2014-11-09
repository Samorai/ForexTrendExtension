var by_consults = {};
var s_percent = 0;
var elems=$('#investors_block table .dt_actual');
console.info(1);
elems.each(function(){
   var tds = $(this).find('td');
   if (tds.length > 1) {
      var status = tds[4].innerHTML;
      if (status == 'Закрыт' || status == 'Неактивный') {
         $(this).hide();
      } else {
         var consult = tds[2].children[0].title.substr(13);
         if (consult in by_consults){

         } else {
            by_consults[consult] = {sum_was:0,sum_now:0};
         }
         by_consults[consult].sum_was += parseFloat(tds[5].innerHTML);
         by_consults[consult].sum_now += parseFloat(tds[6].innerHTML);
      }
   }
});
for (key in by_consults){
  var sum_was = by_consults[key].sum_was;
  var sum_now = by_consults[key].sum_now;
  $('#investors_block table').append('<tr><td></td><td></td><td>Консультант: '+key+'</td><td></td><td></td><td valign=top align=right>'+Math.round((sum_was)*100)/100+'</td><td valign=top align=right>'+sum_now+'<font color=green><br>('+Math.round((sum_now-sum_was)*100)/100+')</td><td valign=top align=right>'+s_percent+'<font color=green><br>('+Math.round((sum_now/sum_was)*100)/100+')</td></tr>');
}
