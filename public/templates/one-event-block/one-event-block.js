function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}
function pug_style(r){if(!r)return"";if("object"==typeof r){var t="";for(var e in r)pug_has_own_property.call(r,e)&&(t=t+e+":"+r[e]+";");return t}return r+""}function oneEventBlockTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"public\u002Ftemplates\u002Fone-event-block\u002Fone-event-block.pug":".smbs-event\n    .smbs-event__photo(style='background: url(http:\u002F\u002F95.163.180.8:1323\u002Fapi\u002Fv1\u002Fevent\u002F' + id + '\u002Fimage) no-repeat center \u002F cover;')\n    .smbs-event__text\n        .smbs-event__title\n            a(href='#' id=id data-direction='eventPage') #{title}\n        .smbs-event__info\n            .smbs-event__place #{place}\n            .smbs-event__data #{date}\n    .smbs-event__chosen"};
;var locals_for_with = (locals || {});(function (date, id, place, title) {;pug_debug_line = 1;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-block\u002Fone-event-block.pug";
pug_html = pug_html + "\u003Cdiv class=\"smbs-event\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-block\u002Fone-event-block.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"smbs-event__photo\""+pug_attr("style", pug_style('background: url(http://95.163.180.8:1323/api/v1/event/' + id + '/image) no-repeat center / cover;'), true, false)) + "\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 3;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-block\u002Fone-event-block.pug";
pug_html = pug_html + "\u003Cdiv class=\"smbs-event__text\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-block\u002Fone-event-block.pug";
pug_html = pug_html + "\u003Cdiv class=\"smbs-event__title\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-block\u002Fone-event-block.pug";
pug_html = pug_html + "\u003Ca" + (" href=\"#\""+pug_attr("id", id, true, false)+" data-direction=\"eventPage\"") + "\u003E";
;pug_debug_line = 5;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-block\u002Fone-event-block.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 6;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-block\u002Fone-event-block.pug";
pug_html = pug_html + "\u003Cdiv class=\"smbs-event__info\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-block\u002Fone-event-block.pug";
pug_html = pug_html + "\u003Cdiv class=\"smbs-event__place\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-block\u002Fone-event-block.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = place) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-block\u002Fone-event-block.pug";
pug_html = pug_html + "\u003Cdiv class=\"smbs-event__data\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-block\u002Fone-event-block.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = date) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 9;pug_debug_filename = "public\u002Ftemplates\u002Fone-event-block\u002Fone-event-block.pug";
pug_html = pug_html + "\u003Cdiv class=\"smbs-event__chosen\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"date" in locals_for_with?locals_for_with.date:typeof date!=="undefined"?date:undefined,"id" in locals_for_with?locals_for_with.id:typeof id!=="undefined"?id:undefined,"place" in locals_for_with?locals_for_with.place:typeof place!=="undefined"?place:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}