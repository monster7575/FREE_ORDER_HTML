// Extend the callbacks to work with Bootstrap, as used in this example
// See: http://thedersen.com/projects/backbone-validation/#configuration/callbacks
_.extend(Backbone.Validation.callbacks, {
    valid: function (view, attr, selector) {

    },
    invalid: function (view, attr, error, selector) {

    }
});

// Define a model with some validation rules
var NickModel = Backbone.Model.extend({
    defaults: {
        nick: ''
    },
    validate: function (attrs) {
        if (!attrs.nick) {
            return '닉네임을 입력해주세요.';
        }
    }
});

// Define a View that uses our model
var NickForm = Backbone.View.extend({
    events: {
        'click #btn_nick_submit': function (e) {
            e.preventDefault();
            this.nickSave();
        }
    },

    initialize: function () {
        // This hooks up the validation
        // See: http://thedersen.com/projects/backbone-validation/#using-form-model-validation/validation-binding
        Backbone.Validation.bind(this);
    },

    nickSave: function () {

        //  console.log('data====>' + this.model.isValid(true));

        if($('#nick').val().length == 0)
        {
            $('.nick_error').css('visibility','visible');
        }
        else if($('#nick').val().length < 3)
        {
            $('.nick_error').css('visibility','visible');
        }
        else
        {
            $('.nick_error').css('visibility','hidden');

            var data = {nick : $('#nick').val()};

            this.model.set(data);

            // Check if the model is valid before saving
            // See: http://thedersen.com/projects/backbone-validation/#methods/isvalid
            if(this.model.isValid(true)){
                // this.model.save();

                var updateData = {'nick' : data.nick};

                nickExist(data.nick, function(){
                    userUpdate(updateData, function(data){
                        userProccessComplete(data, 0);
                    });
                });
            }
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
    var view = new NickForm({
        el: $('#wrap'),
        model: new NickModel()
    });


});

function nickExist(nick, callback)
{

    var url = CMS.proxypath+"/srv/user/api/exist/nick";
    var data = {nick : nick};

    $.ajax({
        type: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        url: url,
        data : data,
        success: function(res) {
            var result = res.result;

            if(result == 1)
            {
                if(callback)
                    callback();
            }
            else
            {
                $('.nick_error').css('visibility','visible');
            }
        },
        error: function(){
            $('.nick_error').css('visibility','visible');
        }
    });
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