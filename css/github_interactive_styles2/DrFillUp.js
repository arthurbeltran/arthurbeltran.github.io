$(document).ready(function(){

$('.odu_i_dr_drop_A').each(function(){//add the check and x mark    
$('.odu_i_dr_drag_area').append('<div class="odu_i_dr_drag"><span class="odu_i_dr_correct">&#x2714;</span><span class="odu_i_dr_incorrect">&#x2718;</span><span style="float:right; width:94%">'+$(this).text()+'</span><div class="odu_i_clear"></div></div>');       
}); 

;       
    
    
var uls = document.querySelectorAll('.odu_i_dr_drag_area');//randomize list
for (var j = 0; j < uls.length; j++) {
  var ul = uls.item(j);
  for (var i = ul.children.length; i >= 0; i--) {
    ul.appendChild(ul.children[Math.random() * i | 0]);
  }
}//end of randomize list

var removeDuplicate = {};//remove duplicate drag object
$('.odu_i_dr_drag').each(function() {
    var txt = $(this).text();
    if (removeDuplicate[txt])
        $(this).remove();
    else
        removeDuplicate[txt] = true;
});

    
$('.odu_i_dr_drag_area').append('<p class="odu_i_clear">');//add a clear:both at the end of the list
var odu_i_get_answer_column_name = $('.odu_i_dr_answer_column_name').text();    
$('.odu_i_dr_drag_area').prepend('<h4><strong>'+odu_i_get_answer_column_name+'</strong></h4>');//add the header for the answers box     
$('.odu_i_button_retry').click(function(){//add a retry or start over button
location.reload();
});


$('.odu_i_dr_drag').draggable({//activate the drag object
    cursor:'pointer',
    snap: '.odu_i_dr_drop'
    
});
    
$('.odu_i_dr_drop').droppable({//activate the drop area
    
    accept: '.odu_i_dr_drag',//define the drag object
    
    
    out: function(event, ui){//hide check or x mark when drag outside the drop area
        $('.ui-draggable-dragging .odu_i_dr_incorrect, .ui-draggable-dragging .odu_i_dr_correct').hide();
    },
    
    drop: function (event, ui){//define what happens after dropping the drag object
    odu_i_get_dr_id_for_array = $(this).parent().attr('id');//get the id of the drop area          
    odu_get_dr_drop_answer_array = [];//var for the answers in array form
    $('#'+odu_i_get_dr_id_for_array+' .odu_i_dr_drop_A').each(function(){//get the answers in array form
    odu_get_dr_drop_answer_array[''+$(this).attr('class')+''] = $(this).text();   
    odu_get_dr_drop_answer_array.push($(this).text());
    });   
        
       
    var odu_i_get_drag_value = $(ui.draggable).text().substring(2);//get the text of drag object
    var odu_i_check_drag_array= $.inArray(odu_i_get_drag_value, odu_get_dr_drop_answer_array);//check if the drag object is included from the array, if not -1 would be the value        
                        
           if (odu_i_check_drag_array!=-1){//if the drag object is on the list of correct answers

               $('.ui-draggable-dragging .odu_i_dr_correct').show();
           }
           else {//if not

               $('.ui-draggable-dragging .odu_i_dr_incorrect').show();
           }

               
        }//end of drop                       
    
    
});    
    
    
}); //end of document ready