function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function myEventsTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug":".row\n    .my-events-main-block\n        .my-events-main-block__title\n            a.my-events-main-block__back-button(href='#')\n            |                     &Mcy;&ocy;&icy; &mcy;&iecy;&rcy;&ocy;&pcy;&rcy;&icy;&yacy;&tcy;&icy;&yacy;\n        .decor-line\n        .button-block\n            button.button-active\n                span.button-label &Pcy;&lcy;&acy;&ncy;&icy;&rcy;&ucy;&iecy;&mcy;&ycy;&iecy;\n            button.button-inactive\n                span.button-label_inactive &Pcy;&ocy;&scy;&iecy;&shchcy;&iecy;&ncy;&ncy;&ycy;&iecy;\n        .my-events-block\n            .event\n                .event__photo\n                .event__text\n                    .event__title\n                        |#{title}\n                    .event__info\n                        |#{date} #{place}\n                .event__chosen\n            .event\n                .event__photo\n                .event__text\n                    .event__title\n                        |#{title}\n                    .event__info\n                        |#{date} #{place}\n                .event__chosen\n            .event\n                .event__photo\n                .event__text\n                    .event__title\n                        |#{title}\n                    .event__info\n                        |#{date} #{place}\n                .event__chosen\n            .event\n                .event__photo\n                .event__text\n                    .event__title\n                        |#{title}\n                    .event__info\n                        |#{date} #{place}\n                .event__chosen\n        .paginator\n            a.paginator__arrow-back(href='#')\n            a.paginator__page-button(href='#') 1\n            a.paginator__arrow-forward(href='#')\n"};
;var locals_for_with = (locals || {});(function (date, place, title) {;pug_debug_line = 1;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"my-events-main-block\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"my-events-main-block__title\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Ca class=\"my-events-main-block__back-button\" href=\"#\"\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 5;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "                    &Mcy;&ocy;&icy; &mcy;&iecy;&rcy;&ocy;&pcy;&rcy;&icy;&yacy;&tcy;&icy;&yacy;\u003C\u002Fdiv\u003E";
;pug_debug_line = 6;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"decor-line\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"button-block\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cbutton class=\"button-active\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cspan class=\"button-label\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "&Pcy;&lcy;&acy;&ncy;&icy;&rcy;&ucy;&iecy;&mcy;&ycy;&iecy;\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
;pug_debug_line = 10;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cbutton class=\"button-inactive\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cspan class=\"button-label_inactive\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "&Pcy;&ocy;&scy;&iecy;&shchcy;&iecy;&ncy;&ncy;&ycy;&iecy;\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 12;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"my-events-block\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"event\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__photo\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 15;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__text\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__title\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 18;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__info\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = date) ? "" : pug_interp));
;pug_debug_line = 19;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + " ";
;pug_debug_line = 19;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = place) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 20;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__chosen\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 21;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"event\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__photo\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 23;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__text\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__title\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 26;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__info\"\u003E";
;pug_debug_line = 27;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = date) ? "" : pug_interp));
;pug_debug_line = 27;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + " ";
;pug_debug_line = 27;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = place) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 28;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__chosen\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 29;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"event\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__photo\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 31;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__text\"\u003E";
;pug_debug_line = 32;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__title\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 34;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__info\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = date) ? "" : pug_interp));
;pug_debug_line = 35;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + " ";
;pug_debug_line = 35;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = place) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 36;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__chosen\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 37;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"event\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__photo\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 39;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__text\"\u003E";
;pug_debug_line = 40;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__title\"\u003E";
;pug_debug_line = 41;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 42;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__info\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = date) ? "" : pug_interp));
;pug_debug_line = 43;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + " ";
;pug_debug_line = 43;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = place) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 44;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"event__chosen\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 45;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Cdiv class=\"paginator\"\u003E";
;pug_debug_line = 46;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Ca class=\"paginator__arrow-back\" href=\"#\"\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 47;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Ca class=\"paginator__page-button\" href=\"#\"\u003E";
;pug_debug_line = 47;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "1\u003C\u002Fa\u003E";
;pug_debug_line = 48;pug_debug_filename = "public\u002Ftemplates\u002Fmy-events\u002Fmy-events.pug";
pug_html = pug_html + "\u003Ca class=\"paginator__arrow-forward\" href=\"#\"\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"date" in locals_for_with?locals_for_with.date:typeof date!=="undefined"?date:undefined,"place" in locals_for_with?locals_for_with.place:typeof place!=="undefined"?place:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}