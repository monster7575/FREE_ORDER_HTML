

    var isCheck = false;
        // Extend the callbacks to work with Bootstrap, as used in this example
        // See: http://thedersen.com/projects/backbone-validation/#configuration/callbacks
    _.extend(Backbone.Validation.callbacks, {
        valid: function (view, attr, selector) {

        },
        invalid: function (view, attr, error, selector) {
            console.log('isCheck===error===>' + error);
            console.log('isCheck==attr====>' + attr);
            console.log('isCheck==selector====>' + selector);

            var $el = view.$('[name=' + attr + ']')
            $el.val('');
            $el.attr("placeholder", error);
            $el.addClass('error_input');

        }
    });

// Define a model with some validation rules
var InquireModel = Backbone.Model.extend({

    url: CMS.proxypath+"/srv/inquire/api/insert",

    defaults: {
        nick : '',
        email : '',
        content : ''
    },
    validation: {
        nick: {
            required: true,
            msg : "닉네임을 입력해주세요."
        },
        email: {
            required: true,
            pattern: 'email',
            msg : "이메일 주소를 정확하게 입력해주세요."
        },
        content : {
            required: true,
            msg : "문의 내용을 입력해주세요."
        }
    }
});

// Define a View that uses our model
var InquireForm = Backbone.View.extend({

    events: {
        'click #btn_inquire_submit': function (e) {
            e.preventDefault();
            this.inquireSave();
        }
    },

    initialize: function () {
        // See: http://thedersen.com/projects/backbone-validation/#using-form-model-validation/validation-binding
        Backbone.Validation.bind(this);
    },

    inquireSave: function () {

        var data = {nick : $('#nick').val(), email : $('#email').val(), content : $('#content').val(), title : '문의사항입니다.'};

        this.model.set(data);

        // Check if the model is valid before saving
        // See: http://thedersen.com/projects/backbone-validation/#methods/isvalid
        if(this.model.isValid(true)){
            // this.model.save();

            this.model.fetch({
                contentType : 'application/json; charset=utf-8',
                type : 'post',
                data: JSON.stringify(data),
                success: function(res) {

                    alert('문의하신 내용이 등록되었습니다.');
                    history.back();

                },
                error: function(err){
                    alert(JSON.stringify(err));
                }
            });

        }
    },

    valueCheck : function()
    {

    },

    remove: function() {
        // Remove the validation binding
        // See: http://thedersen.com/projects/backbone-validation/#using-form-model-validation/unbinding
        Backbone.Validation.unbind(this);
        return Backbone.View.prototype.remove.apply(this, arguments);
    }
});

//validation 참조 : http://jsfiddle.net/thedersen/udXL5/
$(window).ready(function(){

    var view = new InquireForm({
        el : $('#wrap'),
        model: new InquireModel()
    });


});