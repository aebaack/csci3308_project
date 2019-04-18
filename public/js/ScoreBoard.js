$(document).ready(()=>{
  var curUser;
  $.get('/user',(user)=>{
    console.log(user);
    curUser=user.id;
    $('#user_id').html(curUser);
  });
  $.get('/score',(data)=>{
    console.log(data);
    var text_script = $('#BoardTable').html($('#BoardTable').html()+'<tr>');
    data.forEach(function(rank,idx){
      if(rank.id == curUser){
        $('#user_score').html(rank.score);
        $('#Rank_info').html("You are Ranking at #"+idx);
      }
      else {
        text_script+='<td colspan="2">';
        text_script+=rank.id;
        text_script+='</td>';
        text_script+='<td colspan="4">';
        text_script+=rank.username;
        text_script+='</td>';
        text_script+='<td colspan="2">';
        text_script+=rank.Time;
        text_script+='</td>';
        text_script+='<td colspan="2">';
        text_script+=rank.Length;
        text_script+='</td>';
        text_script+='<td colspan="2">';
        text_script+=rank.Score;
        text_script+='</td></tr>';
      }
    });
  });
});
