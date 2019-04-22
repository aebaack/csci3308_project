$(document).ready(()=>{
  var curUser;
  var UserRank = 0;
  $.get('/users',(user)=>{
    console.log(user);
    curUser=user.id;
    $('#username').html(user.name);
    console.log(curUser);
    $('#user_id').html(curUser);
    $('#user_score').html(user.score);
  });
  $.get('/scoreboard',(data)=>{
    console.log(data);
    data.sort(function(a,b) {
	return (b.score-a.score)
	});
    console.log(data);
    data.forEach(function(rank,idx){
      var text_script = $('#scoretable').html($('#scoretable').html()+'<tr>');
	if(curUser == rank.id)
		$('#Rank_info').html('You Are Ranking at #' + (idx+1));
        text_script+='<td colspan="2">';
        text_script+=idx+1;
        text_script+='</td>';
        text_script+='<td colspan="4">';
        text_script+=rank.name;
        text_script+='</td>';
        text_script+='<td colspan="2">';
        text_script+=rank.score;
        text_script+='</td></tr>';
	$('#scoretable').html($('#scoretable').html() + text_script);
    });
  });
});
