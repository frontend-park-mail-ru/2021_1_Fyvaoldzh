function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function navbarTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"navbar.pug":".container\n  .navbar__row\n    .logo\n      a(href='\u002F' data-direction='main') QDA\n    .navbar-menu\n      a.navbar-menu__signup(href='\u002Fsignup' data-direction='signup')\n"};
;pug_debug_line = 1;pug_debug_filename = "navbar.pug";
pug_html = pug_html + "\u003Cdiv class=\"container\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "navbar.pug";
pug_html = pug_html + "\u003Cdiv class=\"navbar__row\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "navbar.pug";
pug_html = pug_html + "\u003Cdiv class=\"logo\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "navbar.pug";
pug_html = pug_html + "\u003Ca href=\"\u002F\" data-direction=\"main\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "navbar.pug";
pug_html = pug_html + "QDA\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 5;pug_debug_filename = "navbar.pug";
pug_html = pug_html + "\u003Cdiv class=\"navbar-menu\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "navbar.pug";
pug_html = pug_html + "\u003Ca class=\"navbar-menu__signup\" href=\"\u002Fsignup\" data-direction=\"signup\"\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}