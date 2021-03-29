#!/bin/sh
(pug -c -n oneTableEventTemplate public/templates/events/one-table-event.pug)
(pug -c -n oneEventPageTemplate public/templates/one-event-page/one-event-page.pug)
(pug -c -n loginTemplate public/templates/login/login.pug)
(pug -c -n signUpFormTemplate public/templates/signup/signup.pug)
(pug -c -n upperTextTemplate public/templates/events/upper-text.pug)
(pug -c -n navbarTemplate public/components/navbar/navbar.pug)
(pug -c -n navbarLoggedTemplate public/components/navbar/navbar-logged.pug)
(pug -c -n profileTemplate public/templates/profile/profile.pug)
(pug -c -n myProfileTemplate public/templates/my-profile/my-profile.pug)
(pug -c -n myProfileAboutTabTemplate public/templates/my-profile-about-tab/my-profile-about-tab.pug)
(pug -c -n myProfileSettingsTabTemplate public/templates/my-profile-settings-tab/my-profile-settings-tab.pug)
(pug -c -n myProfileEventsTabTemplate public/templates/my-profile-events-tab/my-profile-events-tab.pug)
(pug -c -n errorLoginTemplate public/templates/login/error-login.pug)
(pug -c -n errorSignupTemplate public/templates/signup/errorSignup.pug)