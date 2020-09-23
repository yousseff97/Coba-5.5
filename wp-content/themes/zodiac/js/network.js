jQuery(document).ready(function() {

  // Modal Tab
  var tab_reset = function() {
    jQuery('.network-modal .tab-content').hide();
    jQuery('.network-modal .tab li.active').removeClass('active');
    jQuery('.network-modal .tab li.default').addClass('active');
    var tab_id = jQuery('.network-modal .tab li.default').attr('data-tab-id');
    jQuery('#'+tab_id).show();
  };
  tab_reset();

  jQuery('.network-modal .tab li').click(function (event) {
    event.preventDefault();
    jQuery('.network-modal .tab li').removeClass('active');
    jQuery(this).addClass('active');
    var tab_id = jQuery(this).attr('data-tab-id');
    jQuery('.network-modal .tab-content').stop(1,1).fadeOut(200);
    jQuery('#'+tab_id).stop(1,1).delay(200).fadeIn(200);
  });

  // Network map
  var network_map = L.map('network-map', {
    zoomControl: false,
    scrollWheelZoom: false,
    minZoom: 3,
    maxZoom: 12
  }).setView([23.2413461, -36.29882812], 3);
  L.control.zoom({ 'position': 'bottomright' }).addTo(network_map);
  L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
  }).addTo(network_map);

  var marker_image = L.icon({
    iconUrl: '/wp-content/themes/zodiac/images/mk.png',
    iconSize: [29, 39],
    iconAnchor: [14, 36]
  });

  // -- Rebound
  var network_map_rebound = function() {
    if(network_map != null && markers_group != null)
        network_map.fitBounds(markers_group.getBounds());
  };
  jQuery(window).resize(function() {
    network_map_rebound();
  });

  // -- Retreive Country/region filters
  var lang = jQuery('html').attr('lang').slice(0,2);
  var country = [];
  var html_country = [];
  var map_markers = [];
  var markers_group = null;

  html_country.push("<option value=\"\">"+jQuery('#network_country').attr('data-label')+"</option>");

  jQuery.getJSON("https://neptune.zodiac-nautic.com/"+lang+"/efrontend/api/ressource/countries/list", function(data) {
    data = data.country;
    jQuery.each( data, function( key, val ) {
      country[val.id] = val;
      html_country.push("<option value='" + val.id + "'>" + val.label + "</option>" );
    });

    jQuery('#network_country').html(html_country.join(""));
  });

  jQuery('#network_country').change(function() {
    var country_id = jQuery(this).val();
    jQuery('#network_state').stop(1,1).fadeOut(200);

    if(country[country_id].regions.length > 0 && country_id == 69) {
      var sub_regions = country[country_id].regions;
      var html_regions = [];
      html_regions.push("<option value=\"\">"+jQuery('#network_state').attr('data-label')+"</option>");

      jQuery.each(sub_regions, function( key, val ) {
        html_regions.push("<option value='" + val.id + "'>" + val.label + "</option>" );
      });

      jQuery('#network_state').html(html_regions.join(""));
      jQuery('#network_state').stop(1,1).fadeIn(200);

    } else {
      jQuery('#network_state').html('');
    }
  });

  var request = function(filters) {
    var endrequest = '/';

    jQuery.each(filters, function( key, val ) {
      endrequest = endrequest + key+"/"+val+"/"
    });

    jQuery('.network-overlay').stop(1,1).fadeIn(200);

    var network_table = [];

    jQuery('#network-table-dyn').html('');

    for(var i = 0; i < map_markers.length; i++)
      map_markers[i].remove();
    map_markers = [];
    markers_group = null;

    jQuery.getJSON("https://neptune.zodiac-nautic.com/"+lang+"/efrontend/api/ressource/network/list"+endrequest, function(data) {
      jQuery('.network-overlay').stop(1,1).fadeOut(200);
      var contacter_label = jQuery('#network-table-dyn').attr('data-contact-label');
      if(data.dealers != undefined && data.dealers.length > 0) {
        jQuery.each(data.dealers, function( key, val ) {

          if(val.lat < -90 || val.lat > 90) {
            var tmp = val.lat;
            val.lat = val.lng;
            val.lng = tmp;
          }

          network_table.push(
            "<tr class=\"network-show-dealer\" data-dealer-id=\"" + val.id + "\">" +
            "<td><strong>" + val.company_name.toUpperCase() + "</strong></td>" +
            "<td>" + val.city.toUpperCase() + " (" + val.zipcode + ")</td>" +
            "<td class=\"center\">" + ((val.distrib == 1) ? "<i class=\"fa fa-check\" aria-hidden=\"true\"></i>" : '') + "</td>" +
            "<td class=\"center\">" + ((val.savb == 1) ? "<i class=\"fa fa-check\" aria-hidden=\"true\"></i>" : '') + "</td>" +
            "<td class=\"center\">" + ((val.savr == 1) ? "<i class=\"fa fa-check\" aria-hidden=\"true\"></i>" : '') + "</td>" +
            "<td class=\"center\">" + ((val.savj == 1) ? "<i class=\"fa fa-check\" aria-hidden=\"true\"></i>" : '') + "</td>" +
            "<td class=\"right\"><a href=\"#\" data-network-id=\"" + val.id + "\" class=\"network_show\">" + contacter_label + "</a></td>" +
            "</tr>"
          );

          if (val.lat != 0 && val.lng != 0) {
            var marker = L.marker([val.lat, val.lng], {icon: marker_image}).addTo(network_map);
            marker.title = val.company_name;
            marker.iddealer = val.id;
            map_markers.push(marker);

            marker.on('click', function(e) {
              show_dealer_modal(this.iddealer);
            });
          }
        });

        markers_group = L.featureGroup(map_markers).addTo(network_map);
        network_map.fitBounds(markers_group.getBounds());

        if(network_map.getZoom() > 11)
            network_map.setZoom(11);

        jQuery('#network-global-table').fadeIn(200);
        jQuery('#network-table-dyn').html(network_table.join(''));

        jQuery('.network-show-dealer').click(function(event) {
          event.preventDefault();
          var dealer_id = jQuery(this).attr('data-dealer-id');
          show_dealer_modal(dealer_id);
        });
      }
    });
  };

  jQuery('#network_search').click(function(event) {
    event.preventDefault();

    var filters = {};
    filters['country'] = jQuery('#network_country').val();
    if(jQuery('#network_state').val() != null)
      filters['region'] = jQuery('#network_state').val();
    filters['distrib'] = (jQuery('#network_chkb_d').prop('checked'))?1:0;
    filters['savb'] = (jQuery('#network_chkb_savb').prop('checked'))?1:0;
    filters['savr'] = (jQuery('#network_chkb_savr').prop('checked'))?1:0;
    filters['savj'] = (jQuery('#network_chkb_savj').prop('checked'))?1:0;

    if(filters['country'] == ''){
      alert(jQuery('#network_country').attr('data-error'));
      return;
    }

    request(filters);
  });



  // Show modal
  var marker_tab_map = false;
  var tab_map = false;
  var show_dealer_modal = function(iddealer) {
    jQuery('.network-overlay').stop(1,1).fadeIn(200);

    if(marker_tab_map !== false)
      marker_tab_map.remove();

    marker_tab_map = false;

    tab_reset();

    jQuery.getJSON("https://neptune.zodiac-nautic.com/"+lang+"/efrontend/api/ressource/network/get/id/"+iddealer, function(data) {
      if(data.dealer == undefined) {
        jQuery('.network-overlay').stop(1,1).fadeOut(200);
        return;
      }

      jQuery('.network-overlay .network-loading').hide();
      jQuery('.network-modal .text .title').html(data.dealer.company_name.toLowerCase());
      jQuery('.network-modal .presta_item').hide();

      if(data.dealer.distrib == 1)
        jQuery('.network-modal .presta_d').show();
      if(data.dealer.savb == 1)
        jQuery('.network-modal .presta_savb').show();
      if(data.dealer.savr == 1)
        jQuery('.network-modal .presta_savr').show();
      if(data.dealer.savj == 1)
        jQuery('.network-modal .presta_savj').show();

      jQuery('.network-modal .text .address').html(data.dealer.address+"<br/>"+data.dealer.city+" ("+data.dealer.zipcode+")");

      jQuery('.network-modal .text .phone-div').hide();
      jQuery('.network-modal .text .fax-div').hide();
      jQuery('.network-modal .text .mail-div').hide();
      jQuery('.network-modal .text .web-div').hide();

      if(data.dealer.phone != undefined && data.dealer.phone != '') {
        jQuery('.network-modal .text .phone-div').show();
        jQuery('.network-modal .text .phone').html(data.dealer.phone);
      }
      if(data.dealer.fax != undefined && data.dealer.fax != '') {
        jQuery('.network-modal .text .fax-div').show();
        jQuery('.network-modal .text .fax').html(data.dealer.fax);
      }
      if(data.dealer.email != undefined && data.dealer.email != '') {
        jQuery('.network-modal .text .mail-div').show();
        jQuery('.network-modal .text .mail').html("<a href=\"mailto:"+data.dealer.email+"\" rel=\"nofollow\">"+data.dealer.email+"</a>");
        jQuery('.network-modal .text .mail2').html("<a href=\"mailto:"+data.dealer.email+"\" class=\"btn btn-lg btn-default\" rel=\"nofollow\">"+data.dealer.email+"</a>");
      }
      if(data.dealer.website != undefined && data.dealer.website != '') {
        jQuery('.network-modal .text .web-div').show();
        jQuery('.network-modal .text .web').html("<a href=\""+data.dealer.website+"\" target=\"_blank\" rel=\"nofollow\">"+data.dealer.website+"</a>");
      }

      jQuery('.network-modal .logo').hide();

      if(data.dealer.logo != undefined && data.dealer.logo != '') {
        var url_image = data.dealer.logo;
        url_image = url_image.replace('http:','https:');

        jQuery('.network-modal .logo').show();
        jQuery('.network-modal .logo').attr('alt', data.dealer.company_name);
        jQuery('.network-modal .logo').attr('src', url_image);
      }

      var form_link = jQuery('.network-modal .form-link').data('url');
      jQuery('.network-modal .form-link').attr('href', form_link+"?dealer_id="+data.dealer.id);

      if(jQuery(window).height() > jQuery('.network-modal').outerHeight()) {
        jQuery('.network-modal').css('top', (jQuery(window).scrollTop() + (jQuery(window).height()/2) - (jQuery('.network-modal').outerHeight()/2)));

      } else {
        jQuery('.network-modal').css('top', jQuery(window).scrollTop());
      }
      jQuery('.network-modal').stop(1,1).fadeIn(200, function() {
        if(tab_map === false) {
          tab_map = L.map('tab-map', {
            attributionControl: false,
            zoomControl: false,
            scrollWheelZoom: false,
            minZoom: 3,
            maxZoom: 12
          });
          L.control.zoom({ 'position': 'bottomright' }).addTo(tab_map);
        }

        tab_map.setView([data.dealer.lat, data.dealer.lng], 8);

        L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg', {
          attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
        }).addTo(tab_map);

        var marker_image = L.icon({
          iconUrl: '/wp-content/themes/zodiac/images/mk.png',
          iconSize: [29, 39],
          iconAnchor: [14, 36]
        });

        marker_tab_map = L.marker([data.dealer.lat, data.dealer.lng], {icon: marker_image}).addTo(tab_map);
      });

      var tab_boats_html = [];
      jQuery('#tab_boats').html('');
      jQuery.each(data.dealer.boats, function(k, v) {
        var url_image = v.image;
        url_image = url_image.replace('http:','https:');
        tab_boats_html.push(
          "<div class=\"boat-item col-xs-6 col-sm-6 col-md-3 col-lg-3\">"+
          "<img src=\""+url_image+"\" alt=\""+v.label+"\" />"+
          "<div class=\"name\">"+v.label.toUpperCase()+"</div>"+
          "</div>"
        );
      });
      jQuery('#tab_boats').html(tab_boats_html.join(''));


      jQuery('.network-modal .close').click(function(event) {
        event.preventDefault();
        jQuery('.network-modal').stop(1,1).fadeOut(200);
        jQuery('.network-overlay').stop(1,1).fadeOut(200, function() {
          jQuery('.network-overlay .network-loading').show();
        });
      });


    });

  };

});
