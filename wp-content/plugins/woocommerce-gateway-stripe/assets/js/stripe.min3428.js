jQuery(function(c){"use strict";try{var o=Stripe(wc_stripe_params.key)}catch(e){return void console.log(e)}var t,n,i,e=Object.keys(wc_stripe_params.elements_options).length?wc_stripe_params.elements_options:{},r=Object.keys(wc_stripe_params.sepa_elements_options).length?wc_stripe_params.sepa_elements_options:{},a=o.elements(e),s=a.create("iban",r),m={getAjaxURL:function(e){return wc_stripe_params.ajaxurl.toString().replace("%%endpoint%%","wc_stripe_"+e)},unmountElements:function(){"yes"===wc_stripe_params.inline_cc_form?t.unmount("#stripe-card-element"):(t.unmount("#stripe-card-element"),n.unmount("#stripe-exp-element"),i.unmount("#stripe-cvc-element"))},mountElements:function(){if(c("#stripe-card-element").length){if("yes"===wc_stripe_params.inline_cc_form)return t.mount("#stripe-card-element");t.mount("#stripe-card-element"),n.mount("#stripe-exp-element"),i.mount("#stripe-cvc-element")}},createElements:function(){var e={base:{iconColor:"#666EE8",color:"#31325F",fontSize:"15px","::placeholder":{color:"#CFD7E0"}}},r={focus:"focused",empty:"empty",invalid:"invalid"};e=wc_stripe_params.elements_styling?wc_stripe_params.elements_styling:e,r=wc_stripe_params.elements_classes?wc_stripe_params.elements_classes:r,"yes"===wc_stripe_params.inline_cc_form?(t=a.create("card",{style:e,hidePostalCode:!0})).addEventListener("change",function(e){m.onCCFormChange(),e.error&&c(document.body).trigger("stripeError",e)}):(t=a.create("cardNumber",{style:e,classes:r}),n=a.create("cardExpiry",{style:e,classes:r}),i=a.create("cardCvc",{style:e,classes:r}),t.addEventListener("change",function(e){m.onCCFormChange(),m.updateCardBrand(e.brand),e.error&&c(document.body).trigger("stripeError",e)}),n.addEventListener("change",function(e){m.onCCFormChange(),e.error&&c(document.body).trigger("stripeError",e)}),i.addEventListener("change",function(e){m.onCCFormChange(),e.error&&c(document.body).trigger("stripeError",e)})),"yes"===wc_stripe_params.is_checkout?c(document.body).on("updated_checkout",function(){c("#stripe-card-element").children().length||(t&&m.unmountElements(),m.mountElements(),c("#stripe-iban-element").length&&s.mount("#stripe-iban-element"))}):(c("form#add_payment_method").length||c("form#order_review").length)&&(m.mountElements(),c("#stripe-iban-element").length&&s.mount("#stripe-iban-element"))},updateCardBrand:function(e){var r={visa:"stripe-visa-brand",mastercard:"stripe-mastercard-brand",amex:"stripe-amex-brand",discover:"stripe-discover-brand",diners:"stripe-diners-brand",jcb:"stripe-jcb-brand",unknown:"stripe-credit-card-brand"},t=c(".stripe-card-brand"),n="stripe-credit-card-brand";e in r&&(n=r[e]),c.each(r,function(e,r){t.removeClass(r)}),t.addClass(n)},init:function(){"yes"!==wc_stripe_params.is_change_payment_page&&"yes"!==wc_stripe_params.is_pay_for_order_page||c(document.body).trigger("wc-credit-card-form-init"),c("form.woocommerce-checkout").length&&(this.form=c("form.woocommerce-checkout")),c("form.woocommerce-checkout").on("checkout_place_order_stripe checkout_place_order_stripe_bancontact checkout_place_order_stripe_sofort checkout_place_order_stripe_giropay checkout_place_order_stripe_ideal checkout_place_order_stripe_alipay checkout_place_order_stripe_sepa",this.onSubmit),c("form#order_review").length&&(this.form=c("form#order_review")),c("form#order_review, form#add_payment_method").on("submit",this.onSubmit),c("form#add_payment_method").length&&(this.form=c("form#add_payment_method")),c("form.woocommerce-checkout").on("change",this.reset),c(document).on("stripeError",this.onError).on("checkout_error",this.reset),s.on("change",this.onSepaError),c("#early_renewal_modal_submit").on("click",this.onEarlyRenewalSubmit),m.createElements(),window.addEventListener("hashchange",m.onHashChange),m.maybeConfirmIntent()},isStripeChosen:function(){return c("#payment_method_stripe, #payment_method_stripe_bancontact, #payment_method_stripe_sofort, #payment_method_stripe_giropay, #payment_method_stripe_ideal, #payment_method_stripe_alipay, #payment_method_stripe_sepa, #payment_method_stripe_eps, #payment_method_stripe_multibanco").is(":checked")||c("#payment_method_stripe").is(":checked")&&"new"===c('input[name="wc-stripe-payment-token"]:checked').val()||c("#payment_method_stripe_sepa").is(":checked")&&"new"===c('input[name="wc-stripe-payment-token"]:checked').val()},isStripeSaveCardChosen:function(){return c("#payment_method_stripe").is(":checked")&&c('input[name="wc-stripe-payment-token"]').is(":checked")&&"new"!==c('input[name="wc-stripe-payment-token"]:checked').val()||c("#payment_method_stripe_sepa").is(":checked")&&c('input[name="wc-stripe_sepa-payment-token"]').is(":checked")&&"new"!==c('input[name="wc-stripe_sepa-payment-token"]:checked').val()},isStripeCardChosen:function(){return c("#payment_method_stripe").is(":checked")},isBancontactChosen:function(){return c("#payment_method_stripe_bancontact").is(":checked")},isGiropayChosen:function(){return c("#payment_method_stripe_giropay").is(":checked")},isIdealChosen:function(){return c("#payment_method_stripe_ideal").is(":checked")},isSofortChosen:function(){return c("#payment_method_stripe_sofort").is(":checked")},isAlipayChosen:function(){return c("#payment_method_stripe_alipay").is(":checked")},isSepaChosen:function(){return c("#payment_method_stripe_sepa").is(":checked")},isP24Chosen:function(){return c("#payment_method_stripe_p24").is(":checked")},isEpsChosen:function(){return c("#payment_method_stripe_eps").is(":checked")},isMultibancoChosen:function(){return c("#payment_method_stripe_multibanco").is(":checked")},hasSource:function(){return 0<c("input.stripe-source").length},isMobile:function(){return!!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)},block:function(){m.isMobile()||m.form.block({message:null,overlayCSS:{background:"#fff",opacity:.6}})},unblock:function(){m.form&&m.form.unblock()},getSelectedPaymentElement:function(){return c('.payment_methods input[name="payment_method"]:checked')},getOwnerDetails:function(){var e=c("#billing_first_name").length?c("#billing_first_name").val():wc_stripe_params.billing_first_name,r=c("#billing_last_name").length?c("#billing_last_name").val():wc_stripe_params.billing_last_name,t={name:"",address:{},email:"",phone:""};return t.name=e,t.name=e&&r?e+" "+r:c("#stripe-payment-data").data("full-name"),t.email=c("#billing_email").val(),t.phone=c("#billing_phone").val(),(void 0===t.phone||t.phone.length<=0)&&delete t.phone,(void 0===t.email||t.email.length<=0)&&(c("#stripe-payment-data").data("email").length?t.email=c("#stripe-payment-data").data("email"):delete t.email),(void 0===t.name||t.name.length<=0)&&delete t.name,t.address.line1=c("#billing_address_1").val()||wc_stripe_params.billing_address_1,t.address.line2=c("#billing_address_2").val()||wc_stripe_params.billing_address_2,t.address.state=c("#billing_state").val()||wc_stripe_params.billing_state,t.address.city=c("#billing_city").val()||wc_stripe_params.billing_city,t.address.postal_code=c("#billing_postcode").val()||wc_stripe_params.billing_postcode,t.address.country=c("#billing_country").val()||wc_stripe_params.billing_country,{owner:t}},createSource:function(){var e=m.getOwnerDetails();return m.isSepaChosen()?(e.currency=c("#stripe-sepa_debit-payment-data").data("currency"),e.mandate={notification_method:wc_stripe_params.sepa_mandate_notification},e.type="sepa_debit",o.createSource(s,e).then(m.sourceResponse)):o.createSource(t,e).then(m.sourceResponse)},sourceResponse:function(e){if(e.error)return c(document.body).trigger("stripeError",e);m.reset(),m.form.append(c('<input type="hidden" />').addClass("stripe-source").attr("name","stripe_source").val(e.source.id)),c("form#add_payment_method").length&&c(m.form).off("submit",m.form.onSubmit),m.form.submit()},onSubmit:function(){return!m.isStripeChosen()||(!(!m.isStripeSaveCardChosen()&&!m.hasSource())||(!!(m.isBancontactChosen()||m.isGiropayChosen()||m.isIdealChosen()||m.isAlipayChosen()||m.isSofortChosen()||m.isP24Chosen()||m.isEpsChosen()||m.isMultibancoChosen())||(m.block(),m.createSource(),!1)))},onCCFormChange:function(){m.reset()},reset:function(){c(".wc-stripe-error, .stripe-source").remove()},onSepaError:function(e){var r=m.getSelectedPaymentElement().parents("li").eq(0).find(".stripe-source-errors");if(!e.error)return c(r).html("");console.log(e.error.message),c(r).html('<ul class="woocommerce_error woocommerce-error wc-stripe-error"><li /></ul>'),c(r).find("li").text(e.error.message)},onError:function(e,r){var t,n=r.error.message,o=m.getSelectedPaymentElement().closest("li"),i=o.find(".woocommerce-SavedPaymentMethods-tokenInput");if(i.length){var a=i.filter(":checked");t=a.closest(".woocommerce-SavedPaymentMethods-new").length?c("#wc-stripe-cc-form .stripe-source-errors"):a.closest("li").find(".stripe-source-errors")}else t=o.find(".stripe-source-errors");if(m.isSepaChosen()&&"invalid_owner_name"===r.error.code&&wc_stripe_params.hasOwnProperty(r.error.code)){var s='<ul class="woocommerce-error"><li /></ul>';return s.find("li").text(wc_stripe_params[r.error.code]),m.submitError(s)}"email_invalid"===r.error.code?n=wc_stripe_params.email_invalid:"invalid_request_error"!==r.error.type&&"api_connection_error"!==r.error.type&&"api_error"!==r.error.type&&"authentication_error"!==r.error.type&&"rate_limit_error"!==r.error.type||(n=wc_stripe_params.invalid_request_error),"card_error"===r.error.type&&wc_stripe_params.hasOwnProperty(r.error.code)&&(n=wc_stripe_params[r.error.code]),"validation_error"===r.error.type&&wc_stripe_params.hasOwnProperty(r.error.code)&&(n=wc_stripe_params[r.error.code]),m.reset(),c(".woocommerce-NoticeGroup-checkout").remove(),console.log(r.error.message),c(t).html('<ul class="woocommerce_error woocommerce-error wc-stripe-error"><li /></ul>'),c(t).find("li").text(n),c(".wc-stripe-error").length&&c("html, body").animate({scrollTop:c(".wc-stripe-error").offset().top-200},200),m.unblock(),c.unblockUI()},submitError:function(e){c(".woocommerce-NoticeGroup-checkout, .woocommerce-error, .woocommerce-message").remove(),m.form.prepend('<div class="woocommerce-NoticeGroup woocommerce-NoticeGroup-checkout">'+e+"</div>"),m.form.removeClass("processing").unblock(),m.form.find(".input-text, select, input:checkbox").blur();var r="";c("#add_payment_method").length&&(r=c("#add_payment_method")),c("#order_review").length&&(r=c("#order_review")),c("form.checkout").length&&(r=c("form.checkout")),r.length&&c("html, body").animate({scrollTop:r.offset().top-100},500),c(document.body).trigger("checkout_error"),m.unblock()},onHashChange:function(){var e=window.location.hash.match(/^#?confirm-(pi|si)-([^:]+):(.+)$/);if(e&&!(e.length<4)){var r=e[1],t=e[2],n=decodeURIComponent(e[3]);window.location.hash="",m.openIntentModal(t,n,!1,"si"===r)}},maybeConfirmIntent:function(){if(c("#stripe-intent-id").length&&c("#stripe-intent-return").length){var e=c("#stripe-intent-id").val(),r=c("#stripe-intent-return").val();m.openIntentModal(e,r,!0,!1)}},openIntentModal:function(e,t,r,n){o[n?"handleCardSetup":"handleCardPayment"](e).then(function(e){if(e.error)throw e.error;var r=e[n?"setupIntent":"paymentIntent"];"requires_capture"!==r.status&&"succeeded"!==r.status||(window.location=t)}).catch(function(e){if(r)return window.location=t;c(document.body).trigger("stripeError",{error:e}),m.form&&m.form.removeClass("processing"),c.get(t+"&is_ajax")})},onEarlyRenewalSubmit:function(e){return e.preventDefault(),c.ajax({url:c("#early_renewal_modal_submit").attr("href"),method:"get",success:function(e){var r=c.parseJSON(e);r.stripe_sca_required?m.openIntentModal(r.intent_secret,r.redirect_url,!0,!1):window.location=r.redirect_url}}),!1}};m.init()});
