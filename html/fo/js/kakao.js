
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

                   setSnsInfo(json);


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