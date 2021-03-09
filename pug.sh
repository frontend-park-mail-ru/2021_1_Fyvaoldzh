#!/bin/sh
(pug -c -n oneTableEventTemplate public/templates/events/one-table-event.pug)
(pug -c -n oneEventPageTemplate public/templates/one-event-page/one-event-page.pug)
(pug -c -n loginTemplate public/templates/login/login.pug)
(pug -c -n signUpFormTemplate public/templates/signup/signup.pug)
(pug -c -n upperTextTemplate public/templates/events/upper-text.pug)
(pug -c -n navbarTemplate public/components/navbar/navbar.pug)
(pug -c -n navbarLoggedTemplate public/components/navbar/navbar-logged.pug)