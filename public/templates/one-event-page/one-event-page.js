function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function oneEventPageTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug":".row\n  .container\n    .left-row\n      .event-description\n        .event-description__star\n        .event-description__title\n          | #{title}\n        .decor-line\n        .event-description__body\n          | #{description}\n  .tags\n    .container\n      .left-row\n        button.button-inactive\n          span.button-label_inactive Культура\n        button.button-inactive\n          span.button-label_inactive Выставки\n        button.button-inactive\n          span.button-label_inactive Событие\n        button.button-inactive\n          span.button-label_inactive Кино\n  .event-info\n    .container\n      .title\n        | Когда?\n      .event-info__date\n        | #{date}\n      .title Где?\n      .event-info__location\n        .location-text\n          | #{place}\n        .street-text\n          | #{street}\n        .underground-text\n          | #{subway}\n      .geolocation-image\n      .decor-line\n  .reviews-block\n    .container\n      .title Отзывы\n      .rewiew-form\n        .center-row\n          .rate-stars\n          textarea(name='rewiew-text' placeholder='Начните писать отзыв')\n          button.confirm-rewiew-button\n            span.button-label Отправить"};
;var locals_for_with = (locals || {});(function (date, description, place, street, subway, title) {;pug_debug_line = 1;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"container\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"left-row\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"event-description\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"event-description__star\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 6;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"event-description__title\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"decor-line\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 9;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"event-description__body\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = description) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 11;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"tags\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"container\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"left-row\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cbutton class=\"button-inactive\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cspan class=\"button-label_inactive\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "Культура\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
;pug_debug_line = 16;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cbutton class=\"button-inactive\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cspan class=\"button-label_inactive\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "Выставки\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
;pug_debug_line = 18;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cbutton class=\"button-inactive\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cspan class=\"button-label_inactive\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "Событие\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
;pug_debug_line = 20;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cbutton class=\"button-inactive\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cspan class=\"button-label_inactive\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "Кино\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 22;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"event-info\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"container\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"title\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "Когда?\u003C\u002Fdiv\u003E";
;pug_debug_line = 26;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"event-info__date\"\u003E";
;pug_debug_line = 27;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = date) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 28;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"title\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "Где?\u003C\u002Fdiv\u003E";
;pug_debug_line = 29;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"event-info__location\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"location-text\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = place) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 32;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"street-text\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = street) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 34;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"underground-text\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = subway) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 36;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"geolocation-image\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 37;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"decor-line\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 38;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"reviews-block\"\u003E";
;pug_debug_line = 39;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"container\"\u003E";
;pug_debug_line = 40;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"title\"\u003E";
;pug_debug_line = 40;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "Отзывы\u003C\u002Fdiv\u003E";
;pug_debug_line = 41;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"rewiew-form\"\u003E";
;pug_debug_line = 42;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"center-row\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cdiv class=\"rate-stars\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 44;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Ctextarea name=\"rewiew-text\" placeholder=\"Начните писать отзыв\"\u003E\u003C\u002Ftextarea\u003E";
;pug_debug_line = 45;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cbutton class=\"confirm-rewiew-button\"\u003E";
;pug_debug_line = 46;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "\u003Cspan class=\"button-label\"\u003E";
;pug_debug_line = 46;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-page\u002Fone-event-page.pug";
pug_html = pug_html + "Отправить\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"date" in locals_for_with?locals_for_with.date:typeof date!=="undefined"?date:undefined,"description" in locals_for_with?locals_for_with.description:typeof description!=="undefined"?description:undefined,"place" in locals_for_with?locals_for_with.place:typeof place!=="undefined"?place:undefined,"street" in locals_for_with?locals_for_with.street:typeof street!=="undefined"?street:undefined,"subway" in locals_for_with?locals_for_with.subway:typeof subway!=="undefined"?subway:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}