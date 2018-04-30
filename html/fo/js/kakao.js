
// 사용할 앱의 JavaScript 키를 설정해 주세요.
Kakao.init('8ec7218f7e7bf694568357d2c11bf84d');
function loginWithKakao() {
    // 로그인 창을 띄웁니다.
    Kakao.Auth.loginForm({
        success: function(authObj) {
            Kakao.API.request({         //로그인 성공시 자기 정보 가져오기
                url: '/v1/user/me',
                success: function(res) {

                    var json = {'snsid' : res.id, 'sns' : 'K', 'email' : res.kaccount_email, 'auth' : 'S'};

                   //setSnsInfo(json);
                    //alert('userSnsCheck : ' + JSON.stringify(json));
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
                },
                fail: function(error) {
                    //alert(JSON.stringify(error));
                }
            });

         //   kakao_logout();
        },
        fail: function(err) {
            //alert(JSON.stringify(err));
        }
    });


};

function kakao_logout()
{
   // alert('로그아웃');
    Kakao.Auth.logout(function() {
        setTimeout(function(){
         //   location.href="/"
        },500);//로그아웃 처리되는 타임을 임시적으로 1000설정
    });

}