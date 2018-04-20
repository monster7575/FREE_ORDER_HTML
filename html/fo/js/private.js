
$(function () {



    //template View
    var UserPrivateView = Backbone.View.extend({

        el: '.wrap',

        template: _.template($("#user-private-template").html()),

        initialize:function(){
            //this.model.on("change", this.render);
            this.render();
            //console.log('initialize===>' + JSON.stringify(this.model));
        },

        events: {
            'click input.check_private': 'private_check',
            'click div.w3-border-black': 'go_back'

        },

        render: function () {

            var text = this.model.toJSON();

            var htmlOutput = this.template({});

            this.$el.html(htmlOutput);

            var data;
            if(text.data.length > 0)
            {
                data = JSON.parse(JSON.stringify(text.data));
                data = data[0];
            }

            $('#private').html(data.content);

            return this;

        },

        private_check : function(e)
        {
            var $target = $(e.target);
            var chk = $target.is(":checked");

            if(!chk)
            {
                var result = confirm('개인정보이용정책 약관 동의를 하제하시겠습니까?');

                if(result) {
                    $target.prop("checked", false);
                } else {
                    $target.prop("checked", true);
                }
            }
        },

        go_back : function(e)
        {
            history.back();
        }

    });


    var UserPrivateModel = Backbone.Model.extend({
        url: CMS.proxypath+"/srv/board/api/top/p"
    });

    var userPrivateModel = new UserPrivateModel();

    userPrivateModel.fetch({
        success: function(res) {

            var userPrivateView = new UserPrivateView({model : res});
        },
        error: function(err){
            alert(JSON.stringify(err));
        }
    });

});

