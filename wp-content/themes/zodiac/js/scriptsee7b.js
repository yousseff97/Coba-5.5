jQuery(document).ready(function() {
    var lang = jQuery('html').attr('lang').slice(0,2);

    // Fix script zoomcollection
    if( jQuery("body").width() <= 700 ){
        var zoomCollection = '#image';
        jQuery( zoomCollection ).elevateZoom({
            lensShape : "round",
            lensSize    : 150,
            easing:true,
            gallery:'image-additional-carousel',
            cursor: 'pointer',
            galleryActiveClass: "active"
        });
    }

    jQuery('.add-countdown').each(function() {
      var time = jQuery(this).data('time');
      var days = "days";

      switch (lang) {
        case "fr": days = "J"; break;
        case "en": days = "D"; break;
        case "de": days = "D"; break;
        case "it": days = "D"; break;
        case "es": days = "D"; break;
      }

      jQuery(this).countdown(time, function(event) {
        jQuery(this).text(event.strftime('%D'+days+' %Hh %Mm %Ss'))
      });
    });


    // Custom imagegrid load
    var refresh_imagegrid_info_lineheight = function () {
        jQuery('.wpb_image_zodiac_grid .isotope-item .info').each(function (i, obj) {
            jQuery(obj).css('line-height', jQuery(obj).parent().height() + 'px');
        });
    };
    jQuery(".wpb_image_grid_ul").imagesLoaded(function(){
        var $grid = jQuery('.wpb_image_zodiac_grid').isotope({itemSelector:".isotope-item",layoutMode:"fitRows"});
        $grid.on('layoutComplete', refresh_imagegrid_info_lineheight);
        refresh_imagegrid_info_lineheight();
    });

    // Lang dropdown system
    jQuery('.wpml-lang-dropdown.list').hide();
    jQuery('.wpml-languages.quick-button .heading').click(function(event) {
        event.preventDefault();
        jQuery('.wpml-lang-dropdown.list').stop(true,true).fadeToggle(100);
    });

    // Offcanvas
    jQuery('.btn-offcanvas').on('click', function () {
        jQuery('.row-offcanvas').toggleClass('active');
        jQuery('#pbr-off-canvas').toggleClass('active');
    });
    jQuery('#pbr-off-canvas .dropdown').on('click', function() {
        jQuery(this).toggleClass('open');
    });

    // leaflet
    var save_namefile = false;
    var save_file = false;
    var leaflet_click_event = function() {
      jQuery('#leafletModal').modal('hide');
      //if(ga !== undefined)
      window.open(save_file, '_blank');
      ga('send', 'event', 'clic-telechargement', 'clic-brochure', 'clic-' + save_namefile);
    };
    jQuery('.btn-widget-leaflet').click(function() {
        save_file = jQuery(this).data('file');
        save_namefile = jQuery(this).data('namedoc');
        /*$country = jQuery('#mc4wp_country');
        if($country.attr('data-loaded') === undefined) {
            var save_choice_text = $country.find('option').html();
            $country.attr('disabled', 'disabled');
            $country.find('option').html($country.attr('data-loading'));

            jQuery.get('https://neptune.zodiac-nautic.com/'+lang+'/efrontend/api/ressource/land/list')
            .done(function(data) {
                $country.attr('data-loaded', 'loaded');
                $country.find('option').html(save_choice_text);
                for (var i = 0 ; i < data.country.length ; i++) {
                    data.country[i]
                    $country.append('<option value="'+data.country[i].id+'">'+data.country[i].label+'</option>');
                    $country.attr('disabled', null);
                }
            })
            .fail(function() {
                alert('Error ! Please reload this page.');
            });
        }*/
    });
    jQuery('.popupnewsletter .modal-body .link').click(leaflet_click_event);
    jQuery('.popupnewsletter.m--newsletter form').submit(function(event) {
        event.preventDefault();
        var err_msg = jQuery(this).data('errmsg');
        var data = jQuery(this).serialize()+"&doc="+save_namefile+"&brand=zodiac";
        jQuery.post('https://neptune.zodiac-nautic.com/'+lang+'/efrontend/api/ressource/catalogue/post', data)
            .done(function(data) {
                if(data.type == "success") {
                    leaflet_click_event();
                } else {
                    alert(err_msg)
                }
            })
            .fail(leaflet_click_event);
    });

    /*/ Open5.5 - Get notified
    if(jQuery('.btn-widget-open55-getnotified').length > 0) {
      jQuery('.btn-widget-open55-getnotified').click(function() {
        $country = jQuery('#mc4wp_country2');
        if($country.attr('data-loaded') === undefined) {
          var save_choice_text = $country.find('option').html();
          $country.attr('disabled', 'disabled');
          $country.find('option').html($country.attr('data-loading'));

          jQuery.get('https://neptune.zodiac-nautic.com/'+lang+'/efrontend/api/ressource/land/list')
            .done(function(data) {
              $country.attr('data-loaded', 'loaded');
              $country.find('option').html(save_choice_text);
              for (var i = 0 ; i < data.country.length ; i++) {
                data.country[i];
                $country.append('<option value="'+data.country[i].id+'">'+data.country[i].label+'</option>');
                $country.attr('disabled', null);
              }
            })
            .fail(function() {
              alert('Error ! Please reload this page.');
            });
        }
      });
      jQuery('.popupnewsletter.m--notified-open55 form').submit(function(event) {
        event.preventDefault();
        var $form = jQuery(this);
        var err_msg = jQuery(this).data('errmsg');
        var data = jQuery(this).serialize()+"&pref_lang="+jQuery('html').attr('lang');
        jQuery.post('/wp-admin/admin-ajax.php?action=addviso_open55_postnotified', data)
          .done(function(data) {
            if(data.type == "success") {
              $form.fadeOut(200, function() {
                $form.parent().find('.form-success').fadeIn(200);
              })
            } else {
              alert(err_msg);
            }
          })
          .fail(function() {
            jQuery('#getnotifiedModal').modal('hide');
          });

      });
    }
    */

    // Socials blank
    jQuery('.widget_pbr_socials_widget a').click(function(event) {
        event.preventDefault();
        window.open(jQuery(this).attr('href'), "_blank");
    });

    // Cookie remember_lang
    // if(jQuery('#prehome').length == 0) {
    //     var lang = jQuery('html').attr('lang');
    //     if(lang != "en-us")
    //         lang = lang.substr(0, 2);
    //
    //     if(Cookies === undefined)
    //       Cookies = chrome.cookies;
    //
    //     if(lang != '')
    //         Cookies.set('_remember_lang', lang, { expires: 7, path: '/' });
    //     else
    //         Cookies.remove('_remember_lang');
    //
    // } else {
    //     if(Cookies.get('_remember_lang') !== "undefined" && Cookies.get('_remember_lang') !== undefined) {
    //       jQuery('#prehome').hide();
    //       window.location.href = '/'+Cookies.get('_remember_lang')+"/";
    //     }
    // }


    // Bullets map
    if(jQuery('.npp-bulletsmap__image').length > 0) {

        if(jQuery(window).width() >= 768) {
          jQuery('.npp-bulletsmap__image').each(function(i, o) {
              var img = jQuery(o).find('img');
              img.attr('src', img.data('main-img'));

                img.load(function() {
                    jQuery('.npp-bulletsmap__item').each(function(i, o) {
                      var $this = jQuery(o);
                      var $parent = $this.parent();

                      var pos = (parseInt($this.css('left'))+372);
                      var freeplace = $parent.width();

                      if(pos >= freeplace) {
                        $this.find('.npp-bulletsmap__body').css({'margin-left': '-355px'});
                        $this.find('.npp-bulletsmap__body').addClass('m--right');
                      } else {
                        $this.find('.npp-bulletsmap__body').css({'margin-left': '35px'});
                        $this.find('.npp-bulletsmap__body').addClass('m--left');
                      }
                    });
                });
          });
        }

        var resetAll = function() {
          jQuery('.npp-bulletsmap__bullet.m--active').each(function(i, o) {
            jQuery(o).removeClass('m--active');
            jQuery(o).parent().find('.npp-bulletsmap__body').stop(1, 1).fadeOut(200);
          });
        };

        jQuery(window).resize(function(e) {
          if(jQuery(window).width() >= 768) {
            jQuery('.npp-bulletsmap__image').each(function(i, o) {
              var img = jQuery(o).find('img');
              img.attr('src', img.data('main-img'));
            });
          } else {
            jQuery('.npp-bulletsmap__image').each(function(i, o) {
              var img = jQuery(o).find('img');
              img.attr('src', img.data('fallback-img'));
            });
          }
        });


        var bullet_open = function(bul) {
          var $this = jQuery(bul);

          if($this.hasClass('m--active')) {
            resetAll();
          } else {
            resetAll();
            $this.addClass('m--active');
            $this.parent().find('.npp-bulletsmap__body').stop(1, 1).fadeIn(200);
          }
        };
        var bullet_close = function(bul) {
          var $this = jQuery(bul).parent().parent();
          $this.find('.npp-bulletsmap__bullet').removeClass('m--active');
          $this.find('.npp-bulletsmap__body').stop(1, 1).fadeOut(200);
        };

        jQuery('.npp-bulletsmap__bullet').click(function (e) {
          e.preventDefault();
          bullet_open(this);
        });
        jQuery('.npp-bulletsmap__close').click(function (e) {
          e.preventDefault();
          bullet_close(this);
        });

      jQuery('.npp-bulletsmap__item').on("mouseenter", function (e) {
        e.preventDefault();
        bullet_open(jQuery(this).find('.npp-bulletsmap__bullet')[0]);
      });
      jQuery('.npp-bulletsmap__item').on("mouseleave", function (e) {
        e.preventDefault();
        bullet_close(jQuery(this).find('.npp-bulletsmap__bullet')[0]);
      });
    }
    // Contact forms
    document.addEventListener('wpcf7submit', function(event) {
      var submit_event_url = false;

      switch(event.detail.contactFormId) {
        case '19890':
          submit_event_url = '/demande-formation-ok';
        break;
        case '21293':
          submit_event_url = '/demande-coupon-myboatclub-ok';
        break;
      }

      if (submit_event_url) {
        ga('send', 'pageview', submit_event_url);
      }
    }, false);





    // Configurator
    if(jQuery('.configurator').length) {
      // Initialize inputs values with active buttons. Useful when page is reloaded.
      var $active_options = jQuery('.configurator-option__radio-color.m--active');
      $active_options.each(function() {
        var target = jQuery(this).data('target');
        var value = jQuery(this).data('value');
        var $target = jQuery('.configurator-option--value[name='+target+']');
        $target.val(value);
        jQuery('input[name="params['+target+']"]').val(value);
      });
      
      jQuery('.configurator-option__radio-color').on('click', function() {
        var target = jQuery(this).data('target');
        var value = jQuery(this).data('value');
        var $target = jQuery('.configurator-option--value[name='+target+']');
        $target.val(value);
        $target.trigger('change');
        jQuery('.configurator-option__radio-color[data-target='+target+'].m--active').removeClass('m--active');
        jQuery(this).addClass('m--active');
        jQuery('input[name="params['+target+']"]').val(value);
      });
      jQuery('.configurator-option--value').on('change', function() {
        configurator_refresh_img();
      });

      var number_format = function (number, decimals, dec_point, thousands_sep) {
        number = number.toFixed(decimals);
        var nstr = number.toString();
        nstr += '';
        x = nstr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? dec_point + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1))
          x1 = x1.replace(rgx, '$1' + thousands_sep + '$2');
        return x1 + x2;
      };

      var configurator_refresh_img = function() {
        var $wrapper = jQuery('.configurator-center-image__wrapper');
        var $img = jQuery('.configurator-center__image');
        var mask = $img.data('mask');
        var params_keys = [];
        var params_values = [];
        jQuery('.configurator-option input').each(function(i, o) {
          params_keys.push(jQuery(o).attr('name'));
          params_values.push(jQuery(o).val());
        });
        for(var i = 0 ; i < params_keys.length ; i++)
          mask = mask.replace('{'+params_keys[i]+'}', params_values[i]);
        $wrapper.addClass('m--loading');
        var $loadind_img = jQuery("<img>")
          .attr('src', mask)
          .on('load', function() {
            if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
              alert('broken image!');
            } else {
              $img.attr('src', mask);
              $wrapper.removeClass('m--loading');
              $loadind_img.remove();
            }
        });
        var finded_price = false;
        for(i = 0 ; i < configurator_prices.length ; i++) {
          finded_price = true;
          for(var y = 0 ; y < params_keys.length ; y++) {
            if(configurator_prices[i][params_keys[y]] !== params_values[y]) {
              finded_price = false;
            }
          }
          if(finded_price === true) {
            finded_price = configurator_prices[i]['price'];
            break;
          }
        }

        if (finded_price != 'NC') {
          finded_price = number_format(finded_price, 0, ',', ' ');
        }
        jQuery('.configurator-price .price').html(finded_price);
      };

      jQuery('.configurator-generate-devis').submit(function(e) {
        e.preventDefault();
        var devis_url = jQuery(this).data('url');
        var $submit = jQuery(this).find('button');
        $submit.prop('disabled', true);

        jQuery.ajax({
          method: "POST",
          url: ajaxurl+'?action=addviso_ajax_configurator_devis_generate_key',
          data: new FormData(this),
          dataType: 'json',
          contentType: false,
          cache: false,
          processData: false,
          mimeType: "application/x-www-form-urlencoded",
        }).done(function(response) {
          if(response.status === 'ok')
            window.location.href = response.redirect;
          else
            $submit.prop('disabled', false);
        });
      });

      jQuery('.configurator').find('.configurator-price').on('click', function() {
        jQuery(jQuery(this).data('notice')).toggleClass('m--displayed');
      });

      jQuery('.configurator').find('.boat-selector__btn').on('click', function() {
        jQuery(jQuery(this).data('dropdown')).toggleClass('m--open');
      });
    }




});
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){"use strict";function b(a){if(a instanceof Date)return a;if(String(a).match(g))return String(a).match(/^[0-9]*$/)&&(a=Number(a)),String(a).match(/\-/)&&(a=String(a).replace(/\-/g,"/")),new Date(a);throw new Error("Couldn't cast `"+a+"` to a date object.")}function c(a){var b=a.toString().replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");return new RegExp(b)}function d(a){return function(b){var d=b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);if(d)for(var f=0,g=d.length;f<g;++f){var h=d[f].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),j=c(h[0]),k=h[1]||"",l=h[3]||"",m=null;h=h[2],i.hasOwnProperty(h)&&(m=i[h],m=Number(a[m])),null!==m&&("!"===k&&(m=e(l,m)),""===k&&m<10&&(m="0"+m.toString()),b=b.replace(j,m.toString()))}return b=b.replace(/%%/,"%")}}function e(a,b){var c="s",d="";return a&&(a=a.replace(/(:|;|\s)/gi,"").split(/\,/),1===a.length?c=a[0]:(d=a[0],c=a[1])),Math.abs(b)>1?c:d}var f=[],g=[],h={precision:100,elapse:!1,defer:!1};g.push(/^[0-9]*$/.source),g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),g=new RegExp(g.join("|"));var i={Y:"years",m:"months",n:"daysToMonth",d:"daysToWeek",w:"weeks",W:"weeksToMonth",H:"hours",M:"minutes",S:"seconds",D:"totalDays",I:"totalHours",N:"totalMinutes",T:"totalSeconds"},j=function(b,c,d){this.el=b,this.$el=a(b),this.interval=null,this.offset={},this.options=a.extend({},h),this.firstTick=!0,this.instanceNumber=f.length,f.push(this),this.$el.data("countdown-instance",this.instanceNumber),d&&("function"==typeof d?(this.$el.on("update.countdown",d),this.$el.on("stoped.countdown",d),this.$el.on("finish.countdown",d)):this.options=a.extend({},h,d)),this.setFinalDate(c),this.options.defer===!1&&this.start()};a.extend(j.prototype,{start:function(){null!==this.interval&&clearInterval(this.interval);var a=this;this.update(),this.interval=setInterval(function(){a.update.call(a)},this.options.precision)},stop:function(){clearInterval(this.interval),this.interval=null,this.dispatchEvent("stoped")},toggle:function(){this.interval?this.stop():this.start()},pause:function(){this.stop()},resume:function(){this.start()},remove:function(){this.stop.call(this),f[this.instanceNumber]=null,delete this.$el.data().countdownInstance},setFinalDate:function(a){this.finalDate=b(a)},update:function(){if(0===this.$el.closest("html").length)return void this.remove();var a,b=new Date;return a=this.finalDate.getTime()-b.getTime(),a=Math.ceil(a/1e3),a=!this.options.elapse&&a<0?0:Math.abs(a),this.totalSecsLeft===a||this.firstTick?void(this.firstTick=!1):(this.totalSecsLeft=a,this.elapsed=b>=this.finalDate,this.offset={seconds:this.totalSecsLeft%60,minutes:Math.floor(this.totalSecsLeft/60)%60,hours:Math.floor(this.totalSecsLeft/60/60)%24,days:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToWeek:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToMonth:Math.floor(this.totalSecsLeft/60/60/24%30.4368),weeks:Math.floor(this.totalSecsLeft/60/60/24/7),weeksToMonth:Math.floor(this.totalSecsLeft/60/60/24/7)%4,months:Math.floor(this.totalSecsLeft/60/60/24/30.4368),years:Math.abs(this.finalDate.getFullYear()-b.getFullYear()),totalDays:Math.floor(this.totalSecsLeft/60/60/24),totalHours:Math.floor(this.totalSecsLeft/60/60),totalMinutes:Math.floor(this.totalSecsLeft/60),totalSeconds:this.totalSecsLeft},void(this.options.elapse||0!==this.totalSecsLeft?this.dispatchEvent("update"):(this.stop(),this.dispatchEvent("finish"))))},dispatchEvent:function(b){var c=a.Event(b+".countdown");c.finalDate=this.finalDate,c.elapsed=this.elapsed,c.offset=a.extend({},this.offset),c.strftime=d(this.offset),this.$el.trigger(c)}}),a.fn.countdown=function(){var b=Array.prototype.slice.call(arguments,0);return this.each(function(){var c=a(this).data("countdown-instance");if(void 0!==c){var d=f[c],e=b[0];j.prototype.hasOwnProperty(e)?d[e].apply(d,b.slice(1)):null===String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i)?(d.setFinalDate.call(d,e),d.start()):a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi,e))}else new j(this,b[0],b[1])})}});