
function setDeviceInfo(data)
{
    var flk = data.regid;
    var token = data.token;
    var json = {flk : flk, token : token};
    var oFlk = localStorage.getItem('flk');
    var oToken = localStorage.getItem('token');

    //alert(JSON.stringify(json));
    if(oFlk != flk || oToken != token)
    {
        localStorage.setItem('flk', flk);
        localStorage.setItem('token', token);
        userUpdate(json);
    }
}


function userProccessComplete(user)
{
    var email = user.email;
    var cards = user.cards;
    var path = $(location).attr('pathname');

    if(path.indexOf('login') > 0)
    {
        if(!email)
            location.replace(CMS.proxypath+'/srv/user/mobile/update/email');
        else
        {
            if(cards)
            {
                if(cards.length == 0)
                    location.replace('/jsp/keypad/index.jsp');
                else
                    location.replace(CMS.proxypath+'/srv/user/mobile/main');
            }
            else
                location.replace('/jsp/keypad/index.jsp');
        }


        return;
    }

    if(path.indexOf('email') > 0 && email)
    {
        if(cards.length == 0)
            location.replace('/jsp/keypad/index.jsp');
        else
            location.replace(CMS.proxypath+'/srv/user/mobile/main');
        return;
    }
}


