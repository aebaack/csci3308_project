
$(document).ready(()=>{
    $.get('/perfermance',(data)=>{
    console.log(user);
    console.log(api_list);
    var id_snooze="#snoozeSelect";
    var id_api="#APISET"
      api_list.forEach(function(item,idx){
        var options;
        if((idx % 3) == 0)
          options='<div class="col-sm-1"></div>';
        options+='<div class="form-check col-sm-3"><input class="form-check-input" type="checkbox" name="api" value="';
        options+=idx;
        options+='" id="api';
        options+=idx;
        options+='" >';
        options+='<label class="form-check-label" for="api">';
        options+=item.api_name;
        options+="</label>";
        if((idx % 3) == 2)
          options+='<div class="col-sm-2"></div>';
        $(id_api).html($(id_api).html()+options);
      });
    });
});
