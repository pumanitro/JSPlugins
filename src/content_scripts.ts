function eventFire(el, etype) {
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

if (document.location.href === 'http://dbv.dbvictory.eu/login.html') {
    let logInName = <HTMLInputElement>document.querySelectorAll('[name="account"]')[0];
    let logInPassword = <HTMLInputElement>document.querySelectorAll('[name="password"]')[0];

    logInName.value = 'someLogim';
    logInPassword.value = 'somePwd';

    let loginForm = <HTMLFormElement>document.getElementById('login_form');

    loginForm.submit();

}

if (document.location.origin === 'https://www.googlee.pl') {
    let searchBar = <HTMLInputElement>document.querySelectorAll('[title="Szukaj"]')[0];

    searchBar.value = 'DBV';

    let searchBtn = <HTMLInputElement>document.querySelectorAll('[value="Szukaj w Google"]')[0];

    eventFire(searchBtn, 'click');

}
