function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function signUpFormTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"public\u002Ftemplates\u002Fsignup\u002Fsignup.pug":".form\n  a.form__arrow-back(href='#', data-direction='back')\n  .form__title &Rcy;&iecy;&gcy;&icy;&scy;&tcy;&rcy;&acy;&tscy;&icy;&yacy;\n  .decor-line\n  .form-body\n    input.form-body__input__login(type='text' placeholder='Введите логин')\n    input.form-body__input__password(type='password' placeholder='Введите пароль')\n    input.form-body__input__nickname(type='text' placeholder='Введите имя')\n    button.confirm-button\n      span.button-label(type='submit') &Zcy;&acy;&rcy;&iecy;&gcy;&icy;&scy;&tcy;&rcy;&icy;&rcy;&ocy;&vcy;&acy;&tcy;&softcy;&scy;&yacy;\n    span.form__bottom-text\n      | &Ucy;&zhcy;&iecy; &iecy;&scy;&tcy;&softcy; &acy;&kcy;&kcy;&acy;&ucy;&ncy;&tcy;?\n      a.a-stroke(data-direction='login' href='\u002Flogin') &Vcy;&ocy;&jcy;&dcy;&icy;&tcy;&iecy;.\n"};
;pug_debug_line = 1;pug_debug_filename = "public\u002Ftemplates\u002Fsignup\u002Fsignup.pug";
pug_html = pug_html + "\u003Cdiv class=\"form\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "public\u002Ftemplates\u002Fsignup\u002Fsignup.pug";
pug_html = pug_html + "\u003Ca class=\"form__arrow-back\" href=\"#\" data-direction=\"back\"\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 3;pug_debug_filename = "public\u002Ftemplates\u002Fsignup\u002Fsignup.pug";
pug_html = pug_html + "\u003Cdiv class=\"form__title\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "public\u002Ftemplates\u002Fsignup\u002Fsignup.pug";
pug_html = pug_html + "&Rcy;&iecy;&gcy;&icy;&scy;&tcy;&rcy;&acy;&tscy;&icy;&yacy;\u003C\u002Fdiv\u003E";
;pug_debug_line = 4;pug_debug_filename = "public\u002Ftemplates\u002Fsignup\u002Fsignup.pug";
pug_html = pug_html + "\u003Cdiv class=\"decor-line\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 5;pug_debug_filename = "public\u002Ftemplates\u002Fsignup\u002Fsignup.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-body\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "public\u002Ftemplates\u002Fsignup\u002Fsignup.pug";
pug_html = pug_html + "\u003Cinput class=\"form-body__input__login\" type=\"text\" placeholder=\"Введите логин\"\u002F\u003E";
;pug_debug_line = 7;pug_debug_filename = "public\u002Ftemplates\u002Fsignup\u002Fsignup.pug";
pug_html = pug_html + "\u003Cinput class=\"form-body__input__password\" type=\"password\" placeholder=\"Введите пароль\"\u002F\u003E";
;pug_debug_line = 8;pug_debug_filename = "public\u002Ftemplates\u002Fsignup\u002Fsignup.pug";
pug_html = pug_html + "\u003Cinput class=\"form-body__input__nickname\" type=\"text\" placeholder=\"Введите имя\"\u002F\u003E";
;pug_debug_line = 9;pug_debug_filename = "public\u002Ftemplates\u002Fsignup\u002Fsignup.pug";
pug_html = pug_html + "\u003Cbutton class=\"confirm-button\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "public\u002Ftemplates\u002Fsignup\u002Fsignup.pug";
pug_html = pug_html + "\u003Cspan class=\"button-label\" type=\"submit\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "public\u002Ftemplates\u002Fsignup\u002Fsignup.pug";
pug_html = pug_html + "&Zcy;&acy;&rcy;&iecy;&gcy;&icy;&scy;&tcy;&rcy;&icy;&rcy;&ocy;&vcy;&acy;&tcy;&softcy;&scy;&yacy;\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
;pug_debug_line = 11;pug_debug_filename = "public\u002Ftemplates\u002Fsignup\u002Fsignup.pug";
pug_html = pug_html + "\u003Cspan class=\"form__bottom-text\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "public\u002Ftemplates\u002Fsignup\u002Fsignup.pug";
pug_html = pug_html + "&Ucy;&zhcy;&iecy; &iecy;&scy;&tcy;&softcy; &acy;&kcy;&kcy;&acy;&ucy;&ncy;&tcy;?";
;pug_debug_line = 13;pug_debug_filename = "public\u002Ftemplates\u002Fsignup\u002Fsignup.pug";
pug_html = pug_html + "\u003Ca class=\"a-stroke\" data-direction=\"login\" href=\"\u002Flogin\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "public\u002Ftemplates\u002Fsignup\u002Fsignup.pug";
pug_html = pug_html + "&Vcy;&ocy;&jcy;&dcy;&icy;&tcy;&iecy;.\u003C\u002Fa\u003E\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}