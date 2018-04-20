
$(window).ready(function() {



        //template View
        var UserServiceView = Backbone.View.extend({

            el: '.wrap',

            template: _.template($("#user-service-template").html()),

            initialize:function(){
                //this.model.on("change", this.render);
                this.render();
                //console.log('initialize===>' + JSON.stringify(this.model));
            },

            events: {
                'click input.check_service': 'service_check',
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

                $('#service').html(data.content);
             
                return this;

            },

            service_check : function(e)
            {
                var $target = $(e.target);
                var chk = $target.is(":checked");

                if(!chk)
                {
                    var result = confirm('서비스 이용 약관 동의를 하제하시겠습니까?');

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


        var UserServiceModel = Backbone.Model.extend({
            url: CMS.proxypath+"/srv/board/api/top/t"
        });

        var userServiceModel = new UserServiceModel();

        userServiceModel.fetch({
            success: function(res) {

                var userServiceView = new UserServiceView({model : res});
            },
            error: function(err){
                alert(JSON.stringify(err));
            }
        });

    });

