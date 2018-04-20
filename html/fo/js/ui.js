$(window).ready(function(){
    $(window).on('resize', function(){
        reposPopup();
    }).trigger('resize');
});


function reposPopup()
{
    for(var i=0;i<$('.popup article').length;i++)
    {
        $('.popup article').eq(i).css('margin-top', '-'+($('.popup article').eq(i).height()/2)+'px');
    }
}
