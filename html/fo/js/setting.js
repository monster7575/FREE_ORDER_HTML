

var swiper;
var userModel;

$(window).ready(function() {

    var UserModel = Backbone.Model.extend({});

    //template View
    var UserSettingView = Backbone.View.extend({

        el: '#wrap',

        template: _.template($("#user-setting-template").html()),

        initialize:function(){
            //this.model.on("change", this.render);
            this.render();
            //console.log('initialize===>' + JSON.stringify(this.model));
        },

        events: {
            'click li.check_pushyn': 'push_clicked',
            'click input.check_nightyn': 'night_clicked',
            'change select.select_year' : 'selected_year',
            'change select.select_area' : 'selected_area',
            'click a.btn_logout': 'btn_logout',
            'click button.fingerL': 'fingerLeft',
            'click button.fingerR': 'fingerRight',
            'click input.select_M': 'sex_m',
            'click input.select_F': 'sex_f',
            'click div.check_card' : 'check_card',
            'click li.userbye' : 'userbye',
            'click li.bank_register' : 'bank_register',
            'click li.user_service' : 'user_service',
            'click li.user_private' : 'user_private',
            'click li.user_inquire' : 'user_inquire',
            'click a.resCared_add' : 'resCared_add',
            'click img.finger_info' : 'finger_info'
        },

        render: function () {

            var json = this.model.toJSON();

            var htmlOutput = this.template({data : json});

            this.$el.html(htmlOutput);

            return this;

        },

        push_clicked : function(e){

            var $target = $(e.target);
            var selected = $target.hasClass( "alram_on" );
            var pushyn = (selected) ? "N" : "Y";
            var json = {'pushyn' : pushyn};

            userUpdate(json, function(data){
                sendCid(data.cid, function(){
                    window.location.reload();
                });
            });
        },

        night_clicked : function(e){

            var $target = $(e.target);
            var selected = $target.is(':checked');
            var nightyn = (selected) ? "Y" : "N";
            var json = {'nightyn' : nightyn};
            userUpdate(json);
        },

        selected_year : function(e)
        {
            var $target = $(e.target);
            var json = {'year' : $target.val()};
            userUpdate(json, function(data){
                sendCid(data.cid, function(){
                    window.location.reload();
                });
            });
        },

        selected_area : function(e)
        {
            var $target = $(e.target);
            var json = {'area' : $target.val()};
            userUpdate(json, function(data){
                sendCid(data.cid, function(){
                    window.location.reload();
                });
            });
        },

        btn_logout : function(e)
        {
            localStorage.clear();
            location.href = CMS.proxypath+"/srv/user/mobile/login";
        },

        fingerLeft : function(e)
        {
            var json = {'finger' : 'L'};
            userUpdate(json, function(data){

                sendCid(data.cid, function(){
                    window.location.reload();
                });

            });
        },

        fingerRight : function(e)
        {
            var json = {'finger' : 'R'};
            userUpdate(json, function(data){
                sendCid(data.cid, function(){
                    window.location.reload();
                });
            });
        },

        sex_m : function(e)
        {
            var json = {'sex' : 'M'};
            userUpdate(json, function(data){
                sendCid(data.cid, function(){
                    window.location.reload();
                });
            });
        },

        sex_f : function(e)
        {
            var json = {'sex' : 'F'};
            userUpdate(json, function(data){
                sendCid(data.cid, function(){
                    window.location.reload();
                });
            });
        },

        check_card : function(e)
        {
            var clickCardId = e.target.id;
            var $target = $(e.target);
            var id = $target.id;
            //alert('===>' + e.target.id);
           // alert('===>' + id);

            /*
            var $cards =$(".check_card");
            console.log($cards);
            for(var i=0;i<$cards.length;i++){
                if(clickCardId == $cards[i].id)
                    $('input:checkbox[id= "'+$cards[i].id+'" ]').attr("checked", true);
                else
                    $('input:checkbox[id= "'+$cards[i].id+'" ]').attr("checked", false);
                console.log("i ====" + JSON.stringify($cards[i].id));
            }
            */
        },

        userbye : function(e)
        {
            var data = {snsid : window.touchcashuser.snsid, sns : window.touchcashuser.sns};
            var ret = confirm(window.touchcashuser.nick + "님 회원탈퇴시 보유하신 캐시백 "+window.touchcashuser.saving+"원이 소멸됩니다. 탈퇴하시겠습니까?");
            if(ret)
            {
                var UserByeModel = Backbone.Model.extend({
                    url: CMS.proxypath+"/srv/user/api/bye"
                });

                var userBye = new UserByeModel();

                userBye.fetch({
                    type : 'POST',
                    data: data,
                    dataType: 'json',
                    success: function(userBye) {
                        var json = userBye.changed;
                        console.log('json===>' + JSON.stringify(json));
                        if(json.result == 1)
                        {
                            var data;
                            if(json.data.length > 0)
                            {
                                data = json.data;
                                data = data[0];
                            }

                            location.replace('touchcashjs://signout_complete');

                        }
                    },
                    error: function(err){
                        console.log(err);
                    }
                });
            }
        },
        bank_register : function(e)
        {
            location.replace('touchcashjs://bank_register');
        },
        user_service : function(e)
        {
            location.href = CMS.proxypath+'/srv/board/mobile/select/t';
        },
        user_private : function(e)
        {
            location.href = CMS.proxypath+'/srv/board/mobile/select/p';
        },
        user_inquire : function(e)
        {
            location.href = CMS.proxypath+'/srv/inquire/mobile/insert';
        },
        resCared_add : function(e)
        {
            location.replace('touchcashjs://card_register?isSignup=0');
        },
        finger_info : function(e)
        {
            alert('전면광고 화면에 버튼 배치 방향을 설정합니다.');
        }
    });

    userModel = new UserModel();

    new UserSettingView({model : userModel});

    swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        freeMode: true,
        slidesPerView: 3.5,
        spaceBetween: 5,
        onInit:deleteCard
    });

    $('.addr .selectbox select').on('change', function(e){
        if($(".addr .selectbox select option:selected").val() == '0')
        {
            $('.addr .selectbox select').eq(1).attr('disabled', true);
        }else{
            $('.addr .selectbox select').eq(1).attr('disabled', false);
        }
    });

});

function sendCid(cid, callback)
{
    location.replace('touchcashjs://set_user_info?cid='+cid);
    setTimeout(function() {

        if(callback)
            callback();

    }, 100);

}

function deleteCard(e)
{

    $('.resCared_del').on('click', function(){

        var index = e.clickedIndex - 1;
        var target = $('#card_delBtn'+index);

        var isDel = target.hasClass( "card_delBtn" );
        if(isDel)
        {
            var CardModel = Backbone.Model.extend({
                url: CMS.proxypath+"/srv/card/api/delete"
            });

            var user = JSON.parse(JSON.stringify(userModel));
            console.log('user===>' + JSON.stringify(user));
            var ret = confirm("등록한 카드를 삭제하시겠습니까?");
            if(ret)
            {
                var cards = JSON.parse(window.touchcashuser.cards.replace(/&quot;/g,'"'));
                console.log('cards===>' + cards[0].idx);

                var idx = cards[index].idx;


                var card = new CardModel();

                var data = {idx : idx};
                console.log('data===>' + JSON.stringify(data));

                card.fetch({
                    type : 'POST',
                    data: data,
                    dataType: 'json',
                    success: function(card) {
                        var json = card.changed;
                        console.log('json===>' + JSON.stringify(json));
                        if(json.result == 1)
                        {
                            swiper.removeSlide(index);
                            location.reload();
                        }
                    },
                    error: function(err){
                        console.log(err);
                    }
                });
            }
            else
                target.toggleClass('card_delBtn');
        }
        else
        {
            target.toggleClass('card_delBtn');
        }
    });
}


function selectArea(sido, area, callback)
{
	var sval = (typeof area == "undifined")? 0 : area;

	var url = CMS.proxypath+"/srv/area/api/list/"+ sido;
	$.ajax({
		url:url,
		type:"get",
		datatype:"json",
		success:function(result){
            var toAppend = '<option value="-1">지역 선택</option>';
			var data = result.data;

			$.each(data,function(i,o){
				if(sval == o.idx)
					toAppend += '<option value="'+ o.idx +'" selected>'+o.goongu+'</option>';
				else
					toAppend += '<option value="'+ o.idx +'">'+o.goongu+'</option>';
			});

            var areaSize = data.length;
            if(areaSize > 1)
                $('#area').attr('disabled', false);
            else
                $('#area').attr('disabled', true);
			$('#area').html("");
			$('#area').append(toAppend);
			if(callback)
			{
				callback();
			}
		}
	});

}
