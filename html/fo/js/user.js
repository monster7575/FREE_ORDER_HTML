
$(window).ready(function(){

});

function emailJoin()
{
    window.location.replace('/srv/seller/mobile/regist');
}

function emailLogin(email, passwd)
{
    window.location.replace('freeorder://action?name=get_seller');
    var json = {email : email, passwd : passwd, auth : 'E'};

    //setSnsInfo(json);

    userSnsCheck(json, function(data){

        alert('userSnsCheck : ' + JSON.stringify(data));
        window.location.replace('freeorder://action?name=stop_loading');
        if(data.result < 0)
        {
            if(data.result == -1)
            {
                alert('등록되 계정이 없습니다.');
            }
            else if(data.result == -2)
            {
                alert(data.error);
            }
            else
            {
                userLogin(json, function(data){

                    if(data.result == -1028)            //회원탈퇴 5일전
                    {
                        window.location.replace('freeorder://action?name=stop_loading');
                        alert(data.error);
                    }
                    else
                    {
                        userUpdate(data, null);
                    }
                });
            }
        }

    });
}

//SNS 로그인 시도 전 동의 체크
function snsLogin(sns)
{
    window.location.replace('freeorder://action?name=get_seller');

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

var phonenb;
var gcmtoken;
//Call By Native
function setSeller(phonenb, token)
{
    console.log('phonenb : ' + phonenb);
    console.log('gcmtoken : ' + token);

    this.phonenb = phonenb;
    this.gcmtoken = token;
    alert(JSON.stringify(this.phonenb + '-' + this.gcmtoken));
}

function userUpdate(update, callback)
{

    //alert('before userUpdate : ' + JSON.stringify(update));
    var UserModel = Backbone.Model.extend({
        url:"/srv/seller/api/update"
    });

    var user = new UserModel();

    user.fetch({
        contentType : 'application/json; charset=utf-8',
        type : 'post',
        data: JSON.stringify(update),
        success: function(res) {
            window.location.replace('freeorder://action?name=stop_loading');
            var json = JSON.parse(JSON.stringify(res));
            //alert('after userUpdate : ' + JSON.stringify(json));
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
        url: "/srv/seller/api/select"
    });

    var user = new UserModel();

    json.phonenb = this.phonenb;
    json.gcmtoken = this.gcmtoken;

    user.fetch({
        contentType : 'application/json; charset=utf-8',
        type : 'post',
        data: JSON.stringify(json),
        success: function(res) {

            var resObj = JSON.parse(JSON.stringify(res));
            //alert('userSnsCheck : ' + JSON.stringify(resObj));
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

function userProccessComplete(user, isSign)
{
    window.location.replace('freeorder://action?name=stop_loading');
    //alert('userProccessComplete isSign : ' + JSON.stringify(isSign));
    //alert('userProccessComplete user : ' + JSON.stringify(user));

    var uobjid = user.idx;

    var path = $(location).attr('pathname');

    if(isSign)
    {
        if(path.indexOf('login') > 0) {
            window.location.replace('freeorder://action?name=go_main&phonenb='+this.phonenb);
        }
    }
    else
    {

        window.location.replace('freeorder://action?name=stop_loading');
        location.replace('/srv/seller/mobile/insert');

    }

}
