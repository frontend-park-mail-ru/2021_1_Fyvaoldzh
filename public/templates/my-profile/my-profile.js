function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function myProfileTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug":".row\n    .my-profile-block\n        a.my-profile-block__back-button(href='#')\n        .my-profile-header\n            .my-profile-header__info-segment\n                .my-profile-header__subscribers-img\n                |#{followers} Подписчиков\n            .my-profile-header__avatar(id='profileAvatar')\n                label(class=\"settings-block__change-avatar-img\")\n                    input.settings-block__change-avatar-img(id='imageFile' type='file')\n                button.settings-block__edit-img(type='submit' id='postAvatarProfile')\n            .my-profile-header__events-segment\n                .my-profile-header__info-segment\n                    .my-profile-header__black-star-img\n                    |                         2 Планируемых\n                .my-profile-header__info-segment\n                    .my-profile-header__visited-events-img\n                    |                         11 Посещенных\n        .decor-line\n        .settings-block\n            .settings-block__one-setting\n                .settings-block__title\n                    | Меня зовут:\n                form.span-form()\n                    input.settings-block__input(type='text' placeholder='Введите' name='name' value=name class='form__input')\n                    button.settings-block__edit-img(type='submit' id='postProfile')\n            .settings-block__one-setting\n                .settings-block__title\n                    | Дата рождения:\n                form.span-form()\n                    input.settings-block__input(type='text' placeholder='Введите' name='birthday' value=birthday class='form__input')\n                    button.settings-block__edit-img(type='submit' id='postProfile')\n            .settings-block__one-setting\n                .settings-block__title\n                    | Город:\n                form.span-form()\n                    input.settings-block__input(type='text' placeholder='Введите' name='city' value=city class='form__input')\n                    button.settings-block__edit-img(type='submit' id='postProfile' class='form__input')\n            .settings-block__one-setting\n                .settings-block__title\n                    | Почта:\n                form.span-form()\n                    input.settings-block__input(type='text' placeholder='Введите' name='email' value=email class='form__input')\n                    button.settings-block__edit-img(type='submit' id='postProfile' class='form__input')\n            button.button-inactive\n                .button-label_inactive Изменить пароль;\n"};
;var locals_for_with = (locals || {});(function (birthday, city, email, followers, name) {;pug_debug_line = 1;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"my-profile-block\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Ca class=\"my-profile-block__back-button\" href=\"#\"\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 4;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"my-profile-header\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"my-profile-header__info-segment\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"my-profile-header__subscribers-img\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = followers) ? "" : pug_interp));
;pug_debug_line = 7;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + " Подписчиков\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"my-profile-header__avatar\" id=\"profileAvatar\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Clabel class=\"settings-block__change-avatar-img\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cinput class=\"settings-block__change-avatar-img\" id=\"imageFile\" type=\"file\"\u002F\u003E\u003C\u002Flabel\u003E";
;pug_debug_line = 11;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cbutton class=\"settings-block__edit-img\" type=\"submit\" id=\"postAvatarProfile\"\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 12;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"my-profile-header__events-segment\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"my-profile-header__info-segment\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"my-profile-header__black-star-img\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 15;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "                        2 Планируемых\u003C\u002Fdiv\u003E";
;pug_debug_line = 16;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"my-profile-header__info-segment\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"my-profile-header__visited-events-img\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 18;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "                        11 Посещенных\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 19;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"decor-line\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 20;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"settings-block\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"settings-block__one-setting\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"settings-block__title\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "Меня зовут:\u003C\u002Fdiv\u003E";
;pug_debug_line = 24;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cform class=\"span-form\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"settings-block__input form__input\""+" type=\"text\" placeholder=\"Введите\" name=\"name\""+pug_attr("value", name, true, false)) + "\u002F\u003E";
;pug_debug_line = 26;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cbutton class=\"settings-block__edit-img\" type=\"submit\" id=\"postProfile\"\u003E\u003C\u002Fbutton\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 27;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"settings-block__one-setting\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"settings-block__title\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "Дата рождения:\u003C\u002Fdiv\u003E";
;pug_debug_line = 30;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cform class=\"span-form\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"settings-block__input form__input\""+" type=\"text\" placeholder=\"Введите\" name=\"birthday\""+pug_attr("value", birthday, true, false)) + "\u002F\u003E";
;pug_debug_line = 32;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cbutton class=\"settings-block__edit-img\" type=\"submit\" id=\"postProfile\"\u003E\u003C\u002Fbutton\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 33;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"settings-block__one-setting\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"settings-block__title\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "Город:\u003C\u002Fdiv\u003E";
;pug_debug_line = 36;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cform class=\"span-form\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"settings-block__input form__input\""+" type=\"text\" placeholder=\"Введите\" name=\"city\""+pug_attr("value", city, true, false)) + "\u002F\u003E";
;pug_debug_line = 38;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cbutton class=\"settings-block__edit-img form__input\" type=\"submit\" id=\"postProfile\"\u003E\u003C\u002Fbutton\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 39;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"settings-block__one-setting\"\u003E";
;pug_debug_line = 40;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"settings-block__title\"\u003E";
;pug_debug_line = 41;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "Почта:\u003C\u002Fdiv\u003E";
;pug_debug_line = 42;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cform class=\"span-form\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"settings-block__input form__input\""+" type=\"text\" placeholder=\"Введите\" name=\"email\""+pug_attr("value", email, true, false)) + "\u002F\u003E";
;pug_debug_line = 44;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cbutton class=\"settings-block__edit-img form__input\" type=\"submit\" id=\"postProfile\"\u003E\u003C\u002Fbutton\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 45;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cbutton class=\"button-inactive\"\u003E";
;pug_debug_line = 46;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "\u003Cdiv class=\"button-label_inactive\"\u003E";
;pug_debug_line = 46;pug_debug_filename = "public\u002Ftemplates\u002Fmy-profile\u002Fmy-profile.pug";
pug_html = pug_html + "Изменить пароль;\u003C\u002Fdiv\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"birthday" in locals_for_with?locals_for_with.birthday:typeof birthday!=="undefined"?birthday:undefined,"city" in locals_for_with?locals_for_with.city:typeof city!=="undefined"?city:undefined,"email" in locals_for_with?locals_for_with.email:typeof email!=="undefined"?email:undefined,"followers" in locals_for_with?locals_for_with.followers:typeof followers!=="undefined"?followers:undefined,"name" in locals_for_with?locals_for_with.name:typeof name!=="undefined"?name:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}