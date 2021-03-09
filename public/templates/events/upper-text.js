function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function upperTextTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"public\u002Ftemplates\u002Fevents\u002Fupper-text.pug":".row\n  .container\n    .right-row\n      .text-block\n        .text-block__title\n          | QDA го? Ну го.\n        .decor-line\n        .text-block__body\n          | Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia hic neque nobis sint delectus similique, doloremque doloribus voluptatum ad amet magnam consequatur totam molestiae sit sapiente explicabo. Quisquam, dolorem eligendi. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia hic neque nobis sint delectus similique, doloremque doloribus voluptatum ad amet magnam consequatur totam molestiae sit sapiente explicabo. Quisquam, dolorem eligendi. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia hic neque nobis sint delectus similique, doloremque doloribus voluptatum ad amet magnam consequatur totam molestiae sit sapiente explicabo. Quisquam, dolorem eligendi.\n  .events-table\n    .container\n      .title\n        | Находите события\n        .right-arrow\n      .left-row\n        button.button-active\n          span.button-label Концерты\n        button.button-inactive\n          span.button-label_inactive Выставки\n        button.button-inactive\n          span.button-label_inactive Кино\n      #events-row(class=\"center-row\")\n"};
;pug_debug_line = 1;pug_debug_filename = "public\u002Ftemplates\u002Fevents\u002Fupper-text.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "public\u002Ftemplates\u002Fevents\u002Fupper-text.pug";
pug_html = pug_html + "\u003Cdiv class=\"container\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "public\u002Ftemplates\u002Fevents\u002Fupper-text.pug";
pug_html = pug_html + "\u003Cdiv class=\"right-row\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "public\u002Ftemplates\u002Fevents\u002Fupper-text.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-block\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "public\u002Ftemplates\u002Fevents\u002Fupper-text.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-block__title\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "public\u002Ftemplates\u002Fevents\u002Fupper-text.pug";
pug_html = pug_html + "QDA го? Ну го.\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "public\u002Ftemplates\u002Fevents\u002Fupper-text.pug";
pug_html = pug_html + "\u003Cdiv class=\"decor-line\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = "public\u002Ftemplates\u002Fevents\u002Fupper-text.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-block__body\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "public\u002Ftemplates\u002Fevents\u002Fupper-text.pug";
pug_html = pug_html + "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia hic neque nobis sint delectus similique, doloremque doloribus voluptatum ad amet magnam consequatur totam molestiae sit sapiente explicabo. Quisquam, dolorem eligendi. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia hic neque nobis sint delectus similique, doloremque doloribus voluptatum ad amet magnam consequatur totam molestiae sit sapiente explicabo. Quisquam, dolorem eligendi. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia hic neque nobis sint delectus similique, doloremque doloribus voluptatum ad amet magnam consequatur totam molestiae sit sapiente explicabo. Quisquam, dolorem eligendi.\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 10;pug_debug_filename = "public\u002Ftemplates\u002Fevents\u002Fupper-text.pug";
pug_html = pug_html + "\u003Cdiv class=\"events-table\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "public\u002Ftemplates\u002Fevents\u002Fupper-text.pug";
pug_html = pug_html + "\u003Cdiv class=\"container\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "public\u002Ftemplates\u002Fevents\u002Fupper-text.pug";
pug_html = pug_html + "\u003Cdiv class=\"title\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "public\u002Ftemplates\u002Fevents\u002Fupper-text.pug";
pug_html = pug_html + "Находите события";
;pug_debug_line = 14;pug_debug_filename = "public\u002Ftemplates\u002Fevents\u002Fupper-text.pug";
pug_html = pug_html + "\u003Cdiv class=\"right-arrow\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 15;pug_debug_filename = "public\u002Ftemplates\u002Fevents\u002Fupper-text.pug";
pug_html = pug_html + "\u003Cdiv class=\"left-row\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "public\u002Ftemplates\u002Fevents\u002Fupper-text.pug";
pug_html = pug_html + "\u003Cbutton class=\"button-active\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "public\u002Ftemplates\u002Fevents\u002Fupper-text.pug";
pug_html = pug_html + "\u003Cspan class=\"button-label\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "public\u002Ftemplates\u002Fevents\u002Fupper-text.pug";
pug_html = pug_html + "Концерты\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
;pug_debug_line = 18;pug_debug_filename = "public\u002Ftemplates\u002Fevents\u002Fupper-text.pug";
pug_html = pug_html + "\u003Cbutton class=\"button-inactive\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "public\u002Ftemplates\u002Fevents\u002Fupper-text.pug";
pug_html = pug_html + "\u003Cspan class=\"button-label_inactive\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "public\u002Ftemplates\u002Fevents\u002Fupper-text.pug";
pug_html = pug_html + "Выставки\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
;pug_debug_line = 20;pug_debug_filename = "public\u002Ftemplates\u002Fevents\u002Fupper-text.pug";
pug_html = pug_html + "\u003Cbutton class=\"button-inactive\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "public\u002Ftemplates\u002Fevents\u002Fupper-text.pug";
pug_html = pug_html + "\u003Cspan class=\"button-label_inactive\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "public\u002Ftemplates\u002Fevents\u002Fupper-text.pug";
pug_html = pug_html + "Кино\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 22;pug_debug_filename = "public\u002Ftemplates\u002Fevents\u002Fupper-text.pug";
pug_html = pug_html + "\u003Cdiv class=\"center-row\" id=\"events-row\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}