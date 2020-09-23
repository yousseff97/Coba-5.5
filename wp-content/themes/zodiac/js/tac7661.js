/*jslint browser: true, evil: true */
var scripts = document.getElementsByTagName('script'),
  path = scripts[scripts.length - 1].src.split('?')[0],
  cdn = '/public/js/plugins/tarteaucitron/',
  alreadyLaunch = (alreadyLaunch === undefined) ? 0 : alreadyLaunch,
  tarteaucitronForceLanguage = (tarteaucitronForceLanguage === undefined) ? '' : tarteaucitronForceLanguage,
  tarteaucitronProLoadServices,
  tarteaucitronNoAdBlocker = false;

var tarteaucitron = {
  "version": 323,
  "cdn": cdn,
  "user": {},
  "lang": {},
  "avlangs": {
    "en": {
      "adblock": "Hello! This site is transparent and lets you chose the 3rd party services you want to allow.",
      "adblock_call": "Please disable your adblocker to start customizing.",
      "reload": "Refresh the page",

      "alertBigScroll": "By continuing to scroll,",
      "alertBigClick": "If you continue to browse this website,",
      "alertBig": "you are allowing all third-party services",

      "alertBigPrivacy": "This site uses cookies and gives you control over what you want to activate",
      "alertSmall": "Manage services",
      "personalize": "Personalize",
      "acceptAll": "OK, accept all",
      "close": "Close",

      "all": "Preference for all services",

      "info": "Protecting your privacy",
      "disclaimer": "By allowing these third party services, you accept their cookies and the use of tracking technologies necessary for their proper functioning.",
      "allow": "Allow",
      "deny": "Deny",
      "noCookie": "This service does not use cookie.",
      "useCookie": "This service can install",
      "useCookieCurrent": "This service has installed",
      "useNoCookie": "This service has not installed any cookie.",
      "more": "Read more",
      "source": "View the official website",
      "credit": "Cookies manager by tarteaucitron.js",

      "fallback": "is disabled.",

      "ads": {
        "title": "Advertising network",
        "details": "Ad networks can generate revenue by selling advertising space on the site."
      },
      "analytic": {
        "title": "Audience measurement",
        "details": "The audience measurement services used to generate useful statistics attendance to improve the site."
      },
      "social": {
        "title": "Social networks",
        "details": "Social networks can improve the usability of the site and help to promote it via the shares."
      },
      "video": {
        "title": "Videos",
        "details": "Video sharing services help to add rich media on the site and increase its visibility."
      },
      "comment": {
        "title": "Comments",
        "details": "Comments managers facilitate the filing of comments and fight against spam."
      },
      "support": {
        "title": "Support",
        "details": "Support services allow you to get in touch with the site team and help to improve it."
      },
      "api": {
        "title": "APIs",
        "details": "APIs are used to load scripts: geolocation, search engines, translations, ..."
      }
    },
    "fr": {
      "adblock": "Bonjour! Ce site joue la transparence et vous donne le choix des services tiers à activer.",
      "adblock_call": "Merci de désactiver votre adblocker pour commencer la personnalisation.",
      "reload": "Recharger la page",

      "alertBigScroll": "En continuant de défiler,",
      "alertBigClick": "En poursuivant votre navigation,",
      "alertBig": "vous acceptez l'utilisation de services tiers pouvant installer des cookies",

      "alertBigPrivacy": "Ce site utilise des cookies et vous donne le contrôle sur ce que vous souhaitez activer",
      "alertSmall": "Gestion des services",
      "acceptAll": "OK, tout accepter",
      "personalize": "Personnaliser",
      "close": "Fermer",

      "all": "Préférence pour tous les services",

      "info": "Protection de votre vie privée",
      "disclaimer": "En autorisant ces services tiers, vous acceptez le dépôt et la lecture de cookies et l'utilisation de technologies de suivi nécessaires à leur bon fonctionnement.",
      "allow": "Autoriser",
      "deny": "Interdire",
      "noCookie": "Ce service ne dépose aucun cookie.",
      "useCookie": "Ce service peut déposer",
      "useCookieCurrent": "Ce service a déposé",
      "useNoCookie": "Ce service n'a déposé aucun cookie.",
      "more": "En savoir plus",
      "source": "Voir le site officiel",
      "credit": "Gestion des cookies par tarteaucitron.js",

      "fallback": "est désactivé.",

      "ads": {
        "title": "Régies publicitaires",
        "details": "Les régies publicitaires permettent de générer des revenus en commercialisant les espaces publicitaires du site."
      },
      "analytic": {
        "title": "Mesure d'audience",
        "details": "Les services de mesure d'audience permettent de générer des statistiques de fréquentation utiles à l'amélioration du site."
      },
      "social": {
        "title": "Réseaux sociaux",
        "details": "Les réseaux sociaux permettent d'améliorer la convivialité du site et aident à sa promotion via les partages."
      },
      "video": {
        "title": "Vidéos",
        "details": "Les services de partage de vidéo permettent d'enrichir le site de contenu multimédia et augmentent sa visibilité."
      },
      "comment": {
        "title": "Commentaires",
        "details": "Les gestionnaires de commentaires facilitent le dépôt de vos commentaires et luttent contre le spam."
      },
      "support": {
        "title": "Support",
        "details": "Les services de support vous permettent d'entrer en contact avec l'équipe du site et d'aider à son amélioration."
      },
      "api": {
        "title": "APIs",
        "details": "Les APIs permettent de charger des scripts : géolocalisation, moteurs de recherche, traductions, ..."
      }
    },
    "es": {
      "adblock": "¡Hola! Este sitio web es transparente y te da la opción de activar los servicios de terceros.",
      "adblock_call": "Por favor deshabilita tu AdBlocker para empezar a personalizar los servicios.",
      "reload": "Actualizar esta página",

      "alertBigScroll": "Al continuar desplazándote,",
      "alertBigClick": "Si continuas navegando por este sitio web,",
      "alertBig": "estás permitiendo servicios terceros",

      "alertBigPrivacy": "Este sitio web usa cookies y te permite controlar las que deseas activar",
      "alertSmall": "Gestionar servicios",
      "personalize": "Personalizar",
      "acceptAll": "OK, aceptar todas",
      "close": "Cerrar",

      "privacyUrl": "Política de privacidad",

      "all": "Ajustes para todos los servicios",

      "info": "Protegiendo tu privacidad",
      "disclaimer": "Aceptando estos servicios de terceros, estás aceptando sus cookies y el uso de tecnologías de rastreo necesarias para su correcto funcionamiento.",
      "allow": "Permitir",
      "deny": "Denegar",
      "noCookie": "Este servicio no usa cookies.",
      "useCookie": "Este servicio puede instalar",
      "useCookieCurrent": "Este servicio ha instalado",
      "useNoCookie": "Este servicio no ha instalado ninguna cookie.",
      "more": "Leer más",
      "source": "Ver sitio web oficial",
      "credit": "Gestor de cookies realizada por tarteaucitron.js",

      "toggleInfoBox": "Mostrar/ocultar información sobre almacenamiento de cookies",
      "title": "Panel de gestión de cookies",
      "cookieDetail": "Detalles de las cookies para",
      "ourSite": "en nuestra web",
      "newWindow": "(ventana nueva)",
      "allowAll": "Permitir todas las cookies",
      "denyAll": "Denegar todas las cookies",

      "fallback": "está deshabilitado.",

      "ads": {
        "title": "Red de publicidad",
        "details": "Las redes publicitarias pueden generar ingresos mediante la venta de espacios publicitarios en el sitio."
      },
      "analytic": {
        "title": "Medición de audiencia",
        "details": "Los servicios de medición de audiencia se usan para generar estadísticas útiles para mejorar el sitio."
      },
      "social": {
        "title": "Redes sociales",
        "details": "Las redes sociales pueden aumentar la usabilidad del sitio web y ayudar a promoverlo a través de la contribución."
      },
      "video": {
        "title": "Videos",
        "details": "Los servicios para compartir videos ayudan a añadir contenido enriquecido en el sitio web y aumentar su visibilidad."
      },
      "comment": {
        "title": "Comentarios",
        "details": "El gestor de comentarios facilita la clasificación de comentarios y luchar contra spam."
      },
      "support": {
        "title": "Soporte",
        "details": "Los servicios de soporte te permiten contactar con el sitio web y ayudar a mejorarlo."
      },
      "api": {
        "title": "APIs",
        "details": "APIs se utilizan para cargar scripts: geolocalización, motor de búsqueda, traducciones, ..."
      },
      "other": {
        "title": "Otro",
        "details": "Servicios para mostrar contenido web."
      }
    },
    "it": {
      "adblock": "Benvenuto! Questo sito ti permette di attivare i servizi di terzi di tua scelta.",
      "adblock_call": "Disabilita il tuo adblocker per iniziare la navigazione.",
      "reload": "Aggiorna la pagina",

      "alertBigScroll": "Continuando a scorrere,",
      "alertBigClick": "Continuando a navigare nel sito,",
      "alertBig": "autorizzi l’utilizzo dei cookies inviati da domini di terze parti",

      "alertBigPrivacy": "Questo sito fa uso di cookies e ti consente di decidere se accettarli o rifiutarli",
      "alertSmall": "Gestione dei servizi",
      "acceptAll": "Ok, accetta tutto",
      "personalize": "Personalizza",
      "close": "Chiudi",

      "privacyUrl": "Politica sulla riservatezza",

      "all": "Preferenze per tutti i servizi",

      "info": "Tutela della privacy",
      "disclaimer": "Abilitando l'uso dei servizi di terze parti, accetti la ricezione dei cookies e l'uso delle tecnologie analitici necessarie al loro funzionamento.",
      "allow": "Consenti",
      "deny": "Blocca",
      "noCookie": "Questo servizio non invia nessun cookie",
      "useCookie": "Questo servizio puo' inviare",
      "useCookieCurrent": "Questo servizio ha inviato",
      "useNoCookie": "Questo servizio non ha inviato nessun cookie",
      "more": "Saperne di più",
      "source": "Vai al sito ufficiale",
      "credit": "Gestione dei cookies da tarteaucitron.js",

      "toggleInfoBox": "Show/hide informations about cookie storage",
      "title": "Cookies management panel",
      "cookieDetail": "Cookie detail for",
      "ourSite": "on our site",
      "newWindow": "(new window)",
      "allowAll": "Allow all cookies",
      "denyAll": "Deny all cookies",

      "fallback": "è disattivato",

      "ads": {
        "title": "Regie pubblicitarie",
        "details": "Le regie pubblicitarie producono redditi gestendo la commercializzazione degli spazi del sito dedicati alle campagne pubblicitarie"
      },
      "analytic": {
        "title": "Misura del pubblico",
        "details": "I servizi di misura del pubblico permettono di raccogliere le statistiche utili al miglioramento del sito"
      },
      "social": {
        "title": "Reti sociali",
        "details": "Le reti sociali permettono di migliorare l'aspetto conviviale del sito e di sviluppare la condivisione dei contenuti da parte degli utenti a fini promozionali."
      },
      "video": {
        "title": "Video",
        "details": "I servizi di condivisione di video permettono di arricchire il sito di contenuti multimediali e di aumentare la sua visibilità"
      },
      "comment": {
        "title": "Commenti",
        "details": "La gestione dei commenti utente aiuta a gestire la pubblicazione dei commenti e a lottare contro lo spamming"
      },
      "support": {
        "title": "Supporto",
        "details": "I servizi di supporto ti consentono di contattare la team del sito e di contribuire al suo miglioramento"
      },
      "api": {
        "title": "API",
        "details": "Le API permettono di implementare script diversi : geolocalizzazione, motori di ricerca, traduttori..."
      },
      "other": {
        "title": "Altro",
        "details": "Servizi per visualizzare contenuti web."
      }
    },
    "de": {
      "adblock": "Hallo! Diese Seite ist transparent und lässt Ihnen die Wahl der externen Services, die aktiviert werden dürfen.",
      "adblock_call": "Bitte deaktivieren Sie Ihren 'Werbeblocker' um Konfigurieren zu können.",
      "reload": "Seite neu laden",

      "alertBigScroll": "Durch die fortgesetzte blättern,",
      "alertBigClick": "Wenn Sie diese Webseite benutzen,",
      "alertBig": "stimmen Sie der Benutzung von externen Diensten zu",

      "alertBigPrivacy": "Diese Webseite verwendet 'Cookies' und ermöglicht dadurch Kontrolle, welche Dienste benutzt werden dürfen",
      "alertSmall": "Service-Kontrolle",
      "personalize": "Personalisieren",
      "acceptAll": "OK, akzeptiere alles",
      "close": "Beenden",

      "privacyUrl": "Datenschutz-Bestimmungen",

      "all": "Präferenz für alle Dienste",

      "info": "Schutz der Privatsphäre",
      "disclaimer": "Wenn Sie diese Dienste nutzen, erlauben Sie deren 'Cookies' und Tracking-Funktionen, die zu ihrer ordnungsgemäßen Funktion notwendig sind.",
      "allow": "Erlauben",
      "deny": "Ablehnen",
      "noCookie": "Dieser Dienst nutzt keine 'Cookies'.",
      "useCookie": "Dieser Dienst kann installieren",
      "useCookieCurrent": "Dieser Dienst hat installiert",
      "useNoCookie": "Dieser Dienst hat keine 'Cookies' installiert.",
      "more": "Weiter lesen",
      "source": "Zur offiziellen Webseite",
      "credit": "Cookies manager von tarteaucitron.js",

      "toggleInfoBox": "Show/hide informations about cookie storage",
      "title": "Cookies management panel",
      "cookieDetail": "Cookie detail for",
      "ourSite": "on our site",
      "newWindow": "(new window)",
      "allowAll": "Allow all cookies",
      "denyAll": "Deny all cookies",

      "fallback": "ist deaktiviert.",

      "ads": {
        "title": "Anzeigen Netzwerke",
        "details": "Anzeigen Netzwerke können mit dem Verkauf von Werbeplatzierungen auf der Seite Einnahmen erhalten."
      },
      "analytic": {
        "title": "Besucher Zähldienste",
        "details": "Die verwendeten Besucher Zähldienste generieren Statistiken die dabei helfen, die Seite zu verbessern."
      },
      "social": {
        "title": "Soziale Netzwerke",
        "details": "Soziale Netzwerke können die Benutzbarkeit der Seite verbessern und ihren Bekanntheitsgrad erhöhen."
      },
      "video": {
        "title": "Videos",
        "details": "Video Platformen erlauben Videoinhalte einzublenden und die Sichtbarkeit der Seite zu erhöhen."
      },
      "comment": {
        "title": "Kommentare",
        "details": "Kommentar Manager erleichtern die Organisation von Kommentaren und helfen dabei Spam zu verhindern."
      },
      "support": {
        "title": "Support",
        "details": "Support Dienste erlauben es die Urheber der Seite zu kontaktieren und sie zu verbessern."
      },
      "api": {
        "title": "APIs",
        "details": "APIs werden benutzt um Skripte zu laden, wie: Geolokalisation, Suchmaschinen, Übersetzungen, ..."
      },
      "other": {
        "title": "Andere",
        "details": "Dienste zum Anzeigen von Web-Inhalten."
      }
    }
  },
  "services": {},
  "added": [],
  "idprocessed": [],
  "state": [],
  "launch": [],
  "parameters": {},
  "isAjax": false,
  "reloadThePage": false,
  "init": function (params) {
    "use strict";
    var origOpen;

    tarteaucitron.parameters = params;
    if (alreadyLaunch === 0) {
      alreadyLaunch = 1;
      if (window.addEventListener) {
        window.addEventListener("load", function () {
          tarteaucitron.load();
          tarteaucitron.fallback(['tarteaucitronOpenPanel'], function (elem) {
            elem.addEventListener("click", function () {
              tarteaucitron.userInterface.openPanel();
            }, false);
          }, true);
        }, false);
        window.addEventListener("scroll", function () {
          var scrollPos = window.pageYOffset || document.documentElement.scrollTop,
            heightPosition;
          if (document.getElementById('tarteaucitronAlertBig') !== null && !tarteaucitron.highPrivacy) {
            if (document.getElementById('tarteaucitronAlertBig').style.display === 'block') {
              heightPosition = document.getElementById('tarteaucitronAlertBig').offsetHeight + 'px';

              if (scrollPos > (screen.height * 2)) {
                tarteaucitron.userInterface.respondAll(true);
              } else if (scrollPos > (screen.height / 2)) {
                document.getElementById('tarteaucitronDisclaimerAlert').innerHTML = '<b>' + tarteaucitron.lang.alertBigScroll + '</b> ' + tarteaucitron.lang.alertBig;
              }

              if (tarteaucitron.orientation === 'top') {
                document.getElementById('tarteaucitronPercentage').style.top = heightPosition;
              } else {
                document.getElementById('tarteaucitronPercentage').style.bottom = heightPosition;
              }
              document.getElementById('tarteaucitronPercentage').style.width = ((100 / (screen.height * .5)) * scrollPos) + '%';
            }
          }
        }, false);
        window.addEventListener("keydown", function (evt) {
          if (evt.keyCode === 27) {
            tarteaucitron.userInterface.closePanel();
          }
        }, false);
        window.addEventListener("hashchange", function () {
          if (document.location.hash === tarteaucitron.hashtag && tarteaucitron.hashtag !== '') {
            tarteaucitron.userInterface.openPanel();
          }
        }, false);
        window.addEventListener("resize", function () {
          if (document.getElementById('tarteaucitron') !== null) {
            if (document.getElementById('tarteaucitron').style.display === 'block') {
              tarteaucitron.userInterface.jsSizing('main');
            }
          }

          if (document.getElementById('tarteaucitronCookiesListContainer') !== null) {
            if (document.getElementById('tarteaucitronCookiesListContainer').style.display === 'block') {
              tarteaucitron.userInterface.jsSizing('cookie');
            }
          }
        }, false);
      } else {
        window.attachEvent("onload", function () {
          tarteaucitron.load();
          tarteaucitron.fallback(['tarteaucitronOpenPanel'], function (elem) {
            elem.attachEvent("onclick", function () {
              tarteaucitron.userInterface.openPanel();
            });
          }, true);
        });
        window.attachEvent("onscroll", function () {
          var scrollPos = window.pageYOffset || document.documentElement.scrollTop,
            heightPosition;
          if (document.getElementById('tarteaucitronAlertBig') !== null && !tarteaucitron.highPrivacy) {
            if (document.getElementById('tarteaucitronAlertBig').style.display === 'block') {
              heightPosition = document.getElementById('tarteaucitronAlertBig').offsetHeight + 'px';

              if (scrollPos > (screen.height * 2)) {
                tarteaucitron.userInterface.respondAll(true);
              } else if (scrollPos > (screen.height / 2)) {
                document.getElementById('tarteaucitronDisclaimerAlert').innerHTML = '<b>' + tarteaucitron.lang.alertBigScroll + '</b> ' + tarteaucitron.lang.alertBig;
              }
              if (tarteaucitron.orientation === 'top') {
                document.getElementById('tarteaucitronPercentage').style.top = heightPosition;
              } else {
                document.getElementById('tarteaucitronPercentage').style.bottom = heightPosition;
              }
              document.getElementById('tarteaucitronPercentage').style.width = ((100 / (screen.height * 2)) * scrollPos) + '%';
            }
          }
        });
        window.attachEvent("onkeydown", function (evt) {
          if (evt.keyCode === 27) {
            tarteaucitron.userInterface.closePanel();
          }
        });
        window.attachEvent("onhashchange", function () {
          if (document.location.hash === tarteaucitron.hashtag && tarteaucitron.hashtag !== '') {
            tarteaucitron.userInterface.openPanel();
          }
        });
        window.attachEvent("onresize", function () {
          if (document.getElementById('tarteaucitron') !== null) {
            if (document.getElementById('tarteaucitron').style.display === 'block') {
              tarteaucitron.userInterface.jsSizing('main');
            }
          }

          if (document.getElementById('tarteaucitronCookiesListContainer') !== null) {
            if (document.getElementById('tarteaucitronCookiesListContainer').style.display === 'block') {
              tarteaucitron.userInterface.jsSizing('cookie');
            }
          }
        });
      }

      if (typeof XMLHttpRequest !== 'undefined') {
        origOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function () {

          if (window.addEventListener) {
            this.addEventListener("load", function () {
              if (typeof tarteaucitronProLoadServices === 'function') {
                tarteaucitronProLoadServices();
              }
            }, false);
          } else if (typeof this.attachEvent !== 'undefined') {
            this.attachEvent("onload", function () {
              if (typeof tarteaucitronProLoadServices === 'function') {
                tarteaucitronProLoadServices();
              }
            });
          } else {
            if (typeof tarteaucitronProLoadServices === 'function') {
              setTimeout(tarteaucitronProLoadServices, 1000);
            }
          }

          try {
            origOpen.apply(this, arguments);
          } catch (err) {}
        };
      }
    }
  },
  "load": function () {
    "use strict";
    var cdn = tarteaucitron.cdn,
      language = tarteaucitron.getLanguage(),
      pathToLang = cdn + 'lang/tarteaucitron.' + language + '.js?v=' + tarteaucitron.version,
      pathToServices = cdn + 'tarteaucitron.services.js?v=' + tarteaucitron.version,
      linkElement = document.createElement('link'),
      defaults = {
        "adblocker": false,
        "hashtag": '#tarteaucitron',
        "highPrivacy": false,
        "orientation": "top",
        "removeCredit": false,
        "showAlertSmall": true,
        "cookieslist": true
      },
      params = tarteaucitron.parameters;

    // Step 0: get params
    if (params !== undefined) {
      tarteaucitron.extend(defaults, params);
    }

    // global
    tarteaucitron.orientation = defaults.orientation;
    tarteaucitron.hashtag = defaults.hashtag;
    tarteaucitron.highPrivacy = defaults.highPrivacy;

    // Step 1: load css
    //linkElement.rel = 'stylesheet';
    //linkElement.type = 'text/css';
    //linkElement.href = cdn + 'css/tarteaucitron.css?v=' + tarteaucitron.version;
    //document.getElementsByTagName('head')[0].appendChild(linkElement);

    // Step 2: load language and services
    tarteaucitron.lang = (tarteaucitron.avlangs[language] !== undefined)?tarteaucitron.avlangs[language]:tarteaucitron.avlangs.en;
    //tarteaucitron.addScript(pathToLang, '', function () {
    //   tarteaucitron.addScript(pathToServices, '', function () {

    var body = document.body,
      div = document.createElement('div'),
      html = '',
      index,
      orientation = 'Top',
      cat = ['ads', 'analytic', 'api', 'comment', 'social', 'support', 'video'],
      i;

    cat = cat.sort(function (a, b) {
      if (tarteaucitron.lang[a].title > tarteaucitron.lang[b].title) { return 1; }
      if (tarteaucitron.lang[a].title < tarteaucitron.lang[b].title) { return -1; }
      return 0;
    });

    // Step 3: prepare the html
    html += '<div id="tarteaucitronPremium"></div>';
    html += '<div id="tarteaucitronBack" onclick="tarteaucitron.userInterface.closePanel();"></div>';
    html += '<div id="tarteaucitron">';
    html += '   <div id="tarteaucitronClosePanel" onclick="tarteaucitron.userInterface.closePanel();">';
    html += '       ' + tarteaucitron.lang.close;
    html += '   </div>';
    html += '   <div id="tarteaucitronServices">';
    html += '      <div class="tarteaucitronLine tarteaucitronMainLine" id="tarteaucitronMainLineOffset">';
    html += '         <div class="tarteaucitronName">';
    html += '            <b><a href="#" onclick="tarteaucitron.userInterface.toggle(\'tarteaucitronInfo\', \'tarteaucitronInfoBox\');return false">&#10011;</a> ' + tarteaucitron.lang.all + '</b>';
    html += '         </div>';
    html += '         <div class="tarteaucitronAsk" id="tarteaucitronScrollbarAdjust">';
    html += '            <div id="tarteaucitronAllAllowed" class="tarteaucitronAllow" onclick="tarteaucitron.userInterface.respondAll(true);">';
    html += '               &#10003; ' + tarteaucitron.lang.allow;
    html += '            </div> ';
    html += '            <div id="tarteaucitronAllDenied" class="tarteaucitronDeny" onclick="tarteaucitron.userInterface.respondAll(false);">';
    html += '               &#10007; ' + tarteaucitron.lang.deny;
    html += '            </div>';
    html += '         </div>';
    html += '      </div>';
    html += '      <div id="tarteaucitronInfo" class="tarteaucitronInfoBox">';
    html += '         ' + tarteaucitron.lang.disclaimer;
    if (defaults.removeCredit === false) {
      html += '        <br/><br/>';
      html += '        <a href="https://opt-out.ferank.eu/" rel="nofollow" target="_blank">' + tarteaucitron.lang.credit + '</a>';
    }
    html += '      </div>';
    html += '      <div class="tarteaucitronBorder" id="tarteaucitronScrollbarParent">';
    html += '         <div class="clear"></div>';
    for (i = 0; i < cat.length; i += 1) {
      html += '         <div id="tarteaucitronServicesTitle_' + cat[i] + '" class="tarteaucitronHidden">';
      html += '            <div class="tarteaucitronTitle">';
      html += '               <a href="#" onclick="tarteaucitron.userInterface.toggle(\'tarteaucitronDetails' + cat[i] + '\', \'tarteaucitronInfoBox\');return false">&#10011;</a> ' + tarteaucitron.lang[cat[i]].title;
      html += '            </div>';
      html += '            <div id="tarteaucitronDetails' + cat[i] + '" class="tarteaucitronDetails tarteaucitronInfoBox">';
      html += '               ' + tarteaucitron.lang[cat[i]].details;
      html += '            </div>';
      html += '         </div>';
      html += '         <div id="tarteaucitronServices_' + cat[i] + '"></div>';
    }
    html += '         <div class="tarteaucitronHidden" id="tarteaucitronScrollbarChild" style="height:20px;display:block"></div>';
    html += '       </div>';
    html += '   </div>';
    html += '</div>';

    if (defaults.orientation === 'bottom') {
      orientation = 'Bottom';
    }

    if (defaults.highPrivacy) {
      html += '<div id="tarteaucitronAlertBig" class="tarteaucitronAlertBig' + orientation + '">';
      html += '   <span id="tarteaucitronDisclaimerAlert">';
      html += '       ' + tarteaucitron.lang.alertBigPrivacy;
      html += '   </span>';
      html += '   <span id="tarteaucitronPersonalize" onclick="tarteaucitron.userInterface.openPanel();">';
      html += '       ' + tarteaucitron.lang.personalize;
      html += '   </span>';
      html += '</div>';
    } else {
      html += '<div id="tarteaucitronAlertBig" class="tarteaucitronAlertBig' + orientation + '">';
      html += '   <span id="tarteaucitronDisclaimerAlert">';
      html += '       ' + tarteaucitron.lang.alertBigClick + ' ' + tarteaucitron.lang.alertBig;
      html += '   </span>';
      html += '   <span id="tarteaucitronPersonalize" onclick="tarteaucitron.userInterface.respondAll(true);">';
      html += '       &#10003; ' + tarteaucitron.lang.acceptAll;
      html += '   </span>';
      html += '   <span id="tarteaucitronCloseAlert" onclick="tarteaucitron.userInterface.openPanel();">';
      html += '       ' + tarteaucitron.lang.personalize;
      html += '   </span>';
      html += '</div>';
      html += '<div id="tarteaucitronPercentage"></div>';
    }

    if (defaults.showAlertSmall === true) {
      html += '<div id="tarteaucitronAlertSmall">';
      html += '   <div id="tarteaucitronManager" onclick="tarteaucitron.userInterface.openPanel();">';
      html += '       ' + tarteaucitron.lang.alertSmall;
      html += '       <div id="tarteaucitronDot">';
      html += '           <span id="tarteaucitronDotGreen"></span>';
      html += '           <span id="tarteaucitronDotYellow"></span>';
      html += '           <span id="tarteaucitronDotRed"></span>';
      html += '       </div>';
      if (defaults.cookieslist === true) {
        html += '   </div><!-- @whitespace';
        html += '   --><div id="tarteaucitronCookiesNumber" onclick="tarteaucitron.userInterface.toggleCookiesList();">0</div>';
        html += '   <div id="tarteaucitronCookiesListContainer">';
        html += '       <div id="tarteaucitronClosePanelCookie" onclick="tarteaucitron.userInterface.closePanel();">';
        html += '           ' + tarteaucitron.lang.close;
        html += '       </div>';
        html += '       <div class="tarteaucitronCookiesListMain" id="tarteaucitronCookiesTitle">';
        html += '            <b id="tarteaucitronCookiesNumberBis">0 cookie</b>';
        html += '       </div>';
        html += '       <div id="tarteaucitronCookiesList"></div>';
        html += '    </div>';
      } else {
        html += '   </div>';
      }
      html += '</div>';
    }

    tarteaucitron.addScript(tarteaucitron.cdn + 'advertising.js?v=' + tarteaucitron.version, '', function () {
      if (tarteaucitronNoAdBlocker === true || defaults.adblocker === false) {
        div.id = 'tarteaucitronRoot';
        body.appendChild(div, body);
        div.innerHTML = html;

        if (tarteaucitron.job !== undefined) {
          tarteaucitron.job = tarteaucitron.cleanArray(tarteaucitron.job);
          for (index = 0; index < tarteaucitron.job.length; index += 1) {
            tarteaucitron.addService(tarteaucitron.job[index]);
          }
        }

        tarteaucitron.isAjax = true;
        tarteaucitron.job.push = function (id) {

          // ie <9 hack
          if (typeof tarteaucitron.job.indexOf === 'undefined') {
            tarteaucitron.job.indexOf = function (obj, start) {
              var i,
                j = this.length;
              for (i = (start || 0); i < j; i += 1) {
                if (this[i] === obj) { return i; }
              }
              return -1;
            };
          }

          if (tarteaucitron.job.indexOf(id) === -1) {
            Array.prototype.push.call(this, id);
          }
          tarteaucitron.launch[id] = false;
          tarteaucitron.addService(id);
        };

        if (document.location.hash === tarteaucitron.hashtag && tarteaucitron.hashtag !== '') {
          tarteaucitron.userInterface.openPanel();
        }

        tarteaucitron.cookie.number();
        setInterval(tarteaucitron.cookie.number, 60000);
      }
    }, defaults.adblocker);

    if (defaults.adblocker === true) {
      setTimeout(function () {
        if (tarteaucitronNoAdBlocker === false) {
          html = '<div id="tarteaucitronAlertBig" class="tarteaucitronAlertBig' + orientation + '" style="display:block">';
          html += '   <span id="tarteaucitronDisclaimerAlert">';
          html += '       ' + tarteaucitron.lang.adblock + '<br/>';
          html += '       <b>' + tarteaucitron.lang.adblock_call + '</b>';
          html += '   </span>';
          html += '   <span id="tarteaucitronPersonalize" onclick="location.reload();">';
          html += '       ' + tarteaucitron.lang.reload;
          html += '   </span>';
          html += '</div>';
          html += '<div id="tarteaucitronPremium"></div>';
          div.id = 'tarteaucitronRoot';
          body.appendChild(div, body);
          div.innerHTML = html;
          tarteaucitron.pro('!adblocker=true');
        } else {
          tarteaucitron.pro('!adblocker=false');
        }
      }, 1500);
    }
    // });
    // });
  },
  "addService": function (serviceId) {
    "use strict";
    var html = '',
      s = tarteaucitron.services,
      service = s[serviceId],
      cookie = tarteaucitron.cookie.read(),
      hostname = document.location.hostname,
      hostRef = document.referrer.split('/')[2],
      isNavigating = (hostRef === hostname) ? true : false,
      isAutostart = (!service.needConsent) ? true : false,
      isWaiting = (cookie.indexOf(service.key + '=wait') >= 0) ? true : false,
      isDenied = (cookie.indexOf(service.key + '=false') >= 0) ? true : false,
      isAllowed = (cookie.indexOf(service.key + '=true') >= 0) ? true : false,
      isResponded = (cookie.indexOf(service.key + '=false') >= 0 || cookie.indexOf(service.key + '=true') >= 0) ? true : false;

    if (tarteaucitron.added[service.key] !== true) {
      tarteaucitron.added[service.key] = true;

      html += '<div id="' + service.key + 'Line" class="tarteaucitronLine">';
      html += '   <div class="tarteaucitronName">';
      html += '       <b>' + service.name + '</b><br/>';
      html += '       <span id="tacCL' + service.key + '" class="tarteaucitronListCookies"></span><br/>';
      html += '       <a href="https://opt-out.ferank.eu/service/' + service.key + '/" target="_blank">';
      html += '           ' + tarteaucitron.lang.more;
      html += '       </a>';
      html += '        - ';
      html += '       <a href="' + service.uri + '" target="_blank">';
      html += '           ' + tarteaucitron.lang.source;
      html += '       </a>';
      html += '   </div>';
      html += '   <div class="tarteaucitronAsk">';
      html += '       <div id="' + service.key + 'Allowed" class="tarteaucitronAllow" onclick="tarteaucitron.userInterface.respond(this, true);">';
      html += '           &#10003; ' + tarteaucitron.lang.allow;
      html += '       </div> ';
      html += '       <div id="' + service.key + 'Denied" class="tarteaucitronDeny" onclick="tarteaucitron.userInterface.respond(this, false);">';
      html += '           &#10007; ' + tarteaucitron.lang.deny;
      html += '       </div>';
      html += '   </div>';
      html += '</div>';

      tarteaucitron.userInterface.css('tarteaucitronServicesTitle_' + service.type, 'display', 'block');

      if (document.getElementById('tarteaucitronServices_' + service.type) !== null) {
        document.getElementById('tarteaucitronServices_' + service.type).innerHTML += html;
      }

      tarteaucitron.userInterface.order(service.type);
    }

    // allow by default for non EU
    if (isResponded === false && tarteaucitron.user.bypass === true) {
      isAllowed = true;
      tarteaucitron.cookie.create(service.key, true);
    }

    if ((!isResponded && (isAutostart || (isNavigating && isWaiting)) && !tarteaucitron.highPrivacy) || isAllowed) {
      if (!isAllowed) {
        tarteaucitron.cookie.create(service.key, true);
      }
      if (tarteaucitron.launch[service.key] !== true) {
        tarteaucitron.launch[service.key] = true;
        service.js();
      }
      tarteaucitron.state[service.key] = true;
      tarteaucitron.userInterface.color(service.key, true);
    } else if (isDenied) {
      if (typeof service.fallback === 'function') {
        service.fallback();
      }
      tarteaucitron.state[service.key] = false;
      tarteaucitron.userInterface.color(service.key, false);
    } else if (!isResponded) {
      tarteaucitron.cookie.create(service.key, 'wait');
      if (typeof service.fallback === 'function') {
        service.fallback();
      }
      tarteaucitron.userInterface.color(service.key, 'wait');
      tarteaucitron.userInterface.openAlert();
    }

    tarteaucitron.cookie.checkCount(service.key);
  },
  "cleanArray": function cleanArray(arr) {
    "use strict";
    var i,
      len = arr.length,
      out = [],
      obj = {},
      s = tarteaucitron.services;

    for (i = 0; i < len; i += 1) {
      if (!obj[arr[i]]) {
        obj[arr[i]] = {};
        if (tarteaucitron.services[arr[i]] !== undefined) {
          out.push(arr[i]);
        }
      }
    }

    out = out.sort(function (a, b) {
      if (s[a].type + s[a].key > s[b].type + s[b].key) { return 1; }
      if (s[a].type + s[a].key < s[b].type + s[b].key) { return -1; }
      return 0;
    });

    return out;
  },
  "userInterface": {
    "css": function (id, property, value) {
      "use strict";
      if (document.getElementById(id) !== null) {
        document.getElementById(id).style[property] = value;
      }
    },
    "respondAll": function (status) {
      "use strict";
      var s = tarteaucitron.services,
        service,
        key,
        index = 0;

      for (index = 0; index < tarteaucitron.job.length; index += 1) {
        service = s[tarteaucitron.job[index]];
        key = service.key;
        if (tarteaucitron.state[key] !== status) {
          if (status === false && tarteaucitron.launch[key] === true) {
            tarteaucitron.reloadThePage = true;
          }
          if (tarteaucitron.launch[key] !== true && status === true) {
            tarteaucitron.launch[key] = true;
            tarteaucitron.services[key].js();
          }
          tarteaucitron.state[key] = status;
          tarteaucitron.cookie.create(key, status);
          tarteaucitron.userInterface.color(key, status);
        }
      }
    },
    "respond": function (el, status) {
      "use strict";
      var key = el.id.replace(new RegExp("(Eng[0-9]+|Allow|Deni)ed", "g"), '');

      // return if same state
      if (tarteaucitron.state[key] === status) {
        return;
      }

      if (status === false && tarteaucitron.launch[key] === true) {
        tarteaucitron.reloadThePage = true;
      }

      // if not already launched... launch the service
      if (status === true) {
        if (tarteaucitron.launch[key] !== true) {
          tarteaucitron.launch[key] = true;
          tarteaucitron.services[key].js();
        }
      }
      tarteaucitron.state[key] = status;
      tarteaucitron.cookie.create(key, status);
      tarteaucitron.userInterface.color(key, status);
    },
    "color": function (key, status) {
      "use strict";
      var gray = '#808080',
        greenDark = '#1B870B',
        greenLight = '#E6FFE2',
        redDark = '#9C1A1A',
        redLight = '#FFE2E2',
        yellowDark = '#FBDA26',
        c = 'tarteaucitron',
        nbDenied = 0,
        nbPending = 0,
        nbAllowed = 0,
        sum = tarteaucitron.job.length,
        index;

      if (status === true) {
        tarteaucitron.userInterface.css(key + 'Line', 'borderLeft', '5px solid ' + greenDark);
        tarteaucitron.userInterface.css(key + 'Allowed', 'backgroundColor', greenDark);
        tarteaucitron.userInterface.css(key + 'Denied', 'backgroundColor', gray);
      } else if (status === false) {
        tarteaucitron.userInterface.css(key + 'Line', 'borderLeft', '5px solid ' + redDark);
        tarteaucitron.userInterface.css(key + 'Allowed', 'backgroundColor', gray);
        tarteaucitron.userInterface.css(key + 'Denied', 'backgroundColor', redDark);
      }

      // check if all services are allowed
      for (index = 0; index < sum; index += 1) {
        if (tarteaucitron.state[tarteaucitron.job[index]] === false) {
          nbDenied += 1;
        } else if (tarteaucitron.state[tarteaucitron.job[index]] === undefined) {
          nbPending += 1;
        } else if (tarteaucitron.state[tarteaucitron.job[index]] === true) {
          nbAllowed += 1;
        }
      }

      tarteaucitron.userInterface.css(c + 'DotGreen', 'width', ((100 / sum) * nbAllowed) + '%');
      tarteaucitron.userInterface.css(c + 'DotYellow', 'width', ((100 / sum) * nbPending) + '%');
      tarteaucitron.userInterface.css(c + 'DotRed', 'width', ((100 / sum) * nbDenied) + '%');

      if (nbDenied === 0 && nbPending === 0) {
        tarteaucitron.userInterface.css(c + 'AllAllowed', 'backgroundColor', greenDark);
        tarteaucitron.userInterface.css(c + 'AllDenied', 'backgroundColor', gray);
      } else if (nbAllowed === 0 && nbPending === 0) {
        tarteaucitron.userInterface.css(c + 'AllAllowed', 'backgroundColor', gray);
        tarteaucitron.userInterface.css(c + 'AllDenied', 'backgroundColor', redDark);
      } else {
        tarteaucitron.userInterface.css(c + 'AllAllowed', 'backgroundColor', gray);
        tarteaucitron.userInterface.css(c + 'AllDenied', 'backgroundColor', gray);
      }

      // close the alert if all service have been reviewed
      if (nbPending === 0) {
        tarteaucitron.userInterface.closeAlert();
      }

      if (tarteaucitron.services[key].cookies.length > 0 && status === false) {
        tarteaucitron.cookie.purge(tarteaucitron.services[key].cookies);
      }

      if (status === true) {
        if (document.getElementById('tacCL' + key) !== null) {
          document.getElementById('tacCL' + key).innerHTML = '...';
        }
        setTimeout(function () {
          tarteaucitron.cookie.checkCount(key);
        }, 2500);
      } else {
        tarteaucitron.cookie.checkCount(key);
      }
    },
    "openPanel": function () {
      "use strict";
      tarteaucitron.userInterface.css('tarteaucitron', 'display', 'block');
      tarteaucitron.userInterface.css('tarteaucitronBack', 'display', 'block');
      tarteaucitron.userInterface.css('tarteaucitronCookiesListContainer', 'display', 'none');
      tarteaucitron.userInterface.jsSizing('main');
    },
    "closePanel": function () {
      "use strict";

      if (document.location.hash === tarteaucitron.hashtag) {
        document.location.hash = '';
      }
      tarteaucitron.userInterface.css('tarteaucitron', 'display', 'none');
      tarteaucitron.userInterface.css('tarteaucitronCookiesListContainer', 'display', 'none');

      tarteaucitron.fallback(['tarteaucitronInfoBox'], function (elem) {
        elem.style.display = 'none';
      }, true);

      if (tarteaucitron.reloadThePage === true) {
        window.location.reload();
      } else {
        tarteaucitron.userInterface.css('tarteaucitronBack', 'display', 'none');
      }
    },
    "openAlert": function () {
      "use strict";
      var c = 'tarteaucitron';
      tarteaucitron.userInterface.css(c + 'Percentage', 'display', 'block');
      tarteaucitron.userInterface.css(c + 'AlertSmall', 'display', 'none');
      tarteaucitron.userInterface.css(c + 'AlertBig',   'display', 'block');
    },
    "closeAlert": function () {
      "use strict";
      var c = 'tarteaucitron';
      tarteaucitron.userInterface.css(c + 'Percentage', 'display', 'none');
      tarteaucitron.userInterface.css(c + 'AlertSmall', 'display', 'block');
      tarteaucitron.userInterface.css(c + 'AlertBig',   'display', 'none');
      tarteaucitron.userInterface.jsSizing('box');
    },
    "toggleCookiesList": function () {
      "use strict";
      var div = document.getElementById('tarteaucitronCookiesListContainer');

      if (div === null) {
        return;
      }

      if (div.style.display !== 'block') {
        tarteaucitron.cookie.number();
        div.style.display = 'block';
        tarteaucitron.userInterface.jsSizing('cookie');
        tarteaucitron.userInterface.css('tarteaucitron', 'display', 'none');
        tarteaucitron.userInterface.css('tarteaucitronBack', 'display', 'block');
        tarteaucitron.fallback(['tarteaucitronInfoBox'], function (elem) {
          elem.style.display = 'none';
        }, true);
      } else {
        div.style.display = 'none';
        tarteaucitron.userInterface.css('tarteaucitron', 'display', 'none');
        tarteaucitron.userInterface.css('tarteaucitronBack', 'display', 'none');
      }
    },
    "toggle": function (id, closeClass) {
      "use strict";
      var div = document.getElementById(id);

      if (div === null) {
        return;
      }

      if (closeClass !== undefined) {
        tarteaucitron.fallback([closeClass], function (elem) {
          if (elem.id !== id) {
            elem.style.display = 'none';
          }
        }, true);
      }

      if (div.style.display !== 'block') {
        div.style.display = 'block';
      } else {
        div.style.display = 'none';
      }
    },
    "order": function (id) {
      "use strict";
      var main = document.getElementById('tarteaucitronServices_' + id),
        allDivs,
        store = [],
        i;

      if (main === null) {
        return;
      }

      allDivs = main.childNodes;

      if (typeof Array.prototype.map === 'function') {
        Array.prototype.map.call(main.children, Object).sort(function (a, b) {
          if (tarteaucitron.services[a.id.replace(/Line/g, '')].name > tarteaucitron.services[b.id.replace(/Line/g, '')].name) { return 1; }
          if (tarteaucitron.services[a.id.replace(/Line/g, '')].name < tarteaucitron.services[b.id.replace(/Line/g, '')].name) { return -1; }
          return 0;
        }).forEach(function (element) {
          main.appendChild(element);
        });
      }
    },
    "jsSizing": function (type) {
      "use strict";
      var scrollbarMarginRight = 10,
        scrollbarWidthParent,
        scrollbarWidthChild,
        servicesHeight,
        e = window,
        a = 'inner',
        windowInnerHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        mainTop,
        mainHeight,
        closeButtonHeight,
        headerHeight,
        cookiesListHeight,
        cookiesCloseHeight,
        cookiesTitleHeight,
        paddingBox,
        alertSmallHeight,
        cookiesNumberHeight;

      if (type === 'box') {
        if (document.getElementById('tarteaucitronAlertSmall') !== null && document.getElementById('tarteaucitronCookiesNumber') !== null) {

          // reset
          tarteaucitron.userInterface.css('tarteaucitronCookiesNumber', 'padding', '0px 10px');

          // calculate
          alertSmallHeight = document.getElementById('tarteaucitronAlertSmall').offsetHeight;
          cookiesNumberHeight = document.getElementById('tarteaucitronCookiesNumber').offsetHeight;
          paddingBox = (alertSmallHeight - cookiesNumberHeight) / 2;

          // apply
          tarteaucitron.userInterface.css('tarteaucitronCookiesNumber', 'padding', paddingBox + 'px 10px');
        }
      } else if (type === 'main') {

        // get the real window width for media query
        if (window.innerWidth === undefined) {
          a = 'client';
          e = document.documentElement || document.body;
        }

        // height of the services list container
        if (document.getElementById('tarteaucitron') !== null && document.getElementById('tarteaucitronClosePanel') !== null && document.getElementById('tarteaucitronMainLineOffset') !== null) {

          // reset
          tarteaucitron.userInterface.css('tarteaucitronScrollbarParent', 'height', 'auto');

          // calculate
          mainHeight = document.getElementById('tarteaucitron').offsetHeight;
          closeButtonHeight = document.getElementById('tarteaucitronClosePanel').offsetHeight;
          headerHeight = document.getElementById('tarteaucitronMainLineOffset').offsetHeight;

          // apply
          servicesHeight = (mainHeight - closeButtonHeight - headerHeight + 1);
          tarteaucitron.userInterface.css('tarteaucitronScrollbarParent', 'height', servicesHeight + 'px');
        }

        // align the main allow/deny button depending on scrollbar width
        if (document.getElementById('tarteaucitronScrollbarParent') !== null && document.getElementById('tarteaucitronScrollbarChild') !== null) {

          // media query
          if (e[a + 'Width'] <= 479) {
            tarteaucitron.userInterface.css('tarteaucitronScrollbarAdjust', 'marginLeft', '11px');
          } else if (e[a + 'Width'] <= 767) {
            scrollbarMarginRight = 12;
          }

          scrollbarWidthParent = document.getElementById('tarteaucitronScrollbarParent').offsetWidth;
          scrollbarWidthChild = document.getElementById('tarteaucitronScrollbarChild').offsetWidth;
          tarteaucitron.userInterface.css('tarteaucitronScrollbarAdjust', 'marginRight', ((scrollbarWidthParent - scrollbarWidthChild) + scrollbarMarginRight) + 'px');
        }

        // center the main panel
        if (document.getElementById('tarteaucitron') !== null) {

          // media query
          if (e[a + 'Width'] <= 767) {
            mainTop = 0;
          } else {
            mainTop = ((windowInnerHeight - document.getElementById('tarteaucitron').offsetHeight) / 2) - 21;
          }

          // correct
          if (mainTop < 0) {
            mainTop = 0;
          }

          if (document.getElementById('tarteaucitronMainLineOffset') !== null) {
            if (document.getElementById('tarteaucitron').offsetHeight < (windowInnerHeight / 2)) {
              mainTop -= document.getElementById('tarteaucitronMainLineOffset').offsetHeight;
            }
          }

          // apply
          tarteaucitron.userInterface.css('tarteaucitron', 'top', mainTop + 'px');
        }


      } else if (type === 'cookie') {

        // put cookies list at bottom
        if (document.getElementById('tarteaucitronAlertSmall') !== null) {
          tarteaucitron.userInterface.css('tarteaucitronCookiesListContainer', 'bottom', (document.getElementById('tarteaucitronAlertSmall').offsetHeight) + 'px');
        }

        // height of cookies list
        if (document.getElementById('tarteaucitronCookiesListContainer') !== null) {

          // reset
          tarteaucitron.userInterface.css('tarteaucitronCookiesList', 'height', 'auto');

          // calculate
          cookiesListHeight = document.getElementById('tarteaucitronCookiesListContainer').offsetHeight;
          cookiesCloseHeight = document.getElementById('tarteaucitronClosePanelCookie').offsetHeight;
          cookiesTitleHeight = document.getElementById('tarteaucitronCookiesTitle').offsetHeight;

          // apply
          tarteaucitron.userInterface.css('tarteaucitronCookiesList', 'height', (cookiesListHeight - cookiesCloseHeight - cookiesTitleHeight - 2) + 'px');
        }
      }
    }
  },
  "cookie": {
    "owner": {},
    "create": function (key, status) {
      "use strict";
      var d = new Date(),
        time = d.getTime(),
        expireTime = time + 31536000000, // 365 days
        regex = new RegExp("!" + key + "=(wait|true|false)", "g"),
        cookie = tarteaucitron.cookie.read().replace(regex, ""),
        value = 'tarteaucitron=' + cookie + '!' + key + '=' + status;

      if (tarteaucitron.cookie.read().indexOf(key + '=' + status) === -1) {
        tarteaucitron.pro('!' + key + '=' + status);
      }

      d.setTime(expireTime);
      document.cookie = value + '; expires=' + d.toGMTString() + '; path=/;';
    },
    "read": function () {
      "use strict";
      var nameEQ = "tarteaucitron=",
        ca = document.cookie.split(';'),
        i,
        c;

      for (i = 0; i < ca.length; i += 1) {
        c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length);
        }
      }
      return '';
    },
    "purge": function (arr) {
      "use strict";
      var i;

      for (i = 0; i < arr.length; i += 1) {
        document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/;';
        document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/; domain=.' + location.hostname + ';';
        document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/; domain=.' + location.hostname.split('.').slice(-2).join('.') + ';';
      }
    },
    "checkCount": function (key) {
      "use strict";
      var arr = tarteaucitron.services[key].cookies,
        nb = arr.length,
        nbCurrent = 0,
        html = '',
        i,
        status = document.cookie.indexOf(key + '=true');

      if (status >= 0 && nb === 0) {
        html += tarteaucitron.lang.useNoCookie;
      } else if (status >= 0) {
        for (i = 0; i < nb; i += 1) {
          if (document.cookie.indexOf(arr[i] + '=') !== -1) {
            nbCurrent += 1;
            if (tarteaucitron.cookie.owner[arr[i]] === undefined) {
              tarteaucitron.cookie.owner[arr[i]] = [];
            }
            if (tarteaucitron.cookie.crossIndexOf(tarteaucitron.cookie.owner[arr[i]], tarteaucitron.services[key].name) === false) {
              tarteaucitron.cookie.owner[arr[i]].push(tarteaucitron.services[key].name);
            }
          }
        }

        if (nbCurrent > 0) {
          html += tarteaucitron.lang.useCookieCurrent + ' ' + nbCurrent + ' cookie';
          if (nbCurrent > 1) {
            html += 's';
          }
          html += '.';
        } else {
          html += tarteaucitron.lang.useNoCookie;
        }
      } else if (nb === 0) {
        html = tarteaucitron.lang.noCookie;
      } else {
        html += tarteaucitron.lang.useCookie + ' ' + nb + ' cookie';
        if (nb > 1) {
          html += 's';
        }
        html += '.';
      }

      if (document.getElementById('tacCL' + key) !== null) {
        document.getElementById('tacCL' + key).innerHTML = html;
      }
    },
    "crossIndexOf": function (arr, match) {
      "use strict";
      var i;
      for (i = 0; i < arr.length; i += 1) {
        if (arr[i] === match) {
          return true;
        }
      }
      return false;
    },
    "number": function () {
      "use strict";
      var cookies = document.cookie.split(';'),
        nb = (document.cookie !== '') ? cookies.length : 0,
        html = '',
        i,
        name,
        namea,
        nameb,
        c,
        d,
        s = (nb > 1) ? 's' : '',
        savedname,
        regex = /^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i,
        regexedDomain = (tarteaucitron.cdn.match(regex) !== null) ? tarteaucitron.cdn.match(regex)[1] : tarteaucitron.cdn,
        host = (tarteaucitron.domain !== undefined) ? tarteaucitron.domain : regexedDomain;

      cookies = cookies.sort(function (a, b) {
        namea = a.split('=', 1).toString().replace(/ /g, '');
        nameb = b.split('=', 1).toString().replace(/ /g, '');
        c = (tarteaucitron.cookie.owner[namea] !== undefined) ? tarteaucitron.cookie.owner[namea] : '0';
        d = (tarteaucitron.cookie.owner[nameb] !== undefined) ? tarteaucitron.cookie.owner[nameb] : '0';
        if (c + a > d + b) { return 1; }
        if (c + a < d + b) { return -1; }
        return 0;
      });

      if (document.cookie !== '') {
        for (i = 0; i < nb; i += 1) {
          name = cookies[i].split('=', 1).toString().replace(/ /g, '');
          if (tarteaucitron.cookie.owner[name] !== undefined && tarteaucitron.cookie.owner[name].join(' // ') !== savedname) {
            savedname = tarteaucitron.cookie.owner[name].join(' // ');
            html += '<div class="tarteaucitronHidden">';
            html += '     <div class="tarteaucitronTitle">';
            html += '        ' + tarteaucitron.cookie.owner[name].join(' // ');
            html += '    </div>';
            html += '</div>';
          } else if (tarteaucitron.cookie.owner[name] === undefined && host !== savedname) {
            savedname = host;
            html += '<div class="tarteaucitronHidden">';
            html += '     <div class="tarteaucitronTitle">';
            html += '        ' + host;
            html += '    </div>';
            html += '</div>';
          }
          html += '<div class="tarteaucitronCookiesListMain">';
          html += '    <div class="tarteaucitronCookiesListLeft"><a href="#" onclick="tarteaucitron.cookie.purge([\'' + cookies[i].split('=', 1) + '\']);tarteaucitron.cookie.number();tarteaucitron.userInterface.jsSizing(\'cookie\');return false"><b>&times;</b></a> <b>' + name + '</b>';
          html += '    </div>';
          html += '    <div class="tarteaucitronCookiesListRight">' + cookies[i].split('=').slice(1).join('=') + '</div>';
          html += '</div>';
        }
      } else {
        html += '<div class="tarteaucitronCookiesListMain">';
        html += '    <div class="tarteaucitronCookiesListLeft"><b>-</b></div>';
        html += '    <div class="tarteaucitronCookiesListRight"></div>';
        html += '</div>';
      }

      html += '<div class="tarteaucitronHidden" style="height:20px;display:block"></div>';

      if (document.getElementById('tarteaucitronCookiesList') !== null) {
        document.getElementById('tarteaucitronCookiesList').innerHTML = html;
      }

      if (document.getElementById('tarteaucitronCookiesNumber') !== null) {
        document.getElementById('tarteaucitronCookiesNumber').innerHTML = nb;
      }

      if (document.getElementById('tarteaucitronCookiesNumberBis') !== null) {
        document.getElementById('tarteaucitronCookiesNumberBis').innerHTML = nb + ' cookie' + s;
      }

      for (i = 0; i < tarteaucitron.job.length; i += 1) {
        tarteaucitron.cookie.checkCount(tarteaucitron.job[i]);
      }
    }
  },
  "getLanguage": function () {
    "use strict";
    if (!navigator) { return 'en'; }

    var availableLanguages = 'cs,en,fr,es,it,de,pt,pl,ru',
      defaultLanguage = 'en',
      lang = navigator.language || navigator.browserLanguage ||
        navigator.systemLanguage || navigator.userLang || null,
      userLanguage = lang.substr(0, 2);

    if (tarteaucitronForceLanguage !== '') {
      if (availableLanguages.indexOf(tarteaucitronForceLanguage) !== -1) {
        return tarteaucitronForceLanguage;
      }
    }

    if (availableLanguages.indexOf(userLanguage) === -1) {
      return defaultLanguage;
    }
    return userLanguage;
  },
  "getLocale": function () {
    "use strict";
    if (!navigator) { return 'en_US'; }

    var lang = navigator.language || navigator.browserLanguage ||
      navigator.systemLanguage || navigator.userLang || null,
      userLanguage = lang.substr(0, 2);

    if (userLanguage === 'fr') {
      return 'fr_FR';
    } else if (userLanguage === 'en') {
      return 'en_US';
    } else if (userLanguage === 'de') {
      return 'de_DE';
    } else if (userLanguage === 'es') {
      return 'es_ES';
    } else if (userLanguage === 'it') {
      return 'it_IT';
    } else if (userLanguage === 'pt') {
      return 'pt_PT';
    } else {
      return 'en_US';
    }
  },
  "addScript": function (url, id, callback, execute, attrName, attrVal) {
    "use strict";
    var script,
      done = false;

    if (execute === false) {
      if (typeof callback === 'function') {
        callback();
      }
    } else {
      script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = (id !== undefined) ? id : '';
      script.async = true;
      script.src = url;

      if (attrName !== undefined && attrVal !== undefined) {
        script.setAttribute(attrName, attrVal);
      }

      if (typeof callback === 'function') {
        script.onreadystatechange = script.onload = function () {
          var state = script.readyState;
          if (!done && (!state || /loaded|complete/.test(state))) {
            done = true;
            callback();
          }
        };
      }

      document.getElementsByTagName('head')[0].appendChild(script);
    }
  },
  "makeAsync": {
    "antiGhost": 0,
    "buffer": '',
    "init": function (url, id) {
      "use strict";
      var savedWrite = document.write,
        savedWriteln = document.writeln;

      document.write = function (content) {
        tarteaucitron.makeAsync.buffer += content;
      };
      document.writeln = function (content) {
        tarteaucitron.makeAsync.buffer += content.concat("\n");
      };

      setTimeout(function () {
        document.write = savedWrite;
        document.writeln = savedWriteln;
      }, 20000);

      tarteaucitron.makeAsync.getAndParse(url, id);
    },
    "getAndParse": function (url, id) {
      "use strict";
      if (tarteaucitron.makeAsync.antiGhost > 9) {
        tarteaucitron.makeAsync.antiGhost = 0;
        return;
      }
      tarteaucitron.makeAsync.antiGhost += 1;
      tarteaucitron.addScript(url, '', function () {
        if (document.getElementById(id) !== null) {
          document.getElementById(id).innerHTML += "<span style='display:none'>&nbsp;</span>" + tarteaucitron.makeAsync.buffer;
          tarteaucitron.makeAsync.buffer = '';
          tarteaucitron.makeAsync.execJS(id);
        }
      });
    },
    "execJS": function (id) {
      /* not strict because third party scripts may have errors */
      var i,
        scripts,
        childId,
        type;

      if (document.getElementById(id) === null) {
        return;
      }

      scripts = document.getElementById(id).getElementsByTagName('script');
      for (i = 0; i < scripts.length; i += 1) {
        type = (scripts[i].getAttribute('type') !== null) ? scripts[i].getAttribute('type') : '';
        if (type === '') {
          type = (scripts[i].getAttribute('language') !== null) ? scripts[i].getAttribute('language') : '';
        }
        if (scripts[i].getAttribute('src') !== null && scripts[i].getAttribute('src') !== '') {
          childId = id + Math.floor(Math.random() * 99999999999);
          document.getElementById(id).innerHTML += '<div id="' + childId + '"></div>';
          tarteaucitron.makeAsync.getAndParse(scripts[i].getAttribute('src'), childId);
        } else if (type.indexOf('javascript') !== -1 || type === '') {
          eval(scripts[i].innerHTML);
        }
      }
    }
  },
  "fallback": function (matchClass, content, noInner) {
    "use strict";
    var elems = document.getElementsByTagName('*'),
      i,
      index = 0;

    for (i in elems) {
      if (elems[i] !== undefined) {
        for (index = 0; index < matchClass.length; index += 1) {
          if ((' ' + elems[i].className + ' ')
              .indexOf(' ' + matchClass[index] + ' ') > -1) {
            if (typeof content === 'function') {
              if (noInner === true) {
                content(elems[i]);
              } else {
                elems[i].innerHTML = content(elems[i]);
              }
            } else {
              elems[i].innerHTML = content;
            }
          }
        }
      }
    }
  },
  "engage": function (id) {
    "use strict";
    var html = '',
      r = Math.floor(Math.random() * 100000);

    html += '<div class="tac_activate">';
    html += '   <div class="tac_float">';
    html += '      <b>' + tarteaucitron.services[id].name + '</b> ' + tarteaucitron.lang.fallback;
    html += '      <div class="tarteaucitronAllow" id="Eng' + r + 'ed' + id + '" onclick="tarteaucitron.userInterface.respond(this, true);">';
    html += '          &#10003; ' + tarteaucitron.lang.allow;
    html += '       </div>';
    html += '   </div>';
    html += '</div>';

    return html;
  },
  "extend": function (a, b) {
    "use strict";
    var prop;
    for (prop in b) {
      if (b.hasOwnProperty(prop)) {
        a[prop] = b[prop];
      }
    }
  },
  "proTemp": '',
  "proTimer": function () {
    "use strict";
    setTimeout(tarteaucitron.proPing, 1000);
  },
  "pro": function (list) {
    "use strict";
    tarteaucitron.proTemp += list;
    clearTimeout(tarteaucitron.proTimer);
    tarteaucitron.proTimer = setTimeout(tarteaucitron.proPing, 2500);
  },
  "proPing": function () {
    "use strict";
    if (tarteaucitron.uuid !== '' && tarteaucitron.uuid !== undefined && tarteaucitron.proTemp !== '') {
      var div = document.getElementById('tarteaucitronPremium'),
        timestamp = new Date().getTime(),
        url = '//opt-out.ferank.eu/premium.php?';

      if (div === null) {
        return;
      }

      url += 'domain=' + tarteaucitron.domain + '&';
      url += 'uuid=' + tarteaucitron.uuid + '&';
      url += 'c=' + encodeURIComponent(tarteaucitron.proTemp) + '&';
      url += '_' + timestamp;

      div.innerHTML = '<img src="' + url + '" style="display:none" />';

      tarteaucitron.proTemp = '';
    }

    tarteaucitron.cookie.number();
  }
};





// Services
//----------------------------------------------------------------------------
// Google Analytics
tarteaucitron.services.analytics = {
  "key": "analytics",
  "type": "analytic",
  "name": "Google Analytics (universal)",
  "uri": "https://support.google.com/analytics/answer/6004245",
  "needConsent": true,
  "cookies": ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz'],
  "js": function () {
    "use strict";
    window.GoogleAnalyticsObject = 'ga';
    window.ga = window.ga || function () {
      window.ga.q = window.ga.q || [];
      window.ga.q.push(arguments);
    };
    window.ga.l = new Date();

    tarteaucitron.addScript('//www.google-analytics.com/analytics.js', '', function () {
      ga('create', tarteaucitron.user.analyticsUa, {'cookieExpires': 34128000});
      ga('send', 'pageview');
      ga('set', 'dimension1', 'no');
      ga('require', 'ec');
      if (typeof tarteaucitron.user.analyticsMore === 'function') {
        tarteaucitron.user.analyticsMore();
      }
    });
  }
};
// Hotjar
tarteaucitron.services.hotjar = {
  "key": "hotjar",
  "type": "analytic",
  "name": "Hotjar",
  "uri": "https://help.hotjar.com/hc/en-us/categories/115001323967-About-Hotjar",
  "needConsent": true,
  "cookies": ["hjClosedSurveyInvites", "_hjDonePolls", "_hjMinimizedPolls", "_hjDoneTestersWidgets", "_hjMinimizedTestersWidgets", "_hjDoneSurveys", "_hjIncludedInSample", "_hjShownFeedbackMessage"],
  "js": function () {
    "use strict";
    if (tarteaucitron.user.hotjarId === undefined || tarteaucitron.user.HotjarSv === undefined) {
      return;
    }
    window.hj = window.hj || function() {
      (window.hj.q = window.hj.q || []).push(arguments)
    };
    window._hjSettings = {
      hjid: tarteaucitron.user.hotjarId,
      hjsv: tarteaucitron.user.HotjarSv
    };
    var uri = 'https://static.hotjar.com/c/hotjar-';
    var extension = '.js?sv=';
    tarteaucitron.addScript(uri + window._hjSettings.hjid + extension + window._hjSettings.hjsv);
  }
};
//----------------------------------------------------------------------------


jQuery(document).ready(function($) {
  window.tarteaucitronForceLanguage = $('html').attr('lang').substr(0, 2);
  tarteaucitron.init({
    "hashtag": "#tac",
    "highPrivacy": false,
    "orientation": "bottom",
    "adblocker": false,
    "showAlertSmall": false,
    "cookieslist": true,
    "removeCredit": true
  });
  tarteaucitron.user.analyticsUa = "UA-76735530-1";
  (tarteaucitron.job = tarteaucitron.job || []).push("analytics");

  tarteaucitron.user.hotjarId = "821893";
  tarteaucitron.user.HotjarSv = "6";
  (tarteaucitron.job = tarteaucitron.job || []).push("hotjar");
}).bind(jQuery);