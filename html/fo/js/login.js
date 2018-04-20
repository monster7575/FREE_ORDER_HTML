

function selectBoard(type){

    var url = CMS.proxypath+"/srv/board/api/top/"+type;

    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: url,
        success: function(res) {
            var result = res.result;

            if(result == 1)
            {
                var data = JSON.parse(JSON.stringify(res.data));
                var service = data[0].content;
               // $('#service').html('');
                if(type == "T")
                {
                    $('#service').html(service);
                    selectBoard("P");
                }
                else
                    $('#private').html(service);
            }
        },
        error: function(){

        }
    });
}



function allCheckbox()
{

    //모두 동의
    $(".btn_join_step2").click(function() {


        var agree1 = $('#agree1').is(":checked");
        var agree2 = $('#agree2').is(":checked");

        if(!agree1 || !agree2)
        {
            $("input:checkbox[id='agree1']").prop("checked", true);
            $("input:checkbox[id='agree2']").prop("checked", true);
            $("input:checkbox[id='btn_join_step2']").prop("checked", true);
        }
        else if(agree1 || agree2)
        {
            $("input:checkbox[id='agree1']").prop("checked", false);
            $("input:checkbox[id='agree2']").prop("checked", false);
            $("input:checkbox[id='btn_join_step2']").prop("checked", false);
        }
        else
        {
            $("input:checkbox[id='agree1']").prop("checked", true);
            $("input:checkbox[id='agree2']").prop("checked", true);
            $("input:checkbox[id='btn_join_step2']").prop("checked", true);
        }

    });


    $('.agree_checked').on('change',function(){
        if($('.agree_checked:checked').length == 2)
        {
            $("input:checkbox[id='btn_join_step2']").prop("checked", true);
        }else{
            $("input:checkbox[id='btn_join_step2']").prop("checked", false);
        }
    });

}

$(function() {

    allCheckbox();

    $('.join_agree .agree1 a').on('click', function(){
        $('.popup').eq(0).css('display','block');
        //161228수정 갤럭시A 팝업문제 수정 추가함수
        reposPopup();
    });
    $('.join_agree .agree2 a').on('click', function(){
        $('.popup').eq(1).css('display','block');
        //161228수정 갤럭시A 팝업문제 수정 추가함수
        reposPopup();
    });

    $('.agree_popup_close a').eq(0).on('click', function(){
        $('.popup').eq(0).css('display','none');
        //161228수정 갤럭시A 팝업문제 수정 추가함수
        reposPopup();
    });
    $('.agree_popup_close a').eq(1).on('click', function(){
        $('.popup').eq(1).css('display','none');
        //161228수정 갤럭시A 팝업문제 수정 추가함수
        reposPopup();
    });




    selectBoard('T');


});
