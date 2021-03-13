function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function navbarLoggedTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"public\u002Fcomponents\u002Fnavbar\u002Fnavbar-logged.pug":".logo\n  a(href='\u002F' data-direction='main' data-profileId=Uid) QDA\n.profile-nav\n  .navbar-profile-avatar(id='navbar-avatar')\n  a.navbar-profile-name(href='#' data-direction='profile')\n    | #{name}\na(href=\"#\", data-direction='logout')\n  | logout"};
;var locals_for_with = (locals || {});(function (Uid, name) {;pug_debug_line = 1;pug_debug_filename = "public\u002Fcomponents\u002Fnavbar\u002Fnavbar-logged.pug";
pug_html = pug_html + "\u003Cdiv class=\"logo\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "public\u002Fcomponents\u002Fnavbar\u002Fnavbar-logged.pug";
pug_html = pug_html + "\u003Ca" + (" href=\"\u002F\" data-direction=\"main\""+pug_attr("data-profileId", Uid, true, false)) + "\u003E";
;pug_debug_line = 2;pug_debug_filename = "public\u002Fcomponents\u002Fnavbar\u002Fnavbar-logged.pug";
pug_html = pug_html + "QDA\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 3;pug_debug_filename = "public\u002Fcomponents\u002Fnavbar\u002Fnavbar-logged.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-nav\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "public\u002Fcomponents\u002Fnavbar\u002Fnavbar-logged.pug";
pug_html = pug_html + "\u003Cdiv class=\"navbar-profile-avatar\" id=\"navbar-avatar\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 5;pug_debug_filename = "public\u002Fcomponents\u002Fnavbar\u002Fnavbar-logged.pug";
pug_html = pug_html + "\u003Ca class=\"navbar-profile-name\" href=\"#\" data-direction=\"profile\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "public\u002Fcomponents\u002Fnavbar\u002Fnavbar-logged.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "public\u002Fcomponents\u002Fnavbar\u002Fnavbar-logged.pug";
pug_html = pug_html + "\u003Ca href=\"#\" data-direction=\"logout\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "public\u002Fcomponents\u002Fnavbar\u002Fnavbar-logged.pug";
pug_html = pug_html + "logout\u003C\u002Fa\u003E";}.call(this,"Uid" in locals_for_with?locals_for_with.Uid:typeof Uid!=="undefined"?Uid:undefined,"name" in locals_for_with?locals_for_with.name:typeof name!=="undefined"?name:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}