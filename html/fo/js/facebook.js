$(function(){
    // 페이스북 javascript sdk 초기화
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/ko_KR/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = function() {
        FB.init({
            appId      : '2008863189367561',
            cookie     : true,  // enable cookies to allow the server to access
                                // the session
            xfbml      : true,  // parse social plugins on this page
			status : true,
            version    : 'v2.5' // use graph api version 2.5
        });

		//checkLoginState();
    };
});

//페이스북 로그인
function fbLogin()
{
    FB.login(function (response) {
        checkLoginState();
    }, { scope: 'email' });
}

//페이스북 페이지 로딩시 로그인 상태 체크 함수
function checkLoginState() {

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

//페이스북 로그인 상태 체크 콜백 함수
function statusChangeCallback(response) {
    alert(response.status);
    if (response.status === 'connected') {
        // 로그인 상태
        showDetails(response.authResponse.accessToken);

    } else if (response.status === 'not_authorized') {

        //비로그인 상태
        //alert('페이스 로그아웃 완료!');

    } else {

        //비로그인 상태
        //alert('페이스 로그아웃 완료!');
    }
}

//페이스북 로그인한 사람 정보 가져오기
function showDetails(at) {
    FB.api('/me', {fields: 'id,name,email,gender,birthday'}, function(details) {

            var json = {'snsid' : details.id, 'sns' : 'F', 'email' : details.email, 'auth' : 'S'};
            userSnsCheck(json, function(data){

                //alert('userSnsCheck : ' + JSON.stringify(data));
                if(data.result < 0)
                {
                    if(data.result == -2)
                    {
                        window.location.replace('freeorder://action?name=stop_loading');
                        alert(data.error);
                    }
                    else
                    {
                        userInsert(json, function(data){

                            if(data.result > 0)
                            {
                                userLogin(json, null);
                            }
                        });
                    }
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
            });
    });
}

//페이스북 로그아웃
function FB_logout() {


    FB.getLoginStatus(function(response) {
        if (response && response.status === 'connected') {
            FB.logout(function(response) {
                console.log('페이스북 로그아웃 완료!');
            });
        }
    });

}


