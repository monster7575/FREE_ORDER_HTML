
$(window).ready(function(){

});



//SNS 로그인 시도 전 동의 체크
function snsLogin(sns)
{

    if(sns == 'F')
    {
        //fbLogin(false);
        alert('준비 중입니다!');
    }
    else if(sns == 'K')
    {
        loginWithKakao();
    }
    else
    {
        naverLogin();
    }
}


function userUpdate(update, callback)
{

    //alert('userUpdate : ' + JSON.stringify(update));
    var UserModel = Backbone.Model.extend({
        url: CMS.proxypath+"/srv/user/api/update"
    });

    var user = new UserModel();

    user.fetch({
        contentType : 'application/json; charset=utf-8',
        type : 'post',
        data: JSON.stringify(update),
        success: function(res) {
            window.location.replace('freeorder://action?name=stop_loading');
            var json = JSON.parse(JSON.stringify(res));
            //alert('json : ' + JSON.stringify(json));
            if(json.result == 1)
            {
                var data;
                if(json.data.length > 0)
                {
                    data = JSON.parse(JSON.stringify(json.data));
                    data = data[0];
                }

                if(callback)
                    callback(data);
                else
                    userProccessComplete(data, 1);
            }
        },
        error: function(err){
            console.log(JSON.stringify(err));
        }
    });
}

function userInsert(json, callback)
{

    var UserModel = Backbone.Model.extend({
        url: "/srv/seller/api/insert"
    });

    var user = new UserModel();

    user.fetch({
        contentType : 'application/json; charset=utf-8',
        type : 'post',
        data: JSON.stringify(json),
        success: function(res) {

            var json = JSON.parse(JSON.stringify(res));

            if(callback)
                callback(json);

        },
        error: function(err){
            console.log(JSON.stringify(err));
        }
    });

}

function userSnsCheck(json, callback)
{
    window.location.replace('freeorder://action?name=start_loading');
    var UserModel = Backbone.Model.extend({
        url: "/srv/seller/api/select/snsid"
    });

    var user = new UserModel();

    user.fetch({
        contentType : 'application/json; charset=utf-8',
        type : 'post',
        data: JSON.stringify(json),
        success: function(res) {

            var resObj = JSON.parse(JSON.stringify(res));

            if(callback)
                callback(resObj);

        },
        error: function(err){
            console.log(JSON.stringify(err));
        }
    });
}


function userLogin(json, callback)
{

    //alert(JSON.stringify(json));
    var UserModel = Backbone.Model.extend({
        url: "/srv/seller/api/login"
    });

    json.route = 'S';
    var user = new UserModel();

    user.fetch({
        contentType : 'application/json; charset=utf-8',
        type : 'post',
        data: JSON.stringify(json),
        success: function(res) {

            var resObj = JSON.parse(JSON.stringify(res));
            var data;

            if(resObj.data.length > 0)
            {
                data = JSON.parse(JSON.stringify(resObj.data));
                data = data[0];
                //alert('userLogin 1' + JSON.stringify(data));
            }
            else
            {
                data = resObj;
                //alert('userLogin 2' + JSON.stringify(data));
            }

            window.location.replace('freeorder://action?name=stop_loading');
            if(callback)
                callback(data);
            else
                userProccessComplete(data, 0);

        },
        error: function(err){
            console.log(JSON.stringify(err));
        }

    });

}

function setSnsInfo(json)
{

    $('#snsid').val(json.snsid);
    $('#sns').val(json.sns);
    $('#email').val(json.email);
    $('#phonenb').val(json.phonenb);
    $('#gcmtoken').val(json.gcmtoken);
    $('#auth').val(json.auth);
    $("#mainForm").submit();

}


function userProccessComplete(user, isSign)
{
    window.location.replace('freeorder://action?name=stop_loading');
   // alert('userProccessComplete isSign : ' + JSON.stringify(isSign));
   // alert('userProccessComplete user : ' + JSON.stringify(user));

    var nick = user.nick;
    var uobjid = user.idx;

    var path = $(location).attr('pathname');

    if(isSign)
    {
        if(path.indexOf('login') > 0 || path.indexOf('nick') > 0 || path.indexOf('guide') > 0) {
            location.replace('/srv/user/mobile/main?cid='+user.cid);          //로그인, 회원가입시만 반응
        }
    }
    else
    {

        window.location.replace('touchcashjs://stop_loading');
        if(path.indexOf('login') > 0 || path.indexOf('guide') > 0)
        {
            if(!nick)
                location.replace(CMS.proxypath+'/srv/user/mobile/update/nick');
            else
            {
                location.replace(CMS.proxypath+'/srv/user/mobile/main?cid='+user.cid);
                /*
                if(cards)
                {
                    if(cards.length == 0)
                        location.replace('touchcashjs://card_register?isSignup=1&uobjid='+uobjid);
                    else
                        location.replace(CMS.proxypath+'/srv/user/mobile/main?cid='+user.cid);
                }
                else
                    location.replace('touchcashjs://card_register?isSignup=1&uobjid='+uobjid);
                */
            }
            return;
        }
        //alert('userProccessComplete nick : ' + nick);
        if(path.indexOf('nick') > 0 && nick)
        {
           //alert('userProccessComplete cards : ' + cards.length);
            if(cards.length == 0)
                location.replace('touchcashjs://card_register?isSignup=1&uobjid='+uobjid);
            else
                location.replace(CMS.proxypath+'/srv/user/mobile/main?cid='+user.cid);
            return;
        }
    }

}
