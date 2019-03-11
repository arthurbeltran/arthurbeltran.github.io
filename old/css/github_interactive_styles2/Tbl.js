//add custom scripts here
var odu_i_totalItems =$('.odu_i_mc_item').length;//global variable, total number of items
var odu_i_notification_validate = '<div class="odu_i_validate odu_i_validate2">Please answer this item.</div>';   
$(document).ready(function(){//start of document ready    

    
    
    
$('div[class$="_item"]').each(function(){
    odu_i_index_numbering=$(this).index('div[class$="_item"]')+1;
    $(this).attr('id','odu_i_item_'+odu_i_index_numbering);
});     
    
    
    
$('.odu_i_tbl_item input[type="text"]').val('');//firefox bug, clear text input upon refresh
$('.odu_i_tbl_item input[type="text"]').removeAttr('disabled');//firefox bug, enable text input upon refresh     
$('#odu_i_table_feedback').hide();     
    
$('.odu_i_tbl_item input[type="text"]').each(function(){//label the input[type=text]
    var odu_i_get_tbl_id = $(this).parent().attr('id');//get id of the item
    $('#'+odu_i_get_tbl_id).prepend('<div class="odu_i_tbl_mark"></div>');
    $(this).attr('id',odu_i_get_tbl_id+'_blank');//add label   
    $(this).attr('aria-label',odu_i_get_tbl_id+'_blank');//add label     
});

 
$('.odu_i_tbl_item').click(function(){//remove the validate box upon click
    $(this).find('.odu_i_validate').slideUp();
});    
    
 
});//end of document ready
    
    
$('.odu_i_submit').click(function(){//start of odu_i_submit
$(this).hide();//hide submit button

odu_i_count_tbl = $('.odu_i_tbl_item input[type="text"]').length;//count tbl     
odu_i_counter_tbl = [];//array to count tbl items
$('.odu_i_validate').remove();//remove previous validate box     
    
$('.odu_i_tbl_item input[type="text"]').each(function(){//place tbl values to an array
    odu_i_tbl_value_id = $(this).attr('id');
    odu_i_tbl_value = $('#'+odu_i_tbl_value_id).val();      
    
    if (odu_i_tbl_value.length>0){//if tbl has value
        odu_i_counter_tbl.push(odu_i_tbl_value);//place tbl value to an array, to count later
    }
    
});//end of place tbl values to an array    
    
odu_i_counter_tbl_length = odu_i_counter_tbl.length; //get the length of the tbl array for evaluation        

if (odu_i_count_tbl==odu_i_counter_tbl_length){//all tbl items has answer
    
odu_i_tbl_store_panel_count1 = '';//variable for 's' or no 's' for tbl
odu_i_tbl_store_panel_count2 = 'is';//variable for 'is' or 'are' for tbl
odu_i_tbl_store_panel_countA1 = '';//variable for correct answer 's' or no 's' for tbl 
odu_i_tbl_store_panel_countA2 = 'is';//variable for correct answer 'is' or 'are' for tbl  

$('.odu_i_tbl_item input[type="text"]').each(function(){ //evaluate text input tbl    
odu_i_tbl_id_2 = $(this).attr('id');
$(this).parent().find('.odu_i_tbl_mark').show();        
$(this).parent().addClass('odu_i_tbl_mark_box');     
        

    odu_i_tbl_all_answer = $('#'+odu_i_tbl_id_2).val();//get the answer from text input           
    
    $('#'+odu_i_tbl_id_2).prop('disabled',true);//disable the text input tbl
    $('#'+odu_i_tbl_id_2).css({color:'black', fontWeight: 'bold'}); //make text input bold                
        
       
    odu_i_tbl_answer = $(this).next().text();    
    
    
    if(odu_i_tbl_all_answer==odu_i_tbl_answer){
      $(this).parent().find('.odu_i_tbl_mark').prepend('<span  class="odu_i_c_tbl" style="color:#228b22">&#x2714; Correct</span>');  
    }
    else
        {
            $(this).parent().find('.odu_i_tbl_mark').prepend('<span  class="odu_i_x_tbl" style="color:crimson">&#x2718; Incorrect</span>');  
            $(this).parent().find('.odu_i_tbl_item_A').prepend('<span style="font-weight:normal">Correct Answer:</span><br>');
            $(this).parent().find('.odu_i_tbl_item_A').fadeIn();
        }
    
          
});//evaluate text input tbl  

$(this).parent('.odu_i_row').show().append('<div class="odu_i_button_retry odu_i_retry">Start Over</div>');//show Start Over button    
$('#odu_i_table_feedback').fadeIn();     
    
}//end of if all tbl items has answers
    
else{//some tbl items are empty
alert('Some items or questions are unanswered.');     
$(this).show(); 
$('.odu_i_tbl_item').each(function(){
    odu_i_tbl_item_get_values_array = [];
    odu_i_tbl_count_input = $(this).find('input[type=text]').length;
    $(this).find('input[type=text]').each(function(){        
        odu_i_tbl_get_values = $(this).val();
        if (odu_i_tbl_get_values.length>0){
            odu_i_tbl_item_get_values_array.push(odu_i_tbl_get_values);
            }
    });
    
    if(odu_i_tbl_item_get_values_array.length<odu_i_tbl_count_input)
       {
      $(this).prepend(odu_i_notification_validate).fadeIn();   
    }
    
});    
    
    
}//end of some tbl items are empty         
$('.odu_i_retry').click(function(){//start over
location.reload();
       
});      
    
    
});//end of odu_i_submit    
