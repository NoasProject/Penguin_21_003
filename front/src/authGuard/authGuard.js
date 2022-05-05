import { getInstance as authInstance } from "../auth/index";
import { getInstance as accountInstance } from "../accountService/index";

export const authGuard = (to, from, next) => {
    const authService = authInstance();
    const accountService = accountInstance();

    const fn = () => {
        // If the user is authenticated, continue with the route
        // Tokenを保存しているかチェックする
        if (authService.isAuthenticated) {

            if (accountService.hasToken()) {
                accountService.setAxiosAccessHeader();
            }

            return next();
        }

        const options = {
            redirect_uri: window.location.origin
        };

        if (to.fullPath) {
            options.appState = { targetUrl: to.fullPath };
        }
        // Otherwise, log in
        authService.loginWithRedirect(options);
    };

    // If loading has already finished, check our auth state using `fn()`
    if (!authService.loading) {
        return fn();
    }

    // Watch for the loading property to change before we check isAuthenticated
    authService.$watch("loading", loading => {
        if (loading === false) {
            return fn();
        }
    });
};