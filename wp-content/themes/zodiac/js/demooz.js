jQuery(function($) {

    var isValidEmailAddress = function (emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    };

    $('#demoozpage').submit(function(e) {
        e.preventDefault();
        var errors = [];

        jQuery('#postmsg_error').fadeOut(200);
        var email = $('#email').val();
        var products = $('#products').val();

        var valid_form = true;

        if(!isValidEmailAddress(email)) {
            var error_string = jQuery('#errors').data('error');
            var label_field = jQuery("#email_label").data('label');
            var gen_string = error_string.replace('{namefield}', label_field);
            errors.push("<li>" + gen_string + "</li>");

            jQuery('#postmsg_error ul').html(errors.join(''));
            jQuery('#postmsg_error').fadeIn(200);

            valid_form = false;
        }
        if(products == '') {
            var error_string = jQuery('#errors').data('error');
            var label_field = jQuery("#products_label").data('label');
            var gen_string = error_string.replace('{namefield}', label_field);
            errors.push("<li>" + gen_string + "</li>");

            jQuery('#postmsg_error ul').html(errors.join(''));
            jQuery('#postmsg_error').fadeIn(200);

            valid_form = false;
        }

        if(valid_form) {
            jQuery.ajax('https://demooz.com/external/signupandpreparetest/', {
                method: 'POST',
                data: {
                    email: email,
                    product: products
                },
                error: function () {
                    alert('Sorry, but the remote server can not process your request.\nPlease try again later.');
                },
                success: function () {
                    jQuery('#postmsg_success').fadeIn(200);
                    jQuery('#demoozpage').fadeOut(200);
                }
            });
        }
    });

});