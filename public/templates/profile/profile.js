function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function profileTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"public\u002Ftemplates\u002Fprofile\u002Fprofile.pug":".row\n    .profile-main-block\n        .profile-header\n            .profile-header__avatar\n            .profile-header__info-block\n                .profile-header__title\n                    |#{name}\n                .profile-header__about\n                    .profile-header__dialogue-cloud-img\n                    |#{about}\n                .profile-header__other-info\n                    .profile-header__info-segment\n                        .profile-header__age-img\n                        |#{age}\n                    .profile-header__info-segment\n                        .profile-header__city-img\n                        |#{city}\n                    .profile-header__info-segment\n                        .profile-header__subscribers-img\n                        |#{followers}\n            .profile-header__button-block\n                button.button-inactive\n                    .button-label_inactive &Pcy;&ocy;&dcy;&pcy;&icy;&scy;&acy;&tcy;&softcy;&scy;&yacy;\n                button.button-inactive\n                    .button-label_inactive &Ncy;&acy;&pcy;&icy;&scy;&acy;&tcy;&softcy;\n        .decor-line\n        .button-block\n            button.button-active\n                span.button-label &Pcy;&lcy;&acy;&ncy;&icy;&rcy;&ucy;&iecy;&mcy;&ycy;&iecy;\n            button.button-inactive\n                span.button-label_inactive &Pcy;&ocy;&scy;&iecy;&shchcy;&iecy;&ncy;&ncy;&ycy;&iecy;\n        .my-events-block\n            .event\n                .event__photo\n                .event__text\n                    .event__title\n                        |#{title}\n                    .event__info\n                        |#{date} #{place}\n                .event__chosen\n            .event\n                .event__photo\n                .event__text\n                    .event__title\n                        |#{title}\n                    .event__info\n                        |#{date} #{place}\n                .event__unchosen\n            .event\n                .event__photo\n                .event__text\n                    .event__title\n                        |#{title}\n                    .event__info\n                        |#{date} #{place}\n                .event__unchosen\n            .event\n                .event__photo\n                .event__text\n                    .event__title\n                        |#{title}\n                    .event__info\n                        |#{date} #{place}\n                .event__unchosen\n        .paginator\n            a.paginator__arrow-back(href='#')\n            a.paginator__page-button(href='#') 1\n            a.paginator__arrow-forward(href='#')\n\n"};
;var locals_for_with = (locals || {});(function (about, age, city, date, followers, name, place, title) {;pug_debug_line = 1;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-main-block\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-header\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-header__avatar\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 5;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-header__info-block\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-header__title\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-header__about\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-header__dialogue-cloud-img\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 10;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = about) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 11;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-header__other-info\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-header__info-segment\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-header__age-img\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 14;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = age) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 15;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-header__info-segment\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-header__city-img\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = city) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 18;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-header__info-segment\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-header__subscribers-img\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 20;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = followers) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 21;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-header__button-block\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cbutton class=\"button-inactive\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"button-label_inactive\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "&Pcy;&ocy;&dcy;&pcy;&icy;&scy;&acy;&tcy;&softcy;&scy;&yacy;\u003C\u002Fdiv\u003E\u003C\u002Fbutton\u003E";
;pug_debug_line = 24;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cbutton class=\"button-inactive\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"button-label_inactive\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "&Ncy;&acy;&pcy;&icy;&scy;&acy;&tcy;&softcy;\u003C\u002Fdiv\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 26;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"decor-line\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 27;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"button-block\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cbutton class=\"button-active\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cspan class=\"button-label\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "&Pcy;&lcy;&acy;&ncy;&icy;&rcy;&ucy;&iecy;&mcy;&ycy;&iecy;\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
;pug_debug_line = 30;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cbutton class=\"button-inactive\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cspan class=\"button-label_inactive\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "&Pcy;&ocy;&scy;&iecy;&shchcy;&iecy;&ncy;&ncy;&ycy;&iecy;\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 32;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"my-events-block\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"event\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__photo\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 35;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__text\"\u003E";
;pug_debug_line = 36;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__title\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 38;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__info\"\u003E";
;pug_debug_line = 39;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = date) ? "" : pug_interp));
;pug_debug_line = 39;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + " ";
;pug_debug_line = 39;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = place) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 40;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__chosen\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 41;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"event\"\u003E";
;pug_debug_line = 42;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__photo\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 43;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__text\"\u003E";
;pug_debug_line = 44;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__title\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 46;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__info\"\u003E";
;pug_debug_line = 47;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = date) ? "" : pug_interp));
;pug_debug_line = 47;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + " ";
;pug_debug_line = 47;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = place) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 48;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__unchosen\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 49;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"event\"\u003E";
;pug_debug_line = 50;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__photo\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 51;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__text\"\u003E";
;pug_debug_line = 52;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__title\"\u003E";
;pug_debug_line = 53;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 54;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__info\"\u003E";
;pug_debug_line = 55;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = date) ? "" : pug_interp));
;pug_debug_line = 55;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + " ";
;pug_debug_line = 55;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = place) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 56;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__unchosen\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 57;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"event\"\u003E";
;pug_debug_line = 58;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__photo\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 59;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__text\"\u003E";
;pug_debug_line = 60;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__title\"\u003E";
;pug_debug_line = 61;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 62;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__info\"\u003E";
;pug_debug_line = 63;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = date) ? "" : pug_interp));
;pug_debug_line = 63;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + " ";
;pug_debug_line = 63;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = place) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 64;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__unchosen\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 65;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Cdiv class=\"paginator\"\u003E";
;pug_debug_line = 66;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Ca class=\"paginator__arrow-back\" href=\"#\"\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 67;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Ca class=\"paginator__page-button\" href=\"#\"\u003E";
;pug_debug_line = 67;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "1\u003C\u002Fa\u003E";
;pug_debug_line = 68;pug_debug_filename = "public\u002Ftemplates\u002Fprofile\u002Fprofile.pug";
pug_html = pug_html + "\u003Ca class=\"paginator__arrow-forward\" href=\"#\"\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"about" in locals_for_with?locals_for_with.about:typeof about!=="undefined"?about:undefined,"age" in locals_for_with?locals_for_with.age:typeof age!=="undefined"?age:undefined,"city" in locals_for_with?locals_for_with.city:typeof city!=="undefined"?city:undefined,"date" in locals_for_with?locals_for_with.date:typeof date!=="undefined"?date:undefined,"followers" in locals_for_with?locals_for_with.followers:typeof followers!=="undefined"?followers:undefined,"name" in locals_for_with?locals_for_with.name:typeof name!=="undefined"?name:undefined,"place" in locals_for_with?locals_for_with.place:typeof place!=="undefined"?place:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}