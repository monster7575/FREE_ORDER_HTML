
var naver_id_login = new naver_id_login("RuWRMtugdvIgnmvNsscN", CMS.cdn +"/srv/seller/mobile/login");


//네이버 로그인
function naverLogin()
{


    var state = naver_id_login.getUniqState();
    naver_id_login.setButton("white", 2,40);
    naver_id_login.setDomain(CMS.cdn);
    naver_id_login.setState(state);
    //naver_id_login.setPopup();
    naver_id_login.init_naver_id_login();

    var url = naver_id_login.authorize_url+'?response_type='+naver_id_login.response_type+'&client_id='+naver_id_login.client_id+'&redirect_uri='+naver_id_login.redirect_uri+'&state='+state+'&isapp=true';
    location.href = url;
    // window.open(url);
}

if(naver_id_login != null)
    naver_id_login.get_naver_userprofile("naverSignInCallback()");

function naverSignInCallback() {
    // naver_id_login.getProfileData('프로필항목명');
    // 프로필 항목은 개발가이드를 참고하시기 바랍니다.
    // alert(naver_id_login.getProfileData('email'));
    //   alert(naver_id_login.getProfileData('nickname'));
    //   alert(naver_id_login.getProfileData('age'));
   // alert(naver_id_login.getProfileData('email'));
    var json = {'snsid' : naver_id_login.getProfileData('id'), 'email' : naver_id_login.getProfileData('email'), 'sns' : 'N', 'auth' : 'S'};

    var token = naver_id_login.getAccessToken();
	//startUserLogin(json);

    //setSnsInfo(json);

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

}

function Naver_logout()
{

    naver_id_login = null;
}

