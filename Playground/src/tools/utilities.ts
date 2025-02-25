import { GlobalState } from '../globalState';

export class Utilities {
    public static FastEval(code: string) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');

        script.innerHTML = `try {${code};}
        catch(e) {
            handleException(e);
        }`;

        head.appendChild(script);
    }

    public static ParseQuery() {
        let queryString = location.search;
        var query: any = {};
        var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split('=');
            query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        }
        return query;
    }

    public static ReadStringFromStore(key: string, defaultValue: string): string {
        if (sessionStorage.getItem(key) === null) {
            return defaultValue;
        }

        return sessionStorage.getItem(key)!;
    }

    public static ReadBoolFromStore(key: string, defaultValue: boolean): boolean {
        if (sessionStorage.getItem(key) === null) {
            return defaultValue;
        }

        return sessionStorage.getItem(key) === "true";
    }

    public static StoreStringToStore(key: string, value: string): void {
        sessionStorage.setItem(key, value);
    }

    public static StoreBoolToStore(key: string, value: boolean): void {
        sessionStorage.setItem(key, value ? "true" : "false");
    }

    public static CheckSafeMode(message: string) {
        if (Utilities.ReadBoolFromStore("safe-mode", false)) {
            return window.confirm(message);
        }

        return true;
    }

    public static SwitchLanguage(language: string, globalState: GlobalState, force?: boolean) {
        if (force || window.confirm("Are you sure you want to switch the language (You will lose your current project if it was not saved before)?")) {
            Utilities.StoreStringToStore("language", language);
            globalState.language = language;
            globalState.currentCode = "";
            globalState.onLanguageChangedObservable.notifyObservers();
        }
    }
}