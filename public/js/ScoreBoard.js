$(document).ready(()=>{
  var curUser;
  $.get('/users',(user)=>{
    console.log(user);
    curUser=user.id;
    console.log(curUser);
    $('#user_id').html(curUser);
  });
  $.get('/scoreboard',(data)=>{
    console.log(data);
    data.sort(function(a,b) {
	return (b.score-a.score)
	});
    console.log(data);
    data.forEach(function(rank,idx){
      var text_script = $('#scoretable').html($('#scoretable').html()+'<tr>');
      if(rank.id == curUser){
	console.log(curUser);
        $('#user_score').html(rank.score);
        $('#Rank_info').html("You are Ranking at #"+(idx+1));
      }
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
