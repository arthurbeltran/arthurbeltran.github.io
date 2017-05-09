//One at a time ver04132017
    
var odu_i_total_items_mc =$('.odu_i_mc_item').length;//global variable, total number of mc items
var odu_i_totalItemsDrop =$('.odu_i_drop_item').length;//global variable, total number of items   
var odu_i_totalPredefinedChoicesDrop = $('.odu_i_drop_choices_list li').length;//global variable, total number of predefined choices
var odu_i_notification_validate = '<div class="odu_i_validate"><span class="odu_i_circle">!</span> Please respond to this item or question before you answer the next item or question.</div>';

    
$(document).ready(function(){//start of document ready    
    
function odu_i_formatArray(odu_i_arr){//array value formatting cb and fi
    var odu_i_outStr = '';
    if (odu_i_arr.length === 1) { 
        odu_i_outStr = odu_i_arr[0];
    } else if (odu_i_arr.length === 2) {
        //joins all with "and" but no commas        
        odu_i_outStr = odu_i_arr.join(' and ');
    } else if (odu_i_arr.length > 2) {
        //joins all with commas, but last one gets ", and"        
        odu_i_outStr = odu_i_arr.slice(0, -1).join(', ') + ', and ' + odu_i_arr.slice(-1);
    }
    return odu_i_outStr;
}//end of array value formatting cb and fi            
    
function odu_i_compareArrays(odu_i_arr1, odu_i_arr2) {//compare simple arrays for cb and fi
    return $(odu_i_arr1).not(odu_i_arr2).length == 0 && $(odu_i_arr2).not(odu_i_arr1).length == 0
};//end of compare simple arrays for cb and fi         
    
    
    
$('.odu_i_clear').empty();
    
    
$('div[class$="_item"]').each(function(){
    odu_i_index_numbering=$(this).index('div[class$="_item"]')+1;
    $(this).attr('id','odu_i_item_'+odu_i_index_numbering);
});    
 
var odu_i_total_items_All = $('[id^="odu_i_item_"]').length;//count all items     
    
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
    
$('.odu_i_drop_item select').prop('selectedIndex', 0);//bring back selection to blank//
$('.odu_i_drop_item select').removeAttr('disabled');//enable select upon refresh//    
$('.odu_i_drop_item select').attr('autocomplete', 'off');//remove previous selection upon refresh

$('.odu_i_retry').hide();    
    
$('[id^="odu_i_item_"]').hide();

$('[id^="odu_i_item_"]').each(function(){
    $(this).append('<button class="odu_i_button odu_i_submit">Submit</button>');
    $(this).append('<button class="odu_i_button odu_i_next" style="background:SLATEGRAY">Next</button>');
    $(this).append('<button class="odu_i_button odu_i_review" style="background:Crimson">Review Activity</button>');
    $(this).find('.odu_i_next').hide();//hide the next button
    $(this).find('.odu_i_review').hide();//hide the next button
});    
    
    
$('[id^="odu_i_item_"]:first').show();
    
    
$('.odu_i_mc_item').each(function(){//labelling the choices for mc // 
odu_i_get_mc_id = $(this).attr('id');//get the id of the item    
odu_i_get_mc_id_for_numbering = odu_i_get_mc_id.substring(11);//get the number at the end of the id for numbering purposes
$(this).find('legend').prepend('<strong>Question '+odu_i_get_mc_id_for_numbering+' of '+odu_i_total_items_All+'</strong><br>');    
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
$(this).find('legend').prepend('<strong>Question '+odu_i_get_cb_id_for_numbering+' of '+odu_i_total_items_All+'</strong><br>');    
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
$(this).find('label').before('<strong>Question '+odu_i_get_fi_id_for_numbering+' of '+odu_i_total_items_All+'</strong><br>');
$(this).find('label').attr('for',odu_i_get_fi_id+'_text_input');    
$(this).find('label').after('<div class="odu_i_clear"></div>');    
$(this).find('input[type="text"]').before('<div class="odu_i_mark_area">&nbsp;</div>');      
$(this).find('input[type="text"]').attr('id',odu_i_get_fi_id+'_text_input');//add id to text input label
$(this).find('input[type="text"]').attr('name',odu_i_get_fi_label_value);//add the name for text input label
$(this).find('.odu_i_submit').css('margin-top','5px');        
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
 
    
 odu_i_all_good1=0;   

$('.odu_i_submit').click(function(){//start of odu_i_submit     

    
$(this).hide();//hide submit button
odu_i_current_id = $(this).parent().attr('id');    
odu_i_parent_class = $('#'+odu_i_current_id).attr('class'); 
$('.odu_i_validate').remove();   
    
    
    
switch(odu_i_parent_class){
case 'odu_i_mc_item'://if item is mc         
    odu_i_this_id_mc = odu_i_current_id;//get item id    
    odu_i_mc_item_validation = $('#'+odu_i_this_id_mc+' input[type=radio]:checked').length;    
    if (odu_i_mc_item_validation==0){//if there is no answer for mc
    $('#'+odu_i_this_id_mc).prepend(odu_i_notification_validate).fadeIn();           
    $(this).show();//show again the submit button
    $('#'+odu_i_this_id_mc).find('input[type="radio"]').click(function(){
        $('#'+odu_i_this_id_mc).find('.odu_i_validate').slideUp();
    });
    }//end of if there is no answer for mc      

    else{//there is an answer for mc
        $('#'+odu_i_this_id_mc+' input[type=radio], '+'#'+odu_i_this_id_mc+' label').css('cursor','not-allowed');//disable radio buttons    
        $('#'+odu_i_this_id_mc+' input[type=radio]').prop('disabled',true);//disable radio buttons  
        odu_i_answer_mc = $('#'+odu_i_this_id_mc).find('input[type=radio]:checked').next('label').text();//get the label text of the selected choice
        odu_i_correct_mc = $('#'+odu_i_this_id_mc).find('input[data-value="correct"]').next('label').text();//get the label text of the correct choice
        odu_i_mc_explanation = '<p>'+$('#'+odu_i_this_id_mc).find('.odu_i_mc_explanation').html()+'</p>';    
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

//            $(odu_i_this_id_mc).hide().append().fadeIn();//display the panel either correct/incorrect
        $('#'+odu_i_this_id_mc+' .odu_i_next').before(odu_i_store_panel_mc+'<br>').fadeIn();


        $('#'+odu_i_this_id_mc).find('input[type=radio]:checked').prev('.odu_i_mark_area').append(odu_i_remark);//display the mark if check or x       
        $(this).next().show();
        odu_i_all_good1++;
    }//end if there is answer
        
        
       
break;//end if item is mc
        
        
case 'odu_i_cb_item'://if item is checkbox
   

    odu_i_this_id_cb = odu_i_current_id//get item id   checkbox
    odu_i_cb_item_validation = $('#'+odu_i_this_id_cb+' input[type=checkbox]:checked').length;        
    if (odu_i_cb_item_validation==0){//if cb has no answer --validation
    $('#'+odu_i_this_id_cb).prepend(odu_i_notification_validate).fadeIn(); 
    $(this).show();//show again the submit button
    $('#'+odu_i_this_id_cb).find('input[type="checkbox"]').click(function(){
        $('#'+odu_i_this_id_cb).find('.odu_i_validate').slideUp();
    });    
    }//end of if cb has no answer --validation   
    else{
     $('#'+odu_i_this_id_cb+' input[type="checkbox"]').css('cursor','not-allowed');//disable checkboxes buttons
    $('#'+odu_i_this_id_cb+' input[type="checkbox"]').next('label').css('cursor','not-allowed');//disable checkboxes buttons        
    $('#'+odu_i_this_id_cb+' input[type="checkbox"]').prop('disabled',true);//disable checkboxes buttons  
        odu_i_cb_all_checked = []; //array variable for checked boxes for cb    
        odu_i_cb_all_correct = [];

        $('#'+odu_i_this_id_cb).find('input[type="checkbox"]:checked').each(function(){//evalauate checked items
            
            odu_i_cb_store_panel_count1 = '';//variable for 's' or no 's' for cb 
            odu_i_cb_store_panel_count2 = 'is';//variable for 'is' or 'are' for cb
            odu_i_cb_store_panel_countA1 = '';//variable for correct answer 's' or no 's' for cb 
            odu_i_cb_store_panel_countA2 = 'is';//variable for correct answer 'is' or 'are' for cb 
            
            odu_i_cb_all_checked.push($(this).next('label').html());//collect checked box since 2 or more can be answers
            if($(this).attr('data-value')=='correct'){//if correct
                    odu_i_remark = '<span  class="odu_i_c" style="color:#228b22">&#x2714;</span>';        
            }
            else{//if incorrect
               odu_i_remark = '<span  class="odu_i_x" style="color:crimson">&#x2718;</span>'; 
            }

            $(this).prev('.odu_i_mark_area').append(odu_i_remark);//display if check or x 
        });//end of evalauate checked boxes

        $('#'+odu_i_this_id_cb).find('input[data-value="correct"]').each(function(){//collect answer key
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

    $('#'+odu_i_this_id_cb+' .odu_i_next').before(odu_i_cb_store_panel+'<br>').fadeIn();//display the panel either correct/incorrect for cb
    odu_i_cb_explanation = $('#'+odu_i_this_id_cb).find('.odu_i_cb_explanation').html();
    $('#'+odu_i_this_id_cb).find('.odu_i_panel_content').append(odu_i_cb_explanation);
     $(this).next().show();
    odu_i_all_good1++;    
    }//end of if cb has answer

break;//end if ite is checkbox

case 'odu_i_fi_item'://if item is fi
odu_i_fi_store_panel_count1 = '';//variable for 's' or no 's' for fi
odu_i_fi_store_panel_count2 = 'is';//variable for 'is' or 'are' for fi
odu_i_fi_store_panel_countA1 = '';//variable for correct answer 's' or no 's' for fi 
odu_i_fi_store_panel_countA2 = 'is';//variable for correct answer 'is' or 'are' for fi  
odu_i_fi_id_2 = odu_i_current_id;
odu_i_fi_value_2 = $('#'+odu_i_fi_id_2).find('input[type="text"]').val();//get value for validation        
        
if (odu_i_fi_value_2.length==0){
  $('#'+odu_i_fi_id_2).prepend(odu_i_notification_validate).fadeIn();
  $(this).show();//show again the submit button
  $('#'+odu_i_fi_id_2).find('input[type="text"]').click(function(){
      $('#'+odu_i_fi_id_2).find('.odu_i_validate').slideUp();
  });    
}//end of validate--fi has no answer
else{   
    
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
    $('#'+odu_i_fi_id_2).find('.odu_i_mark_area').append('<span  class="odu_i_c_fi" style="color:#228b22">&#x2714;</span>');    
    odu_i_fi_store_panel = '<div class="odu_i_panel_success odu_i_mc_panel_margin"> \
                                                  <div class="odu_i_panel_header"><strong>Feedback</strong></div> \
                                                  <div class="odu_i_panel_content"> \
                                                  <p>The answer'+odu_i_fi_store_panel_count1+': <strong>'+odu_i_formatArray(odu_i_fi_all_correct)+'</strong> '+odu_i_fi_store_panel_count2+' correct!</p>'+odu_i_fi_explanation+'</div></div>';    
    }    
    else{//if false
    $('#'+odu_i_fi_id_2).find('.odu_i_mark_area').append('<span  class="odu_i_x_fi" style="color:crimson">&#x2718;</span>');        
    odu_i_fi_store_panel = '<div class="odu_i_panel_error odu_i_mc_panel_margin"> \
                                                  <div class="odu_i_panel_header"><strong>Feedback</strong></div> \
                                                  <div class="odu_i_panel_content"> \
                                                  <p>The answer'+odu_i_fi_store_panel_count1+' '+odu_i_fi_store_panel_count2+' incorrect.<br> The correct answer'+odu_i_fi_store_panel_countA1+' '+odu_i_fi_store_panel_countA2+': <strong>'+odu_i_formatArray(odu_i_fi_all_correct)+'</strong></p>'+odu_i_fi_explanation+'</div></div>'; 

    }    

    $('#'+odu_i_fi_id_2+' .odu_i_next').before(odu_i_fi_store_panel+'<br>').fadeIn();//display feedback  
    $(this).next().show();
    odu_i_all_good1++;
    
    
}
break;//if item is fi                

//case 'odu_i_drop_columns'://if item is matching type
//odu_i_this_id_drop_main = odu_i_current_id;//get item id    
//odu_i_count_drop = $('.odu_i_drop_item').length;//count drop
//odu_i_count_drop_value_array=[];
////alert('odu_i_count_drop: '+odu_i_count_drop);        
//
//
//$('#'+odu_i_this_id_drop_main+' .odu_i_drop_item').each(function(){// start of evaluation drop   
//odu_i_drop_answer_2 = $(this).find('select option:selected').val();//get the selected answer  
//odu_i_this_id = $(this).attr('id');//get item id     
//    
//if(odu_i_drop_answer_2.length>0){
//   odu_i_count_drop_value_array.push(odu_i_drop_answer_2);       
//}    
//else if(odu_i_drop_answer_2.length==0){
//     $(this).before(odu_i_notification_validate).fadeIn();
//    $(this).find('select').click(function(){
//        $(this).parent().prev().slideUp();
//    });
//} 
//
//                                  
//if(odu_i_count_drop_value_array.length==odu_i_count_drop){    
//    $('#'+odu_i_this_id_drop_main+' .odu_i_drop_item select').css('cursor','not-allowed');//disable radio buttons    
//    $('#'+odu_i_this_id_drop_main+' .odu_i_drop_item select').prop('disabled',true);//disable radio buttons
//    $('#'+odu_i_this_id_drop_main+' .odu_i_drop_item select').css('color','black');         
//
//
//    odu_i_drop_correct = $('#'+odu_i_this_id).find('.odu_i_drop_item_a').html().substr(0, 1);//get the text of odu_i_drop_item_a class to compare
//    odu_i_drop_explanation = $('#'+odu_i_this_id).find('.odu_i_drop_explanation').html();//get the text of the explanation    
//    odu_i_drop_correct_complete = $('#'+odu_i_this_id).find('.odu_i_drop_item_a').html();//get the complete text of odu_i_drop_item_a
//
//
//    if(odu_i_drop_answer==odu_i_drop_correct){//if the selected answer is correct
//    odu_i_drop_store_panel = '<div class="odu_i_panel_success odu_i_mc_panel_margin i-mc-panel-correct"> \
//                                                  <div class="odu_i_panel_header"><strong>Feedback</strong></div> \
//                                                  <div class="odu_i_panel_content"> \
//                                                  <p>The selected choice: <strong>'+odu_i_drop_correct_complete+'</strong> is correct!</p><p>'+odu_i_drop_explanation+'</p></div></div>';
//    odu_i_remark = '<span  class="odu_i_c" style="color:#228b22">&#x2714;</span>';
//
//    }//end if the selected answer is correct    
//    else{//if the selected anwer is incorrect
//    odu_i_drop_store_panel = '<div class="odu_i_panel_error odu_i_drop_panel_margin i-mc-panel-correct"> \
//                                                  <div class="odu_i_panel_header"><strong>Feedback</strong></div> \
//                                                  <div class="odu_i_panel_content"> \
//                                                  <p>The selected choice is incorrect.<br> The correct choice is: <strong>'+odu_i_drop_correct_complete +'</strong></p><p>'+odu_i_drop_explanation+'</p></div></div>'; 
//    odu_i_remark = '<span  class="odu_i_x" style="color:crimson">&#x2718;</span>'        
//    }//end of if the selected anwer is incorrect
//
//    $('#'+odu_i_this_id).hide().append(odu_i_drop_store_panel).fadeIn();//display the panel either correct/incorrect
//    $('#'+odu_i_this_id).find('select').prev('.odu_i_mark_area').append(odu_i_remark);//display the mark if check or x
//    //next button should show up//    
//}
//    
//    
//});//end of validation for drop         
//break;                 

    
        
        
}//end of switch


get_odu_i_current_id_number =  odu_i_current_id.substring(11);       
if (get_odu_i_current_id_number==odu_i_total_items_All && odu_i_all_good1 == odu_i_total_items_All){
    $('.odu_i_next').hide();
    $('.odu_i_review').fadeIn();
}    


$('.odu_i_review').click(function(){
    $('.odu_i_review').hide();
    $('[id^="odu_i_item_"]').show();
    $('.odu_i_retry').show();
});
    
    
$('.odu_i_next').click(function(){//start of next button
    get_current_odu_i_id = $(this).parent().attr('id');
    extract_current_odu_i_id = get_current_odu_i_id.substring(11);
    $('#'+get_current_odu_i_id).next().fadeIn();
    $('#'+get_current_odu_i_id).hide();           
    });   

    
$('.odu_i_retry').click(function(){//start over or try again
location.reload();       
});      
    
    
});//end of odu_i_submit    
          
    
    
});//end of document ready