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
var EmailModel = Backbone.Model.extend({

    url: "/srv/seller/insert",
    validation: {
        email: {
            required: true,
            pattern: 'email',
            msg : "이메일 주소를 정확하게 입력해주세요."
        },
        passwd: {
            required: true,
            msg : "비밀번호를 입력해주세요."
        },
        passwd_chk: {
            required: true,
            equalTo: 'passwd',
            msg : "비밀번호 동일하지 않습니다. 재 입력해주세요."
        }
    }
});

// Define a View that uses our model
var EmailForm = Backbone.View.extend({
    events: {
        'click #btn_email_submit': function (e) {
            e.preventDefault();
            this.emailLogin();
        }
    },

    initialize: function () {
        // This hooks up the validation
        // See: http://thedersen.com/projects/backbone-validation/#using-form-model-validation/validation-binding
        console.log('this====>' + JSON.stringify(this));
        Backbone.Validation.bind(this);
    },

    emailLogin: function () {
        var data = {email : $('#email').val(), passwd : $('#passwd').val(), passwd_chk : $('#passwd_chk').val(), auth : 'E', cat : 'A', phonenb : $('#phonenb').val(),
        gcmtoken : $('#token').val()};

        this.model.set(data);
        console.log('data====>' + JSON.stringify(data));

        // Check if the model is valid before saving
        // See: http://thedersen.com/projects/backbone-validation/#methods/isvalid
        if(this.model.isValid(true)){
            this.model.fetch({
                contentType : 'application/json; charset=utf-8',
                type : 'post',
                data: JSON.stringify(data),
                success: function(res) {
                    var obj =  JSON.parse(JSON.stringify(res));
                    console.log('res====>' + JSON.stringify(res));
                    if(obj.result == 1)
                    {
                        console.log('res====>' + JSON.stringify(res));
                        //window.location.replace('/srv/seller/mobile/insert');
                    }
                },
                error: function(err){
                    console.log('err====>' + JSON.stringify(err));
                }
            });

        }
    },

    remove: function() {
        // Remove the validation binding
        // See: http://thedersen.com/projects/backbone-validation/#using-form-model-validation/unbinding
        Backbone.Validation.unbind(this);
        return Backbone.View.prototype.remove.apply(this, arguments);
    }
});

//validation 참조 : http://jsfiddle.net/thedersen/udXL5/
$(function () {
    var view = new EmailForm({
        el: $('#wrap'),
        model: new EmailModel()
    });

    window.location.replace('freeorder://action?name=get_seller');
});

//Call By Native
function setSeller(phonenb, token)
{
    console.log('phonenb : ' + phonenb);
    console.log('token : ' + token);
    $('#phonenb').val(phonenb);
    $('#token').val(token);
}

// https://github.com/hongymagic/jQuery.serializeObject
$.fn.serializeObject = function () {
    "use strict";
    var a = {}, b = function (b, c) {
        var d = a[c.name];
        "undefined" != typeof d && d !== null ? $.isArray(d) ? d.push(c.value) : a[c.name] = [d, c.value] : a[c.name] = c.value
    };
    return $.each(this.serializeArray(), b), a
};