//MXOA ver 2 no numbering needed

var odu_i_total_items_mc =$('.odu_i_mc_item').length;//global variable, total number of mc items
var odu_i_totalItemsDrop =$('.odu_i_drop_item').length;//global variable, total number of items   
var odu_i_totalPredefinedChoicesDrop = $('.odu_i_drop_choices_list li').length;//global variable, total number of predefined choices
var odu_i_notification_validate = '<div class="odu_i_validate"><span class="odu_i_circle">!</span> Please respond to this item or question before you can submit your answers.</div>';    
$(document).ready(function(){//start of document ready    
    
$('.odu_i_clear').empty();
    
$('div[class$="_item"]').each(function(){
    odu_i_index_numbering=$(this).index('div[class$="_item"]')+1;
    $(this).attr('id','odu_i_item_'+odu_i_index_numbering);
});    
    
    
$('div[class$="_explanation"]').each(function(){
    if ($(this).length==0){
        $(this).empty();
    }
});
    
$('.odu_i_mc_item label, .odu_i_cb_item label ').after('<div class="odu_i_clear odu_i_add_margin_bottom"></div>');//add clear and margin bottom
$('.odu_i_mc_item input, .odu_i_cb_item input').before('<div class="odu_i_mark_area">&nbsp;</div>');//add the check or x area
$('.odu_i_mc_item input[type=radio], .odu_i_cb_item input[type=checkbox]').removeAttr('disabled');//enable radio buttons
$('.odu_i_mc_item input[type=radio], .odu_i_cb_item input[type=checkbox]').removeAttr('checked');//remove selected state of the radio buttons

$('.odu_i_fi_item input[type="text"]').val('');//firefox bug, clear text input upon refresh for fi
$('.odu_i_fi_item input[type="text"]').removeAttr('disabled');//firefox bug, enable text input upon refresh for fi
$('.odu_i_fb_item input[type="text"]').val('');//firefox bug, clear text input upon refresh for fb
$('.odu_i_fb_item input[type="text"]').removeAttr('disabled');//firefox bug, enable text input upon refresh for fb
    
    
$('.odu_i_drop_item select').prop('selectedIndex', 0);//bring back selection to blank//
$('.odu_i_drop_item select').removeAttr('disabled');//enable select upon refresh//    
$('.odu_i_drop_item select').attr('autocomplete', 'off');//remove previous selection upon refresh

    
$('.odu_i_mc_item').each(function(){//labelling the choices for mc // 
odu_i_get_mc_id = $(this).attr('id');//get the id of the item    
odu_i_get_mc_id_for_numbering = odu_i_get_mc_id.substring(11);//get the number at the end of the id for numbering purposes
$(this).find('legend').prepend(odu_i_get_mc_id_for_numbering+'. ');    
odu_i_mc_index=1;//number used for looping    
    $(this).find('input[type=radio]').each(function(){//labelling for item choices    
        $(this).attr('id',odu_i_get_mc_id+'_choice'+odu_i_mc_index++);//label the choice with an id
        $(this).attr('name',odu_i_get_mc_id);//label the choice with a name
        odu_i_mc_get_choice_value = $(this).next('label').text();//get the label text, choice text
        $(this).attr('value',odu_i_mc_get_choice_value);//label the value of the choice
        odu_i_mc_get_label_for = $(this).attr('id');//get the choice id
       $(this).next('label').attr('for',odu_i_mc_get_label_for);//label the 'for' of the <label>
    });//end of labelling for item choices   
});//end of labelling for mc       
    

$('.odu_i_cb_item').each(function(){//labelling the choices for cb // 
odu_i_get_cb_id = $(this).attr('id');//get the id of the item    
odu_i_get_cb_id_for_numbering = odu_i_get_cb_id.substring(11);//get the number at the end of the id for numbering purposes
$(this).find('legend').prepend(odu_i_get_cb_id_for_numbering+'. ');    
odu_i_cb_index=1;//number used for looping    
    $(this).find('input[type=checkbox]').each(function(){//labelling for item choices    
        $(this).attr('id',odu_i_get_cb_id+'_choice'+odu_i_cb_index++);//label the choice with an id
        $(this).attr('name',odu_i_get_cb_id);//label the choice with a name
        odu_i_cb_get_choice_value = $(this).next('label').text();//get the label text, choice text
        $(this).attr('value',odu_i_cb_get_choice_value);//label the value of the choice
        odu_i_cb_get_label_for = $(this).attr('id');//get the choice id
       $(this).next('label').attr('for',odu_i_cb_get_label_for);//label the 'for' of the <label>
    });//end of labelling for item choices    
});//end of labelling  for cb          
    

$('.odu_i_fi_item').each(function(){//label the input[type=text] fi
odu_i_get_fi_id = $(this).attr('id');//get id of the fi itme
odu_i_get_fi_id_for_numbering = odu_i_get_fi_id.substring(11);//get the number at the end of the id for numbering purposes
odu_i_get_fi_label_value = $(this).find('label').text();    
$(this).find('label').prepend(odu_i_get_fi_id_for_numbering+'. ');
$(this).find('label').attr('for',odu_i_get_fi_id+'_text_input');    
$(this).find('label').after('<div class="odu_i_clear"></div>');    
$(this).find('input[type="text"]').before('<div class="odu_i_mark_area">&nbsp;</div>');      
$(this).find('input[type="text"]').attr('id',odu_i_get_fi_id+'_text_input');//add id to text input label
$(this).find('input[type="text"]').attr('name',odu_i_get_fi_label_value);//add the name for text input label    
$(this).find('.odu_i_mark_area').show();    
});//end of labelling the input[type=text] fi    


    
$('.odu_i_drop_columns').each(function(){//numbering for drop columns
    odu_i_drop_columns_id_for_numbering = $(this).attr('id').substring(11);
    $(this).find('.odu_i_drop_main_question').prepend(odu_i_drop_columns_id_for_numbering+'. ');
});//end of numbering for drop columns    
    
    
$('.odu_i_drop_item').each(function(){//label the elements for drop item  
    
odu_i_get_drop_id = $(this).attr('id');//get the id of the item    
odu_i_get_drop_id_for_numbering = odu_i_get_drop_id.substring(11);//get the number at the end of the id for numbering purposes
$(this).prepend('<select>');//add the select    
$(this).append('<label>');//add a label
$(this).find('label').html($(this).find('.odu_i_drop_item_question').html());//add the question text
$(this).find('label').prepend(odu_i_get_drop_id_for_numbering+'. ');//add the numbering
$(this).find('select').attr('id',odu_i_get_drop_id+'_drop');//add id to select/drop-down
$(this).find('select').attr('name',odu_i_get_drop_id+'_drop');//add id to select/drop-down    
    

odu_i_drop_index=1;//number used for looping
    
do{//add the select
if(odu_i_drop_index<=odu_i_totalPredefinedChoicesDrop){
    $(this).find('select').append('<option>');  
}
++odu_i_drop_index;    
}while(odu_i_drop_index<=odu_i_totalPredefinedChoicesDrop);//end of add select

    
odu_i_drop_index3 = 0; //number used for looping the option attributes        
$(this).find('option').each(function(){    
    $(this).attr('value',$('.odu_i_drop_choice_list_'+odu_i_drop_index3).attr('data-letter'));//add value
    var odu_extract_letter = $('.odu_i_drop_choice_list_'+odu_i_drop_index3++).text().substr(0, 1);//add value
    $(this).text(odu_extract_letter);
});    
    
$(this).find('label').after('<div class="odu_i_clear odu_i_add_margin_bottom"></div>');     
$(this).find('select').before('<div class="odu_i_mark_area">&nbsp;</div>');//add the check or x area
    
});//end of label the elements for drop item            
    
$('.odu_i_fb_item').each(function(){//label for fb item
odu_i_get_fb_id = $(this).attr('id');
odu_i_get_fb_id_for_numbering = odu_i_get_fb_id.substring(11);//get the number at the end of the id for numbering purposes
$(this).prepend(odu_i_get_fb_id_for_numbering+'. ');    
});    

$('.odu_i_fb_item input[type="text"]').each(function(){//label each fb input
odu_i_get_fb_input_id = $(this).parent().parent().attr('id');//get parent id    
odu_i_get_fb_input_index = $(this).index('#'+odu_i_get_fb_input_id+' input[type="text"]')+1;//get index of input
$(this).parent().prepend('<div class="odu_i_fb_mark"></div>');    
$(this).attr('aria-label',odu_i_get_fb_input_id+'_fb_blank'+odu_i_get_fb_input_index);//add aria-label
$(this).attr('id',odu_i_get_fb_input_id+'_fb_blank'+odu_i_get_fb_input_index);//add id to input     
});//end of label each fb input
    
    
    
    
$('.odu_i_mc_item, .odu_i_cb_item, .odu_i_fi_item, .odu_i_drop_item, .odu_i_fb_item').click(function(){//remove the validate box upon click
    $(this).find('.odu_i_validate').slideUp();
});    
    
    
    
    
    
    
});//end of document ready
    
    
function odu_i_formatArray(odu_i_arr){//array value formatting cb, fi and fb
    var odu_i_outStr = '';
    if (odu_i_arr.length === 1) {
        odu_i_outStr = odu_i_arr[0];
    } else if (odu_i_arr.length === 2) {
        //joins all with "and" but no commas        
        odu_i_outStr = odu_i_arr.join(' <span style="font-weight:100">and</span> ');
    } else if (odu_i_arr.length > 2) {
        //joins all with commas, but last one gets ", and"        
        odu_i_outStr = odu_i_arr.slice(0, -1).join(', ') + ', <span style="font-weight:100">and</span> ' + odu_i_arr.slice(-1);
    }
    return odu_i_outStr;
}//end of array value formatting cb and fi            
    
function odu_i_compareArrays(odu_i_arr1, odu_i_arr2) {//compare simple arrays for cb, fi, fb
    return $(odu_i_arr1).not(odu_i_arr2).length == 0 && $(odu_i_arr2).not(odu_i_arr1).length == 0
};//end of compare simple arrays for cb and fi     
    

$('.odu_i_submit').click(function(){//start of odu_i_submit
 
    
odu_i_count_mc = $('.odu_i_mc_item').length;//count mc 
odu_i_count_cb = $('.odu_i_cb_item').length;//count cb 
odu_i_count_fi = $('.odu_i_fi_item').length;//count fi
odu_i_count_fb = $('.odu_i_fb_item input[type="text"]').length;//count fb        
odu_i_count_drop = $('.odu_i_drop_item').length;//count drop
    
odu_i_counter_mc = $('.odu_i_mc_item input[type="radio"]:checked').length;//count answered mc     
odu_i_counter_cb = [];//count answered cb items
odu_i_counter_drop = [];
odu_i_counter_fi = [];
odu_i_counter_fb = [];    
    
    

$('.odu_i_cb_item').each(function(){//validate if per cb item has an answer
    odu_i_cb_value_id = '#'+$(this).attr('id');
    odu_i_cb_value = $(odu_i_cb_value_id).find('input[type="checkbox"]:checked').length;
    if (odu_i_cb_value>0){
        odu_i_counter_cb.push($(odu_i_cb_value_id).attr('id'));
    }
});//end of validate if per cb item has an answer    
    
    
$('.odu_i_fi_item').each(function(){//place fi values to an array
    odu_i_fi_value_id = $(this).attr('id');
    odu_i_fi_value = $('#'+odu_i_fi_value_id).find('input[type="text"]').val();
    
    if (odu_i_fi_value.length>0){//if fi has value
        odu_i_counter_fi.push(odu_i_fi_value);//place fi value to an array, to count later
    }
    
});//end of place fi values to an array    
    
odu_i_counter_fi_length = odu_i_counter_fi.length; //get the length of the fi array for evaluation    

    
$('.odu_i_fb_item input[type="text"]').each(function(){//place fb values to an array
    odu_i_fb_value_id = $(this).attr('id');
    odu_i_fb_value = $('#'+odu_i_fb_value_id).val();      
    
    if (odu_i_fb_value.length>0){//if fb has value
        odu_i_counter_fb.push(odu_i_fb_value);//place fb value to an array, to count later
    }
    
});//end of place fb values to an array    
    
odu_i_counter_fb_length = odu_i_counter_fb.length; //get the length of the fb array for evaluation        
    
    
    
    
    
$('.odu_i_drop_item select option:selected').each(function(){
    odu_i_drop_value = $(this).val();
    if (odu_i_drop_value.length>0){//if drop has value
        odu_i_counter_drop.push(odu_i_drop_value);//place drop value to an array, to count later
    }
});    
    
odu_i_counter_drop_length = odu_i_counter_drop.length; //get the length of the drop array for evaluation    

$('.odu_i_validate').remove();//remove previous validate box        
    
if (odu_i_count_mc==odu_i_counter_mc && odu_i_count_cb<=odu_i_counter_cb.length && odu_i_count_drop==odu_i_counter_drop_length && odu_i_count_fi==odu_i_counter_fi_length && odu_i_count_fb==odu_i_counter_fb_length){
$(this).hide();//hide submit button
$(this).parent('.odu_i_row').show().append('<div class="odu_i_button_retry odu_i_retry">Start Over</div>');//show Start Over button 
    
$('.odu_i_mc_item').each(function(){// start of evaluation for mc
odu_i_this_id_mc = $(this).attr('id');//get item id    
$('.odu_i_mc_item input[type=radio], .odu_i_mc_item label').css('cursor','not-allowed');//disable radio buttons    
$('.odu_i_mc_item input[type=radio]').prop('disabled',true);//disable radio buttons  
odu_i_answer_mc = $(this).find('input[type=radio]:checked').next('label').text();//get the label text of the selected choice
odu_i_correct_mc = $(this).find('input[data-value="correct"]').next('label').text();//get the label text of the correct choice
odu_i_mc_explanation = '<p>'+$(this).find('.odu_i_mc_explanation').html()+'</p>';    
if(odu_i_answer_mc==odu_i_correct_mc){//if the selected answer is correct

odu_i_store_panel_mc = '<div class="odu_i_panel_success odu_i_mc_panel_margin i-mc-panel-correct"> \
                                              <div class="odu_i_panel_header"><strong>Feedback</strong></div> \
                                              <div class="odu_i_panel_content"> \
                                              <p>Good job! The selected choice: <strong>'+odu_i_correct_mc+'</strong> is correct!</p>'+odu_i_mc_explanation+'</div></div>';
odu_i_remark = '<span  class="odu_i_c_mc" style="color:#228b22">&#x2714;</span>'

}//end if the selected answer is correct    
else{//if the selected anwer is incorrect
odu_i_store_panel_mc = '<div class="odu_i_panel_error odu_i_mc_panel_margin i-mc-panel-correct"> \
                                              <div class="odu_i_panel_header"><strong>Feedback</strong></div> \
                                              <div class="odu_i_panel_content"> \
                                              <p>The selected choice is incorrect.<br> The correct choice is: <strong>'+odu_i_correct_mc+'</strong></p>'+odu_i_mc_explanation+'</div></div>'; 
odu_i_remark = '<span  class="odu_i_x_mc" style="color:crimson">&#x2718;</span>'        
}//end of if the selected anwer is incorrect
    
$(this).hide().append(odu_i_store_panel_mc).fadeIn();//display the panel either correct/incorrect
$(this).find('input[type=radio]:checked').prev('.odu_i_mark_area').append(odu_i_remark);//display the mark if check or x        
  
});//end of evaluation for mc    
    
odu_i_cb_store_panel_count1 = '';//variable for 's' or no 's' for cb 
odu_i_cb_store_panel_count2 = 'is';//variable for 'is' or 'are' for cb
odu_i_cb_store_panel_countA1 = '';//variable for correct answer 's' or no 's' for cb 
odu_i_cb_store_panel_countA2 = 'is';//variable for correct answer 'is' or 'are' for cb
    
$('.odu_i_cb_item').each(function(){//evaluate cb
odu_i_this_id_cb = $(this).attr('id');//get item id    
$('.odu_i_cb_item input[type="checkbox"]').css('cursor','not-allowed');//disable checkboxes buttons
$('.odu_i_cb_item input[type="checkbox"]').next('label').css('cursor','not-allowed');//disable checkboxes buttons        
$('.odu_i_cb_item input[type="checkbox"]').prop('disabled',true);//disable checkboxes buttons  
    odu_i_cb_all_checked = []; //array variable for checked boxes for cb    
    odu_i_cb_all_correct = [];
    odu_i_cb_item_id = $(this).attr('id');
    $('#'+odu_i_cb_item_id).find('input[type="checkbox"]:checked').each(function(){//evalauate checked items
        odu_i_cb_all_checked.push($(this).next('label').html());//collect checked box since 2 or more can be answers
        if($(this).attr('data-value')=='correct'){//if correct
                odu_i_remark = '<span  class="odu_i_c" style="color:#228b22">&#x2714;</span>';        
        }
        else{//if incorrect
           odu_i_remark = '<span  class="odu_i_x" style="color:crimson">&#x2718;</span>'; 
        }

        $(this).prev('.odu_i_mark_area').append(odu_i_remark);//display if check or x 
    });//end of evalauate checked boxes

    $('#'+odu_i_cb_item_id).find('input[data-value="correct"]').each(function(){//collect answer key
       odu_i_cb_all_correct.push($(this).next('label').html());//collect all anwer key for cb 
    });

if (odu_i_cb_all_checked.length>=2){//change the s and are for cb
odu_i_cb_store_panel_count1 = 's';
odu_i_cb_store_panel_count2 ='are';
}//end of change the s and are for cb     

if (odu_i_cb_all_correct.length>=2){//change the s and are for answer key for cb
    odu_i_cb_store_panel_countA1 = 's'; 
    odu_i_cb_store_panel_countA2 = 'are';
}//end of change the s and are for answer key for cb    

odu_i_array_compare_cb = (odu_i_compareArrays(odu_i_cb_all_checked, odu_i_cb_all_correct) ? 'true' : 'false');//compare if the array either true or false


if(odu_i_array_compare_cb=='true'){//if the cb selected answer is correct
odu_i_cb_store_panel = '<div class="odu_i_panel_success odu_i_mc_panel_margin"> \
                                              <div class="odu_i_panel_header"><strong>Feedback</strong></div> \
                                              <div class="odu_i_panel_content"> \
                                              <p>The selected choice'+odu_i_cb_store_panel_count1+': <strong>'+odu_i_formatArray(odu_i_cb_all_correct)+'</strong> '+odu_i_cb_store_panel_count2+' correct!</p></div></div>';
}//end if the cb selected answer is correct    
else{//if the cb selected anwer is incorrect
odu_i_cb_store_panel = '<div class="odu_i_panel_error odu_i_mc_panel_margin"> \
                                              <div class="odu_i_panel_header"><strong>Feedback</strong></div> \
                                              <div class="odu_i_panel_content"> \
                                              <p>The selected choice'+odu_i_cb_store_panel_count1+' '+odu_i_cb_store_panel_count2+' incorrect.<br> The correct choice'+odu_i_cb_store_panel_countA1+' '+odu_i_cb_store_panel_countA2+': <strong>'+odu_i_formatArray(odu_i_cb_all_correct)+'</strong></p></div></div>'; 
}//end of if the cb selected anwer is incorrect       

$('#'+odu_i_cb_item_id).append(odu_i_cb_store_panel).fadeIn();//display the panel either correct/incorrect for cb
odu_i_cb_explanation = $('#'+odu_i_cb_item_id).find('.odu_i_cb_explanation').html();
$('#'+odu_i_cb_item_id).find('.odu_i_panel_content').append(odu_i_cb_explanation);
});//end of evaluate cb      
    



$('.odu_i_fi_item').each(function(){ //evaluate text input fi    
odu_i_fi_id_2 = $(this).attr('id');        

odu_i_fi_store_panel_count1 = '';//variable for 's' or no 's' for fi
odu_i_fi_store_panel_count2 = 'is';//variable for 'is' or 'are' for fi
odu_i_fi_store_panel_countA1 = '';//variable for correct answer 's' or no 's' for fi 
odu_i_fi_store_panel_countA2 = 'is';//variable for correct answer 'is' or 'are' for fi     
    
    
    odu_i_fi_all_correct = [];    

    odu_i_fi_all_answer = $('#'+odu_i_fi_id_2).find('input[type=text]').val();//get the answer from text input
    odu_i_fi_all_answer_trim = odu_i_fi_all_answer.split(' ').join('');//remove spaces from text input      
    odu_i_fi_all_answer_array = odu_i_fi_all_answer_trim.split(',');//store answer in an array


    $('#'+odu_i_fi_id_2).find('input[type=text]').prop('disabled',true);//disable the text input fi
    $('#'+odu_i_fi_id_2).find('input[type=text]').css({color:'black', fontWeight: 'bold'}); //make text input bold         

    odu_i_fi_explanation = '<p>'+$('#'+odu_i_fi_id_2).find('.odu_i_fi_explanation').html()+'</p>';
        $('#'+odu_i_fi_id_2).find('.odu_i_fi_A').each(function(){//add answer key to an array for evaluation
            odu_i_fi_all_correct.push($(this).text());    
        });//end of add answer key to an array for evaluation

    
    if (odu_i_fi_all_answer_array.length>=2){
    odu_i_fi_store_panel_count1 = 's';
    odu_i_fi_store_panel_count2 = 'are';    
    }    
    if (odu_i_fi_all_correct.length>=2){
    odu_i_fi_store_panel_countA1 = 's';
    odu_i_fi_store_panel_countA2 = 'are';    
    }    


    odu_i_array_compare = (odu_i_compareArrays(odu_i_fi_all_answer_array, odu_i_fi_all_correct) ? 'true' : 'false');//compare if the array either true or false   

    if (odu_i_array_compare=="true"){//if true
    $(this).find('.odu_i_mark_area').append('<span  class="odu_i_c_fi" style="color:#228b22">&#x2714;</span>');    
    odu_i_fi_store_panel = '<div class="odu_i_panel_success odu_i_mc_panel_margin"> \
                                                  <div class="odu_i_panel_header"><strong>Feedback</strong></div> \
                                                  <div class="odu_i_panel_content"> \
                                                  <p>The answer'+odu_i_fi_store_panel_count1+': <strong>'+odu_i_formatArray(odu_i_fi_all_correct)+'</strong> '+odu_i_fi_store_panel_count2+' correct!</p>'+odu_i_fi_explanation+'</div></div>';    
    }    
    else{//if false
    $(this).find('.odu_i_mark_area').append('<span  class="odu_i_x_fi" style="color:crimson">&#x2718;</span>');        
    odu_i_fi_store_panel = '<div class="odu_i_panel_error odu_i_mc_panel_margin"> \
                                                  <div class="odu_i_panel_header"><strong>Feedback</strong></div> \
                                                  <div class="odu_i_panel_content"> \
                                                  <p>The answer'+odu_i_fi_store_panel_count1+' '+odu_i_fi_store_panel_count2+' incorrect.<br> The correct answer'+odu_i_fi_store_panel_countA1+' '+odu_i_fi_store_panel_countA2+': <strong>'+odu_i_formatArray(odu_i_fi_all_correct)+'</strong></p>'+odu_i_fi_explanation+'</div></div>'; 

    }    

    $(this).append(odu_i_fi_store_panel).fadeIn();//display feedback        
});//evaluate text input fi    
    
    
$('.odu_i_drop_item').each(function(){// start of evaluation drop

odu_i_this_id = $(this).attr('id');//get item id    
    
    
$('.odu_i_drop_item select, .odu_i_drop_item label').css('cursor','not-allowed');//disable radio buttons    
$('.odu_i_drop_item select').prop('disabled',true);//disable radio buttons
$('.odu_i_drop_item select').css('color','black');         
    
odu_i_drop_answer = $(this).find('select').val();//get the selected answer
odu_i_drop_correct = $(this).find('.odu_i_drop_item_a').html().substr(0, 1);//get the text of odu_i_drop_item_a class to compare
odu_i_drop_explanation = $(this).find('.odu_i_drop_explanation').html();//get the text of the explanation    
odu_i_drop_correct_complete = $(this).find('.odu_i_drop_item_a').html();//get the complete text of odu_i_drop_item_a
    
    
if(odu_i_drop_answer==odu_i_drop_correct){//if the selected answer is correct
odu_i_drop_store_panel = '<div class="odu_i_panel_success odu_i_mc_panel_margin i-mc-panel-correct"> \
                                              <div class="odu_i_panel_header"><strong>Feedback</strong></div> \
                                              <div class="odu_i_panel_content"> \
                                              <p>The selected choice: <strong>'+odu_i_drop_correct_complete+'</strong> is correct!</p><p>'+odu_i_drop_explanation+'</p></div></div>';
odu_i_remark = '<span  class="odu_i_c" style="color:#228b22">&#x2714;</span>';

}//end if the selected answer is correct    
else{//if the selected anwer is incorrect
odu_i_drop_store_panel = '<div class="odu_i_panel_error odu_i_drop_panel_margin i-mc-panel-correct"> \
                                              <div class="odu_i_panel_header"><strong>Feedback</strong></div> \
                                              <div class="odu_i_panel_content"> \
                                              <p>The selected choice is incorrect.<br> The correct choice is: <strong>'+odu_i_drop_correct_complete +'</strong></p><p>'+odu_i_drop_explanation+'</p></div></div>'; 
odu_i_remark = '<span  class="odu_i_x" style="color:crimson">&#x2718;</span>'        
}//end of if the selected anwer is incorrect
    
$(this).hide().append(odu_i_drop_store_panel).fadeIn();//display the panel either correct/incorrect
$(this).find('select').prev('.odu_i_mark_area').append(odu_i_remark);//display the mark if check or x  
});//end of evaluation drop
    

$('.odu_i_fb_input input[type="text"]').each(function(){ //evaluate text input fb    
odu_i_fb_id_2 = $(this).attr('id');
$(this).parent().find('.odu_i_fb_mark').show();        
$(this).parent().addClass('odu_i_fb_mark_box'); 


     
        

    odu_i_fb_all_answer = $('#'+odu_i_fb_id_2).val();//get the answer from text input           
    
    $('#'+odu_i_fb_id_2).prop('disabled',true);//disable the text input fb
    $('#'+odu_i_fb_id_2).css({color:'black', fontWeight: 'bold'}); //make text input bold                
        
       
    odu_i_fb_answer = $(this).next().text();    
    
    
    if(odu_i_fb_all_answer==odu_i_fb_answer){
      $(this).parent().find('.odu_i_fb_mark').prepend('<span  class="odu_i_c_fb" style="color:#228b22">&#x2714; Correct</span>');  
    }
    else
        {
            $(this).parent().find('.odu_i_fb_mark').prepend('<span  class="odu_i_x_fb" style="color:crimson">&#x2718; Incorrect</span>');  
        }
    
    
          
});//evaluate text input fb    
    
$('.odu_i_fb_item').each(function(){//fb display feedback

    odu_i_fb_all_correct = [];
    
    odu_i_fb_store_panel_count1 = '';//variable for 's' or no 's' for fb
odu_i_fb_store_panel_count2 = 'is';//variable for 'is' or 'are' for fb
odu_i_fb_store_panel_countA1 = '';//variable for correct answer 's' or no 's' for fb 
odu_i_fb_store_panel_countA2 = 'is';//variable for correct answer 'is' or 'are' for fb
    
    
    odu_i_fb_explanation = '<p>'+$(this).find('.odu_i_fb_explanation').html()+'</p>';
        $(this).find('.odu_i_fb_A').each(function(){//add answer key to an array for evaluation
            odu_i_fb_all_correct.push($(this).text());    
        });//end of add answer key to an array for evaluation  
    
    if (odu_i_fb_all_correct.length>=2){
    odu_i_fb_store_panel_countA1 = 's';
    odu_i_fb_store_panel_countA2 = 'are';    
    } 
    
   
odu_i_fb_store_panel = '<div class="odu_i_panel_retry odu_i_mc_panel_margin"> \
                                                  <div class="odu_i_panel_header"><strong>Feedback</strong></div> \
                                                  <div class="odu_i_panel_content"> \
                                                  <p>The correct answer'+odu_i_fb_store_panel_countA1+' '+odu_i_fb_store_panel_countA2+': <strong>'+odu_i_formatArray(odu_i_fb_all_correct)+'</strong></p>'+odu_i_fb_explanation+'</div></div>';    

    $(this).append(odu_i_fb_store_panel).fadeIn();//display feedback 
    
});//end of fb evaluation
    
  
    
    
}//end of 'if' all form items are answered    

    
else{//'if' SOME form items are answered
    
alert('Some items or questions are unanswered.');    
  
$('.odu_i_mc_item').each(function(){// start of evaluation for mc
odu_i_this_id_mc = $(this).attr('id');//get item id    
odu_i_mc_item_validation = $('#'+odu_i_this_id_mc+' input[type=radio]:checked').length;    
if (odu_i_mc_item_validation==0){//if there is no answer for mc
$(this).prepend(odu_i_notification_validate).fadeIn();
}//end of if there is no answer for mc  
});//end of evaluation for mc    
    
$('.odu_i_cb_item').each(function(){//evaluate cb

odu_i_this_id_cb = $(this).attr('id');//get item id    
odu_i_cb_item_validation = $('#'+odu_i_this_id_cb+' input[type=checkbox]:checked').length;        
if (odu_i_cb_item_validation==0){//if cb has no answer --validation
$(this).prepend(odu_i_notification_validate).fadeIn();    
}//end of if cb has no answer --validation   
});//end of evaluate cb     

    
$('.odu_i_fi_item').each(function(){ //evaluate text input fi    
odu_i_fi_id_2 = $(this).attr('id');        
odu_i_fi_value_2 = $('#'+odu_i_fi_id_2).find('input[type="text"]').val();//get value for validation    
    
if (odu_i_fi_value_2.length==0){
  $(this).prepend(odu_i_notification_validate).fadeIn();  
}//end of validate--fi has no answer        
});//evaluate text input fi      
    

$('.odu_i_drop_item select option:selected').each(function(){// start of evaluation drop
odu_i_this_id_drop = $(this).attr('id');//get item id    
odu_i_this_drop_value = $(this).val();//get value for validation        

if (odu_i_this_drop_value.length==0){
 $(this).parent().before(odu_i_notification_validate).fadeIn();      
}    
    
});//end of evaluation drop        
    

    
$('.odu_i_fb_item').each(function(){
    odu_i_fb_item_get_values_array = [];
    odu_i_fb_count_input = $(this).find('input[type=text]').length;
    $(this).find('input[type=text]').each(function(){        
        odu_i_fb_get_values = $(this).val();
        if (odu_i_fb_get_values.length>0){
            odu_i_fb_item_get_values_array.push(odu_i_fb_get_values);
            }
    });
    
    if(odu_i_fb_item_get_values_array.length<odu_i_fb_count_input)
       {
      $(this).prepend(odu_i_notification_validate).fadeIn();   
    }
    
});
    

    
    
    
    
    
    
    
}//end of else     
    
    
    
$('.odu_i_retry').click(function(){//start over or try again
location.reload();       
});      
    
    
});//end of odu_i_submit    

  
    
  