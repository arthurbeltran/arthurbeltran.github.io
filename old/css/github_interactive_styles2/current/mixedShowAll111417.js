//mixed showAll version 111417
$(document).ready(function(){//start of document ready     

//global items    
odu_i_validate = 0;//validate initial value
odu_i_notification_validate = '<div class="odu_i_validate"><span class="odu_i_circle">!</span> Please respond to this item or question before you can submit your answers.</div>';//validate text    
    



    
$('div[class$="_item"]').each(function(){//add id to each item
    odu_i_index_numbering=$(this).index('div[class$="_item"]')+1;
    $(this).attr('id','odu_i_item_'+odu_i_index_numbering);
});    
    

$('input').each(function(){
        $(this).keyup(function(){
            $(this).attr('value',$(this).val());
        });
});    
    
         
    
$.fn.odu_i_f_FirefoxFormBug = function(contentArea){//firefox form bugs, clear form elements upon refresh   
    $(contentArea).find('input[type="radio"], input[type="checkbox"], input[type="text"], select, textarea').removeAttr('disabled');//enable form inputs
    
    $(contentArea).find('input[type="radio"], input[type="checkbox"]').removeAttr('checked');//unselect radio/check buttons
    
    $(contentArea).find('input[type="text"]').val('');//remove user input text after refresh
    
    $(contentArea).find('textarea').val('');//remove user input text after refresh
    
    $(contentArea).find('select').prop('selectIndex',0);//bring back selection to blank
    $(contentArea).find('select').attr('autocomplete', 'off');//remove previous selection upon refresh    
    
}


$.fn.odu_i_f_getIDandOrder = function(itemType,labelArea){//get id and numbering    
    $(itemType).each(function(){
        var odu_i_get_item_id = $(this).attr('id');
        var odu_i_get_item_id_order = odu_i_get_item_id.substring(11);
        $(this).find(labelArea).prepend(odu_i_get_item_id_order+'. ');
    }); 
} 


$.fn.odu_i_f_labelMcCb = function(itemType,inputType){//label for mc, cb    
    
    $(itemType).each(function(){
            var odu_i_get_item_id = $(this).attr('id');
            var odu_i_f_index=1;

            $(this).find('input[type='+inputType+']').each(function(){//labelling for item choices    
                $(this).attr('id',odu_i_get_item_id+'_choice'+odu_i_f_index++);//label the choice with an id
                $(this).attr('name',odu_i_get_item_id);//label the choice with a name

                var odu_i_get_item_choice_value = $(this).next('label').text();//get the label text, choice text
                $(this).attr('value',odu_i_get_item_choice_value);//label the value of the choice

               var odu_i_get_item_label_for = $(this).attr('id');//get the choice id
               $(this).next('label').attr('for',odu_i_get_item_label_for);//label the 'for' of the <label> 
            });
    });
}


$.fn.odu_i_f_labelQnA = function(itemType){//label for fi or qna item    
    $(itemType).each(function(){
        var odu_i_get_item_id = $(this).attr('id');
        odu_i_get_item_label_value = $(this).find('label').text();    
        $(this).find('label').attr('for',odu_i_get_item_id+'_text_input');    
        $(this).find('label').after('<div class="odu_i_clear"></div>');    
        $(this).find('textarea').before('<div class="odu_i_mark_area">&nbsp;</div>');     
        $(this).find('textarea').attr('id',odu_i_get_item_id+'_text_input');//add id to text input label
        $(this).find('textarea').attr('name',odu_i_get_item_label_value);//add the name for text input label    
        $(this).find('.odu_i_mark_area').show();
        
        
        var odu_i_get_condition = $(this).find('.odu_i_qna_a').attr('data-condition');
        var odu_i_count_a = $(this).find('.odu_i_qna_a').length;
        
        switch(odu_i_get_condition){                    
            case undefined:
            case false:
                if(odu_i_count_a>1){
                  $(this).find('textarea').attr('rows',odu_i_count_a);  
                }
                else{
                  $(this).find('textarea').attr('rows',1);
                  $(this).find('textarea').css({'resize':'none', 'height':'20px'}); 
                }                
                break;    
            default:
                $(this).find('textarea').attr('rows',1);
                $(this).find('textarea').css({'resize':'none', 'height':'20px'});
            }//end switch              
    });
} 


function odu_i_formatArray(odu_i_arr){//array value formatting cb, fi and fb
    var odu_i_outStr = '';
    if (odu_i_arr.length === 1) {
        odu_i_outStr = odu_i_arr[0];
    } else if (odu_i_arr.length === 2) {
        odu_i_outStr = odu_i_arr.join(' <span style="font-weight:100">and</span> ');
    } else if (odu_i_arr.length > 2) {
        odu_i_outStr = odu_i_arr.slice(0, -1).join(', ') + ', <span style="font-weight:100">and</span> ' + odu_i_arr.slice(-1);
    }
    return odu_i_outStr;
}//end of array value formatting cb and fi            
    
function odu_i_compareArrays(odu_i_arr1, odu_i_arr2) {//compare simple arrays for cb, fi, fb, qna
    return $(odu_i_arr1).not(odu_i_arr2).length === 0 && $(odu_i_arr2).not(odu_i_arr1).length === 0;
}//end of compare simple arrays for cb and fi     
    
    
function odu_i_formatArray2(odu_i_arr){//utility: array value formatting fi_or
    var odu_i_outStr = '';
    if (odu_i_arr.length === 1) {
        odu_i_outStr = odu_i_arr[0];
    } else if (odu_i_arr.length >= 2) {
        odu_i_outStr = odu_i_arr.join(' <span style="font-weight:100">or</span> ');
    } 
    return odu_i_outStr;
}//end of array value formatting fi_or
    

function odu_i_f_containsAny(sourceArray,targetArray){//compare an element of an array if it exist with another array
    var result = sourceArray.filter(function(item){ 
        return targetArray.indexOf(item) > -1;
    });   
    return (result.length > 0);//true or false  
} 


$.fn.odu_i_f_mark = function(itemId,inputType,itemResponse,fbVal){//submit: adding the check or x mark
    
    if(fbVal==''|| fbVal===undefined || fbVal==false) fbVal = ''; 
    
    
    if (itemResponse == undefined){
        itemResponse = '';
    }    
        
    var odu_i_mark_value_correct = '<span  class="odu_i_check" style="color:#228b22">&#x2714;</span>';
    var odu_i_mark_value_incorrect = '<span  class="odu_i_x" style="color:crimson">&#x2718;</span>';
    
    switch(inputType){

        case 'radio':           
             var odu_i_data_value = $(itemId).find('input[type='+inputType+']:checked').attr('data-value');            
             var odu_i_mark_value = (odu_i_data_value==='correct')? odu_i_mark_value_correct:odu_i_mark_value_incorrect;
            $(itemId).find('input[type='+inputType+']:checked').prev('.odu_i_mark_area').append(odu_i_mark_value);
            break;
            
        case 'checkbox':                
            $(itemId).find('input[type='+inputType+']:checked').each(function(){
                var odu_i_data_value = $(this).attr('data-value');                
                var odu_i_mark_value = (odu_i_data_value==='correct')? odu_i_mark_value_correct:odu_i_mark_value_incorrect;                
                $(this).prev('.odu_i_mark_area').append(odu_i_mark_value);               
            });            
            break;
            
        case 'textarea':            
            var odu_i_mark_value = (itemResponse===1)? odu_i_mark_value_correct:odu_i_mark_value_incorrect;
            $(itemId).find('.odu_i_mark_area').append(odu_i_mark_value);
            break;
            
        case 'text':
            var odu_i_fb_val_formatted = '<div class="odu_i_fb_incorrect_feedback"><div style="font-size:small; text-align:left">Correct Answer:</div><span style="font-weight:bold;">'+fbVal+'</span></div>';
            var odu_i_mark_value = (itemResponse===1)? odu_i_mark_value_correct+' <strong style="color:green">Correct</strong>':odu_i_mark_value_incorrect+' <strong style="color:crimson">Incorrect</strong>'+odu_i_fb_val_formatted;            
            $(itemId).find('.odu_i_fb_mark').show();
            $(itemId).addClass('odu_i_fb_mark_box');            
            $(itemId).find('.odu_i_fb_mark').prepend(odu_i_mark_value);  
            var odu_i_input_width = $(itemId).find('.odu_i_fb_mark').width();
            $(itemId).find('input[type="text"]').css('width',odu_i_input_width);            
            break;
            
    }
}



    
$('.odu_i_content_area').odu_i_f_FirefoxFormBug('.odu_i_content_area');//add the form debugger
    
$('.odu_i_clear').empty();//empty tag from &nbsp;    
    
$('.odu_i_mc_item label, .odu_i_cb_item label ').after('<div class="odu_i_clear odu_i_add_margin_bottom"></div>');//add clear and margin bottom
$('.odu_i_mc_item input, .odu_i_cb_item input').before('<div class="odu_i_mark_area">&nbsp;</div>');//add the check or x area
    
$('.odu_i_mc_item').odu_i_f_getIDandOrder('.odu_i_mc_item','legend');//numbering for mc items
$('.odu_i_mc_item').odu_i_f_labelMcCb('.odu_i_mc_item','radio');//label mc items  
    
$('.odu_i_cb_item').odu_i_f_getIDandOrder('.odu_i_cb_item','legend');//numbering for cb items
$('.odu_i_mc_item').odu_i_f_labelMcCb('.odu_i_cb_item','checkbox');//label the cb item     
    
$('.odu_i_qna_item').odu_i_f_getIDandOrder('.odu_i_qna_item','label');//numbering for qna item
$('.odu_i_qna_item').odu_i_f_labelQnA('.odu_i_qna_item');//label for qna 
    
$('.odu_i_sr_item').odu_i_f_getIDandOrder('.odu_i_sr_item','label');//numbering for sr item
   
    
    
    

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
    
    
    
$('div[class$="_explanation"]').each(function(){//remove empty explanation divs
    if ($(this).length==0 || $(this).html()=='&nbsp;'){
        $(this).empty();
    }
});    
    
        
$('div[class$="_item"]').click(function(){//remove the validation notification
    $(this).find('.odu_i_validate').slideUp();
});    
    
 

$.fn.odu_i_f_disableMcCb = function(itemType, inputType){ //submit: disable mc cb    
    $(itemType).find('input[type="'+inputType+'"]').css('cursor','not-allowed');
    $(itemType).find('input[type="'+inputType+'"]').prop('disabled','true');
    $(itemType).find('label').css('cursor','not-allowed'); 
}


$.fn.odu_i_f_disableQnaFb = function(itemType,selector){//submit: disable text input    
    $(itemType).find(selector).css({'color':'black','font-weight':'bold'});
    $(itemType).find(selector).prop('disabled',true);
    $(itemType).find(selector).css('cursor','not-allowed'); 
}


$.fn.odu_i_count_items_validation = function(){// submit: count the items and answers
    
    $('.odu_i_content_area').find('div[class$="_item"]').each(function(){
        
        var odu_i_item_class = $(this).attr('class');
        
        switch(odu_i_item_class){               
            case 'odu_i_mc_item':
            case 'odu_i_cb_item':    
                var odu_i_count_mc_cb_item = $(this).length;
                var odu_i_count_mc_cb_user_input = $(this).find('input:checked').length;
                if(odu_i_count_mc_cb_item > odu_i_count_mc_cb_user_input){
                    odu_i_validate++;
                    if(odu_i_count_mc_cb_user_input==0){
                        $(this).prepend(odu_i_notification_validate).fadeIn();
                    }
                }
            break;
            
            case 'odu_i_qna_item':
            case 'odu_i_sr_item':    
                $(this).find('textarea').each(function(){
                    var odu_i_trim_qna_textarea  = $(this).val().trim();
                    if(odu_i_trim_qna_textarea.length==0 || odu_i_trim_qna_textarea==' '){
                        odu_i_validate++;
                        $(this).parent().prepend(odu_i_notification_validate).fadeIn();
                    }//if QnA or sr is blank
                    
                });
            break;    
            
            case 'odu_i_fb_item':                
                $(this).each(function(){
                    var odu_i_count_fb_input  = $(this).find('input[type="text"]').length;//count the number of input[text]                   
                    var odu_i_fb_userInput_array = [];//array for user input
                    $(this).find('input[type="text"]').each(function(){//get the user input, push to array if there is value/answered                    
                        var odu_i_user_input_fb = $(this).val().trim();
                        if(odu_i_user_input_fb.length>0){
                           odu_i_fb_userInput_array.push(odu_i_user_input_fb);
                           }
                    });
                    
                    if(odu_i_count_fb_input!=odu_i_fb_userInput_array.length){//if no answer in either of the input[text]                       
                        odu_i_validate++;
                        $(this).prepend(odu_i_notification_validate).fadeIn();
                       }
                });
                break;
                
        }//end of switch
    
    });
    
}


$.fn.odu_i_f_FeedbackPanel = function(response,itemId,itemType,userInput,answerKey,answerFeedback,itemUserInputCount,answerKeyCount,numStatement){//submit: contents of the feedback panel   
    var odu_i_format_user_input = '<strong>'+userInput+'</strong>';
    var odu_i_format_answer_key = '<strong>'+answerKey+'</strong>';
    
    
    
    if (answerFeedback.length == 0 || answerFeedback==='undefined'){//if explanation is empty
        answerFeedback = '';
    } 
    
    var odu_i_user_input_s = (itemUserInputCount>1)? 's':'';//if user input is more than one, add 's'
    var odu_i_user_input_are = (itemUserInputCount>1)? 'are':'is';//if user input is more than one, add 'are'
    
    var odu_i_answer_key_s = (answerKeyCount>1)? 's':'';//if answer is more than one, add 's'
    var odu_i_answer_key_are = (answerKeyCount>1)? 'are':'is';//if answer is more than one, add 'are'
    
    
    switch(itemType){
        case '.odu_i_sr_item':
            var odu_i_correct_statement = '';            
            break;
        default:
            var odu_i_correct_statement = '<p>The answer'+odu_i_user_input_s+', '+odu_i_format_user_input+' '+odu_i_user_input_are+' correct!</p>';
            }
    
    
    
    switch(itemType){
        case '.odu_i_cb_item':           
            var odu_i_incorrect_statement = 'Some or all of the answers are incorrect.';
            break;
            
        
        case '.odu_i_qna_item':
            var odu_i_incorrect_statement = (itemUserInputCount > 1)? 'Some or all of the answers are incorrect.':'The answer'+odu_i_user_input_s+' '+odu_i_user_input_are+' incorrect.';
            break;
            
        case '.odu_i_fb_item':         
            var odu_i_incorrect_statement = (itemUserInputCount > 1)? 'Some or all of the answers are incorrect.':'The answer'+odu_i_user_input_s+' '+odu_i_user_input_are+' incorrect.';
            numStatement = '&nbsp;';
            break;
            
        case '.odu_sr_item':
            numStatement = '&nbsp;';
            break;
            
        default:
            var odu_i_incorrect_statement = 'The answer'+odu_i_user_input_s+' '+odu_i_user_input_are+' incorrect.';
      }
    
    
    
    if(numStatement.length== 0 || numStatement == 'undefined' ){
        numStatement =  'The correct answer'+odu_i_answer_key_s+' '+odu_i_answer_key_are+' '+odu_i_format_answer_key+'.';
    }
    
    if (response==1){ //if user input is correct       
    
        var odu_i_feedback_panel = '<div class="odu_i_panel odu_i_panel_success" style="display:none">\
                                <div class="odu_i_panel_header"><strong>Feedback</strong></div>\
                                <div class="odu_i_panel_content">\
                                '+odu_i_correct_statement+answerFeedback+'\
                                </div>';
    }
    else {//if user input is incorrect                
        var odu_i_feedback_panel = '<div class="odu_i_panel odu_i_panel_error" style="display:none">\
                               <div class="odu_i_panel_header"><strong>Feedback</strong></div>\
                              <div class="odu_i_panel_content">\
                              <p>\
                               '+odu_i_incorrect_statement+'\
                               '+numStatement+'</p>\
                               '+answerFeedback+'</div>';
    }
    
    $(this).append(odu_i_feedback_panel);
    $(this).find('.odu_i_panel').fadeIn();   
    
}


    
$.fn.odu_i_f_checkMcCb = function (itemType,inputType){//submit: check mc cb
    
    $(itemType).each(function(){
        
        $(this).find('input[type="'+inputType+'"]:checked').attr('checked','checked');
        
        var odu_i_numStatement = '';
        var odu_i_count_item_answered = $(this).find('input[type="'+inputType+'"]:checked').length;//count the user input
        var odu_i_count_answer_key = $(this).find('input[data-value="correct"]').length; //count the number of answer key
        var odu_i_get_item_id = '#'+$(this).attr('id');          
        var odu_i_get_explanation = $(this).find('div[class$="_explanation"]').text();
            
            switch(itemType){
                
                case '.odu_i_mc_item':
                    $(this).odu_i_f_disableMcCb(this,'radio');                    
                    var odu_i_get_user_input_text_Mc = $(this).find('input[type=radio]:checked').next('label').text();//get the label of the user choice
                    var odu_i_get_key_Mc = $(this).find('input[data-value="correct"]').next('label').text();//get the label of the answer key
                    var odu_i_asses_Mc = (odu_i_get_user_input_text_Mc==odu_i_get_key_Mc)? 1:0; 
                                        
                    $(this).odu_i_f_mark(this,'radio');//check or x mark
                    
                    $(this).odu_i_f_FeedbackPanel(
                    odu_i_asses_Mc,
                    this,
                    itemType,    
                    odu_i_get_user_input_text_Mc,
                    odu_i_get_key_Mc,
                    odu_i_get_explanation,
                    odu_i_count_item_answered,
                    odu_i_count_answer_key,
                    odu_i_numStatement    
                    );                         
                    
                break;
                
                case '.odu_i_cb_item':
                   $(this).odu_i_f_disableMcCb(this,'checkbox');
                    
                    var odu_i_get_user_input_text_array_Cb = [];
                   $(this).find('input[type="checkbox"]:checked').each(function(){                       
                        var odu_i_get_user_input_text_Cb = $(this).next('label').text();
                        odu_i_get_user_input_text_array_Cb.push(odu_i_get_user_input_text_Cb);
                       
                   });
                    
                    var odu_i_get_key_text_array_Cb = [];
                    $(this).find('input[data-value="correct"]').each(function(){                       
                        var odu_i_get_key_text_Cb = $(this).next('label').text();
                        odu_i_get_key_text_array_Cb.push(odu_i_get_key_text_Cb);                        
                   });
                    
                    odu_i_asses_Cb = (odu_i_compareArrays(odu_i_get_user_input_text_array_Cb,odu_i_get_key_text_array_Cb) ? 1:0);//compare if the array either 1=correct or 2=incorrect
                    
                    odu_i_get_key_Cb = odu_i_formatArray(odu_i_get_key_text_array_Cb);// format cb answer key
                    
                    
                    $(this).odu_i_f_mark(this,'checkbox'); 
                    $(this).odu_i_f_FeedbackPanel(
                    odu_i_asses_Cb,
                    this,
                    itemType,    
                    odu_i_get_key_Cb,
                    odu_i_get_key_Cb,
                    odu_i_get_explanation,
                    odu_i_count_item_answered,
                    odu_i_count_answer_key,
                    odu_i_numStatement    
                    );                     
                    break;
            }            
        
    });    
    
}    



$.fn.odu_i_f_textConditions = function(dataCondition, userInputArray,userInputArrayNoFormat,answerKeyArray,answerKeyArrayNoFormat){//different conditions
    
                    
            switch(dataCondition){//assess the conditions
                    
                case 'or'://if 1 or more possible answers
                    
                var odu_i_response_qna  = (odu_i_f_containsAny(userInputArray,answerKeyArray)==true)? 1:0;   
                var odu_i_answer_key_formatted_qna = odu_i_formatArray2(answerKeyArrayNoFormat);
                var odu_i_user_input_qna = odu_i_formatArray2(answerKeyArrayNoFormat);
                var odu_i_numStatement='';    
                var odu_i_count_answer_key = 1;                        
                break;    
                                    
                case 'eq':
                var odu_i_response_qna = (odu_i_compareArrays(answerKeyArray, userInputArray) ? 1:0);//compare if the array either 1: correct 2:incorrect
                var odu_i_answer_key_formatted_qna = odu_i_formatArray(answerKeyArrayNoFormat);    
                var odu_i_numStatement = 'The answer should be <strong>equal to '+odu_i_formatArray(answerKeyArrayNoFormat)+'</strong>.';
                var odu_i_count_answer_key = 1;    
                break;
                    
                    
                case 'ne':
                var odu_i_response_qna = (odu_i_compareArrays(answerKeyArray, userInputArray) ? 0:1);//compare if the array either 0: correct 1:incorrect
                var odu_i_answer_key_formatted_qna = odu_i_formatArray(answerKeyArrayNoFormat);    
                var odu_i_numStatement = 'The answer should <strong>not be equal to '+odu_i_formatArray(answerKeyArrayNoFormat)+'</strong>.';
                var odu_i_count_answer_key = 1;    
                break;
                    
                    
                case 'gt':                    
                var odu_i_user_input_to_number = parseInt(userInputArray.toString());
                var odu_i_answer_key_to_number = parseInt(answerKeyArray.toString());                     
                var odu_i_response_qna = (odu_i_user_input_to_number > odu_i_answer_key_to_number) ? 1:0;
                var odu_i_answer_key_formatted_qna = odu_i_formatArray(answerKeyArrayNoFormat);    
                var odu_i_numStatement = 'The answer should be <strong>greater than '+odu_i_formatArray(answerKeyArrayNoFormat)+'</strong>.';
                var odu_i_count_answer_key = 1;    
                break;    
                
                    
                case 'gte':                    
                var odu_i_user_input_to_number = parseInt(userInputArray.toString());
                var odu_i_answer_key_to_number = parseInt(answerKeyArray.toString());                     
                var odu_i_response_qna = (odu_i_user_input_to_number >= odu_i_answer_key_to_number) ? 1:0;
                var odu_i_answer_key_formatted_qna = odu_i_formatArray(answerKeyArrayNoFormat);    
                var odu_i_numStatement = 'The answer should be <strong>greater than or equal to '+odu_i_formatArray(answerKeyArrayNoFormat)+'</strong>.';
                var odu_i_count_answer_key = 1;    
                break;        
                    
                case 'lt':                    
                var odu_i_user_input_to_number = parseInt(userInputArray.toString());
                var odu_i_answer_key_to_number = parseInt(answerKeyArray.toString());                     
                var odu_i_response_qna = (odu_i_user_input_to_number < odu_i_answer_key_to_number) ? 1:0;
                var odu_i_answer_key_formatted_qna = odu_i_formatArray(answerKeyArrayNoFormat);    
                var odu_i_numStatement = 'The answer should be <strong>less than '+odu_i_formatArray(answerKeyArrayNoFormat)+'</strong>.';
                var odu_i_count_answer_key = 1;    
                break;    
                    
                case 'lte':                    
                var odu_i_user_input_to_number = parseInt(userInputArray.toString());
                var odu_i_answer_key_to_number = parseInt(answerKeyArray.toString());                     
                var odu_i_response_qna = (odu_i_user_input_to_number <= odu_i_answer_key_to_number) ? 1:0;
                var odu_i_answer_key_formatted_qna = odu_i_formatArray(answerKeyArrayNoFormat);    
                var odu_i_numStatement = 'The answer should be <strong>less than or equal to '+odu_i_formatArray(answerKeyArrayNoFormat)+'</strong>.';
                var odu_i_count_answer_key = 1;    
                break;
                    
                    
                case 'gtlt':
                var odu_i_get_answer_key_high_value = Math.max.apply(null,answerKeyArray);
                var odu_i_get_answer_key_low_value = Math.min.apply(null,answerKeyArray);
                var odu_i_user_input_to_number = parseInt(userInputArray.toString());
                var odu_i_response_qna = (odu_i_get_answer_key_low_value<odu_i_user_input_to_number && odu_i_user_input_to_number<odu_i_get_answer_key_high_value)? 1:0;
                var odu_i_numStatement = 'The answer should be <strong>greater than '+odu_i_get_answer_key_low_value+' but less than ' +odu_i_get_answer_key_high_value+'</strong>.';
                
                break;
                    
                    
                case 'gtelte':
                var odu_i_get_answer_key_high_value = Math.max.apply(null,answerKeyArray);
                var odu_i_get_answer_key_low_value = Math.min.apply(null,answerKeyArray);
                var odu_i_user_input_to_number = parseInt(userInputArray.toString());
                var odu_i_response_qna = (odu_i_get_answer_key_low_value<=odu_i_user_input_to_number && odu_i_user_input_to_number<=odu_i_get_answer_key_high_value)? 1:0;
                var odu_i_numStatement = 'The answer should be <strong>greater than or equal to '+odu_i_get_answer_key_low_value+' but less than or equal to ' +odu_i_get_answer_key_high_value+'</strong>.';
                   
                break;
                    
                    
                case 'gtlte':
                var odu_i_get_answer_key_high_value = Math.max.apply(null,answerKeyArray);
                var odu_i_get_answer_key_low_value = Math.min.apply(null,answerKeyArray);
                var odu_i_user_input_to_number = parseInt(userInputArray.toString());
                var odu_i_response_qna = (odu_i_get_answer_key_low_value<odu_i_user_input_to_number && odu_i_user_input_to_number<=odu_i_get_answer_key_high_value)? 1:0;
                var odu_i_numStatement = 'The answer should be <strong>greater than '+odu_i_get_answer_key_low_value+' but less than or equal to ' +odu_i_get_answer_key_high_value+'</strong>.';
                   
                break;  
                    
                    
                case 'gtelt':
                var odu_i_get_answer_key_high_value = Math.max.apply(null,answerKeyArray);
                var odu_i_get_answer_key_low_value = Math.min.apply(null,answerKeyArray);
                var odu_i_user_input_to_number = parseInt(userInputArray.toString());
                var odu_i_response_qna = (odu_i_get_answer_key_low_value<=odu_i_user_input_to_number && odu_i_user_input_to_number<odu_i_get_answer_key_high_value)? 1:0;
                var odu_i_numStatement = 'The answer should be <strong>greater than or equal to '+odu_i_get_answer_key_low_value+' but less than ' +odu_i_get_answer_key_high_value+'</strong>.';
                   
                break;          
                    
                    
                                    
                    
                default:                    
                var odu_i_response_qna = (odu_i_compareArrays(answerKeyArray, userInputArray) ? 1:0);//compare if the 
                    //array either 1: correct 2:incorrect            
                var odu_i_answer_key_formatted_qna = odu_i_formatArray(answerKeyArrayNoFormat);                     
                var odu_i_numStatement='';    
                }//end of switch
    
    
                return {odu_i_response_qna:odu_i_response_qna,                        
                        odu_i_answer_key_formatted_qna:odu_i_answer_key_formatted_qna,                                                
                        odu_i_count_answer_key:odu_i_count_answer_key,
                        odu_i_numStatement:odu_i_numStatement};
}


$.fn.odu_i_f_checkQna = function(itemType){ //submit: check fi or qna   
    
            
    $(itemType).each(function(){
        $(this).odu_i_f_disableQnaFb(this,'textarea');//get selector
        var odu_i_numStatement = '';//variable for additional explanation statement
        var odu_i_get_item_id = '#'+$(this).attr('id');//get id          
        var odu_i_get_explanation = $(this).find('div[class$="_explanation"]').text();//get the value of the explanation
            
        var odu_i_get_user_input = $(this).find('textarea').val();//get user input
        var odu_i_get_user_input_format = odu_i_get_user_input.toLocaleLowerCase().split(/\r|\n/);//textarea: change to lowercase and split the user input per line (enter key)
        var odu_i_count_user_input = odu_i_get_user_input_format.length;//count the answers
        var odu_i_get_user_input_format_array = $.map(odu_i_get_user_input_format,function(e){//format each user input
                    e = e.replace(/ +/g,'');//remove the whitespace in between
                    e.trim;//remove the space at the beginning and end    
                    return e;
                });
        
        
        var odu_i_get_user_input_no_format = odu_i_get_user_input.split(/\r|\n/);//get user input without formatting, use for feedback panel
        var odu_i_get_user_input_no_format_array = $.map(odu_i_get_user_input_no_format,function(i){//remove trailing spaces for user input                    
                    i.trim;//remove the space at the beginning and end    
                    return i;
                });          
        var odu_i_user_input_qna = odu_i_formatArray(odu_i_get_user_input_no_format_array);//format the user input with a comma and 'and'
        
        var odu_i_count_answer_key = $(this).find('.odu_i_qna_a').length;//count answer key
        var odu_i_answer_key_array = [];//array for answer key
        var odu_i_answer_key_array_no_format = [];//array for answer key with no formatting, based on what is typed in html
        $(this).find('.odu_i_qna_a').each(function(){//get answer key, format and add to the array
            var odu_i_get_answer_key = $(this).text();                
            var odu_i_get_answer_key_format = odu_i_get_answer_key.split('').join('').toLocaleLowerCase().replace(/ +/g,'');
            odu_i_answer_key_array_no_format.push(odu_i_get_answer_key);
            odu_i_answer_key_array.push(odu_i_get_answer_key_format);
         });
        
       
        
        var odu_i_get_condition = $(this).find('.odu_i_qna_a').attr('data-condition');//get the condition
        
        //object var for assessing text conditions see odu_i_f_textConditions         
        var odu_i_eval = $(this).odu_i_f_textConditions(odu_i_get_condition,  
                                       odu_i_get_user_input_format_array,
                                       odu_i_get_user_input_no_format_array,
                                       odu_i_answer_key_array,
                                       odu_i_answer_key_array_no_format);
        
        var odu_i_count_answer_key_qna = (odu_i_eval.odu_i_count_answer_key===1)? odu_i_eval.odu_i_count_answer_key:odu_i_count_answer_key; 
        $(this).odu_i_f_mark(this,'textarea',odu_i_eval.odu_i_response_qna); 
        $(this).odu_i_f_FeedbackPanel(
                    odu_i_eval.odu_i_response_qna,
                    this,
                    itemType,    
                    odu_i_user_input_qna,
                    odu_i_eval.odu_i_answer_key_formatted_qna,
                    odu_i_get_explanation,
                    odu_i_count_user_input,
                    odu_i_count_answer_key_qna,
                    odu_i_eval.odu_i_numStatement
                    );
        
    });//end each function
}



$.fn.odu_i_f_checkFb  = function(itemType){
    $(itemType).each(function(){
        $(this).odu_i_f_disableQnaFb(this,'input[type="text"]');//get selector
        var odu_i_numStatement = '';//variable for additional explanation statement
        var odu_i_get_item_id = '#'+$(this).attr('id');//get id          
        var odu_i_get_explanation = $(this).find('div[class$="_explanation"]').text();//get the value of the explanation
        
        
        var odu_i_count_input_element = $(this).find('input[type="text"]').length;//count the input[text]
        var odu_i_count_correct_answers = 0;//initial value for correct answer checker
        var odu_i_all_user_input_array = [];//array for all user inputs 
        var odu_i_all_answers_array = []; //array for all answer keys
        var odu_i_all_numberStatement=[];// array for number statements (e.g. gte lte)
        
        $(this).find('.odu_i_fb_input').each(function(){//insert user input to the arrays
            
          var odu_i_user_input_array = [];//array for user input
          var odu_i_user_input_array_no_format = [];//array for user input without the formatting
            
          var odu_i_get_user_input = $(this).find('input[type="text"]').val();//get the user input
          var odu_i_get_user_input_format = odu_i_get_user_input.split(' ').join('').toLocaleLowerCase();//format the user input into lowercase and no spaces, for comparison
          odu_i_user_input_array.push(odu_i_get_user_input_format);//add in to the array            
          var odu_i_get_user_input_no_format = odu_i_get_user_input.trim();//format the user input, remove only the trailing spaces, for display
          odu_i_user_input_array_no_format.push(odu_i_get_user_input_no_format);//insert this into another array for display
            
            
          var odu_i_answer_key_array = [];//array for the answer key
          var odu_i_answer_key_array_no_format = [];//array for the answer key without the formatting, for display
            
              $(this).find('.odu_i_fb_A').each(function(){//insert answer key into those arrays mentioned above
                    var odu_i_get_answer_key = $(this).text();
                    var odu_i_get_answer_key_format = odu_i_get_answer_key.split(' ').join('').toLocaleLowerCase();
                    odu_i_answer_key_array.push(odu_i_get_answer_key_format);             
                    var odu_i_get_key_array_no_format = odu_i_get_answer_key.trim();
                    odu_i_answer_key_array_no_format.push(odu_i_get_key_array_no_format);
              });
            
            
            var odu_i_get_condition = $(this).find('.odu_i_fb_A').attr('data-condition');//get the condition

            //object var for assessing text conditions see odu_i_f_textConditions         
            var odu_i_eval = $(this).odu_i_f_textConditions(odu_i_get_condition,  
                                           odu_i_user_input_array,
                                           odu_i_user_input_array_no_format,
                                           odu_i_answer_key_array,
                                           odu_i_answer_key_array_no_format);
            if (odu_i_eval.odu_i_response_qna===1){//count the number of correct answers, if correct answer=to number of input[text], then 1 else 0;
                odu_i_count_correct_answers++;
            }
            
            
            var odu_i_fbVal = (odu_i_eval.odu_i_numStatement.length!=0)? odu_i_eval.odu_i_numStatement:odu_i_eval.odu_i_answer_key_formatted_qna;
            
            
            odu_i_all_user_input_array.push(odu_i_user_input_array_no_format);//add all user input in a master array
            odu_i_all_answers_array.push(odu_i_eval.odu_i_answer_key_formatted_qna);//add all answers in a master array
            odu_i_all_numberStatement.push(odu_i_eval.odu_i_numStatement);
            $(this).odu_i_f_mark(this,'text',odu_i_eval.odu_i_response_qna,odu_i_fbVal);//add the mark if correct or not           
            
            
        });
       
               
        var odu_i_response_fb = (odu_i_count_correct_answers===odu_i_count_input_element) ? 1:0;        
        var odu_i_all_user_input_array_format = odu_i_formatArray(odu_i_all_user_input_array);
        var odu_i_all_answer_key_array_format = odu_i_formatArray(odu_i_all_answers_array);
        var odu_i_all_numberStatement_format = '';
        
        $(this).odu_i_f_FeedbackPanel(
                    odu_i_response_fb,
                    this,
                    itemType,    
                    odu_i_all_user_input_array_format,
                    odu_i_all_answer_key_array_format,
                    odu_i_get_explanation,
                    odu_i_all_user_input_array.length,
                    odu_i_all_answers_array.length,
                    odu_i_all_numberStatement_format
                    );
    });
}


$.fn.odu_i_f_checkSr = function(itemType){
    $(itemType).each(function(){
        $(this).odu_i_f_disableQnaFb(this,'textarea');//get selector;
        var odu_i_get_item_id = '#'+$(this).attr('id');//get id          
        var odu_i_get_explanation = $(this).find('div[class$="_explanation"]').text();//get the value of the explanation
        
        $(this).odu_i_f_FeedbackPanel(
                    1,
                    this,
                    itemType,    
                    odu_user_input_sr=1,
                    odu_i_answer_key='',
                    odu_i_get_explanation,
                    1,
                    1,
                    odu_numStatement = ''
                    );
    });
    
    
}



$('.odu_i_content_area').append(' <div class="odu_i_row odu_i_button_area" style="text-align:center">');
$('.odu_i_button_area').append('<button class="odu_i_button odu_i_submit">Check Answer(s)');
$('.odu_i_button_area').append('<button class="odu_i_button_print odu_i_print">Print Activity');
$('.odu_i_button_area').append('<button class="odu_i_button_retry odu_i_retry">Start Over');    

$('.odu_i_print').hide();






$('.odu_i_submit').click(function(){
    
    $('.odu_i_content_area').find('.odu_i_validate').remove();    
    
    $(this).odu_i_count_items_validation();
    
    if (odu_i_validate>0){
        alert('Some items or questions are unanswered.');
        $(this).show();        
    }
    else{
        $(this).hide();
        
        $('textarea').each(function(){
                $(this).attr('data-text',$(this).val());
                $(this).html($(this).attr('data-text'));
        });
        
        
        $('.odu_i_print').fadeIn();
        $('.odu_i_mc_item').odu_i_f_checkMcCb('.odu_i_mc_item','radio');
        $('.odu_i_cb_item').odu_i_f_checkMcCb('.odu_i_cb_item','checkbox');
        $('.odu_i_qna_item').odu_i_f_checkQna('.odu_i_qna_item');
        $('.odu_i_fb_item').odu_i_f_checkFb('.odu_i_fb_item');
        $('.odu_i_sr_item').odu_i_f_checkSr('.odu_i_sr_item');
    }
    odu_i_validate = 0;//reset the validation value;
});

$('.odu_i_retry').click(function(){//start over or try again
    location.reload();       
});
    
    
$('.odu_i_print').on('click', function () {//print answers button
    
                
                var divContents = $('.odu_i_content_area').html();//div which have to print
//                var printWindow = window.open('', '', 'height=700,width=900');
                var printWindow = window.print();
                printWindow.document.write('<html><head><title></title>');
                printWindow.document.write('<link rel="stylesheet" href="https://cdn.rawgit.com/arthurbeltran/arthurbeltran.github.io/f85bad88/css/github_interactive_styles2/current/odu_activities%5Bcurrent%5D.css" >');//external styles               
                printWindow.document.write('</head><body>');
                printWindow.document.write('<p style="font-size:smaller">For Internet Explorer users, please right-click then choose Print.');
                printWindow.document.write(divContents);                
                printWindow.document.write('</body></html>');
                printWindow.document.close();

                printWindow.onload=function(){
                printWindow.focus();                                         
                printWindow.print();
                printWindow.close();
                    
                
                }
            });

});//end of document ready    
    


   